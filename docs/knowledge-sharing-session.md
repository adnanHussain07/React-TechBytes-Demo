# Knowledge Sharing Session - Adaptive UI Agent

## Duration: 30–45 min

### 1. Problem Statement (5 min)
- The paradox of feature discovery: users miss key features because they're overwhelmed.
- Traditional solutions: annoying pop-up tours (one-size-fits-all) or server-side tracking (privacy concerns).

### 2. The Solution (10 min)
- **Privacy-First Personalization**: Interaction logs are strictly local (`localStorage`).
- **Instrumentation via data-uiid**: Decoupling tracking from CSS/HTML structure.
- **Event Delegation**: Efficient, high-performance capture.

### 3. Heuristics vs. ML (10 min)
- **Heuristic Engine**: Deterministic rules (`IF visits > 3 THEN show hint`). Explainable and debuggable.
- **Predictive ML**: Markov-chain transition matrix. Predicting the next likely action based on sequential patterns.
- Comparison: When to use rules vs. models.

### 4. Implementation Details (10 min)
- `AdaptiveUiProvider`: Reactive context to handle recomputations.
- `HintOverlay`: Using `getBoundingClientRect` for layout-independent overlays.
- Evaluation loop: Measuring acceptance and dismissal without leaving the browser.

### 5. Live Demo & Q&A (10 min)
- Run through the `demo-script.md`.
- Open Q&A:
  - "How do we handle dynamic content?"
  - "What if the user uses multiple browsers?"
  - "Ethical considerations: are we nudgeing users too much?"

### Reference Materials
- `architecture.md`
- `rules-catalog.md`
- Codebase: `src/features/adaptive-ui/*`
