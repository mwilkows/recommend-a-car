import axios from "axios";
import config from "./config";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  async suggestCars() {
    const response = await axios.post(
        "http://localhost:5000/recommend",
        {
          preferences: config.state.userPreferences
        }
    );

    if (response.status === 200) {
      const recommendations = response.data.recommendations;
      const lines = recommendations.split(/\r?\n/);
      for (let i = 0, len = lines.length; i < len; i++) {
        if (lines[i]) {
          const message = this.createChatBotMessage(lines[i]);
          this.updateChatbotState(message);
        }
      }
    // } else {
    //   const message = this.createChatBotMessage(response.data.message);
    //   this.updateChatbotState(message);
      }
  }

  askNextQuestion(lastAnswer) {
    if (!config.state.userPreferences.budget) {
      const followUpMessage = this.createChatBotMessage(`${lastAnswer} What’s your budget?`);
      this.updateChatbotState(followUpMessage);
    } else if (!config.state.userPreferences.carType) {
      const followUpMessage = this.createChatBotMessage(`${lastAnswer} What type of car are you looking for? (e.g., SUV, Sedan, etc.)`);
      this.updateChatbotState(followUpMessage);
    } else if (!config.state.userPreferences.fuelType) {
      const followUpMessage = this.createChatBotMessage(`${lastAnswer} What fuel type do you prefer? (e.g., Electric, Petrol, Diesel, Hybrid)`);
      this.updateChatbotState(followUpMessage);
    } else if (!config.state.userPreferences.brand) {
      const followUpMessage = this.createChatBotMessage(`${lastAnswer} Do you have a preferred brand in mind (e.g., Toyota, Tesla, Ford, Volkswagen) or any specific features in mind?`);
      this.updateChatbotState(followUpMessage);
    } else {
      const followUpMessage = this.createChatBotMessage(`${lastAnswer} Now I have all responses, let me think...`);
      this.updateChatbotState(followUpMessage);
      void this.suggestCars()
    }
  }

  // Handle budget input
  handleBudgetMessage(message) {
    const budget = message.match(/\d+/g); // Extract budget (numbers)
    if (budget) {
      config.state.userPreferences.budget = parseInt(budget[0], 10);
      this.askNextQuestion(`Got it! A budget of $${budget[0]}.`)
    } else {
      const errorMessage = this.createChatBotMessage("Could you clarify your budget?");
      this.updateChatbotState(errorMessage);
    }
  }

  // Handle car type input
  handleCarTypeMessage(message) {
    const carType = message.match(/(suv|sedan|truck|hatchback)/i); // todo: load data from datasource
    if (carType) {
      config.state.userPreferences.carType = carType[0].toLowerCase();
      this.askNextQuestion(`Great! A ${carType[0]}.`)
    } else {
      const errorMessage = this.createChatBotMessage("Could you clarify the type of car you’re looking for?");
      this.updateChatbotState(errorMessage);
    }
  }

  // Handle fuel type input
  handleFuelTypeMessage(message) {
    const fuelType = message.match(/(electric|petrol|diesel|hybrid)/i); // todo: load data from datasource
    if (fuelType) {
      config.state.userPreferences.fuelType = fuelType[0].toLowerCase();
      this.askNextQuestion(`Understood! A ${fuelType[0]}.`)
    } else {
      const errorMessage = this.createChatBotMessage("Could you clarify the fuel type you’re considering?");
      this.updateChatbotState(errorMessage);
    }
  }

  // Handle fuel type input
  handleBrandMessage(message) {
    const brand = message.match(/(toyota|tesla|ford|volkswagen)/i); // todo: load data from datasource
    if (brand) {
      config.state.userPreferences.brand = brand[0].toLowerCase();
      this.askNextQuestion(`Perfect! A ${brand[0]}`)
    } else {
      const errorMessage = this.createChatBotMessage("Could you clarify the brand you’re considering?");
      this.updateChatbotState(errorMessage);
    }
  }

  // Handle fuel type input
  handleRecommendMessage(message) {
    const recommend = message.match(/(recommend|suggest|propose|advice)/i);
    if (recommend) {
      config.state.userPreferences.brand = null;
      config.state.userPreferences.budget = null;
      config.state.userPreferences.fuelType = null;
      config.state.userPreferences.carType = null;
      config.state.userPreferences.features = [];
      this.askNextQuestion(`Sure! Let’s find the perfect car for you.`)
    } else {
      this.handleDefault()
    }
  }

  handleDefault() {
    const message = this.createChatBotMessage("I didn’t understand that. Could you provide more details?");
    this.updateChatbotState(message);
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}


export default ActionProvider;