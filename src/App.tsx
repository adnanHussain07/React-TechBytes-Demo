import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import MentalModel from './pages/MentalModel';
import LegacyVsModern from './pages/LegacyVsModern';
import Composition from './pages/Composition';
import StateHooks from './pages/StateHooks';
import AsyncUX from './pages/AsyncUX';
import Workflow from './pages/Workflow';
import Performance from './pages/Performance';

// Adaptive UI
import { useTelemetry } from './features/adaptive-ui/telemetry/useTelemetry';
import AdaptiveUiLayout from './features/adaptive-ui/components/AdaptiveUiLayout';
import AdaptiveUiHomePage from './features/adaptive-ui/pages/AdaptiveUiHomePage';
import AdaptiveUiInsightsPage from './features/adaptive-ui/pages/AdaptiveUiInsightsPage';

function App() {
  useTelemetry();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mental-model" element={<MentalModel />} />
        <Route path="/composition" element={<Composition />} />
        <Route path="/state-hooks" element={<StateHooks />} />
        <Route path="/async-ux" element={<AsyncUX />} />
        <Route path="/workflow" element={<Workflow />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/legacy-vs-modern" element={<LegacyVsModern />} />
        
        <Route path="/adaptive-ui" element={<AdaptiveUiLayout />}>
          <Route index element={<AdaptiveUiHomePage />} />
          <Route path="insights" element={<AdaptiveUiInsightsPage />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
