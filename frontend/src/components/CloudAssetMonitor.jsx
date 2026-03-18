import React, { useState, useEffect } from 'react';

const CloudAssetMonitor = () => {
    // 1. Setup the state
    const [telemetry, setTelemetry] = useState({ cpu_load: 0, active_connections: 0, failed_logins: 0 });

    // 2. Setup the WebSocket connection
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/telemetry'); 
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setTelemetry(data);
        };

        return () => ws.close(); 
    }, []);

    // 3. The UI rendered on screen
    return (
        <div className="glassmorphism-panel">
            <h3>Live Cloud Asset Monitor</h3>
            <p>CPU Load: {telemetry.cpu_load}%</p>
            <p>Active Connections: {telemetry.active_connections}</p>
            <p>Failed Logins: {telemetry.failed_logins}</p>
        </div>
    );
};

export default CloudAssetMonitor;