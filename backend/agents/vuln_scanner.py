import json
from typing import Dict

class VulnScannerAgent:
    def __init__(self, asi_client):
        self.asi = asi_client
    
    def scan_industrial_iot(self, telemetry_data: Dict) -> Dict:
        prompt = f"""
        You are an elite Industrial Control Systems (ICS) security AI. 
        Analyze this live telemetry and firmware state from a 4-stage axial compressor unit:
        {json.dumps(telemetry_data, indent=2)}
        
        Identify:
        1. Cyber-Physical Threats: Are the vibration levels or modal frequencies being artificially manipulated by a malicious actor?
        2. Firmware Vulnerabilities: Known CVEs.
        3. Attack Vectors: How the PLC might be compromised.
        
        Output strictly as a valid JSON object.
        """
        response = self.asi.generate_completion(prompt, model="asi1-extended", temperature=0.1)
        try:
            return json.loads(response)
        except Exception as e:
            return {"status": "error", "details": str(e), "raw": response}