# MISSION: Modern React Presentation Demo Generator
**Role:** You are a Senior React Architect.
**Objective:** Scaffolding a Vite + React application that demonstrates "Legacy vs. Modern" patterns for a live presentation.
**Stack:** Vite, React 18+, Tailwind CSS (for quick styling).

---

## STEP 1: ARCHITECTURE SETUP
Create the following folder structure inside `src/`:
- `src/components/legacy` (For the "Bad" pattern)
- `src/components/modern` (For the "Good" pattern)
- `src/hooks` (For Custom Hooks)
- `src/context` (For Global State)
- `src/styles` (For specific component styles if needed)

---

## STEP 2: Idea of the Demo
1. Add new tabs like existing, these tabs will be used for showing the legacy vs new patterns of React.
2. The tab should be Legacy Class components vs Modern Functional components.
3. The legacy class component should have a massive `state` object containing: `menuItems` (array), `orders` (array), `isLoading` (bool), `theme` (string). Use `componentDidMount` to simulate fetching data (use `setTimeout`), Implement a `render()` method that returns a messy div structure
4. Modern examples should be using functional components and hooks in a latest modern clean way.

---

## STEP 3: CREATE THE "LEGACY" (BAD) CODE
**File:** `src/components/legacy/KitchenManagerLegacy.jsx`
**Instructions:**
Create a React **Class Component** named `KitchenManagerLegacy`.
- It must have a massive `state` object containing: `menuItems` (array), `orders` (array), `isLoading` (bool), `theme` (string).
- Use `componentDidMount` to simulate fetching data (use `setTimeout`).
- Implement a `render()` method that returns a messy div structure.
- **Goal:** This file should look "heavy" and hard to read to illustrate "Spaghetti Code."

---

## STEP 4: CREATE MODERN PATTERNS (THE REFACTOR)

### A. The Custom Hook
**File:** `src/hooks/useMenu.js`
**Instructions:**
Create a custom hook `useMenu` that:
1. Uses `useState` for menu items and loading state.
2. Uses `useEffect` to simulate fetching data (mock delay).
3. Returns `{ menuItems, isLoading }`.
**Comment:** Add a JSDoc comment explaining that this isolates the "Data Fetching Logic."

### B. The Context (Global State)
**File:** `src/context/OrderContext.jsx`
**Instructions:**
Create a Context named `OrderContext`.
- Create a provider `OrderProvider` that holds the `orders` state.
- Export a custom hook `useOrder()` to consume the context easily.
- **Goal:** Show how we avoid "Prop Drilling."

### C. The Modern Component
**File:** `src/components/modern/KitchenManagerModern.jsx`
**Instructions:**
Create a Functional Component.
- Import `useMenu` to get data.
- Import `useOrder` to handle order dispatching.
- Return a clean JSX structure using Tailwind classes for layout (Grid/Flex).
- **Goal:** This file should be short, readable, and focused *only* on UI, not logic.

---

## STEP 5: THE MAIN ENTRY POINT
**File:** `src/App.jsx`
**Instructions:**
Rewrite `App.jsx` to render a split-screen view:
- **Left Side:** Render `<KitchenManagerLegacy />` with a title "❌ The Old Way".
- **Right Side:** Render `<OrderProvider><KitchenManagerModern /></OrderProvider>` with a title "✅ The Modern Way".
- Add a button at the top to toggle between them if the screen is too small, or keep them side-by-side for desktop.

---

## STEP 6: FINAL VERIFICATION
1. Ensure all imports in `App.jsx` are correct.
2. Create a `README.md` in the root explaining how to run the demo (`npm run dev`).