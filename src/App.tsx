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

function App() {
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
      </Routes>
    </Layout>
  );
}

export default App;
