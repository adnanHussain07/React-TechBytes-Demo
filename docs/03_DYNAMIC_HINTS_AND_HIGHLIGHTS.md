# Adaptive UI Agent (React) — Chunk 3/4
## Week 4–5: Implement dynamic UI highlighting + hint UI + sample-user testing mode

You are working in the SAME repo after Chunk 2.
Goal:
- Actually render hints/highlights in the app (not just in Insights)
- Create a reusable Hint system (provider + overlay)
- Add a “sample users” mode to test behavior easily

---

## Deliverables (Chunk 3)
### A) Adaptive UI Provider (runtime)
Create:
src/features/adaptive-ui/runtime/
  AdaptiveUiProvider.tsx
  useAdaptiveHints.ts
  hintRuntime.ts

Behavior:
- Provider loads:
  - events (store)
  - model (analytics)
  - rules output (evaluateRules)
- Recompute hints:
  - on route change
  - after a new click event
  - at most once per 500ms (debounce)

Expose:
- activeHints: Hint[]
- dismissHint(hintId)
- settings (enable/disable adaptive UI)

### B) Highlight + Tooltip UI
Create components:
src/features/adaptive-ui/components/
  HintOverlay.tsx
  HighlightTarget.ts (optional helper)
  Tooltip.tsx (simple, accessible)
  PulseRing.css (or Tailwind utility classes)

Implementation guidance:
- Targets are located by querySelector(`[data-uiid="${targetUiId}"]`)
- For "highlight": apply a temporary CSS class to the target (outline + subtle pulse)
- For "tooltip": render a positioned tooltip near the target (use getBoundingClientRect)
- Accessibility:
  - tooltips should have role="tooltip"
  - highlight should not trap focus
  - allow keyboard dismissal (Esc) when tooltip is open
- Safety:
  - if target not found, skip hint
  - never crash if DOM changes

### C) Wire into existing pages
Add a small toggle in the app shell:
- “Adaptive UI: On/Off”
- “Reset data” (clears events + dismissed)

When Adaptive UI is ON:
- highlight/tooltip is shown based on activeHints for the current route

### D) Sample users mode
Add a selector somewhere (Adaptive UI home page is fine):
- userId: "novice" | "regular" | "power"
Switching userId changes which event log is used.
Add buttons:
- “Seed novice data”
- “Seed power-user data”
Seeding writes a small set of events to the store so rules trigger immediately for demo.

### E) Tests (minimum 2 new tests in this chunk)
1) HintOverlay applies highlight class to a target element with matching data-uiid.
2) DismissHint prevents hint from showing again (unit test using dismissed store).

---

## Process
1) Print plan.
2) Implement provider + overlay + wiring + sample user seeding.
3) Add tests.
4) Run npm test, npm run lint, npm run build.
5) Summarize key files and how to demo quickly.
Proceed without asking for approval.
