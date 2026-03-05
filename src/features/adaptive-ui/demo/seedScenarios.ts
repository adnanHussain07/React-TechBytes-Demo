import { appendEvent, clearEvents, setUserId } from '../storage/eventStore';
import { clearDismissed } from '../storage/dismissedStore';
import { clearHintEvents } from '../storage/evaluationStore';
import { clearTransitionModel } from '../ml/transitionModel';

const SESSION_GAP_MS = 20 * 60 * 1000 + 1000; // Just over 20 minutes

export const seedNoviceScenario = (userId: string = 'novice-user') => {
  setUserId(userId);
  clearEvents(userId);
  clearDismissed(userId);
  clearHintEvents(userId);
  clearTransitionModel(userId);

  const now = Date.now();

  // 1. Trigger "nav-explore" rule: 3 visits to home
  // Use gaps larger than 20 mins to ensure visitsApprox increments
  for (let i = 0; i < 3; i++) {
    appendEvent(userId, {
      eventId: `seed-novice-home-${i}`,
      ts: now - (3 - i) * SESSION_GAP_MS,
      type: 'click',
      routePath: '/',
      uiId: 'nav.home',
      tag: 'a'
    });
  }

  // 2. Trigger "tasks-add" rule: 2 visits to Async UX, 0 clicks on add
  for (let i = 0; i < 2; i++) {
    appendEvent(userId, {
      eventId: `seed-novice-tasks-visit-${i}`,
      ts: now - (2 - i) * SESSION_GAP_MS + (SESSION_GAP_MS / 2),
      type: 'click',
      routePath: '/async-ux',
      uiId: 'nav.async-ux',
      tag: 'a'
    });
  }

  window.dispatchEvent(new CustomEvent('adaptive-ui-refresh'));
};

export const seedPowerScenario = (userId: string = 'power-user') => {
  setUserId(userId);
  clearEvents(userId);
  clearDismissed(userId);
  clearHintEvents(userId);
  clearTransitionModel(userId);

  const now = Date.now();
  const routes = ['/', '/async-ux', '/performance', '/composition'];

  // Trigger "insights-open" rule: 20+ clicks
  for (let i = 0; i < 25; i++) {
    appendEvent(userId, {
      eventId: `seed-power-${i}`,
      ts: now - (30 - i) * 60000,
      type: 'click',
      routePath: routes[i % routes.length],
      uiId: `nav.${routes[i % routes.length].replace(/^\//, '') || 'home'}`,
      tag: 'a'
    });
  }

  // Seed some transitions for ML prediction
  // Home -> Mental Model -> Home -> Mental Model
  for (let i = 0; i < 3; i++) {
    appendEvent(userId, {
      eventId: `seed-ml-h-${i}`,
      ts: now - 5000 + i * 1000,
      type: 'click',
      routePath: '/',
      uiId: 'nav.home',
      tag: 'a'
    });
    appendEvent(userId, {
      eventId: `seed-ml-m-${i}`,
      ts: now - 4500 + i * 1000,
      type: 'click',
      routePath: '/mental-model',
      uiId: 'nav.mental-model',
      tag: 'a'
    });
  }

  window.dispatchEvent(new CustomEvent('adaptive-ui-refresh'));
};
