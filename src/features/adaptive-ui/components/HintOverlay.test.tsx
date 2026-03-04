import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { AdaptiveUiProvider } from '../runtime/AdaptiveUiProvider';
import HintOverlay from './HintOverlay';
import { MemoryRouter } from 'react-router-dom';

// Mock evaluateRules to return a specific hint
vi.mock('../rules/evaluateRules', () => ({
  evaluateRules: vi.fn(() => [
    {
      hintId: 'test-hint',
      targetUiId: 'test-target',
      message: 'Test Message',
      kind: 'highlight',
      priority: 5
    }
  ])
}));

describe('HintOverlay', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '<div data-uiid="test-target">Target</div>';
  });

  it('applies highlight class to target element', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AdaptiveUiProvider>
          <HintOverlay />
        </AdaptiveUiProvider>
      </MemoryRouter>
    );

    // Wait for effect to run and class to be applied
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    const target = document.querySelector('[data-uiid="test-target"]');
    expect(target?.classList.contains('adaptive-highlight')).toBe(true);
  });
});
