# Presentation Mapping: Modern React Frontend Demo

This document maps each section of the presentation to the corresponding application route, key files to highlight, and what to demonstrate live during the presentation.

## 1. Introduction & Overview

- **Route**: `/` (Home)
- **Key Files**: `src/App.tsx`, `src/main.tsx` (for `BrowserRouter` and `QueryProvider` setup)
- **What to Show Live**:
  - Briefly show the `Home` page ("React City Map") and explain its purpose.
  - Mention the core technologies (React, TypeScript, Vite, Router, TanStack Query, MSW).
  - Navigate quickly through the main navigation to show all pages exist.

## 2. React Mental Model: UI = f(State)

- **Route**: `/mental-model`
- **Key Files**: `src/pages/MentalModel.tsx`
- **What to Show Live**:
  - Explain the `UI = f(State)` concept.
  - Interact with the counter demo: increment, decrement, reset.
  - Highlight the `useState` hook and how state changes drive UI updates.

## 3. Components & Composition

- **Route**: `/composition`
- **Key Files**: `src/pages/Composition.tsx`, `src/shared/ui/Card.tsx`, `src/shared/ui/Button.tsx`
- **What to Show Live**:
  - Explain props and children using the `Card` component example.
  - Demonstrate how `ProfileCard` composes the `Card` and passes specific data via props.
  - Emphasize building reusable, small components.

## 4. State Management & Hooks

- **Route**: `/state-hooks`
- **Key Files**: `src/pages/StateHooks.tsx`
- **What to Show Live**:
  - Demonstrate `useState` with the simple counter.
  - Show the `useToggle` custom hook and explain its reusability.
  - Explain the `useReducer` pattern with the complex counter, highlighting its benefits for more intricate state logic.

## 5. Asynchronous UI/UX (Loading, Error, Optimistic Updates)

- **Route**: `/async-ux`
- **Key Files**:
  - `src/pages/AsyncUX.tsx`
  - `src/features/tasks/api/index.ts` (API calls)
  - `src/features/tasks/hooks/useTasks.ts` (optimistic updates, `useQuery`, `useMutation`)
  - `src/mocks/handlers.ts` (MSW setup, network simulation)
  - `src/features/tasks/components/NetworkSimulator.tsx`
- **What to Show Live**:
  - Introduce the Task Management feature.
  - Demonstrate adding a task with optimistic UI (it appears instantly).
  - Show toggling/deleting tasks with optimistic updates.
  - Use the Network Simulator:
    - Increase latency: Show loading skeleton/text.
    - Introduce failure rate: Show error message and retry button.
  - Briefly explain how TanStack Query manages server state and caching.

## 6. Project Workflow & Tooling

- **Route**: `/workflow`
- **Key Files**:
  - `src/pages/Workflow.tsx`
  - `.eslintrc.cjs`
  - `.prettierrc.cjs`
  - `vite.config.ts` (Vitest config)
  - `.github/workflows/ci.yml`
- **What to Show Live**:
  - Explain the feature-first project structure using the `/workflow` page.
  - Discuss the importance of ESLint and Prettier for code quality and consistency.
  - Mention Vitest and React Testing Library for testing.
  - Show the `ci.yml` file on GitHub to explain automated checks.

## 7. Performance Optimization

- **Route**: `/performance`
- **Key Files**: `src/pages/Performance.tsx`
- **What to Show Live**:
  - Explain when React re-renders.
  - Demonstrate `React.memo` using the `MemoizedChild` vs. `BadlyOptimizedChild` example (perhaps by showing console logs or a visible render counter).
  - Explain `useCallback` and `useMemo` for optimizing function and value references.
  - Discuss general performance tips (measure first, keys, virtualization, lazy loading).
