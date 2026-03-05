# Rules Catalog

The Adaptive UI Agent evaluates the following rules:

| Rule ID | Trigger Condition | Target UI ID | Kind | Message |
| --- | --- | --- | --- | --- |
| `nav-explore` | Home visits >= 3 AND total nav clicks < 5 | `nav.async-ux` | Highlight | Ready to see how React handles async data? |
| `tasks-add` | Async UX visits >= 2 AND task add clicks == 0 | `tasks.form.submit` | Tooltip | Try adding a task to see optimistic updates! |
| `tasks-complete` | Task adds >= 3 AND task toggle clicks == 0 | `tasks.item.toggle` | Tooltip | Click the checkbox to mark as completed. |
| `network-sim` | Task interactions >= 5 AND simulator clicks == 0 | `tasks.sim.latency` | Highlight | Try changing network latency to see adaptability. |
| `insights-open` | Total clicks >= 20 AND insights visits == 0 | `nav.adaptive-ui` | Highlight | Curious what data we capture? |
| `ml-next-action` | Transition probability exists (Markov Model) | Predicted ID | Highlight | Based on your habits, you might want this next! |

## Cooldowns
A hint is automatically silenced for **7 days** once dismissed by the user.
Accepted hints are recorded in the evaluation store for performance tracking.
