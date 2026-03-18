import json
from typing import List, Dict

class ThreatAnalystAgent:
    def __init__(self, asi_client):
        self.asi = asi_client
    
    def analyze_log(self, log_data: str) -> Dict:
        prompt = f"""
        Analyze this industrial security log for threats: {log_data}
        Provide a JSON response with exactly these keys:
        - threat_level (critical/high/medium/low)
        - threat_type
        - affected_systems
        - remediation_steps
        """
        analysis = self.asi.generate_completion(prompt, model="asi1", temperature=0.3)
        try:
            return json.loads(analysis)
        except:
            return {"raw_analysis": analysis}

    def generate_threat_report(self, threats: List[Dict]) -> str:
        threat_summary = json.dumps(threats, indent=2)
        prompt = f"""
        Generate a CISO-level cybersecurity threat report based on these ICS findings: {threat_summary}
        Include an Executive Summary, Key Threats, and Immediate Action Plan.
        """
        return self.asi.generate_completion(prompt, model="asi1-extended", temperature=0.5)