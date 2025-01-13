from langchain_openai.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

from llm.open_ai import selected_model

# Define a prompt template
recommendation_prompt = PromptTemplate(
    input_variables=["preferences", "inventory"],
    template=(
        "You are an expert car advisor. Based on the following user preferences:\n"
        "{preferences}\n"
        "and this inventory:\n"
        "{inventory}\n"
        "Recommend the best car options and explain your choices."
    )
)

# Initialize the OpenAI LLM
llm = ChatOpenAI(model=selected_model, temperature=0.7)

# Create the recommendation chain
recommendation_chain = LLMChain(llm=llm, prompt=recommendation_prompt)
