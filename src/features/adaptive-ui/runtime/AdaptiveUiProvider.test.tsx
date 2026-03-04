import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { AdaptiveUiProvider, useAdaptiveHints } from '../runtime/AdaptiveUiProvider';
import { MemoryRouter } from 'react-router-dom';

// Mock evaluateRules to return a specific hint initially
let mockHints = [
  {
    hintId: 'test-hint-dismiss',
    targetUiId: 'test-target',
    message: 'Test Message',
    kind: 'tooltip',
    priority: 5
  }
];

vi.mock('../rules/evaluateRules', () => ({
  evaluateRules: vi.fn((ctx) => {
    // Check if dismissed
    if (ctx.dismissedHints['test-hint-dismiss']) return [];
    return mockHints;
  })
}));

describe('AdaptiveUiProvider Dismissal', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('removes hint from activeHints when dismissed', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter>
        <AdaptiveUiProvider>{children}</AdaptiveUiProvider>
      </MemoryRouter>
    );

    const { result } = renderHook(() => useAdaptiveHints(), { wrapper });

    // Wait for initial recompute
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    expect(result.current.activeHints).toHaveLength(1);
    expect(result.current.activeHints[0].hintId).toBe('test-hint-dismiss');

    act(() => {
      result.current.dismissHint('test-hint-dismiss');
    });

    expect(result.current.activeHints).toHaveLength(0);
    
    // Check storage
    const dismissed = JSON.parse(localStorage.getItem('adaptiveUi.dismissed.v1.default-user') || '{}');
    expect(dismissed['test-hint-dismiss']).toBeDefined();
  });
});
