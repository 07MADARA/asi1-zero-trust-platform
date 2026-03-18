import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const networkData = [
  { x: 10, y: 30, z: 200, name: 'API Gateway (Mumbai Region)', severity: 'high' },
  { x: 30, y: 90, z: 280, name: 'Main Auth Server (Zero-Trust)', severity: 'critical' },
  { x: 45, y: 40, z: 400, name: 'Customer Database (SQL)', severity: 'medium' },
  { x: 70, y: 80, z: 200, name: 'Load Balancer Cluster', severity: 'low' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const color = data.severity === 'critical' ? '#ff4d4d' : data.severity === 'high' ? '#ffb84d' : '#00ffcc';
    return (
      <div style={{ backgroundColor: 'rgba(30,31,32,0.9)', padding: '12px', border: `1px solid ${color}`, borderRadius: '6px', color: '#fff' }}>
        <strong>{data.name}</strong><br/>
        <span style={{ color }}>Status: {data.severity.toUpperCase()}</span>
      </div>
    );
  }
  return null;
};

const ThreatMap = () => {
  return (
    <div style={{ width: '100%', height: 350, backgroundColor: '#1e1f20', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
      <h3 style={{ color: '#e3e3e3', margin: '0 0 20px 0' }}>🌐 Live Network Topology</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis type="number" dataKey="x" hide />
          <YAxis type="number" dataKey="y" hide />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Threats" data={networkData} fill="#ff4d4d" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThreatMap;