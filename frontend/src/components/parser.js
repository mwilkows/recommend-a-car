class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    const budget = /budget|\$\d+|\d+\$|^\d+$/gi
    const type = /type|suv|sedan|truck|hatchback/gi
    const fuel = /fuel|electric|petrol|diesel|hybrid/gi
    const brand = /brand|toyota|tesla|ford|volkswagen/gi
    const recommend = /recommend|suggest|propose|advice/gi


    if (lowerCaseMessage.match(budget)) {
      this.actionProvider.handleBudgetMessage(lowerCaseMessage);
    } else if (lowerCaseMessage.match(type)) {
      this.actionProvider.handleCarTypeMessage(lowerCaseMessage);
    } else if (lowerCaseMessage.match(fuel)) {
      this.actionProvider.handleFuelTypeMessage(lowerCaseMessage);
    } else if (lowerCaseMessage.match(brand)) {
      this.actionProvider.handleBrandMessage(lowerCaseMessage);
    } else if (lowerCaseMessage.match(recommend)) {
      this.actionProvider.handleRecommendMessage(lowerCaseMessage);
    } else {
      this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser;