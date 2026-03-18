import React, { useState, useEffect } from 'react';
import '../App.css'; 

// CHANGE THIS to your Render URL: https://asi1-zero-trust-platform.onrender.com
const BACKEND_URL = "https://asi1-zero-trust-platform.onrender.com";

const Dashboard = () => {
  const [stats, setStats] = useState({ critical: 0, high: 0, medium: 0 });
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState({
    detected: [
      { id: 1, text: "SQLi Attempt", ip: "192.168.1.105" },
      { id: 2, text: "Layer 7 DDoS Anomaly", ip: "10.0.0.50" }
    ],
    investigating: [],
    resolved: []
  });

  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStats({ critical: 2, high: 14, medium: 34 });
      setLoading(false);
    }, 1500);
  }, []);

  const handleDragStart = (e, item, sourceColumn) => {
    setDraggedItem({ item, sourceColumn });
    setTimeout(() => e.target.classList.add('dragging'), 0);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.sourceColumn === targetColumn) return;

    setTasks(prev => {
      const newTasks = { ...prev };
      newTasks[draggedItem.sourceColumn] = newTasks[draggedItem.sourceColumn].filter(t => t.id !== draggedItem.item.id);
      newTasks[targetColumn] = [...newTasks[targetColumn], draggedItem.item];
      return newTasks;
    });
  };

  const handleExecute = async (task) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/remediate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ threat_id: String(task.id), ip_address: task.ip })
        });
        const result = await response.json();
        
        if (result.status === 'success') {
            alert(result.message);
            setTasks(prev => {
                const newTasks = { ...prev };
                newTasks.investigating = newTasks.investigating.filter(t => t.id !== task.id);
                newTasks.resolved = [...newTasks.resolved, task];
                return newTasks;
            });
        }
    } catch (error) {
        console.error("Execution failed:", error);
        alert("Remediation failed. Check if Backend is awake!");
    }
  };

  if (loading) {
    return (
      <div id="loader">
        <h2 style={{ color: '#00CEC9', animation: 'fadeIn 1s infinite alternate' }}>Initializing ASI:One Shield...</h2>
      </div>
    );
  }

  return (
    <>
      <nav>
        <h2>🛡️ ASI:One Zero-Trust Platform</h2>
        <a href="#dashboard" className="cta">Run Deep Scan</a>
      </nav>

      <div className="dashboard-container">
        <div className="sidebar">
          <h3>Modules</h3>
          <ul style={{ listStyle: 'none', marginTop: '20px', lineHeight: '2.5' }}>
            <li>🌐 Global Gateway</li>
            <li>🤖 Agent Intelligence</li>
            <li>📊 Threat Analytics</li>
          </ul>
        </div>

        <div className="main">
          <div className="cards">
            <div className="card">
              <h3 style={{ color: '#ff4d4d' }}>Critical Alerts</h3>
              <h1 style={{ fontSize: '3rem' }}>{stats.critical}</h1>
            </div>
            <div className="card">
              <h3 style={{ color: '#fdcb6e' }}>High Severity</h3>
              <h1 style={{ fontSize: '3rem' }}>{stats.high}</h1>
            </div>
            <div className="card">
              <h3 style={{ color: '#00cec9' }}>Monitored Assets</h3>
              <h1 style={{ fontSize: '3rem' }}>1,204</h1>
            </div>
          </div>

          <h2>🎯 Incident Triage Board (Drag & Drop)</h2>
          <p style={{ color: '#dfe6e9', marginBottom: '20px' }}>Drag threats to ASI:One to initiate autonomous remediation.</p>
          
          <div className="task-board">
            <div className="column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'detected')}>
              <h3 style={{ borderBottom: '1px solid #fff', paddingBottom: '10px', marginBottom: '15px' }}>🚨 Detected</h3>
              {tasks.detected.map(task => (
                <div key={task.id} className="task" draggable onDragStart={(e) => handleDragStart(e, task, 'detected')} onDragEnd={handleDragEnd}>
                  {task.text} <br/><small>{task.ip}</small>
                </div>
              ))}
            </div>

            <div className="column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'investigating')}>
              <h3 style={{ borderBottom: '1px solid #fff', paddingBottom: '10px', marginBottom: '15px', color: '#00cec9' }}>🤖 ASI:One Analyzing</h3>
              {tasks.investigating.map(task => (
                <div key={task.id} className="task" draggable onDragStart={(e) => handleDragStart(e, task, 'investigating')} onDragEnd={handleDragEnd}>
                  {task.text} <br/><small>{task.ip}</small>
                  <button onClick={() => handleExecute(task)} style={{ display: 'block', marginTop: '10px', background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>
                      Execute ASI:One Fix
                  </button>
                </div>
              ))}
            </div>

            <div className="column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'resolved')}>
              <h3 style={{ borderBottom: '1px solid #fff', paddingBottom: '10px', marginBottom: '15px', color: '#55efc4' }}>✅ Resolved / Patched</h3>
              {tasks.resolved.map(task => (
                <div key={task.id} className="task" draggable onDragStart={(e) => handleDragStart(e, task, 'resolved')} onDragEnd={handleDragEnd}>
                  {task.text} <br/><small>{task.ip}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;