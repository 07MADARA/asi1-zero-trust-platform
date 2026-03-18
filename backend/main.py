from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime
import asyncio
import random
import uvicorn

# Import custom modules
from asi1_client import ASIOneClient
from agents.threat_analyst import ThreatAnalystAgent
from agents.vuln_scanner import VulnScannerAgent
from database.mongodb import threats_collection, iot_devices_collection

app = FastAPI(title="ASI:One Zero-Trust Platform")

# CORS setup to allow React frontend connection
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

# In-memory audit log for the hackathon demo (prevents DB connection issues during presentation)
demo_audit_logs = [
    {
        "timestamp": datetime.utcnow().isoformat(),
        "action": "System Initialized",
        "status": "Active",
        "agent": "System Admin"
    }
]

# --- 1. WEBSOCKET ROUTE (LIVE TELEMETRY) ---
@app.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Simulating live server stress metrics
            data = {
                "cpu_load": f"{round(random.uniform(40.0, 95.0), 1)}%",
                "active_connections": f"{random.randint(10000, 15000):,}",
                "failed_logins": f"{random.randint(0, 50)}/min"
            }
            await websocket.send_json(data)
            await asyncio.sleep(1.5)  # Push every 1.5 seconds
    except WebSocketDisconnect:
        print("Client disconnected from telemetry stream")

# --- 2. AI ANALYSIS ROUTES ---
@app.post("/api/analyze-threat")
async def analyze_threat(log: ThreatLog):
    try:
        analysis = threat_agent.analyze_log(log.log_data)
        return {"status": "success", "analysis": analysis}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/vulnerability-scan")
async def scan_vulnerability(data: IoTTelemetry):
    try:
        vuln_report = vuln_agent.scan_industrial_iot(data.telemetry)
        return {
            "status": "success",
            "device_id": data.device_id,
            "vulnerabilities": vuln_report
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- 3. REMEDIATION ROUTE ---
@app.post("/api/remediate")
async def execute_remediation(threat: Threat):
    await asyncio.sleep(2) # Simulating execution time
    
    # Log the action
    demo_audit_logs.insert(0, {
        "timestamp": datetime.utcnow().isoformat(),
        "action": f"Executed remediation: Blocked IP {threat.ip_address}",
        "status": "Resolved",
        "agent": "ASI:One + Admin"
    })
    
    return {
        "status": "success",
        "message": f"System Secured: Traffic from {threat.ip_address} Blocked."
    }

# --- 4. AUDIT & STATS ROUTES ---
@app.get("/api/audit-logs")
async def get_audit_logs():
    return demo_audit_logs

@app.get("/api/threat-stats")
async def get_threat_stats():
    # Fallback to static data for demo reliability
    return {
        "total_monitored_devices": 1204,
        "critical": 2,
        "high": 14,
        "medium": 34,
        "low": 45
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)