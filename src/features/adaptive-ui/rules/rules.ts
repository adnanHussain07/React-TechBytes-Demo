import { Rule } from './ruleTypes';
import { predictNextUi } from '../ml/transitionModel';

const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

const isRecentlyDismissed = (hintId: string, dismissed: Record<string, number>, now: number) => {
  const ts = dismissed[hintId];
  return ts && now - ts < DISMISS_COOLDOWN_MS;
};

// 1. "nav.explore": If user stays on home and hasn’t clicked any route link after 3 visits -> highlight a key route link.
export const navExploreRule: Rule = {
  id: 'nav-explore',
  evaluate: (ctx) => {
    if (ctx.routePath !== '/') return null;
    if (isRecentlyDismissed('hint.nav-explore', ctx.dismissedHints, ctx.nowTs)) return null;

    const homeStats = ctx.model.perRoute['/'] || { visitsApprox: 0, clicks: 0 };
    const totalRouteClicks = Object.values(ctx.model.perRoute).reduce((acc, r) => acc + r.clicks, 0);

    if (homeStats.visitsApprox >= 3 && totalRouteClicks < 5) {
      return {
        hintId: 'hint.nav-explore',
        targetUiId: 'nav.async-ux',
        message: 'Ready to see how React handles async data? Check out the Async UX demo!',
        kind: 'highlight',
        priority: 2,
        debugInfo: `homeVisits=${homeStats.visitsApprox}, totalRouteClicks=${totalRouteClicks}`,
      };
    }
    return null;
  },
};

// 2. "tasks.add": If user visits tasks page 2+ times but never clicks Add -> highlight add button with tooltip.
export const tasksAddRule: Rule = {
  id: 'tasks-add',
  evaluate: (ctx) => {
    if (ctx.routePath !== '/async-ux') return null;
    if (isRecentlyDismissed('hint.tasks-add', ctx.dismissedHints, ctx.nowTs)) return null;

    const asyncStats = ctx.model.perRoute['/async-ux'] || { visitsApprox: 0, clicks: 0 };
    const addClicks = ctx.model.perUi['tasks.form.submit']?.clicks || 0;

    if (asyncStats.visitsApprox >= 2 && addClicks === 0) {
      return {
        hintId: 'hint.tasks-add',
        targetUiId: 'tasks.form.submit',
        message: 'Try adding a task to see optimistic updates in action!',
        kind: 'tooltip',
        priority: 3,
        debugInfo: `asyncVisits=${asyncStats.visitsApprox}, addClicks=${addClicks}`,
      };
    }
    return null;
  },
};

// 3. "tasks.complete": If user adds tasks but rarely toggles done -> tooltip on toggle.
export const tasksCompleteRule: Rule = {
  id: 'tasks-complete',
  evaluate: (ctx) => {
    if (ctx.routePath !== '/async-ux') return null;
    if (isRecentlyDismissed('hint.tasks-complete', ctx.dismissedHints, ctx.nowTs)) return null;

    const addClicks = ctx.model.perUi['tasks.form.submit']?.clicks || 0;
    const toggleClicks = ctx.model.perUi['tasks.item.toggle']?.clicks || 0;

    if (addClicks >= 3 && toggleClicks === 0) {
      return {
        hintId: 'hint.tasks-complete',
        targetUiId: 'tasks.item.toggle',
        message: 'Click the checkbox to mark a task as completed.',
        kind: 'tooltip',
        priority: 4,
        debugInfo: `addClicks=${addClicks}, toggleClicks=${toggleClicks}`,
      };
    }
    return null;
  },
};

// 4. "network.sim": If user frequently interacts with tasks, hint to use simulator toggles.
export const networkSimRule: Rule = {
  id: 'network-sim',
  evaluate: (ctx) => {
    if (ctx.routePath !== '/async-ux') return null;
    if (isRecentlyDismissed('hint.network-sim', ctx.dismissedHints, ctx.nowTs)) return null;

    const taskInteractions = (ctx.model.perUi['tasks.form.submit']?.clicks || 0) + 
                             (ctx.model.perUi['tasks.item.toggle']?.clicks || 0);

    const simClicks = (ctx.model.perUi['tasks.sim.latency']?.clicks || 0) + 
                      (ctx.model.perUi['tasks.sim.failure']?.clicks || 0);

    if (taskInteractions >= 5 && simClicks === 0) {
      return {
        hintId: 'hint.network-sim',
        targetUiId: 'tasks.sim.latency',
        message: 'Try changing network latency to see how the UI adapts to slow connections!',
        kind: 'highlight',
        priority: 2,
        debugInfo: `taskInteractions=${taskInteractions}, simClicks=${simClicks}`,
      };
    }
    return null;
  },
};

// 5. "insights.open": If user never opens /adaptive-ui/insights -> highlight link to insights.
export const insightsOpenRule: Rule = {
  id: 'insights-open',
  evaluate: (ctx) => {
    if (isRecentlyDismissed('hint.insights-open', ctx.dismissedHints, ctx.nowTs)) return null;

    const insightsVisits = ctx.model.perRoute['/adaptive-ui/insights']?.visitsApprox || 0;
    const totalClicks = ctx.model.totals.clicks;

    if (totalClicks >= 20 && insightsVisits === 0) {
      return {
        hintId: 'hint.insights-open',
        targetUiId: 'nav.adaptive-ui',
        message: 'Curious what data we capture? Check out the Insights dashboard!',
        kind: 'highlight',
        priority: 1,
        debugInfo: `totalClicks=${totalClicks}, insightsVisits=${insightsVisits}`,
      };
    }
    return null;
  },
};

// 6. "ml.nextAction": Predictive ML rule based on transition model.
export const mlNextActionRule: Rule = {
  id: 'ml-next-action',
  evaluate: (ctx) => {
    if (isRecentlyDismissed('hint.ml-next-action', ctx.dismissedHints, ctx.nowTs)) return null;

    const lastUiId = ctx.model.sequences.lastUiIds[ctx.model.sequences.lastUiIds.length - 1];
    const predicted = predictNextUi(ctx.settings.userId, lastUiId);

    if (predicted && predicted !== lastUiId) {
      return {
        hintId: 'hint.ml-next-action',
        targetUiId: predicted,
        message: `Based on your habits, you might want to use this next!`,
        kind: 'highlight',
        priority: 1,
        debugInfo: `predicted from ${lastUiId}`,
      };
    }
    return null;
  },
};

export const ALL_RULES: Rule[] = [
  navExploreRule,
  tasksAddRule,
  tasksCompleteRule,
  networkSimRule,
  insightsOpenRule,
  mlNextActionRule,
];
