import { TelemetryEvent } from '../types';

export interface UserModel {
  totals: {
    clicks: number;
    hovers: number;
  };
  perUi: Record<string, {
    clicks: number;
    hovers: number;
    lastTs: number;
  }>;
  perRoute: Record<string, {
    visitsApprox: number;
    clicks: number;
    lastTs: number;
  }>;
  sequences: {
    lastUiIds: string[];
  };
  sessionsApprox: number;
}

const SESSION_GAP_MS = 20 * 60 * 1000; // 20 minutes

export const buildUserModel = (events: TelemetryEvent[]): UserModel => {
  const model: UserModel = {
    totals: { clicks: 0, hovers: 0 },
    perUi: {},
    perRoute: {},
    sequences: { lastUiIds: [] },
    sessionsApprox: 0,
  };

  if (events.length === 0) return model;

  const sortedEvents = [...events].sort((a, b) => a.ts - b.ts);
  let lastEventTs = 0;

  sortedEvents.forEach((event, index) => {
    // Session estimation
    if (index === 0 || event.ts - lastEventTs > SESSION_GAP_MS) {
      model.sessionsApprox++;
    }
    lastEventTs = event.ts;

    // Totals
    if (event.type === 'click') model.totals.clicks++;
    if (event.type === 'hover') model.totals.hovers++;

    // Per UI element
    if (!model.perUi[event.uiId]) {
      model.perUi[event.uiId] = { clicks: 0, hovers: 0, lastTs: 0 };
    }
    if (event.type === 'click') model.perUi[event.uiId].clicks++;
    if (event.type === 'hover') model.perUi[event.uiId].hovers++;
    model.perUi[event.uiId].lastTs = event.ts;

    // Per Route
    if (!model.perRoute[event.routePath]) {
      model.perRoute[event.routePath] = { visitsApprox: 0, clicks: 0, lastTs: 0 };
    }
    // Simple visit approximation: if it's the first event on this route or 
    // if the previous event was on a different route
    if (model.perRoute[event.routePath].lastTs === 0 || event.ts - model.perRoute[event.routePath].lastTs > SESSION_GAP_MS) {
       model.perRoute[event.routePath].visitsApprox++;
    }
    if (event.type === 'click') model.perRoute[event.routePath].clicks++;
    model.perRoute[event.routePath].lastTs = event.ts;

    // Sequences (keep last 10)
    model.sequences.lastUiIds.push(event.uiId);
    if (model.sequences.lastUiIds.length > 10) {
      model.sequences.lastUiIds.shift();
    }
  });

  return model;
};
