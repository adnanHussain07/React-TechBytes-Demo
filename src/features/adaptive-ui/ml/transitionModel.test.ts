import { describe, it, expect, beforeEach } from 'vitest';
import { updateTransitionModel, predictNextUi, getTransitionMatrix } from './transitionModel';
import { TelemetryEvent } from '../types';

describe('TransitionModel', () => {
  const userId = 'test-user';

  beforeEach(() => {
    localStorage.clear();
  });

  const events: TelemetryEvent[] = [
    { eventId: '1', ts: 1000, type: 'click', routePath: '/', uiId: 'A', tag: 'a' },
    { eventId: '2', ts: 2000, type: 'click', routePath: '/', uiId: 'B', tag: 'a' },
    { eventId: '3', ts: 3000, type: 'click', routePath: '/', uiId: 'A', tag: 'a' },
    { eventId: '4', ts: 4000, type: 'click', routePath: '/', uiId: 'B', tag: 'a' },
  ];

  it('updates transition matrix correctly', () => {
    updateTransitionModel(userId, events);
    const matrix = getTransitionMatrix(userId);
    
    // A -> B happened twice
    expect(matrix['A']['B']).toBe(2);
    // B -> A happened once
    expect(matrix['B']['A']).toBe(1);
  });

  it('predicts the next UI ID based on frequency', () => {
    updateTransitionModel(userId, events);
    
    // After 'A', 'B' is the most likely next step (2 occurrences vs 0 for others)
    const predicted = predictNextUi(userId, 'A');
    expect(predicted).toBe('B');
  });

  it('returns null if confidence threshold not met', () => {
    const fewEvents: TelemetryEvent[] = [
      { eventId: '1', ts: 1000, type: 'click', routePath: '/', uiId: 'A', tag: 'a' },
      { eventId: '2', ts: 2000, type: 'click', routePath: '/', uiId: 'B', tag: 'a' },
    ];
    updateTransitionModel(userId, fewEvents);
    
    // A -> B only once, threshold is 2
    const predicted = predictNextUi(userId, 'A');
    expect(predicted).toBeNull();
  });
});
