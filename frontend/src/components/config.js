import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./action";
import MessageParser from "./parser";

const config = {
  initialMessages: [
    createChatBotMessage("Hi! I'm a car-recommender chat assistant. How can I assist you today?"),
  ],
  actionProvider: ActionProvider,
  messageParser: MessageParser,
  state: {
    userPreferences: {
      budget: null,
      carType: null,
      fuelType: null,
      brand: null,
      features: [],
    },
  }
};

export default config;
