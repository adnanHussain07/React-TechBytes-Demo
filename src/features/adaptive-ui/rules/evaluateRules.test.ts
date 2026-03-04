import { describe, it, expect } from 'vitest';
import { evaluateRules } from './evaluateRules';
import { RuleContext } from './ruleTypes';

describe('evaluateRules', () => {
  const baseModel = {
    totals: { clicks: 0, hovers: 0 },
    perUi: {},
    perRoute: {},
    sequences: { lastUiIds: [] },
    sessionsApprox: 0,
  };

  const baseCtx: RuleContext = {
    routePath: '/',
    model: baseModel,
    nowTs: Date.now(),
    settings: { enabled: true, captureHover: false, sampleMode: false, userId: 'test' },
    dismissedHints: {},
  };

  it('returns empty array when no rules match', () => {
    const hints = evaluateRules(baseCtx);
    expect(hints).toEqual([]);
  });

  it('triggers nav-explore rule when visits >= 3 and clicks < 5', () => {
    const ctx: RuleContext = {
      ...baseCtx,
      model: {
        ...baseModel,
        perRoute: {
          '/': { visitsApprox: 3, clicks: 0, lastTs: Date.now() },
        },
      },
    };
    const hints = evaluateRules(ctx);
    expect(hints).toHaveLength(1);
    expect(hints[0].hintId).toBe('hint.nav-explore');
  });

  it('triggers tasks-add rule on /async-ux route', () => {
    const ctx: RuleContext = {
      ...baseCtx,
      routePath: '/async-ux',
      model: {
        ...baseModel,
        perRoute: {
          '/async-ux': { visitsApprox: 2, clicks: 0, lastTs: Date.now() },
        },
      },
    };
    const hints = evaluateRules(ctx);
    expect(hints).toHaveLength(1);
    expect(hints[0].hintId).toBe('hint.tasks-add');
  });

  it('does not trigger dismissed rules', () => {
     const ctx: RuleContext = {
      ...baseCtx,
      model: {
        ...baseModel,
        perRoute: {
          '/': { visitsApprox: 3, clicks: 0, lastTs: Date.now() },
        },
      },
      dismissedHints: {
        'hint.nav-explore': Date.now(),
      },
    };
    const hints = evaluateRules(ctx);
    expect(hints).toHaveLength(0);
  });
});
