import React from 'react';
import Dashboard from './components/Dashboard';
import ThreatMap from './components/ThreatMap';
import CloudMonitor from './components/CloudMonitor';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <>
      {/* 1. The moving lines injected into the background */}
      <ParticleBackground />

      {/* 2. Your existing layout wrapped in a relative div so it sits on top of the lines */}
      <div className="App" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Your existing Dashboard (Nav, Sidebar, Stats, and Triage Board) remains untouched here */}
        <Dashboard />
        
        {/* 3. Reordered to stack vertically: Topology first, Monitor second */}
        <div style={{ padding: '0 40px 40px 40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <ThreatMap />
          <CloudMonitor />
        </div>

      </div>
    </>
  );
}

export default App;
