import openai

from llm.open_ai import selected_model

prompt = "Recommend a car based on these preferences: {preferences}"

def get_recommendation(preferences):
    response = openai.ChatCompletion.fetch(
        model=selected_model,
        messages=[{"role": "user", "content": prompt.format(preferences=preferences)}],
    )
    return response['choices'][0]['message']['content']
