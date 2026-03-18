import React from 'react';
import Dashboard from './components/Dashboard';
import ThreatMap from './components/ThreatMap';
import CloudMonitor from './components/CloudMonitor';
import AuditTrail from './components/AuditTrail';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <>
      <ParticleBackground />
      <div className="App" style={{ position: 'relative', zIndex: 10 }}>
        <Dashboard />
        <div style={{ padding: '0 40px 40px 40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <ThreatMap />
          <CloudMonitor />
          <AuditTrail />
        </div>
      </div>
    </>
  );
}

export default App;