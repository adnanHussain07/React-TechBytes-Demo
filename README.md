 The Adaptive UI Agent is a privacy-first, client-side system that monitors how users interact with the application and dynamically adjusts the interface (via highlights and tooltips) to help them discover
  features.


  Here is a step-by-step explanation of the implementation and a practical guide for your live demo.

  ---

  🧠 How it Works (The Technical "Brain")

  The implementation follows a 5-stage lifecycle, all running locally in the browser:


   1. Telemetry (The Ears): Using a single document-level listener (Event Delegation), the agent "hears" every click and hover. It only records data for elements tagged with a data-uiid attribute (e.g.,
      data-uiid="tasks.add-btn").
   2. Storage (The Memory): Events are saved to localStorage. No data ever leaves your computer. It keeps a rolling history of the last 2000 events to prevent memory bloat.
   3. Analytics (The Model): The agent aggregates raw clicks into a "User Model" that calculates things like: "How many times has this user visited Home?" or "What is the most common sequence of actions?"
   4. Rule Engine (The Decision): A set of heuristic rules (IF-THEN logic) and a Markov-chain ML model evaluate the user model.
       * Example Rule: IF visits > 3 AND feature_clicks == 0 THEN show_hint.
   5. Overlay (The Voice): A reactive React Provider (AdaptiveUiProvider) detects when a hint is active for the current page and renders a pulse highlight or a tooltip exactly over the target element using
      getBoundingClientRect.

  ---


  🎙️ Live Demo Guide (Practical Steps)

  To give a successful demo, follow these steps exactly on the website UI. Use the Demo Control Panel I built to ensure everything is deterministic.


  Preparation
   1. Open the website.
   2. In the Sidebar, click Adaptive UI (at the bottom).
   3. Select the Demo tab in the top navigation (Route: /adaptive-ui/demo).


  Step 1: The "Novice" User Scenario
   * Action: Click the big blue "Seed Novice Scenario" button.
   * Explanation: Tell the audience: "We are now simulating a user who has visited the Home page 3 times but hasn't explored the Async UX features yet."
   * Verification:
       1. Navigate Home.
       2. Point to the Sidebar: The Async UX link will have a blue pulse highlight.
       3. Hover over it: A tooltip appears saying "Ready to see how React handles async data?"


  Step 2: Accepting a Hint
   * Action: Click the highlighted Async UX link.
   * Explanation: "When the user follows a hint, the agent logs this as an 'accepted' interaction to measure effectiveness."
   * Next: On the Async UX page, look at the Add Task button. It should now have a tooltip because the "Novice" seed also simulated visiting this page without clicking "Add".


  Step 3: Behind the Scenes (Insights)
   * Action: Navigate to Adaptive UI > Insights.
   * Explanation: Show the Rule Engine Output.
   * Detail: Point to the "Why" section. It will show exactly why the hint appeared (e.g., homeVisits=3). Show the Recent Events table to prove that the "Seeded" interactions are being tracked.


  Step 4: Predictive ML (The "Habit" Predictor)
   * Action: Go back to the Demo page and click Seed Power-User Scenario.
   * Explanation: "The agent also learns habits. If you frequently go from Home to Mental Model, it will eventually predict that move."
   * Verify:
       1. Go Home.
       2. You will likely see a highlight on the Mental Model link.
       3. Check the Insights page under "Top 10 UI Targets" to see the most clicked elements.


  Step 5: Evaluation & A/B Testing
   * Action: Navigate to Adaptive UI > Evaluation.
   * Explanation: Show the Acceptance Rate. Explain that we can run A/B tests (Variant A vs B) locally to see if hints actually help users complete tasks faster.
   * Final Action: Click Variant B. Navigate back Home to show that all hints are now suppressed.


  Step 6: Reset for Next Demo
   * Action: Go to Demo and click Reset All Data.
   * Explanation: "With one click, we wipe the agent's memory, ensuring a clean slate for the next user."

  ---


  📂 Key Implementation Files
  If the audience asks to see the code, show these:
   - src/features/adaptive-ui/rules/rules.ts: The "IF-THEN" logic.
   - src/features/adaptive-ui/ml/transitionModel.ts: The Markov-chain math.
   - src/features/adaptive-ui/runtime/AdaptiveUiProvider.tsx: The reactive state management.
   - docs/adaptive-ui/architecture.md: The visual flow diagram.
   
   
   ****** HEURISTIC RULES ********
   
   In simple terms, Heuristic Rules are "rules of thumb" or deterministic IF-THEN statements created by humans to solve a problem.

  Unlike complex AI (which learns from data and is often a "black box"), heuristics are explainable, transparent, and predictable.

  1. What are they in this project?
  In the Adaptive UI Agent, a heuristic rule is a small piece of logic that looks at a user's behavior and decides: "Should I show a hint right now?"


  A real example from your project:
  > IF the user has visited the Home page 3 times...
  > AND they have never clicked on "Async UX"...
  > THEN highlight the "Async UX" link to help them discover it.

  ---


  2. Where are they present?
  The rules are centralized in one specific location:
   * File Path: src/features/adaptive-ui/rules/rules.ts


  If you open that file, you will see an array called ALL_RULES. Each rule inside has an evaluate function. This function takes the "User Model" (the stats of what the user has done) and returns either a Hint
  object or null.


  Other related files:
   * src/features/adaptive-ui/rules/ruleTypes.ts: Defines the shape of a rule.
   * src/features/adaptive-ui/rules/evaluateRules.ts: The engine that loops through all rules to see which ones are active.

  ---

  3. What thing do they serve in this project?
  The heuristic rules serve three critical roles:


  A. Explainable Personalization
  Because they are written in code (not learned by a machine), we can tell the user exactly why a hint is showing. On your Insights page, you'll see a section that says "Why: homeVisits=3". This builds trust
  because the UI isn't acting randomly.


  B. Feature Discovery (Onboarding)
  They act as a dynamic tour guide. Instead of showing a "Welcome Tour" to everyone (which most people skip), heuristics wait until a user seems "stuck" or "unaware" of a feature before nudging them.
   * Example: The tasks-add rule only triggers if you've visited the Tasks page but never actually tried to add a task.


  C. Performance & Privacy
  Heuristics are incredibly "cheap" to run. They don't require a powerful GPU or a server connection. This allows the Adaptive UI Agent to stay 100% local to the user's browser, serving the project's goal of
  Privacy-First design.

  ---


  Summary of Rules in your Project:
   1. nav-explore: Nudges users to leave the Home page if they stay there too long.
   2. tasks-add: Suggests trying the "Add Task" feature.
   3. tasks-complete: Nudges users to click the checkbox after they've added several tasks.
   4. network-sim: Suggests using the Network Simulator if the user interacts with tasks frequently.
   5. insights-open: Highlights the Insights page once the user has generated enough data to see.
   6. ml-next-action: (The hybrid rule) Uses the ML model to predict what the user usually does next.
   
   
   ******** IMPLEMENTATION OF REACT LOGIC *********
   
   The implementation of the dynamic highlighting logic is handled in a "two-layer" React system. One layer decides what to highlight, and the second layer performs the actual DOM manipulation.

  Here is exactly where that logic lives:


  1. The Decision Layer (The Provider)
  File: src/features/adaptive-ui/runtime/AdaptiveUiProvider.tsx


  This file contains the Reactive Loop. It uses a useEffect that listens for route changes or clicks. Every time something happens, it runs the recomputeHints function.
   * It fetches the active hints from the Rule Engine.
   * It stores them in a React state called activeHints.
   * It provides these hints to the rest of the app via React Context.

  ---

  2. The Implementation Layer (The Overlay)
  File: src/features/adaptive-ui/components/HintOverlay.tsx


  This is the most important file for the "visual" logic. Because React components usually only care about their own internal state, we created a global HintOverlay that can "reach out" and find any element on
  the page.


  The logic works like this:
   1. Finding the Target: It uses document.querySelector([data-uiid="${hint.targetUiId}"]). This allows it to find an element anywhere in the app (Sidebar, Header, or Page) without having to pass props through
      every component.
   2. Applying the Style:
       * If the rule says kind: 'highlight', it adds the CSS classes adaptive-highlight and adaptive-pulse directly to the element's class list.
       * Cleanup: When the hint is dismissed or the route changes, it automatically removes those classes to stop the pulsing.
   3. Positioning Tooltips: It uses element.getBoundingClientRect() to calculate the exact X and Y coordinates of the target on the screen. It then renders a floating <Tooltip /> at those coordinates.

  ---

  3. The Visual Style (The CSS)
  File: src/features/adaptive-ui/components/PulseRing.css


  This file defines what the "highlight" actually looks like.
   * .adaptive-highlight: Adds a bright blue outline to the element.
   * .adaptive-pulse: Uses a CSS @keyframes animation to create a growing, fading ring around the element, making it "pulse" to grab the user's attention.

  ---


  Why is it done this way? (The "React Way")
  By using a central Overlay + Data-UIID, we keep the rest of the code clean.
   * We don't have to add "IsHighlighted" props to every Button or Link in the project.
   * The components remain simple and "dumb," while the Adaptive UI Agent sits on top like a transparent layer, observing and marking the UI as needed.