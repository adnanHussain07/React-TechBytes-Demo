# Modern React Techbytes Demo

This repository contains a modern React + TypeScript demo application designed to showcase core concepts, patterns, and development workflows for a presentation.

## Features:

- **React + TypeScript**: Built with a strong emphasis on type safety and modern React practices.
- **Feature-First Structure**: Codebase organized by domain (`src/features/*`) for better maintainability.
- **React Router**: For client-side routing across different presentation sections.
- **MSW (Mock Service Worker)**: Simulates a backend API for async operations, including a network simulator with configurable latency and failure rates.
- **TanStack Query**: Manages server state, caching, and optimistic UI updates for task management.
- **Comprehensive UX**: Demonstrates loading skeletons, error states with retry, and empty states.
- **Testing**: Unit and component tests using Vitest and React Testing Library.
- **Linting & Formatting**: ESLint and Prettier configured for code quality and consistency.
- **CI Workflow**: GitHub Actions to automate linting, testing, and building.

## Development Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/modern-react-techbytes-demo.git
    cd modern-react-techbytes-demo
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`. MSW will automatically intercept API requests in development.

## Available Scripts

- `npm run dev`: Starts the development server with Vite.
- `npm run build`: Builds the application for production.
- `npm run preview`: Serves the production build locally.
- `npm run test`: Runs unit and component tests with Vitest.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run format`: Formats code using Prettier.
- `npm run type-check`: Runs TypeScript compiler to check types.

## Presentation Sections & Demonstrations

This application is structured around six core concepts, each with its own interactive page:

- **Home (`/`)**: A "React City Map" linking to all major sections with brief descriptions.
- **React Mental Model (`/mental-model`)**: Explains "UI = f(state)" with a simple interactive counter.
- **Components & Composition (`/composition`)**: Demonstrates `props`, `children`, and building reusable UI components (e.g., `Card`, `Button`).
- **State & Hooks (`/state-hooks`)**: Examples of `useState`, custom hooks (`useToggle`), and the `useReducer` pattern for complex state logic.
- **Async UI/UX (`/async-ux`)**: Showcases loading, error, retry states, and optimistic updates for a task management feature, powered by MSW and TanStack Query. Includes a network simulator to control latency and failure rates.
- **Project Workflow (`/workflow`)**: Details the feature-first project structure, and the tooling workflow covering linting, formatting, testing, and Continuous Integration.
- **Performance (`/performance`)**: Discusses render awareness, `React.memo`, `useCallback`, `useMemo`, and practical tips for optimizing React application performance.
