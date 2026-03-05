import { useMemo, useState } from 'react';
import { getUserId, getSettings, saveSettings } from '../storage/eventStore';
import { listHintEvents } from '../storage/evaluationStore';

const AdaptiveUiEvaluationPage = () => {
  const userId = getUserId();
  const [settings, setSettingsState] = useState(getSettings());
  const hintEvents = useMemo(() => listHintEvents(userId), [userId]);

  const stats = useMemo(() => {
    const counts = {
      shown: 0,
      accepted: 0,
      dismissed: 0,
      byHint: {} as Record<string, { shown: number; accepted: number; dismissed: number }>,
    };

    hintEvents.forEach(e => {
      counts[e.type]++;
      if (!counts.byHint[e.hintId]) {
        counts.byHint[e.hintId] = { shown: 0, accepted: 0, dismissed: 0 };
      }
      counts.byHint[e.hintId][e.type]++;
    });

    return counts;
  }, [hintEvents]);

  const toggleAB = (variant: 'A' | 'B') => {
    const newSettings = { ...settings, abVariant: variant };
    saveSettings(newSettings);
    setSettingsState(newSettings);
    window.dispatchEvent(new CustomEvent('adaptive-ui-refresh'));
  };

  const acceptanceRate = stats.shown > 0 ? (stats.accepted / stats.shown) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Acceptance Rate</p>
          <p className="text-3xl font-bold text-primary">{acceptanceRate.toFixed(1)}%</p>
          <p className="text-xs text-muted-foreground mt-2">{stats.accepted} accepted / {stats.shown} shown</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Dismissal Rate</p>
          <p className="text-3xl font-bold text-destructive">
            {(stats.shown > 0 ? (stats.dismissed / stats.shown) * 100 : 0).toFixed(1)}%
          </p>
          <p className="text-xs text-muted-foreground mt-2">{stats.dismissed} dismissed</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <p className="text-sm text-muted-foreground mb-4">A/B Testing Mode</p>
          <div className="flex gap-2">
            <button 
              onClick={() => toggleAB('A')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg border transition-all ${
                settings.abVariant === 'A' || !settings.abVariant ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border text-muted-foreground'
              }`}
            >
              Variant A (Hints On)
            </button>
            <button 
              onClick={() => toggleAB('B')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg border transition-all ${
                settings.abVariant === 'B' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border text-muted-foreground'
              }`}
            >
              Variant B (Hints Off)
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/50">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Performance by Hint</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border">
              <tr>
                <th className="px-4 py-3">Hint ID</th>
                <th className="px-4 py-3 text-center">Shown</th>
                <th className="px-4 py-3 text-center">Accepted</th>
                <th className="px-4 py-3 text-center">Dismissed</th>
                <th className="px-4 py-3 text-right">Success %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {Object.entries(stats.byHint).length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground italic">
                    No evaluation data recorded yet.
                  </td>
                </tr>
              ) : (
                Object.entries(stats.byHint)
                  .sort((a, b) => b[1].shown - a[1].shown)
                  .map(([hintId, s]) => (
                    <tr key={hintId} className="hover:bg-accent/5">
                      <td className="px-4 py-3 font-medium">{hintId}</td>
                      <td className="px-4 py-3 text-center">{s.shown}</td>
                      <td className="px-4 py-3 text-center text-green-600">{s.accepted}</td>
                      <td className="px-4 py-3 text-center text-destructive">{s.dismissed}</td>
                      <td className="px-4 py-3 text-right font-bold">
                        {(s.shown > 0 ? (s.accepted / s.shown) * 100 : 0).toFixed(1)}%
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveUiEvaluationPage;
