import React, { useEffect, ComponentType } from 'react';

/**
 * Higher-Order Component (HOC) that logs lifecycle events.
 * Demonstrates the HOF pattern in React context.
 * 
 * @param WrappedComponent The component to wrap
 * @param componentName The name to identify logs
 * @returns Enhanced component with logging capabilities
 */
export function withLogger<P extends object>(
    WrappedComponent: ComponentType<P>,
    componentName: string = 'Component'
) {
    // The returned functional component
    const WithLogger: React.FC<P> = (props) => {

        useEffect(() => {
            console.log(`[HOC Logger] ${componentName} mounted.`);
            return () => {
                console.log(`[HOC Logger] ${componentName} unmounted.`);
            };
        }, []);

        useEffect(() => {
            console.log(`[HOC Logger] ${componentName} updated with props:`, props);
        });

        // We can inject extra props here
        const enhancedProps = {
            ...props,
            _hocMeta: {
                enabled: true,
                source: 'withLogger',
                timestamp: Date.now()
            }
        };

        return <WrappedComponent {...enhancedProps as P} />;
    };

    WithLogger.displayName = `WithLogger(${componentName})`;
    return WithLogger;
}
