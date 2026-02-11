/* eslint-disable react/no-unescaped-entities */
import React, { useState, useReducer, useCallback } from 'react';

// --- Custom Hook Example: useToggle ---
const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);
  return [value, toggle] as const;
};

// --- Reducer Pattern Example: Complex Counter ---
type CounterState = {
  count: number;
};

type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; payload: number };

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    case 'set':
      return { count: action.payload };
    default:
      return state;
  }
};

const StateHooks: React.FC = () => {
  // useState example
  const [simpleCount, setSimpleCount] = useState(0);

  // useToggle custom hook example
  const [isVisible, toggleVisibility] = useToggle(true);

  // useReducer example
  const [complexCounterState, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <h2>State Placement + Hooks</h2>
      <p>
        React Hooks allow you to use state and other React features without writing a class. This
        page demonstrates various state management patterns using hooks.
      </p>

      <h3>
        1. <code>useState</code>: Simple Local State
      </h3>
      <p>The most basic hook for adding state to functional components.</p>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <p>
          Simple Count: <strong>{simpleCount}</strong>
        </p>
        <button onClick={() => setSimpleCount(simpleCount + 1)}>Increment</button>
        <button onClick={() => setSimpleCount(simpleCount - 1)} style={{ marginLeft: '10px' }}>
          Decrement
        </button>
        <button onClick={() => setSimpleCount(0)} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      </div>

      <h3>
        2. Custom Hook: <code>useToggle</code>
      </h3>
      <p>
        Custom Hooks allow you to extract component logic into reusable functions. Here's a{' '}
        <code>useToggle</code> hook.
      </p>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <p>Content is {isVisible ? 'Visible' : 'Hidden'}</p>
        <button onClick={toggleVisibility}>Toggle Visibility</button>
        {isVisible && <p>This content can be toggled!</p>}
      </div>

      <h3>
        3. <code>useReducer</code>: For Complex State Logic
      </h3>
      <p>
        <code>useReducer</code> is an alternative to <code>useState</code> for more complex state
        logic, often when the next state depends on the previous one or when the state involves
        multiple sub-values. It&apos;s also great for centralizing state logic.
      </p>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <p>
          Complex Count: <strong>{complexCounterState.count}</strong>
        </p>
        <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
        <button onClick={() => dispatch({ type: 'decrement' })} style={{ marginLeft: '10px' }}>
          Decrement
        </button>
        <button onClick={() => dispatch({ type: 'reset' })} style={{ marginLeft: '10px' }}>
          Reset
        </button>
        <button
          onClick={() => dispatch({ type: 'set', payload: 100 })}
          style={{ marginLeft: '10px' }}
        >
          Set to 100
        </button>
      </div>
    </div>
  );
};

export default StateHooks;
