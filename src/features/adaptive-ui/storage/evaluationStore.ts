import { HintInteractionEvent } from '../types';

const STORAGE_PREFIX = 'adaptiveUi.hintEvents.v1.';

export const listHintEvents = (userId: string): HintInteractionEvent[] => {
  const stored = localStorage.getItem(`${STORAGE_PREFIX}${userId}`);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const appendHintEvent = (userId: string, event: HintInteractionEvent) => {
  const events = listHintEvents(userId);
  events.push(event);
  localStorage.setItem(`${STORAGE_PREFIX}${userId}`, JSON.stringify(events));
};

export const clearHintEvents = (userId: string) => {
  localStorage.removeItem(`${STORAGE_PREFIX}${userId}`);
};

export const exportAllData = (userId: string): string => {
  const events = localStorage.getItem(`adaptiveUi.events.v1.${userId}`);
  const hintEvents = localStorage.getItem(`${STORAGE_PREFIX}${userId}`);
  const transitions = localStorage.getItem(`adaptiveUi.ml.transitions.v1.${userId}`);
  const settings = localStorage.getItem(`adaptiveUi.settings.v1`);
  const dismissed = localStorage.getItem(`adaptiveUi.dismissed.v1.${userId}`);

  return JSON.stringify({
    userId,
    events: events ? JSON.parse(events) : [],
    hintEvents: hintEvents ? JSON.parse(hintEvents) : [],
    transitions: transitions ? JSON.parse(transitions) : {},
    settings: settings ? JSON.parse(settings) : {},
    dismissed: dismissed ? JSON.parse(dismissed) : {},
    exportedAt: Date.now()
  }, null, 2);
};

export const importAllData = (userId: string, json: string): boolean => {
  try {
    const data = JSON.parse(json);
    if (data.events) localStorage.setItem(`adaptiveUi.events.v1.${userId}`, JSON.stringify(data.events));
    if (data.hintEvents) localStorage.setItem(`${STORAGE_PREFIX}${userId}`, JSON.stringify(data.hintEvents));
    if (data.transitions) localStorage.setItem(`adaptiveUi.ml.transitions.v1.${userId}`, JSON.stringify(data.transitions));
    if (data.settings) localStorage.setItem(`adaptiveUi.settings.v1`, JSON.stringify(data.settings));
    if (data.dismissed) localStorage.setItem(`adaptiveUi.dismissed.v1.${userId}`, JSON.stringify(data.dismissed));
    return true;
  } catch {
    return false;
  }
};
