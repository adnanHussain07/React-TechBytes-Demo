import React from 'react';

const Workflow: React.FC = () => {
  return (
    <div>
      <h2>Project Structure + Tooling Workflow</h2>
      <p>
        A well-defined project structure and robust tooling are crucial for maintaining code
        quality, consistency, and efficient development in a modern React application.
      </p>

      <h3>Project Structure (Feature-First)</h3>
      <p>
        This project uses a &quot;feature-first&quot; directory structure, which organizes code by
        domain or feature rather than by type (e.g., all components in one folder, all hooks in
        another).
      </p>
      <pre>
        <code>
          src/
          <br />
          &nbsp;&nbsp;app/ # App shell, router, global providers
          <br />
          &nbsp;&nbsp;features/
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;tasks/ # Code related to the &apos;tasks&apos; feature
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;api/ # MSW handlers + query functions
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;components/ # TaskList, TaskItem, TaskForm
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hooks/ # useTasks, useNetworkSim
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;types.ts
          <br />
          &nbsp;&nbsp;shared/
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;ui/ # Reusable UI bits (Button/Input/Card etc.)
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;lib/ # Utilities (e.g., date formatters)
          <br />
          &nbsp;&nbsp;pages/ # Route components (e.g., Home, AsyncUX)
          <br />
        </code>
      </pre>
      <p>
        <strong>Benefits:</strong> Improves discoverability, reduces coupling between unrelated
        parts of the application, and makes it easier to understand and maintain features.
      </p>

      <h3>Tooling Workflow</h3>

      <h4>Linting (ESLint)</h4>
      <p>
        ESLint is used to identify and report on patterns found in JavaScript/TypeScript code, with
        the goal of making code more consistent and avoiding bugs.
      </p>
      <ul>
        <li>
          <code>npm run lint</code>: Runs ESLint checks.
        </li>
        <li>(Link to ESLint config)</li>
      </ul>

      <h4>Formatting (Prettier)</h4>
      <p>
        Prettier is an opinionated code formatter that ensures a consistent style across your entire
        codebase, eliminating bikeshedding over code style.
      </p>
      <ul>
        <li>
          <code>npm run format</code>: Formats code using Prettier.
        </li>
        <li>(Link to Prettier config)</li>
      </ul>

      <h4>Testing (Vitest + React Testing Library)</h4>
      <p>
        Unit and component tests ensure individual pieces of the UI and logic work as expected.
        Vitest is a fast test runner, and React Testing Library focuses on testing user behavior.
      </p>
      <ul>
        <li>
          <code>npm run test</code>: Runs all tests.
        </li>
        <li>(Link to Test setup and examples)</li>
      </ul>

      <h4>Continuous Integration (GitHub Actions)</h4>
      <p>
        A CI workflow automates the process of building, testing, and linting the application on
        every push or pull request, catching issues early.
      </p>
      <ul>
        <li>
          Workflow: <code>.github/workflows/ci.yml</code>
        </li>
        <li>(Link to CI workflow file)</li>
      </ul>
    </div>
  );
};

export default Workflow;
