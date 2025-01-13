import os

import openai

api_key = os.environ.get('GOOGLE_API_KEY')
assert api_key, "Google API key is required"

selected_model = "gemini-1.5-pro"

