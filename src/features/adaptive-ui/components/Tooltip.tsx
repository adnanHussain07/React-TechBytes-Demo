import React, { useEffect, useRef } from 'react';

interface TooltipProps {
  message: string;
  targetRect: DOMRect;
  onDismiss: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({ message, targetRect, onDismiss }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDismiss]);

  // Position tooltip above target by default
  const top = targetRect.top + window.scrollY - 40;
  const left = targetRect.left + window.scrollX + targetRect.width / 2;

  return (
    <div
      ref={tooltipRef}
      role="tooltip"
      className="fixed z-50 bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm shadow-lg pointer-events-auto flex items-center gap-2 max-w-xs animate-in fade-in zoom-in duration-200"
      style={{
        top: `${top}px`,
        left: `${left}px`,
        transform: 'translateX(-50%)',
      }}
    >
      <p>{message}</p>
      <button 
        onClick={onDismiss}
        className="ml-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded px-1 transition-colors"
        aria-label="Dismiss"
      >
        ×
      </button>
      {/* Arrow */}
      <div 
        className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rotate-45"
      />
    </div>
  );
};

export default Tooltip;
