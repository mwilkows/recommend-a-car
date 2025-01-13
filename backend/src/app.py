from flask import Flask, jsonify, request
from flask_cors import CORS

from datasource import INVENTORY
from logic.recommendations import get_car_recommendations, get_car_recommendations_with_memory
from datasource.inventory import Inventory

app = Flask(__name__)
CORS(app, resources={r"/recommend": {"origins": "http://localhost:3000"}})

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/cars', methods=['GET'])
def get_car():
    return jsonify({"cars": Inventory.fetch(INVENTORY)})


@app.route("/recommend", methods=["POST"])
def recommend():
    user_data = request.json
    preferences = user_data.get("preferences")
    if not preferences:
        return jsonify({"error": "No preferences provided"}), 400

    recommendations = get_car_recommendations(preferences)
    return jsonify({"recommendations": recommendations})



if __name__ == '__main__':
    app.run(debug=True)
