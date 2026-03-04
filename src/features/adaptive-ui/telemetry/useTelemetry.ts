import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { handleGlobalEvent } from './telemetry';
import { getSettings } from '../storage/eventStore';

export const useTelemetry = () => {
  const location = useLocation();

  useEffect(() => {
    const settings = getSettings();
    if (!settings.enabled) return;

    const onEvent = (e: Event) => {
      handleGlobalEvent(e, settings, location.pathname);
    };

    document.addEventListener('click', onEvent, true);
    document.addEventListener('pointerenter', onEvent, true);

    return () => {
      document.removeEventListener('click', onEvent, true);
      document.removeEventListener('pointerenter', onEvent, true);
    };
  }, [location.pathname]);
};
