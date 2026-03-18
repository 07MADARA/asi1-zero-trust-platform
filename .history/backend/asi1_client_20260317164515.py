import os
from openai import OpenAI
from dotenv import load_dotenv

# This loads the hidden keys from your .env file
load_dotenv()

class ASIOneClient:
    def __init__(self):
        # Now it safely pulls the key from the environment, not directly from the code!
        self.client = OpenAI(
            api_key=os.getenv("ASI_ONE_API_KEY"),
            base_url="https://api.asi1.ai/v1"
        )
        # ... rest of your code ...
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