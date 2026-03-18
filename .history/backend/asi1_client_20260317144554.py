import os
import uuid
from openai import OpenAI

class ASIOneClient:
    def __init__(self):
        # Replace "YOUR_ASI1_API_KEY" with your actual key from the hackathon dashboard
        self.api_key = os.getenv("ASI_ONE_API_KEY", "sk_051c6dc3206f4cc8a9a985f80b94c74e86a77e75b30d44a482110dd7d5a92480") 
        self.client = OpenAI(
            api_key=self.api_key,
            base_url="https://api.asi1.ai/v1"
        )
        self.session_id = str(uuid.uuid4())
    
    def generate_completion(self, prompt: str, model: str = "asi1-extended", temperature: float = 0.2):
        """Base method for calling the ASI:One API."""
        try:
            response = self.client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                extra_headers={"x-session-id": self.session_id},
                temperature=temperature
            )
            return response.choices[0].message.content
        except Exception as e:
            return f'{{"status": "error", "message": "{str(e)}"}}'