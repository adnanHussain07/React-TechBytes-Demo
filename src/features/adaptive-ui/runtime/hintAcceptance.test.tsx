import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { AdaptiveUiProvider } from './AdaptiveUiProvider';
import { MemoryRouter } from 'react-router-dom';
import { listHintEvents } from '../storage/evaluationStore';

// Mock evaluateRules to return a specific hint for acceptance test
vi.mock('../rules/evaluateRules', () => ({
  evaluateRules: vi.fn(() => [
    {
      hintId: 'test-hint-acceptance',
      targetUiId: 'accept-me',
      message: 'Click me!',
      kind: 'highlight',
      priority: 5
    }
  ])
}));

describe('Hint Acceptance', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '<button data-uiid="accept-me">Accept Me</button>';
  });

  it('logs accepted event when clicking hint target', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AdaptiveUiProvider>
          <div>Provider Wrapper</div>
        </AdaptiveUiProvider>
      </MemoryRouter>
    );

    // Wait for provider to initialize and evaluate rules
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    const button = document.querySelector('[data-uiid="accept-me"]');
    expect(button).toBeDefined();

    // Click the target
    fireEvent.click(button!);

    // Check hintEvents store
    const events = listHintEvents('default-user');
    const acceptedEvent = events.find(e => e.type === 'accepted');
    
    expect(acceptedEvent).toBeDefined();
    expect(acceptedEvent?.hintId).toBe('test-hint-acceptance');
    expect(acceptedEvent?.targetUiId).toBe('accept-me');
  });
});
