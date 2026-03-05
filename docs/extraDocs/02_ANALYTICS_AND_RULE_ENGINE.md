# Adaptive UI Agent (React) — Chunk 2/4
## Week 3: Define heuristic rules + user model + rule evaluation

You are working in the SAME existing repo from Chunk 1.
DO NOT rewrite telemetry/store. Build on top.

Goal for this chunk:
- Convert raw event logs into a small “user model”
- Define heuristic rules that decide which UI hints/highlights to show
- Show rule output in the Insights page (debug-friendly)

---

## Deliverables (Chunk 2)
### A) Build a simple user model
Create:
src/features/adaptive-ui/analytics/
  buildUserModel.ts

Input:
- events for current userId (from EventStore)

Output (suggested shape):
- totals: { clicks, hovers }
- perUi: Record<uiId, { clicks, hovers, lastTs }>
- perRoute: Record<routePath, { visitsApprox, clicks }>
- sequences: { lastUiIds: string[] (size 10) }
- sessionsApprox: number (simple: new session if gap > 20 min)

Keep it deterministic and lightweight.

### B) Rule engine
Create:
src/features/adaptive-ui/rules/
  ruleTypes.ts
  rules.ts
  evaluateRules.ts

Types:
- Hint = { hintId, targetUiId, message, kind: "tooltip"|"highlight", priority: 1..5 }
- RuleContext = { routePath, model, nowTs, settings, dismissedHints }

Rules MUST be explainable.
Implement at least 5 rules (examples; adapt to your actual app UI):
1) "nav.explore": If user stays on home and hasn’t clicked any route link after X seconds or X visits -> highlight a key route link.
2) "tasks.add": If user visits tasks page multiple times but never clicks Add -> highlight add button with tooltip.
3) "tasks.complete": If user adds tasks but rarely toggles done -> tooltip on toggle.
4) "network.sim": If network simulator exists and user frequently hits errors/retries -> hint to use simulator toggles.
5) "insights.open": If user never opens /adaptive-ui/insights -> highlight link to insights.

Also implement:
- Dismissed hints store (localStorage): "adaptiveUi.dismissed.v1.<userId>"
- A rule should not re-show a dismissed hint for 7 days.

### C) Expose rule results in UI
Update /adaptive-ui/insights page to show:
- Current routePath
- Top 10 uiIds by clicks
- Active hints returned by evaluateRules()
- For each hint, show “why” / debugging notes:
  - ruleId, metrics used (e.g., visits=3, clicks=0)

You can add a "Simulate route" dropdown in insights to test rules for any route.

### D) Tests (minimum 2 new tests in this chunk)
1) buildUserModel aggregates counts correctly.
2) evaluateRules returns a specific hint when given a crafted model (pure unit test; no DOM).

---

## Process
1) Print a short plan.
2) Implement analytics + rules + dismissed store + insights UI updates.
3) Add tests.
4) Run npm test, npm run lint, npm run build.
5) Summarize changes and key files.
Proceed without asking for approval.
