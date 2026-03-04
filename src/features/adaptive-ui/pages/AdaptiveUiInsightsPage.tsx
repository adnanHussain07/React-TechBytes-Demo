import { useMemo, useState } from 'react';
import { listEvents, getUserId, getSettings } from '../storage/eventStore';
import { listDismissed } from '../storage/dismissedStore';
import { buildUserModel } from '../analytics/buildUserModel';
import { evaluateRules } from '../rules/evaluateRules';
import RecentEventsTable from '../components/RecentEventsTable';

const AdaptiveUiInsightsPage = () => {
  const userId = getUserId();
  const settings = getSettings();
  const [simulatedRoute, setSimulatedRoute] = useState<string | null>(null);

  const events = useMemo(() => listEvents(userId), [userId]);
  const model = useMemo(() => buildUserModel(events), [events]);
  const dismissed = useMemo(() => listDismissed(userId), [userId]);

  const currentRoute = simulatedRoute || window.location.pathname;

  const activeHints = useMemo(() => {
    return evaluateRules({
      routePath: currentRoute,
      model,
      nowTs: Date.now(),
      settings,
      dismissedHints: dismissed,
    });
  }, [currentRoute, model, settings, dismissed]);

  const topTargets = useMemo(() => {
    return Object.entries(model.perUi)
      .sort((a, b) => b[1].clicks - a[1].clicks)
      .slice(0, 10);
  }, [model]);

  const routes = [
    '/',
    '/mental-model',
    '/composition',
    '/state-hooks',
    '/async-ux',
    '/workflow',
    '/performance',
    '/legacy-vs-modern',
    '/adaptive-ui',
    '/adaptive-ui/insights'
  ];

  return (
    <div className="space-y-6">
      {/* Simulation Controls */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Evaluate Rules for Route:</label>
          <select 
            className="text-sm border border-input rounded px-2 py-1 bg-background"
            value={simulatedRoute || ''}
            onChange={(e) => setSimulatedRoute(e.target.value || null)}
          >
            <option value="">Current ({window.location.pathname})</option>
            {routes.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="text-xs text-muted-foreground">
          Showing logic for: <span className="font-mono font-bold text-primary">{currentRoute}</span>
        </div>
      </div>

      {/* Active Hints / Rule Output */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Rule Engine Output</h3>
        <div className="space-y-4">
          {activeHints.length === 0 ? (
            <p className="text-sm text-muted-foreground italic text-center py-4 border border-dashed border-border rounded-lg">
              No active hints for this context.
            </p>
          ) : (
            activeHints.map(hint => (
              <div key={hint.hintId} className="p-4 border border-primary/20 bg-primary/5 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">{hint.hintId}</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase">
                    Priority {hint.priority}
                  </span>
                </div>
                <p className="text-sm font-medium">{hint.message}</p>
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground pt-2 border-t border-primary/10">
                  <div>Target: <code className="bg-muted px-1 rounded">{hint.targetUiId}</code></div>
                  <div>Kind: <span className="capitalize">{hint.kind}</span></div>
                  {hint.debugInfo && (
                    <div className="col-span-2 italic">Why: {hint.debugInfo}</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Targets */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Top 10 UI Targets</h3>
          <div className="space-y-3">
            {topTargets.length === 0 ? (
               <p className="text-sm text-muted-foreground italic">No interaction data.</p>
            ) : (
              topTargets.map(([uiId, stats]) => (
                <div key={uiId} className="flex items-center justify-between">
                  <span className="text-sm font-medium font-mono">{uiId}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">{stats.clicks} clicks</span>
                    <span className="text-xs text-muted-foreground">{stats.hovers} hovers</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* User Model Overview */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">User Model Summary</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Approx Sessions</p>
              <p className="text-xl font-bold">{model.sessionsApprox}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Unique Routes</p>
              <p className="text-xl font-bold">{Object.keys(model.perRoute).length}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground mb-2">Last 5 Interactions</p>
              <div className="flex flex-wrap gap-2">
                {model.sequences.lastUiIds.slice(-5).reverse().map((id, i) => (
                  <span key={i} className="px-2 py-1 bg-muted rounded text-[10px] font-mono">
                    {id}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <RecentEventsTable events={events} />
    </div>
  );
};

export default AdaptiveUiInsightsPage;
