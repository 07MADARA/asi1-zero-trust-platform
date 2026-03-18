import React, { useState, useEffect } from 'react';
import '../App.css'; // Importing your animated CSS

const Dashboard = () => {
  const [stats, setStats] = useState({ critical: 0, high: 0, medium: 0 });
  const [loading, setLoading] = useState(true);

  // Drag and Drop State (Translating your Vanilla JS to React)
  const [tasks, setTasks] = useState({
    detected: [
      { id: 1, text: "SQLi Attempt (192.168.1.105)" },
      { id: 2, text: "Layer 7 DDoS Anomaly" }
    ],
    investigating: [],
    resolved: []
  });

  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    // Simulate fetching data, then hide loader (like your script.js)
    setTimeout(() => {
      setStats({ critical: 2, high: 14, medium: 34 });
      setLoading(false);
    }, 1500);
  }, []);

  // --- React Drag and Drop Logic ---
  const handleDragStart = (e, item, sourceColumn) => {
    setDraggedItem({ item, sourceColumn });
    // setTimeout prevents the dragged visual from disappearing instantly
    setTimeout(() => e.target.classList.add('dragging'), 0);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.sourceColumn === targetColumn) return;

    setTasks(prev => {
      const newTasks = { ...prev };
      // Remove from old column
      newTasks[draggedItem.sourceColumn] = newTasks[draggedItem.sourceColumn].filter(t => t.id !== draggedItem.item.id);
      // Add to new column
      newTasks[targetColumn] = [...newTasks[targetColumn], draggedItem.item];
      return newTasks;
    });
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
            {/* Column 1: Detected */}
            <div 
              className="column" 
              onDragOver={handleDragOver} 
              onDrop={(e) => handleDrop(e, 'detected')}
            >
              <h3 style={{ borderBottom: '1px solid #fff', paddingBottom: '10px', marginBottom: '15px' }}>🚨 Detected</h3>
              {tasks.detected.map(task => (
                <div 
                  key={task.id} 
                  className="task" 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, task, 'detected')}
                  onDragEnd={handleDragEnd}
                >
                  {task.text}
                </div>
              ))}
            </div>

            {/* Column 2: Investigating */}
            <div 
              className="column" 
              onDragOver={handleDragOver} 
              onDrop={(e) => handleDrop(e, 'investigating')}
            >
              <h3 style={{ borderBottom: '1px solid #fff', paddingBottom: '10px', marginBottom: '15px', color: '#00cec9' }}>🤖 ASI:One Analyzing</h3>
              {tasks.investigating.map(task => (
                <div 
                  key={task.id} 
                  className="task" 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, task, 'investigating')}
                  onDragEnd={handleDragEnd}
                >
                  {task.text}
                </div>
              ))}
            </div>

            {/* Column 3: Resolved */}
            <div 
              className="column" 
              onDragOver={handleDragOver} 
              onDrop={(e) => handleDrop(e, 'resolved')}
            >
              <h3 style={{ borderBottom: '1px solid #fff', paddingBottom: '10px', marginBottom: '15px', color: '#55efc4' }}>✅ Resolved / Patched</h3>
              {tasks.resolved.map(task => (
                <div 
                  key={task.id} 
                  className="task" 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, task, 'resolved')}
                  onDragEnd={handleDragEnd}
                >
                  {task.text}
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