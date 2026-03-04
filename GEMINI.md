# GEMINI.md — Project Context (Modern React Demo App + Adaptive UI Agent)

You are working inside an **existing** React + TypeScript repo (Vite) that is used for:
1) an office demo/presentation of modern React practices, and  
2) a performance objective: **Adaptive UI Agent (React)** — dynamically adjust UI hints/highlights based on user behavior.

This file provides **base instructions** that apply to every Gemini CLI run in this repo.

---

## Priority order (important)
When I provide an additional prompt file (e.g., '01_TELEMETRY_AND_STORAGE.md', '02_ANALYTICS_AND_RULE_ENGINE', `03_*.md`), follow this priority:
1) **The current task prompt file** (chunk)  
2) **This GEMINI.md**  
3) Existing repo conventions and code

If there is a conflict, the **chunk prompt wins**.

---

## Non‑negotiables (do not violate)
- **Work inside the current repo.** Do NOT scaffold a new project. Do NOT rename the repo.
- **Be additive and safe.** Avoid destructive actions (do not delete/replace large folders).
- **Do not break existing demo pages/routes.** Keep the current app working and projector‑friendly.
- **Minimal dependencies.** Prefer existing libraries; add a new dependency only if clearly justified.
- **No backend / no external analytics.** All Adaptive UI telemetry is **local-only** (browser storage). Never send data over the network.
- **Keep changes localized.** Put almost all new work under: `src/features/adaptive-ui/*`
- **Respect TypeScript + lint rules.** New code must pass type-check, lint, tests, and build.

---

## Adaptive UI Agent design principles
### Telemetry (event capture)
- Use **event delegation** (one document-level listener), not per-component handlers.
- Only log events for elements that have a stable identifier: **`[data-uiid]`**.
- Capture at least: `click` and `hover` (throttled/debounced to avoid noise).
- Data minimization: store only what’s needed for heuristics and demo insights.

### Storage
- Use `localStorage` (or an existing local storage abstraction if already present).
- Enforce **limits** (e.g., max events per user, max age in days) so storage doesn’t grow forever.
- Include export/import capabilities for demo and debugging.

### Analytics + rules
- Prefer **explainable heuristics** first (Week 3).
- Rules must be deterministic and debuggable (show “why” in Insights).
- Add a dismissed-hints mechanism with a cooldown (e.g., 7 days).

### Runtime hinting UI
- Hints should never crash the app if a target is missing.
- Use `querySelector([data-uiid="..."])` to locate targets.
- Keep overlays accessible (basic keyboard dismissal, tooltip semantics).

### Optional ML (Week 6)
- If adding “ML”, keep it tiny and explainable:
  - Markov/transition model from click sequences is preferred.
- Do not add heavy ML libraries.

---

## Folder structure expectations
- Prefer **feature-first** structure under `src/features/*`.
- For Adaptive UI, use (or extend) this structure:

`src/features/adaptive-ui/`
- `types.ts`
- `telemetry/` (capture + normalization)
- `storage/` (event store, dismissed store)
- `analytics/` (user model aggregation)
- `rules/` (rule engine, rules catalog)
- `runtime/` (provider/hooks, overlay runtime)
- `components/` (pages + UI)
- `pages/` (route components: default exports allowed)

Keep components small (< ~150 LOC); extract hooks/utilities when needed.

---

## Code style
- React functional components only.
- Prefer `type` for props; use `interface` only when extending.
- Named exports for most modules; **default export only for route/page components**.
- Avoid clever abstractions. Optimize for clarity and demo value.

---

## Testing & quality gates (must pass)
After each chunk:
- Run:
  - `npm test`
  - `npm run lint`
  - `npm run build`
- Add tests for:
  - telemetry/store correctness (unit)
  - rule evaluation (unit)
  - overlay behavior (component)
- Keep tests deterministic (avoid flaky timing; mock timers where needed).

---

## Documentation (demo-ready)
Maintain or add docs under `docs/adaptive-ui/`:
- `architecture.md` (telemetry → storage → model → rules → overlay)
- `rules-catalog.md` (each rule, trigger condition, target, message)
- `demo-script.md` (7–10 min walkthrough)
- `knowledge-sharing-session.md` (30–45 min outline)

Update `README.md` to include:
- where to find Adaptive UI routes
- how to seed sample users (if implemented)
- how to export/import data

---

## Implementation process (how to work each run)
For every prompt execution:
1) **Read the current repo structure first.**
2) Print a short plan (5–10 bullets).
3) Implement changes incrementally.
4) Add/adjust tests.
5) Run the quality gates (test/lint/build).
6) Summarize changes + list key files modified/added.

Proceed confidently; only ask questions if the prompt is genuinely ambiguous and cannot be safely assumed.
