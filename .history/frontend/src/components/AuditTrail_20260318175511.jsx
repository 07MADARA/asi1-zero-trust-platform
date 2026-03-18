import React, { useState, useEffect } from 'react';

const AuditTrail = () => {
    const [auditLogs, setAuditLogs] = useState([]);

    // Fetch the logs every 3 seconds to keep it updated when you click execute
    useEffect(() => {
        const fetchLogs = () => {
            fetch('http://localhost:8000/api/audit-logs')
                .then(res => res.json())
                .then(data => setAuditLogs(data))
                .catch(err => console.error("Error fetching logs:", err));
        };
        
        fetchLogs();
        const interval = setInterval(fetchLogs, 3000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="card" style={{ marginTop: '20px', overflowX: 'auto' }}>
            <h2 style={{ color: '#fdcb6e', marginBottom: '15px' }}>📜 Enterprise Audit Trail</h2>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', color: 'white' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                        <th style={{ padding: '10px' }}>Time</th>
                        <th style={{ padding: '10px' }}>Action</th>
                        <th style={{ padding: '10px' }}>Status</th>
                        <th style={{ padding: '10px' }}>Agent</th>
                    </tr>
                </thead>
                <tbody>
                    {auditLogs.map((log, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <td style={{ padding: '10px' }}>{new Date(log.timestamp).toLocaleTimeString()}</td>
                            <td style={{ padding: '10px' }}>{log.action}</td>
                            <td style={{ padding: '10px', color: '#55efc4' }}>{log.status}</td>
                            <td style={{ padding: '10px' }}>{log.agent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AuditTrail;