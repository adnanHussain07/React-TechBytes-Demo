import { describe, it, expect } from 'vitest';
import { buildUserModel } from './buildUserModel';
import { TelemetryEvent } from '../types';

describe('buildUserModel', () => {
  const mockEvents: TelemetryEvent[] = [
    { eventId: '1', ts: 1000, type: 'click', routePath: '/', uiId: 'btn-1', tag: 'button' },
    { eventId: '2', ts: 2000, type: 'hover', routePath: '/', uiId: 'btn-1', tag: 'button' },
    { eventId: '3', ts: 3000, type: 'click', routePath: '/tasks', uiId: 'btn-2', tag: 'button' },
    // New session after 21 minutes
    { eventId: '4', ts: 1000 + 21 * 60 * 1000, type: 'click', routePath: '/tasks', uiId: 'btn-2', tag: 'button' },
  ];

  it('aggregates totals correctly', () => {
    const model = buildUserModel(mockEvents);
    expect(model.totals.clicks).toBe(3);
    expect(model.totals.hovers).toBe(1);
  });

  it('aggregates perUi stats correctly', () => {
    const model = buildUserModel(mockEvents);
    expect(model.perUi['btn-1'].clicks).toBe(1);
    expect(model.perUi['btn-1'].hovers).toBe(1);
    expect(model.perUi['btn-2'].clicks).toBe(2);
  });

  it('aggregates perRoute stats correctly', () => {
    const model = buildUserModel(mockEvents);
    expect(model.perRoute['/'].clicks).toBe(1);
    expect(model.perRoute['/'].visitsApprox).toBe(1);
    expect(model.perRoute['/tasks'].clicks).toBe(2);
    expect(model.perRoute['/tasks'].visitsApprox).toBe(2);
  });

  it('estimates sessions correctly', () => {
    const model = buildUserModel(mockEvents);
    expect(model.sessionsApprox).toBe(2);
  });

  it('maintains sequences', () => {
    const model = buildUserModel(mockEvents);
    expect(model.sequences.lastUiIds).toEqual(['btn-1', 'btn-1', 'btn-2', 'btn-2']);
  });
});
