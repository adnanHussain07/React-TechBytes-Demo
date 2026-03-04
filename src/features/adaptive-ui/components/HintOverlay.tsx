import React, { useEffect, useState } from 'react';
import { useAdaptiveHints } from '../runtime/AdaptiveUiProvider';
import Tooltip from './Tooltip';
import './PulseRing.css';

const HintOverlay: React.FC = () => {
  const { activeHints, dismissHint, settings } = useAdaptiveHints();
  const [targetRects, setTargetRects] = useState<Record<string, DOMRect>>({});

  useEffect(() => {
    if (!settings.enabled) return;

    // Periodically sync target positions to handle scroll/resize
    const updatePositions = () => {
      const newRects: Record<string, DOMRect> = {};
      
      activeHints.forEach(hint => {
        const element = document.querySelector(`[data-uiid="${hint.targetUiId}"]`);
        if (element) {
          newRects[hint.hintId] = element.getBoundingClientRect();
          
          // Apply highlight class
          if (hint.kind === 'highlight') {
            element.classList.add('adaptive-highlight', 'adaptive-pulse');
          }
        }
      });
      
      setTargetRects(newRects);
    };

    updatePositions();
    const interval = setInterval(updatePositions, 1000);
    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions, true);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions, true);
      
      // Cleanup classes
      activeHints.forEach(hint => {
        const element = document.querySelector(`[data-uiid="${hint.targetUiId}"]`);
        if (element) {
          element.classList.remove('adaptive-highlight', 'adaptive-pulse');
        }
      });
    };
  }, [activeHints, settings.enabled]);

  if (!settings.enabled) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-0 pointer-events-none overflow-visible">
      {activeHints.map(hint => {
        const rect = targetRects[hint.hintId];
        if (!rect || hint.kind !== 'tooltip') return null;

        return (
          <Tooltip 
            key={hint.hintId}
            message={hint.message}
            targetRect={rect}
            onDismiss={() => dismissHint(hint.hintId)}
          />
        );
      })}
    </div>
  );
};

export default HintOverlay;
