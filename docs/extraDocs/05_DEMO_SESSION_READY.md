# Adaptive UI Agent (React) — Chunk 5 (Add-on)
## Demo Session Ready: deterministic UI hints + guided demo page

You are working in the SAME existing repo where multiple Chunks(4 md files recently) have already been implemented.
This add-on is specifically to make the live demo **reliable** and **easy to present** on a running website.

IMPORTANT:
- Only change existing Chunk 2/3/4 behavior if it is necessary for the demo reliability.
- Prefer adding new files over refactoring existing code.
- Follow the baseline instructions in GEMINI.md.

---

## Why this add-on exists
For a live demo, we need:
- Hints that **always trigger** for a “novice” scenario (no randomness, no waiting)
- A single page that guides the presenter through the demo steps (buttons that navigate + seed data)
- A quick “reset & replay” capability so the demo never gets stuck

---

## Deliverables (Chunk 5)
### A) Add a dedicated Demo page + route
Add a new route:
- `/adaptive-ui/demo`

This page should include a “Demo Control Panel” that works even if the presenter forgets steps.
It should show:
1) Current settings summary:
   - Adaptive UI: On/Off
   - Selected userId (novice / regular / power)
2) Action buttons:
   - **Reset all Adaptive UI data** (events + dismissed + hint events + ML transitions if exist)
   - **Seed novice scenario** (deterministic)
   - **Seed power-user scenario** (deterministic)
   - **Go to Tasks page**
   - **Go to Adaptive UI Insights**
3) “Presenter script” (a visible checklist):
   - Step 1: Choose novice → Seed novice
   - Step 2: Navigate to Tasks → observe highlight/tooltip
   - Step 3: Click the highlighted element (e.g., Add Task)
   - Step 4: Go to Insights → show ‘why’ & event logs
   - Step 5: Switch to power → seed power → see fewer/different hints
   - Step 6 (optional): toggle Adaptive UI off/on to show immediate effect

Make the UI projector-friendly:
- Big buttons, minimal clutter, clear headings, short text.

---

### B) Ensure deterministic hint triggers (most important)
Review the current rules (from Chunk 2) and the overlay runtime (from Chunk 3).
Guarantee that after “Seed novice scenario”, at least **two** hints will reliably appear without requiring real user behavior.

Required “demo-safe” hints (choose real targets that exist in the app):
1) **Tasks Add hint**:
   - If the user has visited Tasks but has **0 clicks** on the Add button → highlight/tooltip Add button.
2) **Insights hint**:
   - If the user never opened `/adaptive-ui/insights` → highlight the Insights link/button from `/adaptive-ui` page or nav.

Optional third hint if your app supports it:
3) **Complete task hint**:
   - If user added tasks but never toggled done → tooltip on toggle.

Implementation notes:
- Keep rule thresholds low (e.g., visits>=1) so the demo triggers immediately.
- Ensure these hints are explainable with “why” in Insights.

---

### C) Make seeding align with real `data-uiid` instrumentation
For the two required hints above, ensure there are stable `data-uiid` values for:
- A nav link or button that goes to Tasks (e.g., `nav.tasks`)
- The “Add task” button (e.g., `tasks.addButton`)
- A way to open Adaptive UI Insights (e.g., `nav.adaptiveUiInsights` or a button on /adaptive-ui)

If the `data-uiid` values differ from these examples, update:
- rules to match the actual ids, OR
- the ids in the UI elements
Choose the minimum-risk approach: prefer updating rules to match existing ids unless ids are missing.

---

### D) Add “Reset All” and “Export All” in one place
On `/adaptive-ui/demo`, add:
- “Reset all data” (must clear all relevant localStorage keys used by adaptive-ui)
- “Export all data” (single JSON that includes events, dismissed, hint events, and transitions if exist)
- “Import all data” (optional but nice; validate and merge/replace safely)

If Chunk 4 already adds Export/Import, you can reuse it; otherwise implement minimal versions here.

---

### E) Quick navigation helpers (for presenter speed)
Implement small helper actions:
- “Open Tasks” button navigates directly to the primary Tasks experience page in the app.
- “Open Insights” navigates to `/adaptive-ui/insights`.
- “Open Adaptive UI Home” navigates to `/adaptive-ui`.

Use React Router navigation (no full page reload).

---

### F) Tests (minimum 1, keep it deterministic)
Add at least ONE test to ensure demo reliability:
- Given seeded novice data + the current rule evaluation, the “Tasks Add hint” is returned.

This can be a pure unit test:
- Seed events in memory (or via the store abstraction)
- Build model
- Evaluate rules
- Assert hint list contains target hintId and targetUiId

---

## Suggested file additions (keep changes localized)
Create:
src/features/adaptive-ui/pages/AdaptiveUiDemoPage.tsx
src/features/adaptive-ui/demo/seedScenarios.ts
src/features/adaptive-ui/demo/resetAll.ts
src/features/adaptive-ui/demo/exportAll.ts

And update routing to include `/adaptive-ui/demo`.

---

## Process you must follow
1) Inspect existing adaptive-ui implementation (chunks 1–3) and current app routes.
2) Print a short plan (5–10 bullets).
3) Implement Demo page + deterministic seeding + reset/export.
4) Ensure at least two hints reliably show for novice seed.
5) Add test(s).
6) Run:
   - !npm test
   - !npm run lint
   - !npm run build
7) Summarize changes and list key files.

Proceed without asking for approval.
