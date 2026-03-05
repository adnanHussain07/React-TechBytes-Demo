# Modern React Techbytes Demo - Tab Explanations

This document provides a detailed explanation of each tab in the "Modern React Techbytes Demo" application, including the concepts being demonstrated and the implementation details.

---

## 1. Home (`/`)

### Concept

The **Home** tab serves as the main entry point and "React City Map" of the application. It provides a quick overview of the topics covered in the demo and acts as a navigation hub to the different sections.

### Implementation

-   **File:** `src/pages/Home.tsx`
-   **Description:** This is a simple functional component that uses `react-router-dom`'s `Link` component to create navigation links to all other pages. Each link is accompanied by a short description of the concept being demonstrated on that page.

### How it relates to the title

This tab directly reflects the "Home" and "React City Map" concepts by providing a clear and organized way to navigate through the different sections of the presentation, just like a city map helps you find your way around.

---

## 2. Mental Model (`/mental-model`)

### Concept

This tab demonstrates the fundamental concept of React: **UI = f(state)**. It shows that the user interface (UI) is a direct function of the application's state. When the state changes, React automatically re-renders the UI to reflect those changes.

### Implementation

-   **File:** `src/pages/MentalModel.tsx`
-   **Description:** This component uses the `useState` hook to manage a `count` state. The UI displays the current value of `count`, and buttons are provided to increment, decrement, and reset the count. When a button is clicked, the corresponding function updates the `count` state, and React automatically re-renders the component to display the new value.

### How it relates to the title

This interactive demo provides a clear and tangible example of the "UI = f(state)" mental model. Users can directly see how their actions (clicking buttons) change the state, and how the UI immediately reflects that new state, reinforcing the core principle of React.

---

## 3. Composition (`/composition`)

### Concept

This tab illustrates the power of **component composition** in React. Instead of complex inheritance hierarchies, React encourages building complex UIs by composing smaller, reusable components. This is achieved through `props` and `props.children`.

### Implementation

-   **Files:**
    -   `src/pages/Composition.tsx`
    -   `src/shared/ui/Card.tsx`
    -   `src/shared/ui/Button.tsx`
-   **Description:**
    -   **`Card.tsx` and `Button.tsx`**: These are simple, reusable UI components. `Card` accepts a `title` prop and renders its `children`, while `Button` can be customized with a `variant` prop.
    -   **`Composition.tsx`**: This page demonstrates composition in two ways:
        1.  **Props and Children**: It uses the `Card` component multiple times, passing different titles and content (including the `Button` component) as `children`. This shows how a generic `Card` can be used to create different UI elements.
        2.  **Specialized Components**: The `ProfileCard` component is a specialized component that internally uses the `Card` and `Button` components to display a user's profile. This demonstrates how to build more complex components by composing simpler ones.

### How it relates to the title

This tab directly demonstrates the "Components & Composition" concept by providing clear examples of how to build a UI by combining and reusing smaller components. It highlights the flexibility of `props` and `children` in creating a maintainable and scalable component architecture.

---

## 4. State & Hooks (`/state-hooks`)

### Concept

This tab explores different ways to manage state in modern React using **hooks**. It covers `useState` for simple local state, custom hooks for extracting and reusing stateful logic, and `useReducer` for more complex state management scenarios.

### Implementation

-   **File:** `src/pages/StateHooks.tsx`
-   **Description:**
    -   **`useState`**: A simple counter demonstrates how to add local state to a functional component.
    -   **Custom Hook (`useToggle`)**: A custom hook `useToggle` is created to encapsulate the logic for toggling a boolean value. This demonstrates how to extract and reuse stateful logic across different components.
    -   **`useReducer`**: A more complex counter with increment, decrement, reset, and set actions is implemented using the `useReducer` hook. This shows how `useReducer` can be a powerful alternative to `useState` for managing state with more complex transitions.

### How it relates to the title

This tab provides a practical guide to "State & Hooks" by showcasing the three most common state management patterns in modern React. It allows users to see the differences between `useState`, custom hooks, and `useReducer` in action, and understand when to use each one.

---

## 5. Async UX (`/async-ux`)

### Concept

This tab demonstrates how to create a great **asynchronous user experience (Async UX)** in React. It covers handling loading, error, and empty states, as well as implementing optimistic updates for a smoother and more responsive UI.

### Implementation

-   **Files:**
    -   `src/pages/AsyncUX.tsx`
    -   `src/features/tasks/hooks/useTasks.ts`
    -   `src/features/tasks/hooks/useNetworkSim.ts`
    -   `src/mocks/handlers.ts`
-   **Description:**
    -   **`useTasks.ts`**: This custom hook uses `@tanstack/react-query`'s `useQuery` and `useMutation` hooks to manage the state of a task list. It implements optimistic updates for adding, updating, and deleting tasks, making the UI feel instantaneous.
    -   **`AsyncUX.tsx`**: This component uses the `useTasks` hook to display the task list and handles the different states:
        -   **Loading**: Shows a "Loading tasks..." message while data is being fetched.
        -   **Error**: Displays an error message and a "Retry" button when an API call fails.
        -   **Empty**: Shows a "No tasks found" message when the task list is empty.
    -   **`useNetworkSim.ts` and `NetworkSimulator.tsx`**: These allow users to control the simulated network latency and failure rate, making it easy to see the different loading and error states in action.

### How it relates to the title

This tab provides a comprehensive demonstration of "Async UX" by combining several modern React libraries and patterns. It shows how to use `@tanstack/react-query` for server state management, `msw` for API mocking, and custom hooks to create a robust and user-friendly asynchronous experience.

---

## 6. Workflow (`/workflow`)

### Concept

This tab explains the **project structure and tooling workflow** used in the demo application. It highlights the "feature-first" directory structure and the tools used for linting, formatting, testing, and continuous integration (CI).

### Implementation

-   **File:** `src/pages/Workflow.tsx`
-   **Description:** This is a static page that displays the project's directory structure and explains the purpose of each folder. It also lists the available `npm` scripts for running linting, formatting, testing, and building the project, and provides placeholder links to the relevant configuration files.

### How it relates to the title

This tab directly addresses the "Project Workflow" by providing a clear and concise overview of how the project is organized and the tools used to maintain code quality and consistency. It serves as a guide for developers who want to understand the project's architecture and development process.

---

## 7. Performance (`/performance`)

### Concept

This tab focuses on **React performance optimization**. It explains the concept of "render awareness" and demonstrates how to use `React.memo`, `useCallback`, and `useMemo` to prevent unnecessary re-renders and improve application performance.

### Implementation

-   **File:** `src/pages/Performance.tsx`
-   **Description:** This component includes several examples to illustrate performance optimization techniques:
    -   **`React.memo`**: A `MemoizedChild` component is wrapped in `React.memo` to prevent it from re-rendering when its props haven't changed. This is contrasted with a `BadlyOptimizedChild` that re-renders unnecessarily.
    -   **`useCallback`**: The `handleMemoizedChildClick` function is wrapped in `useCallback` to prevent it from being recreated on every render, which would cause `MemoizedChild` to re-render.
    -   **`useMemo`**: An "expensive calculation" is wrapped in `useMemo` to ensure it's only re-computed when its dependencies change.

### How it relates to the title

This tab provides a practical guide to "Performance" in React by demonstrating common optimization techniques. It helps users understand when and why components re-render, and how to use `React.memo`, `useCallback`, and `useMemo` to optimize their applications.

---

## 8. Legacy vs Modern (`/legacy-vs-modern`)

### Concept

This tab provides a side-by-side comparison of **"legacy" React (Class Components) versus "modern" React (Functional Components with Hooks)**. It highlights the benefits of the modern approach in terms of code readability, maintainability, and separation of concerns.

### Implementation

-   **Files:**
    -   `src/pages/LegacyVsModern.tsx`
    -   `src/components/legacy/KitchenManagerLegacy.tsx`
    -   `src/components/modern/KitchenManagerModern.tsx`
    -   `src/hooks/useMenu.ts`
    -   `src/context/OrderContext.tsx`
-   **Description:**
    -   **`KitchenManagerLegacy.tsx`**: A class component that manages a large, monolithic state object and mixes UI logic with data fetching and state management.
    -   **`KitchenManagerModern.tsx`**: A functional component that uses the `useMenu` custom hook for data fetching and the `useOrder` context for order management. The component itself is focused on rendering the UI.
    -   **`LegacyVsModern.tsx`**: This page displays both `KitchenManagerLegacy` and `KitchenManagerModern` side-by-side (or in a toggleable view) to allow for a direct comparison.

### How it relates to the title

This tab directly demonstrates the "Legacy vs Modern" concept by providing a clear and compelling example of the evolution of React development patterns. It visually shows how modern React with hooks and context leads to cleaner, more modular, and more maintainable code.

---

## 🤖 Adaptive UI Agent (`/adaptive-ui`)

### Concept

This project features an experimental **Adaptive UI Agent** that dynamically adjusts hints and highlights based on your interaction patterns.

### Key Features
-   **Privacy-First**: No data is sent to a server. Interaction logs and predictive models stay in your `localStorage`.
-   **Heuristic Engine**: 5+ deterministic rules that suggest features you haven't explored yet.
-   **Predictive ML**: Markov-chain transition matrix that predicts your next likely action based on sequential habits.
-   **Evaluation Loop**: Local tracking of hint acceptance and dismissal rates.

### How to use
1. Navigate to the **Adaptive UI** section in the sidebar.
2. Go to the **Overview** page to select a "Sample User" (Novice/Power) and **Seed Data**.
3. Explore other pages in the app (Async UX, Composition, etc.) to see hints/highlights in action.
4. Visit **Insights** to see your raw interaction logs and rules engine output.
5. Visit **Evaluation** to see performance metrics and toggle A/B variants.

### Documentation
Detailed documentation is available in `docs/adaptive-ui/`:
- `architecture.md`
- `rules-catalog.md`
- `demo-script.md`
- `knowledge-sharing-session.md`
