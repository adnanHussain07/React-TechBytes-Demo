import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { AdaptiveUiSettings, TelemetryEvent } from '../types';
import { getSettings, listEvents, getUserId } from '../storage/eventStore';
import { listDismissed, dismissHint as storeDismissHint } from '../storage/dismissedStore';
import { buildUserModel } from '../analytics/buildUserModel';
import { evaluateRules } from '../rules/evaluateRules';
import { Hint } from '../rules/ruleTypes';

interface AdaptiveUiContextType {
  activeHints: Hint[];
  settings: AdaptiveUiSettings;
  dismissHint: (hintId: string) => void;
  refresh: () => void;
}

const AdaptiveUiContext = createContext<AdaptiveUiContextType | undefined>(undefined);

export const AdaptiveUiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [userId, setUserId] = useState(getUserId());
  const [settings, setSettings] = useState<AdaptiveUiSettings>(getSettings());
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [dismissed, setDismissed] = useState<Record<string, number>>({});
  const [activeHints, setActiveHints] = useState<Hint[]>([]);

  const loadData = useCallback(() => {
    const currentUserId = getUserId();
    const currentSettings = getSettings();
    setUserId(currentUserId);
    setSettings(currentSettings);
    setEvents(listEvents(currentUserId));
    setDismissed(listDismissed(currentUserId));
  }, []);

  const recomputeHints = useCallback(() => {
    if (!settings.enabled) {
      setActiveHints([]);
      return;
    }

    const model = buildUserModel(events);
    const hints = evaluateRules({
      routePath: location.pathname,
      model,
      nowTs: Date.now(),
      settings,
      dismissedHints: dismissed,
    });
    setActiveHints(hints);
  }, [location.pathname, events, settings, dismissed]);

  useEffect(() => {
    loadData();
    // Also listen for potential storage changes or custom events if needed
    const handleRefresh = () => loadData();
    window.addEventListener('adaptive-ui-refresh', handleRefresh);
    return () => window.removeEventListener('adaptive-ui-refresh', handleRefresh);
  }, [loadData]);

  useEffect(() => {
    // Debounce recomputation slightly if many events fire
    const timer = setTimeout(recomputeHints, 300);
    return () => clearTimeout(timer);
  }, [recomputeHints]);

  // Handle dismissal
  const dismissHint = useCallback((hintId: string) => {
    storeDismissHint(userId, hintId);
    setDismissed(listDismissed(userId));
    // Immediately remove from active hints for better UX
    setActiveHints(prev => prev.filter(h => h.hintId !== hintId));
  }, [userId]);

  const value = useMemo(() => ({
    activeHints,
    settings,
    dismissHint,
    refresh: loadData,
  }), [activeHints, settings, dismissHint, loadData]);

  return (
    <AdaptiveUiContext.Provider value={value}>
      {children}
    </AdaptiveUiContext.Provider>
  );
};

export const useAdaptiveHints = () => {
  const context = useContext(AdaptiveUiContext);
  if (context === undefined) {
    throw new Error('useAdaptiveHints must be used within an AdaptiveUiProvider');
  }
  return context;
};
