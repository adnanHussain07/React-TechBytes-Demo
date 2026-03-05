# Adaptive UI Agent - Architecture

## High-Level Flow
The system follows a reactive loop to dynamically adjust the user interface based on behavior.

1. **Telemetry (Capture)**: 
   - Uses a single document-level event listener (event delegation).
   - Captures `click` and `hover` events only on elements with a `data-uiid`.
   - Normalizes data with route context and element tags.

2. **Storage (Local)**:
   - Everything is stored in `localStorage`.
   - `events`: Interaction log (capped at 2000 per user).
   - `hintEvents`: History of hint interactions (shown, accepted, dismissed).
   - `transitions`: Markov-chain transition matrix for ML prediction.
   - `dismissed`: Cooldown store for hints (7-day silence).

3. **Analytics (User Model)**:
   - Aggregates raw events into a `UserModel`.
   - Calculates totals, per-UI frequencies, per-route visits, and session estimates.

4. **Rule Engine (Decision)**:
   - Pure function that takes `UserModel` and `RouteContext`.
   - Evaluates heuristic rules (IF-THEN) and ML predictions.
   - Outputs a sorted list of `Hint` objects.

5. **Runtime (Overlay)**:
   - `AdaptiveUiProvider` manages the state and debounces recomputations.
   - `HintOverlay` uses `querySelector` and `getBoundingClientRect` to position highlights and tooltips.

## Data-UIID Instrumentation
Elements are tagged like this:
```html
<button data-uiid="tasks.form.submit">Add Task</button>
```
This stable identifier allows the agent to track the same element even if the text or visual style changes.
