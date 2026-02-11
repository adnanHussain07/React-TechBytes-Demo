import React, { useState } from 'react';

const MentalModel: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>React Mental Model (UI = f(state))</h2>
      <p>
        In React, your User Interface (UI) is a direct function of your application&apos;s state.
        When the state changes, React re-renders the UI to reflect that new state.
      </p>
      <p>
        This means: <code>UI = f(State)</code>
      </p>

      <h3>Interactive Demo: Counter</h3>
      <p>Watch how the UI below updates as you change the &apos;count&apos; state:</p>
      <div
        style={{
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          display: 'inline-block',
        }}
      >
        <p>
          Current Count: <strong>{count}</strong>
        </p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)} style={{ marginLeft: '10px' }}>
          Decrement
        </button>
        <button onClick={() => setCount(0)} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      </div>

      <h4 style={{ marginTop: '30px' }}>Explanation:</h4>
      <p>
        Here, the number displayed (the UI) is directly determined by the <code>count</code>{' '}
        variable (the state). When you click &quot;Increment&quot;, &quot;Decrement&quot;, or
        &quot;Reset&quot;, the <code>setCount</code> function updates the <code>count</code> state.
        React detects this state change and efficiently re-renders only the necessary parts of the
        component to show the new count, demonstrating the <code>UI = f(State)</code> principle.
      </p>
    </div>
  );
};

export default MentalModel;
