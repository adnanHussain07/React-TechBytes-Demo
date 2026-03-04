import React from 'react';
import { NetworkLatency, NetworkFailureRate } from '../types';
import { useNetworkSim } from '../hooks/useNetworkSim';

const NetworkSimulator: React.FC = () => {
  const { settings, updateSettings, isLoading } = useNetworkSim();

  const handleLatencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ ...settings!, latency: parseInt(e.target.value) as NetworkLatency });
  };

  const handleFailureRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ ...settings!, failureRate: parseInt(e.target.value) as NetworkFailureRate });
  };

  if (isLoading || !settings) {
    return <div>Loading network settings...</div>;
  }

  return (
    <div
      style={{ border: '1px solid #ccc', padding: '16px', margin: '20px 0', borderRadius: '8px' }}
    >
      <h3>Network Simulator</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
        <label>
          Latency:
          <select
            value={settings.latency}
            onChange={handleLatencyChange}
            data-uiid="tasks.sim.latency"
            style={{ marginLeft: '8px' }}
          >
            <option value={0}>0ms</option>
            <option value={300}>300ms</option>
            <option value={800}>800ms</option>
            <option value={1500}>1500ms</option>
          </select>
        </label>
        <label>
          Failure Rate:
          <select
            value={settings.failureRate}
            onChange={handleFailureRateChange}
            data-uiid="tasks.sim.failure"
            style={{ marginLeft: '8px' }}
          >
            <option value={0}>0%</option>
            <option value={20}>20%</option>
            <option value={50}>50%</option>
          </select>
        </label>
      </div>
      <p>
        Current: Latency {settings.latency}ms, Failure Rate {settings.failureRate}%
      </p>
    </div>
  );
};

export default NetworkSimulator;
