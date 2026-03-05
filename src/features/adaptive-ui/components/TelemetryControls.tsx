import React, { useState } from 'react';
import { getSettings, saveSettings, clearEvents, getUserId } from '../storage/eventStore';
import { exportAllData, importAllData, clearHintEvents } from '../storage/evaluationStore';
import { clearDismissed } from '../storage/dismissedStore';
import { clearTransitionModel } from '../ml/transitionModel';
import { AdaptiveUiSettings } from '../types';

const TelemetryControls = () => {
  const [settings, setSettings] = useState<AdaptiveUiSettings>(getSettings());
  const userId = getUserId();

  const handleToggleEnabled = () => {
    const newSettings = { ...settings, enabled: !settings.enabled };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleToggleHover = () => {
    const newSettings = { ...settings, captureHover: !settings.captureHover };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear ALL data for the current user?')) {
      clearEvents(userId);
      clearHintEvents(userId);
      clearDismissed(userId);
      clearTransitionModel(userId);
      window.location.reload();
    }
  };

  const handleExportAll = () => {
    const data = exportAllData(userId);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adaptive-ui-full-export-${userId}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importAllData(userId, content)) {
        alert('All data imported successfully!');
        window.location.reload();
      } else {
        alert('Failed to import data.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
      <h3 className="text-lg font-semibold">System Controls</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Enable Adaptive UI</label>
              <p className="text-xs text-muted-foreground">Master switch for interaction capture and hints</p>
            </div>
            <button
              onClick={handleToggleEnabled}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Capture Hover</label>
              <p className="text-xs text-muted-foreground">Log pointerenter events (throttled)</p>
            </div>
            <button
              onClick={handleToggleHover}
              disabled={!settings.enabled}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.captureHover ? 'bg-primary' : 'bg-muted'
              } ${!settings.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.captureHover ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleExportAll}
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Export All Data
            </button>
            <label className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer">
              Import All Data
              <input type="file" accept=".json" onChange={handleImportAll} className="hidden" />
            </label>
            <button
              onClick={handleClear}
              className="px-4 py-2 text-sm font-medium bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
            >
              Nuke All Local Data
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Current User: <span className="font-mono">{userId}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TelemetryControls;
