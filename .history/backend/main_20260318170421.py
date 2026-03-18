from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import uvicorn

# Import our custom modules
from asi1_client import ASIOneClient
from agents.threat_analyst import ThreatAnalystAgent
from agents.vuln_scanner import VulnScannerAgent
from database.mongodb import threats_collection, iot_devices_collection


app = FastAPI(title="AI Industrial Threat Shield")

# Allow the React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

@app.get("/api/threat-stats")
async def get_threat_stats():
    # Fetch real counts from the MongoDB database
    critical = await threats_collection.count_documents({"severity": "critical"})
    high = await threats_collection.count_documents({"severity": "high"})
    
    return {
        "total_monitored_devices": await iot_devices_collection.count_documents({}),
        "critical": critical,
        "high": high,
        "medium": 12,
        "low": 45
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)