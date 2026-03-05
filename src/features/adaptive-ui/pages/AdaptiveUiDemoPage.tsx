import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId, getSettings } from '../storage/eventStore';
import { seedNoviceScenario, seedPowerScenario } from '../demo/seedScenarios';
import { resetAllAdaptiveUiData } from '../demo/resetAll';
import { exportAllData } from '../storage/evaluationStore';

const AdaptiveUiDemoPage = () => {
  const navigate = useNavigate();
  const [userId, setUserIdState] = useState(getUserId());
  const [settings, setSettings] = useState(getSettings());

  useEffect(() => {
    const handleRefresh = () => {
      setUserIdState(getUserId());
      setSettings(getSettings());
    };
    window.addEventListener('adaptive-ui-refresh', handleRefresh);
    return () => window.removeEventListener('adaptive-ui-refresh', handleRefresh);
  }, []);

  const handleExport = () => {
    const data = exportAllData(userId);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adaptive-ui-demo-export-${userId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Live Demo Control Panel</h1>
        <p className="opacity-90">Guide your presentation with deterministic scenarios and quick navigation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Scenario Controls */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🚀 Scenarios
          </h2>
          <div className="space-y-4">
            <button
              onClick={() => { seedNoviceScenario(); alert('Novice data seeded.'); }}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors shadow-md"
            >
              Seed Novice Scenario
            </button>
            <button
              onClick={() => { seedPowerScenario(); alert('Power user data seeded.'); }}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-colors shadow-md"
            >
              Seed Power-User Scenario
            </button>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => { resetAllAdaptiveUiData(); alert('All data reset.'); }}
                className="py-3 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-xl font-semibold transition-colors"
              >
                Reset All Data
              </button>
              <button
                onClick={handleExport}
                className="py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl font-semibold transition-colors"
              >
                Export All Data
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm font-medium text-muted-foreground mb-2">Status Summary</p>
            <div className="flex gap-4 text-xs font-mono">
              <span className={`px-2 py-1 rounded ${settings.enabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                Agent: {settings.enabled ? 'ON' : 'OFF'}
              </span>
              <span className="px-2 py-1 rounded bg-muted">User: {userId}</span>
            </div>
          </div>
        </div>

        {/* Navigation Helpers */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🧭 Navigation
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => navigate('/async-ux')}
              className="py-3 px-4 bg-accent hover:bg-accent/80 rounded-xl text-left flex items-center justify-between group transition-all"
            >
              <span className="font-medium">Go to Tasks Page</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
            <button
              onClick={() => navigate('/adaptive-ui/insights')}
              className="py-3 px-4 bg-accent hover:bg-accent/80 rounded-xl text-left flex items-center justify-between group transition-all"
            >
              <span className="font-medium">Go to Insights</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
            <button
              onClick={() => navigate('/adaptive-ui')}
              className="py-3 px-4 bg-accent hover:bg-accent/80 rounded-xl text-left flex items-center justify-between group transition-all"
            >
              <span className="font-medium">Adaptive UI Home</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="py-3 px-4 bg-accent hover:bg-accent/80 rounded-xl text-left flex items-center justify-between group transition-all"
            >
              <span className="font-medium">App Home</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Presenter Script Checklist */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">🎙️ Presenter Script</h2>
        <div className="space-y-6">
          <Step
            num="1"
            title="Seed Novice Data"
            desc="Click 'Seed Novice Scenario'. This simulates a user who stays on Home and visits Tasks but never adds anything."
          />
          <Step
            num="2"
            title="Demonstrate Discovery"
            desc="Navigate to Home. Point out the pulse highlight on 'Async UX'. Then go to Tasks and see the tooltip on 'Add Task'."
          />
          <Step
            num="3"
            title="Accept the Hint"
            desc="Click 'Add Task'. The agent logs this as an 'accepted' hint."
          />
          <Step
            num="4"
            title="Check the Brain"
            desc="Go to Insights. The event logs and the Rule Engine explaining 'why' the hints appeared."
          />
          <Step
            num="5"
            title="Advanced ML (Power User)"
            desc="Seed Power-User data. Check the Evaluation page for A/B metrics, and demonstrate the ML next-action prediction."
          />
        </div>
      </div>
    </div>
  );
};

const Step = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
  <div className="flex gap-4">
    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
      {num}
    </div>
    <div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  </div>
);

export default AdaptiveUiDemoPage;
