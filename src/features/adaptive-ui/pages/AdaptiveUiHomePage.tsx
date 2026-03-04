import TelemetryControls from '../components/TelemetryControls';

const AdaptiveUiHomePage = () => {
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

      <TelemetryControls />

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
