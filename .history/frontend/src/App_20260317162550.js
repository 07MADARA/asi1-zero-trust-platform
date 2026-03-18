import React from 'react';
import Dashboard from './components/Dashboard';
import ThreatMap from './components/ThreatMap';
import CloudMonitor from './components/CloudMonitor';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <>
      {/* The moving lines injected into the background */}
      <ParticleBackground />

      {/* 🔑 FIX: zIndex 10 ensures the dashboard floats on top, removing the gap! */}
      <div className="App" style={{ position: 'relative', zIndex: 10 }}>
        
        <Dashboard />
        
        {/* Topology first, Monitor second */}
        <div style={{ padding: '0 40px 40px 40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <ThreatMap />
          <CloudMonitor />
        </div>

      </div>
    </>
  );
}

export default App;
