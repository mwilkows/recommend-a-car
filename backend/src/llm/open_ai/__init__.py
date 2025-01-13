import os

import openai

openai.api_key = os.environ.get('OPENAI_API_KEY')
assert openai.api_key, "OpenAI API key is required"

# selected_model = "gpt-4o-mini"
selected_model = "gpt-3.5-turbo"

