import React, { useState, useCallback, useMemo } from 'react';

// A simple component that re-renders frequently
const BadlyOptimizedChild: React.FC<{ value: number }> = ({ value }) => {
  // console.log('BadlyOptimizedChild rendered', value); // Uncomment to see frequent re-renders
  return <p>Bad Child Value: {value}</p>;
};
BadlyOptimizedChild.displayName = 'BadlyOptimizedChild';

// A memoized component to prevent unnecessary re-renders
const MemoizedChild: React.FC<{ value: number; onClick: () => void }> = React.memo(
  ({ value, onClick }) => {
    // console.log('MemoizedChild rendered', value); // Uncomment to see fewer re-renders
    return (
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          margin: '10px',
          display: 'inline-block',
        }}
      >
        <p>Memoized Child Value: {value}</p>
        <button onClick={onClick}>Increment from Child</button>
      </div>
    );
  }
);
MemoizedChild.displayName = 'MemoizedChild';

const Performance: React.FC = () => {
  const [count, setCount] = useState(0);
  const [anotherCount, setAnotherCount] = useState(0);

  // Without useCallback, this function would be recreated on every render of Performance,
  // causing MemoizedChild to re-render even if its value prop hasn't changed.
  const handleMemoizedChildClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // Empty dependency array means this function is created once

  // useMemo for a computationally expensive calculation
  const expensiveCalculation = useMemo(() => {
    // console.log('Performing expensive calculation...'); // Uncomment to see when this runs
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += i;
    }
    return sum + count;
  }, [count]); // Recalculates only when 'count' changes

  return (
    <div>
      <h2>Render Awareness + Practical Performance Tips</h2>
      <p>
        Understanding how and when React components re-render is key to optimizing performance.
        Unnecessary re-renders can slow down your application.
      </p>

      <h3>When React Re-renders</h3>
      <ul>
        <li>State changes in the component itself.</li>
        <li>Props change for the component.</li>
        <li>Context values change that the component consumes.</li>
        <li>The parent component re-renders (by default, children re-render too).</li>
      </ul>

      <h3>
        1. <code>React.memo</code>: Memoizing Components
      </h3>
      <p>
        <code>React.memo</code> is a higher-order component that memoizes a functional component. It
        prevents re-renders if its props haven&apos;t changed.
      </p>

      <div style={{ border: '1px solid #eee', padding: '20px', marginBottom: '20px' }}>
        <p>
          Parent Counter (changes frequently): <strong>{anotherCount}</strong>
        </p>
        <button onClick={() => setAnotherCount(anotherCount + 1)}>Increment Parent Counter</button>
        <hr />
        <h4>Child Components:</h4>
        <BadlyOptimizedChild value={count} />
        <MemoizedChild value={count} onClick={handleMemoizedChildClick} />
      </div>
      <p>
        Notice how <code>BadlyOptimizedChild</code> re-renders every time the parent&apos;s{' '}
        <code>anotherCount</code> changes, even though its <code>value</code> prop (
        <code>count</code>) hasn&apos;t changed. <code>MemoizedChild</code>, wrapped in{' '}
        <code>React.memo</code>, only re-renders when its <code>value</code> prop changes or its{' '}
        <code>onClick</code> callback reference changes (which we prevented with{' '}
        <code>useCallback</code>).
      </p>

      <h3>
        2. <code>useCallback</code>: Memoizing Functions
      </h3>
      <p>
        <code>useCallback</code> returns a memoized callback function. This is useful when passing
        callbacks to optimized child components (like <code>React.memo</code>) to prevent them from
        re-rendering unnecessarily due to a new function reference.
      </p>
      <p>
        In the example above, <code>handleMemoizedChildClick</code> is wrapped in{' '}
        <code>useCallback</code> to ensure <code>MemoizedChild</code> doesn&apos;t re-render when
        the <code>Performance</code> component re-renders due to <code>anotherCount</code> changing.
      </p>

      <h3>
        3. <code>useMemo</code>: Memoizing Values
      </h3>
      <p>
        <code>useMemo</code> returns a memoized value. It only recomputes the memoized value when
        one of its dependencies has changed. This is useful for expensive calculations.
      </p>
      <div style={{ border: '1px solid #eee', padding: '20px', marginBottom: '20px' }}>
        <p>
          Count for expensive calculation: <strong>{count}</strong>
        </p>
        <button onClick={() => setCount(count + 1)}>Change Count</button>
        <p>
          Result of expensive calculation (only re-runs when count changes):{' '}
          <strong>{expensiveCalculation}</strong>
        </p>
        <p>
          Parent state (will trigger parent re-render): <strong>{anotherCount}</strong>
        </p>
        <button onClick={() => setAnotherCount(anotherCount + 1)}>
          Change Parent State (No Recalc of expensive part)
        </button>
      </div>

      <h3>General Performance Tips</h3>
      <ul>
        <li>
          <strong>Measure First:</strong> Don&apos;t optimize prematurely. Use React DevTools
          Profiler to identify bottlenecks.
        </li>
        <li>
          <strong>Key Prop:</strong> Always provide a stable and unique <code>key</code> prop for
          list items.
        </li>
        <li>
          <strong>Virtualization:</strong> For very long lists, use windowing/virtualization
          libraries (e.g., <code>react-window</code>, <code>react-virtualized</code>).
        </li>
        <li>
          <strong>Debounce/Throttle:</strong> For frequently firing events (e.g., input changes,
          scroll events).
        </li>
        <li>
          <strong>Lazy Loading:</strong> Code splitting with <code>React.lazy</code> and{' '}
          <code>Suspense</code> to load components only when needed.
        </li>
      </ul>
    </div>
  );
};

export default Performance;
