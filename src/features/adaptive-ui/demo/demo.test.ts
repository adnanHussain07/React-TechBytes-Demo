import { describe, it, expect, beforeEach } from 'vitest';
import { seedNoviceScenario } from './seedScenarios';
import { listEvents } from '../storage/eventStore';
import { buildUserModel } from '../analytics/buildUserModel';
import { evaluateRules } from '../rules/evaluateRules';
import { listDismissed } from '../storage/dismissedStore';

describe('Demo Reliability', () => {
  const userId = 'novice-user';

  beforeEach(() => {
    localStorage.clear();
  });

  it('triggers the expected hints after seeding novice data', () => {
    // 1. Seed the scenario
    seedNoviceScenario(userId);

    // 2. Build the model from the seeded events
    const events = listEvents(userId);
    const model = buildUserModel(events);
    const dismissed = listDismissed(userId);

    // 3. Evaluate rules for the Home page
    const homeHints = evaluateRules({
      routePath: '/',
      model,
      nowTs: Date.now(),
      settings: { enabled: true, captureHover: false, sampleMode: false, userId },
      dismissedHints: dismissed,
    });

    // Expect "nav-explore" hint on Home
    const navExplore = homeHints.find(h => h.hintId === 'hint.nav-explore');
    expect(navExplore).toBeDefined();
    expect(navExplore?.targetUiId).toBe('nav.async-ux');

    // 4. Evaluate rules for the Async UX page
    const taskHints = evaluateRules({
      routePath: '/async-ux',
      model,
      nowTs: Date.now(),
      settings: { enabled: true, captureHover: false, sampleMode: false, userId },
      dismissedHints: dismissed,
    });

    // Expect "tasks-add" hint on Async UX page
    const tasksAdd = taskHints.find(h => h.hintId === 'hint.tasks-add');
    expect(tasksAdd).toBeDefined();
    expect(tasksAdd?.targetUiId).toBe('tasks.form.submit');
  });
});
