import { describe, it, expect, beforeEach, vi } from 'vitest';
import { handleGlobalEvent, findUiId } from './telemetry';
import { listEvents } from '../storage/eventStore';
import { AdaptiveUiSettings } from '../types';

describe('Telemetry', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const settings: AdaptiveUiSettings = {
    enabled: true,
    captureHover: false,
    sampleMode: false,
    userId: 'test-user',
  };

  it('should find uiId from element or parent', () => {
    const parent = document.createElement('div');
    parent.setAttribute('data-uiid', 'parent-id');
    const child = document.createElement('button');
    parent.appendChild(child);

    expect(findUiId(parent)).toBe('parent-id');
    expect(findUiId(child)).toBe('parent-id');
  });

  it('should append event when clicking a data-uiid element', () => {
    localStorage.setItem('adaptiveUi.userId', settings.userId);
    const btn = document.createElement('button');
    btn.setAttribute('data-uiid', 'btn.click-me');
    btn.innerText = 'Click Me';
    
    const event = {
      type: 'click',
      target: btn,
    } as any;

    handleGlobalEvent(event, settings, '/');

    const events = listEvents(settings.userId);
    expect(events).toHaveLength(1);
    expect(events[0].uiId).toBe('btn.click-me');
    expect(events[0].type).toBe('click');
    expect(events[0].text).toBe('Click Me');
  });

  it('should ignore events without data-uiid', () => {
    const btn = document.createElement('button');
    
    const event = {
      type: 'click',
      target: btn,
    } as any;

    handleGlobalEvent(event, settings, '/');
    expect(listEvents(settings.userId)).toHaveLength(0);
  });

  it('should respect captureHover setting', () => {
    localStorage.setItem('adaptiveUi.userId', settings.userId);
    const btn = document.createElement('button');
    btn.setAttribute('data-uiid', 'btn.hover-me');
    
    const event = {
      type: 'pointerenter',
      target: btn,
    } as any;

    // Disabled hover
    handleGlobalEvent(event, settings, '/');
    expect(listEvents(settings.userId)).toHaveLength(0);

    // Enabled hover
    handleGlobalEvent(event, { ...settings, captureHover: true }, '/');
    expect(listEvents(settings.userId)).toHaveLength(1);
    expect(listEvents(settings.userId)[0].type).toBe('hover');
  });
});
