import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h2>Home - Reac Modern Flow (Legacy vs Modern)</h2>
      <br />
      <p>
        Welcome to the Modern React Techbytes Demo! Explore the core concepts of modern React
        development:
      </p>
      <br />
      <ul>
        <li>
          <Link to="/mental-model">React Mental Model</Link>: Understand how UI is a function of
          state.
        </li>
        <br />
        <li>
          <Link to="/composition">Components & Composition</Link>: Learn about props, children, and
          building reusable components.
        </li>
        <br />
        <li>
          <Link to="/state-hooks">State & Hooks</Link>: Dive into `useState`, custom hooks, and the
          reducer pattern.
        </li>
        <br />
        <li>
          <Link to="/async-ux">Async UI/UX</Link>: See loading, error, retry states, and optimistic
          updates in action.
        </li>
        <br />
        <li>
          <Link to="/workflow">Project Workflow</Link>: Explore project structure, tooling
          (lint/format/test/CI).
        </li>
        <br />
        <li>
          <Link to="/performance">Performance</Link>: Get insights into render awareness and
          practical performance tips.
        </li>
      </ul>
    </div>
  );
};

export default Home;
