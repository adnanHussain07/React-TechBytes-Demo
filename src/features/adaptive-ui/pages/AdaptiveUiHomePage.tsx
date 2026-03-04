import { useState } from 'react';
import TelemetryControls from '../components/TelemetryControls';
import { setUserId, getUserId, appendEvent, clearEvents } from '../storage/eventStore';
import { clearDismissed } from '../storage/dismissedStore';

const AdaptiveUiHomePage = () => {
  const [userId, setUserIdState] = useState(getUserId());

  const handleUserChange = (newId: string) => {
    setUserId(newId);
    setUserIdState(newId);
    window.dispatchEvent(new CustomEvent('adaptive-ui-refresh'));
  };

  const seedNovice = () => {
    const id = getUserId();
    clearEvents(id);
    clearDismissed(id);
    // 3 visits to home, no clicks elsewhere
    for (let i = 0; i < 3; i++) {
      appendEvent(id, {
        eventId: `seed-n-${i}`,
        ts: Date.now() - (3 - i) * 60000,
        type: 'click',
        routePath: '/',
        uiId: 'nav.home',
        tag: 'a'
      });
    }
    window.dispatchEvent(new CustomEvent('adaptive-ui-refresh'));
    alert('Novice data seeded (3 home visits). Nav-Explore rule should trigger on Home.');
  };

  const seedPower = () => {
    const id = getUserId();
    clearEvents(id);
    clearDismissed(id);
    // Many clicks across various routes
    const routes = ['/', '/async-ux', '/performance', '/composition'];
    for (let i = 0; i < 25; i++) {
      appendEvent(id, {
        eventId: `seed-p-${i}`,
        ts: Date.now() - (25 - i) * 60000,
        type: 'click',
        routePath: routes[i % routes.length],
        uiId: `nav.${routes[i % routes.length].replace(/^\//, '') || 'home'}`,
        tag: 'a'
      });
    }
    window.dispatchEvent(new CustomEvent('adaptive-ui-refresh'));
    alert('Power data seeded (25+ clicks). Insights rule should trigger.');
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-card-foreground">
        <h2 className="text-xl font-semibold text-primary mb-2">Welcome to the Adaptive UI Agent</h2>
        <p className="max-w-2xl text-muted-foreground">
          This system monitors user behavior via document-level event delegation. 
          It captures clicks and hovers on elements tagged with <code>data-uiid</code>. 
          In the next stages, we will add analytics and a rule engine to dynamically adjust the UI.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">Demo & Testing (Sample Users)</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted-foreground">Active User ID:</label>
            <select 
              value={userId}
              onChange={(e) => handleUserChange(e.target.value)}
              className="border border-input rounded px-3 py-1.5 bg-background text-sm"
            >
              <option value="default-user">Default</option>
              <option value="novice-user">Novice</option>
              <option value="power-user">Power User</option>
            </select>
          </div>
          <div className="flex gap-2 self-end">
            <button 
              onClick={seedNovice}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Seed Novice Data
            </button>
            <button 
              onClick={seedPower}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
            >
              Seed Power User Data
            </button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground italic">
          * Seeding data will clear current logs and dismissed hints for the selected user.
        </p>
      </div>

      <TelemetryControls />
...
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">How it works</h3>
        <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
          <li><strong>Zero-config Capture:</strong> Interaction logs are stored in <code>localStorage</code>.</li>
          <li><strong>Privacy First:</strong> No data is sent to any server. Everything is local to your browser.</li>
          <li><strong>Instrumentation:</strong> Key elements across the app have <code>data-uiid</code> attributes.</li>
          <li><strong>Next Steps:</strong> Once you have enough interaction data, go to the Insights page to see the results.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdaptiveUiHomePage;
