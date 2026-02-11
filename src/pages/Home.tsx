import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h2>Home - React City Map</h2>
      <p>
        Welcome to the Modern React Techbytes Demo! Explore the core concepts of modern React
        development:
      </p>

      <ul>
        <li>
          <Link to="/mental-model">React Mental Model</Link>: Understand how UI is a function of
          state.
        </li>
        <li>
          <Link to="/composition">Components & Composition</Link>: Learn about props, children, and
          building reusable components.
        </li>
        <li>
          <Link to="/state-hooks">State & Hooks</Link>: Dive into `useState`, custom hooks, and the
          reducer pattern.
        </li>
        <li>
          <Link to="/async-ux">Async UI/UX</Link>: See loading, error, retry states, and optimistic
          updates in action.
        </li>
        <li>
          <Link to="/workflow">Project Workflow</Link>: Explore project structure, tooling
          (lint/format/test/CI).
        </li>
        <li>
          <Link to="/performance">Performance</Link>: Get insights into render awareness and
          practical performance tips.
        </li>
      </ul>
    </div>
  );
};

export default Home;
