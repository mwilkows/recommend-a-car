from datasource import INVENTORY
from datasource.inventory import Inventory
# from llm.open_ai.prompt.builder import recommendation_chain
from llm.google.prompt.builder import recommendation_chain, conversation_chain


def get_car_recommendations(user_preferences):
    # Prepare inventory as a string
    inventory_str = "\n".join(
        [f"{car['Brand']} {car['Model']} (${car['Price']}), Type: {car['Type']}, Fuel: {car['Fuel Type']}"
         for car in Inventory.fetch(INVENTORY)]
    )
    # Call the chain
    response = recommendation_chain.run(
        preferences=user_preferences, inventory=inventory_str
    )
    return response

def get_car_recommendations_with_memory(user_preferences):
    response = conversation_chain.invoke(user_preferences)
    return response