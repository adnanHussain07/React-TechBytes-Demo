import { TelemetryEvent, AdaptiveUiSettings } from '../types';

const STORAGE_PREFIX = 'adaptiveUi.';
const EVENT_VERSION = 'v1';
const MAX_EVENTS = 2000;
const MAX_AGE_DAYS = 14;

export const DEFAULT_SETTINGS: AdaptiveUiSettings = {
  enabled: true,
  captureHover: false,
  sampleMode: false,
  userId: 'default-user',
};

const getEventKey = (userId: string) => `${STORAGE_PREFIX}events.${EVENT_VERSION}.${userId}`;
const SETTINGS_KEY = `${STORAGE_PREFIX}settings.${EVENT_VERSION}`;
const USER_ID_KEY = `${STORAGE_PREFIX}userId`;

export const getUserId = (): string => {
  return localStorage.getItem(USER_ID_KEY) || DEFAULT_SETTINGS.userId;
};

export const setUserId = (userId: string) => {
  localStorage.setItem(USER_ID_KEY, userId);
};

export const getSettings = (): AdaptiveUiSettings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (stored) {
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }
  return DEFAULT_SETTINGS;
};

export const saveSettings = (settings: AdaptiveUiSettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const listEvents = (userId: string): TelemetryEvent[] => {
  const key = getEventKey(userId);
  const stored = localStorage.getItem(key);
  if (!stored) return [];
  try {
    const events: TelemetryEvent[] = JSON.parse(stored);
    // Filter by age
    const cutoff = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
    return events.filter((e) => e.ts > cutoff);
  } catch {
    return [];
  }
};

export const appendEvent = (userId: string, event: TelemetryEvent) => {
  const events = listEvents(userId);
  events.push(event);

  // Enforce max length
  const limitedEvents = events.slice(-MAX_EVENTS);
  localStorage.setItem(getEventKey(userId), JSON.stringify(limitedEvents));
};

export const clearEvents = (userId: string) => {
  localStorage.removeItem(getEventKey(userId));
};

export const exportEvents = (userId: string): string => {
  const events = listEvents(userId);
  return JSON.stringify({ userId, events, exportedAt: Date.now() }, null, 2);
};

export const importEvents = (userId: string, json: string): boolean => {
  try {
    const data = JSON.parse(json);
    if (!data.events || !Array.isArray(data.events)) return false;
    
    // Minimal validation
    const validEvents = data.events.filter((e: any) => 
      e.eventId && e.ts && e.type && e.uiId
    );

    const existing = listEvents(userId);
    const combined = [...existing, ...validEvents]
      .sort((a, b) => a.ts - b.ts)
      .slice(-MAX_EVENTS);

    localStorage.setItem(getEventKey(userId), JSON.stringify(combined));
    return true;
  } catch {
    return false;
  }
};
