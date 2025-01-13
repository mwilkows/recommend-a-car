import pytest
import requests


url = "http://127.0.0.1:5000/recommend"

def test_recommend():
    data = {"preferences": "I want a sedan under $30,000, preferably electric."}
    response = requests.post(url, json=data)
    print(response)
    print(response.json())
