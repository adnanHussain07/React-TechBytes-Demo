# Adaptive UI Agent - Demo Script (7-10 Min)

## Introduction (1 min)
- Briefly explain the Adaptive UI Agent.
- Highlight the **Privacy-First** aspect (local-only storage).
- Explain **Data-UIID** instrumentation as the foundation.

## Step 1: The Novice User (2 min)
1. Navigate to **Adaptive UI** (Home).
2. Select **Novice User** from the dropdown.
3. Click **Seed Novice Data** (simulates 3 visits to home without exploring further).
4. Navigate to **Home** (Wait 300ms).
5. **Show**: The "Async UX" link in the sidebar is highlighted with a pulse effect.
6. **Interaction**: Hover to see the tooltip message. Click the highlight.

## Step 2: Adaptive Insights (2 min)
1. Go to **Adaptive UI > Insights**.
2. **Show**: Recent events table showing the "Seed" events.
3. **Show**: User Model Summary (sessions, unique routes).
4. **Interactive**: Use the "Evaluate Rules for Route" dropdown. Select `/async-ux`.
5. **Show**: Rules engine output explains *why* a hint might trigger.

## Step 3: Predictive ML (2 min)
1. Navigate to **Adaptive UI** (Home).
2. Select **Power User** and click **Seed Power User Data**.
3. Perform a sequence of clicks: Home -> Mental Model -> Home -> Mental Model.
4. On the next visit to **Home**, the ML model should predict "Mental Model" as the next likely action.
5. **Show**: The highlight on the predicted next UI ID.

## Step 4: Evaluation & A/B Testing (2 min)
1. Navigate to **Adaptive UI > Evaluation**.
2. **Show**: Acceptance Rate and Dismissal Rate (simulated if data exists).
3. **Interactive**: Toggle **Variant B (Hints Off)**.
4. Navigate to Home.
5. **Show**: Hints are suppressed (demonstrates A/B switch).
6. Export all data for "offline analysis".

## Conclusion (1 min)
- Summarize the value: personalized UX without server-side tracking.
- Mention future potential (offline training, more complex transition models).
