import { TelemetryEvent, TelemetryEventType, AdaptiveUiSettings } from '../types';
import { appendEvent, getUserId } from '../storage/eventStore';

// Basic UUID generator
const uuid = () => Math.random().toString(36).substring(2, 11);

export const createTelemetryEvent = (
  type: TelemetryEventType,
  target: HTMLElement,
  routePath: string,
  uiId: string
): TelemetryEvent => {
  return {
    eventId: uuid(),
    ts: Date.now(),
    type,
    routePath,
    uiId,
    tag: target.tagName.toLowerCase(),
    text: target.innerText?.trim().slice(0, 60),
    meta: {
      x: (target as any).clientX, // Simple fallback if needed
      y: (target as any).clientY,
    },
  };
};

export const findUiId = (element: HTMLElement | null): string | null => {
  let current = element;
  while (current && current !== document.body) {
    const uiId = current.getAttribute('data-uiid');
    if (uiId) return uiId;
    current = current.parentElement;
  }
  return null;
};

// Throttle for hover events
let lastHoverTs = 0;
const HOVER_THROTTLE_MS = 1000;

export const handleGlobalEvent = (
  e: Event,
  settings: AdaptiveUiSettings,
  currentRoute: string
) => {
  if (!settings.enabled) return;

  const type = e.type === 'pointerenter' ? 'hover' : 'click';
  if (type === 'hover' && (!settings.captureHover || Date.now() - lastHoverTs < HOVER_THROTTLE_MS)) {
    return;
  }

  const target = e.target as HTMLElement;
  const uiId = findUiId(target);

  if (uiId) {
    if (type === 'hover') lastHoverTs = Date.now();
    
    const event = createTelemetryEvent(type as TelemetryEventType, target, currentRoute, uiId);
    appendEvent(getUserId(), event);
  }
};
