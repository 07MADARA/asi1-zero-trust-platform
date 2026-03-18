import React, { useState, useEffect } from 'react';
import '../App.css'; 

const CloudMonitor = () => {
  const [deviceData, setDeviceData] = useState({
    status: "Monitoring...",
    vulnerabilities: null,
    telemetry: {
      cpu_load: "84%",
      active_connections: "12,405",
      failed_logins: "342/min",
      bandwidth: "4.2 GB/s",
      firmware: "v1.4.2 (Zero-Trust)"
    }
  });
  const [isScanning, setIsScanning] = useState(false);


// Connect to live WebSocket telemetry (with Debugging)
  useEffect(() => {
    // Switching back to localhost, which is sometimes friendlier for React
    const ws = new WebSocket('ws://localhost:8000/ws/telemetry'); 
    
    ws.onopen = () => {
        console.log("✅ WEBSOCKET CONNECTED!");
    };

    ws.onmessage = (event) => {
        console.log("📥 LIVE DATA ARRIVED:", event.data);
        const liveData = JSON.parse(event.data);
        setDeviceData(prev => ({
            ...prev,
            telemetry: {
                ...prev.telemetry,
                cpu_load: liveData.cpu_load,
                active_connections: liveData.active_connections,
                failed_logins: liveData.failed_logins
            }
        }));
    };

    ws.onerror = (error) => {
        console.error("❌ WEBSOCKET ERROR:", error);
    };

    return () => ws.close(); 
  }, []);

  const runAdvancedScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setDeviceData(prev => ({
        ...prev,
        status: "Scan Complete",
        vulnerabilities: {
          threat_detected: "Brute Force Attack on Auth Server",
          asi_recommendation: "Automatically block IP range 192.168.1.0/24 and rotate API keys.",
          confidence: "98%"
        }
      }));
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <h2 style={{ color: '#00cec9', marginBottom: '15px' }}>☁️ Enterprise Cloud Asset Monitor</h2>
      <h3>Asset: API Gateway (Mumbai Region)</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px', marginBottom: '20px' }}>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>CPU Load: <strong style={{color: '#ff4d4d'}}>{deviceData.telemetry.cpu_load}</strong></div>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>Failed Logins: <strong style={{color: '#ff4d4d'}}>{deviceData.telemetry.failed_logins}</strong></div>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>Connections: <strong>{deviceData.telemetry.active_connections}</strong></div>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>Security Policy: <strong>{deviceData.telemetry.firmware}</strong></div>
      </div>

      <button 
        onClick={runAdvancedScan} 
        disabled={isScanning}
        className="cta"
        style={{ width: '100%', border: 'none', cursor: 'pointer', opacity: isScanning ? 0.7 : 1 }}
      >
        {isScanning ? "ASI:One Analyzing Network Traffic..." : "Run ASI:One Deep Scan"}
      </button>

      {deviceData.vulnerabilities && (
        <div style={{ marginTop: '20px', background: 'rgba(255,77,77,0.1)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #ff4d4d' }}>
          <h4 style={{ color: '#ff4d4d', marginBottom: '10px' }}>🚨 ASI:One Security Report</h4>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.9rem' }}>
            {JSON.stringify(deviceData.vulnerabilities, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CloudMonitor;