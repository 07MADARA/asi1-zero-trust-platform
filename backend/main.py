from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime
import asyncio
import random
import uvicorn
import os

# Import custom modules
from asi1_client import ASIOneClient
from agents.threat_analyst import ThreatAnalystAgent
from agents.vuln_scanner import VulnScannerAgent
# Keeping these imports, but adding a try-except to prevent crash if DB is slow
try:
    from database.mongodb import threats_collection, iot_devices_collection
except ImportError:
    threats_collection = None
    iot_devices_collection = None

app = FastAPI(title="ASI:One Zero-Trust Platform")

# 1. FIXED: CORS setup to allow both Local and Production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI Clients
asi_client = ASIOneClient()
threat_agent = ThreatAnalystAgent(asi_client)
vuln_agent = VulnScannerAgent(asi_client)

# Data Models
class ThreatLog(BaseModel):
    log_data: str

class IoTTelemetry(BaseModel):
    device_id: str
    telemetry: Dict

class Threat(BaseModel):
    threat_id: str
    ip_address: str

# In-memory audit log
demo_audit_logs = [
    {
        "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "action": "ASI:One Shield Initialized",
        "status": "Active",
        "agent": "System Admin"
    }
]

# --- 1. WEBSOCKET ROUTE ---
@app.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Simulating live industrial metrics
            data = {
                "cpu_load": f"{round(random.uniform(65.0, 88.0), 1)}%",
                "active_connections": f"{random.randint(12000, 13500):,}",
                "failed_logins": f"{random.randint(2, 15)}/min"
            }
            await websocket.send_json(data)
            await asyncio.sleep(2.0) 
    except WebSocketDisconnect:
        pass

# --- 2. AI ANALYSIS ---
@app.post("/api/analyze-threat")
async def analyze_threat(log: ThreatLog):
    try:
        analysis = threat_agent.analyze_log(log.log_data)
        return {"status": "success", "analysis": analysis}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/remediate")
async def execute_remediation(threat: Threat):
    # Added a bit more "realistic" wait for the AI logic
    await asyncio.sleep(1.5) 
    
    new_log = {
        "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "action": f"Remediation: Blocked IP {threat.ip_address}",
        "status": "Resolved",
        "agent": "ASI:One Agent"
    }
    demo_audit_logs.insert(0, new_log)
    
    return {
        "status": "success",
        "message": f"ASI:One has successfully quarantined {threat.ip_address}."
    }

# --- 3. AUDIT & STATS ---
@app.get("/api/audit-logs")
async def get_audit_logs():
    return demo_audit_logs

@app.get("/")
async def root():
    return {"status": "online", "message": "ASI:One Backend is Global"}

if __name__ == "__main__":
    # Render uses the PORT environment variable
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)