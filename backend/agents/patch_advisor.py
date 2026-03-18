class PatchAdvisorAgent:
    def __init__(self, asi_client):
        self.asi = asi_client

    def generate_hotfix(self, vulnerability_report: dict, system_os: str = "Linux/ICS") -> str:
        prompt = f"""
        Based on this industrial vulnerability report: {vulnerability_report}
        Target Environment: {system_os}
        
        Generate a secure, production-ready bash script or firewall configuration to isolate the compromised PLC and patch the vulnerability. 
        Do not include markdown. Output only the raw code.
        """
        return self.asi.generate_completion(prompt, model="asi1-agentic", temperature=0.1)