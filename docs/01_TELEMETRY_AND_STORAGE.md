# Adaptive UI Agent (React) — Chunk 1/4
## MISSION: Capture interactions + store event logs + basic insights UI

You are Gemini CLI agent working inside an EXISTING React + TS repo.
This repo was previously created for a modern React demo (feature-first structure like src/app, src/features, src/pages, etc.).
DO NOT scaffold a new project. Do not rename the repo. Avoid destructive actions.

Your goal for this chunk:
- Implement interaction capture (click + hover) using event delegation
- Store events locally (no backend) with size limits + export/import
- Add a minimal "Adaptive UI" section in the app with a simple Insights page that shows raw/aggregated counts

---

## Deliverables (Chunk 1)
### A) Telemetry capture
Capture these events:
- click
- hover (use pointerenter with throttle/debounce to avoid noise)

For each event, store:
- eventId (uuid-like string is fine)
- ts (epoch ms)
- type: "click" | "hover"
- routePath (from React Router location.pathname)
- uiId (string) — derived from closest ancestor with [data-uiid]
- tag (HTMLElement tagName)
- text (trimmed innerText up to 60 chars; optional)
- meta: { key?: string, x?: number, y?: number } (optional; keep minimal)

IMPORTANT:
- Use event delegation at the document level (one listener), not per-element handlers.
- Only record events when uiId is found (must have [data-uiid]).
- Implement a small throttle for hover so you don't log 1000 events.

### B) Local storage-based event store
Implement an EventStore with:
- appendEvent(userId, event)
- listEvents(userId, { sinceTs?, limit? })
- clearEvents(userId)
- exportEvents(userId) -> JSON string
- importEvents(userId, json) (validate minimal schema; ignore invalid rows)
- enforce limits: keep only last N events (suggest N=2000) per userId, and/or last 14 days

Storage keys:
- "adaptiveUi.userId" (selected user)
- "adaptiveUi.events.v1.<userId>"
- "adaptiveUi.settings.v1" (telemetry on/off, hover capture on/off, sampleMode, etc.)

### C) Minimal Adaptive UI routes
Add these routes (or equivalent):
- /adaptive-ui        (overview + controls)
- /adaptive-ui/insights (shows event counts + recent events table)

Add a link to Adaptive UI in your existing nav/home.

### D) Data-uiid instrumentation
Add [data-uiid] attributes to key interactive elements across the existing demo app:
- main nav links (home + existing routes)
- primary buttons on the Tasks demo (Add task, toggle done, delete, etc.)
- any “Network Simulator” toggles if present

Create a short guideline doc inside the repo:
- docs/adaptive-ui/uiid-guidelines.md
Explain naming style:
- route-scoped IDs like "nav.home", "tasks.addButton", "tasks.item.toggle", etc.

### E) Tests (minimum 2 new tests in this chunk)
Using Vitest + Testing Library (already in repo):
1) Telemetry: when clicking an element with data-uiid, an event is appended with correct uiId and type.
2) EventStore: appends then enforces max length, and export/import works.

---

## Preferred folder structure (add alongside existing features)
Create:
src/features/adaptive-ui/
  types.ts
  telemetry/
    telemetry.ts          # event delegation + normalization
    useTelemetry.ts       # hook to enable/disable capture
  storage/
    eventStore.ts         # localStorage store
  components/
    AdaptiveUiLayout.tsx  # page shell
    TelemetryControls.tsx # enable/disable + hover toggle + clear/export/import
    RecentEventsTable.tsx
  pages/
    AdaptiveUiHomePage.tsx
    AdaptiveUiInsightsPage.tsx

Add small shared helpers only if needed:
src/shared/lib/
src/shared/ui/

---

## Process (do this exactly)
1) Start by reading the repo structure and current routes.
2) Print a short plan (5–10 bullets).
3) Implement deliverables A–D.
4) Add tests E.
5) Run:
   - npm test
   - npm run lint
   - npm run build
6) Summarize what changed and list key files.

Proceed without asking for approval.
