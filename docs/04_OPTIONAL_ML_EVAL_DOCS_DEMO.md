# Adaptive UI Agent (React) — Chunk 4/4
## Week 6–8: Optional ML predictor + evaluation + documentation + demo-ready polish

You are working in the SAME repo after Chunk 3.
This chunk finalizes the objective:
- optional small model
- evaluation loop
- docs + knowledge-sharing session content
- demo-ready UI polish

---

## Deliverables (Chunk 4)
### A) Optional “small ML model” (keep it tiny + explainable)
Implement a lightweight predictor WITHOUT heavy ML libs:
Option 1 (recommended): Markov-chain / transition matrix predictor
- Track transitions uiIdA -> uiIdB from click sequences
- Predict top next uiId for current route based on last clicked uiId
- If confidence > threshold, show hint: “Next suggested action…” and highlight predicted uiId

Create:
src/features/adaptive-ui/ml/
  transitionModel.ts
  predictNextUi.ts

Store model per userId:
- "adaptiveUi.ml.transitions.v1.<userId>"
Update online as new events come in.

### B) Evaluation instrumentation
Add:
- hintShown event
- hintDismissed event
- hintAccepted event (user clicks the highlighted target within 10s)

Store to:
- "adaptiveUi.hintEvents.v1.<userId>"

Update Insights page with:
- acceptance rate
- dismissal rate
- top accepted hints

### C) Usability evaluation page (simple)
Add route:
- /adaptive-ui/evaluation
Show:
- quick metrics
- a tiny A/B toggle (A: hints on, B: hints off) that just flips setting and logs “variant”
- note: this is not statistical rigor; just demo the concept

### D) Documentation (must-have)
Create docs:
- docs/adaptive-ui/architecture.md
  - telemetry -> store -> model -> rules -> overlay
  - how data-uiid works
- docs/adaptive-ui/rules-catalog.md
  - list each rule, trigger condition, target uiId, message
- docs/adaptive-ui/demo-script.md
  - 7–10 min demo steps (seed novice, show hints, dismiss, show insights, switch user, show ML prediction)
- docs/adaptive-ui/knowledge-sharing-session.md
  - 30–45 min session outline:
    - problem statement
    - instrumentation
    - heuristics vs ML
    - ethics & privacy (local-only)
    - live demo
    - Q&A prompts

Also update main README.md with:
- what Adaptive UI Agent is
- which routes to open
- how to seed sample users

### E) Final polish
- Add “Export all data” button (events + hint events + transitions) to a single JSON download
- Add “Import all data” for replay
- Make UI projector-friendly (minimal, clear)

### F) Tests (minimum 2 new tests in this chunk)
1) transitionModel updates transitions correctly and predicts expected next uiId.
2) hint acceptance logging works (simulate: hint shown -> click target within window -> accepted).

---

## Process
1) Print short plan.
2) Implement ML (optional), evaluation, docs, and final polish.
3) Add tests.
4) Run npm test, npm run lint, npm run build.
5) Provide a final “Demo checklist” bullet list.
Proceed without asking for approval.
