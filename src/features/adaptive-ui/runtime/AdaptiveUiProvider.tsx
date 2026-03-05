import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AdaptiveUiSettings, TelemetryEvent } from '../types';
import { getSettings, listEvents, getUserId } from '../storage/eventStore';
import { listDismissed, dismissHint as storeDismissHint } from '../storage/dismissedStore';
import { appendHintEvent } from '../storage/evaluationStore';
import { updateTransitionModel } from '../ml/transitionModel';
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
  
  const lastShownHints = useRef<Set<string>>(new Set());

  const loadData = useCallback(() => {
    const currentUserId = getUserId();
    const currentSettings = getSettings();
    setUserId(currentUserId);
    setSettings(currentSettings);
    const evts = listEvents(currentUserId);
    setEvents(evts);
    setDismissed(listDismissed(currentUserId));
    
    // Update ML model on data load
    if (evts.length > 0) {
      updateTransitionModel(currentUserId, evts);
    }
  }, []);

  const recomputeHints = useCallback(() => {
    if (!settings.enabled || (settings.abVariant === 'B')) {
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
    
    // Log "shown" events for new hints
    hints.forEach(hint => {
      if (!lastShownHints.current.has(hint.hintId)) {
        appendHintEvent(userId, {
          hintId: hint.hintId,
          ts: Date.now(),
          type: 'shown',
          targetUiId: hint.targetUiId,
          userId
        });
        lastShownHints.current.add(hint.hintId);
      }
    });

    setActiveHints(hints);
  }, [location.pathname, events, settings, dismissed, userId]);

  useEffect(() => {
    loadData();
    const handleRefresh = () => loadData();
    
    // Listen for manual refreshes and automated telemetry appends
    window.addEventListener('adaptive-ui-refresh', handleRefresh);
    window.addEventListener('adaptive-ui-event-appended', handleRefresh);
    
    // Global click listener for "accepted" detection
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const uiId = target.closest('[data-uiid]')?.getAttribute('data-uiid');
      
      if (uiId) {
        // Find if this UI ID was a target of an active hint
        const acceptedHint = activeHints.find(h => h.targetUiId === uiId);
        if (acceptedHint) {
          appendHintEvent(userId, {
            hintId: acceptedHint.hintId,
            ts: Date.now(),
            type: 'accepted',
            targetUiId: uiId,
            userId
          });
        }
      }
    };
    
    document.addEventListener('click', handleGlobalClick, true);

    return () => {
      window.removeEventListener('adaptive-ui-refresh', handleRefresh);
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, [loadData, activeHints, userId]);

  useEffect(() => {
    const timer = setTimeout(recomputeHints, 300);
    return () => clearTimeout(timer);
  }, [recomputeHints]);

  const dismissHint = useCallback((hintId: string) => {
    const hint = activeHints.find(h => h.hintId === hintId);
    storeDismissHint(userId, hintId);
    setDismissed(listDismissed(userId));
    setActiveHints(prev => prev.filter(h => h.hintId !== hintId));
    
    if (hint) {
      appendHintEvent(userId, {
        hintId,
        ts: Date.now(),
        type: 'dismissed',
        targetUiId: hint.targetUiId,
        userId
      });
    }
  }, [userId, activeHints]);

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
