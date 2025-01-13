from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain, ConversationChain
from langchain.memory import ConversationBufferMemory, ConversationBufferWindowMemory
from langchain.prompts import PromptTemplate

from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_openai import ChatOpenAI

from llm.open_ai import selected_model

store = {}  # memory is maintained outside the chain


def get_session_history(session_id: str) -> InMemoryChatMessageHistory:
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
        return store[session_id]

    memory = ConversationBufferWindowMemory(
        chat_memory=store[session_id],
        k=3,
        return_messages=True,
    )
    assert len(memory.memory_variables) == 1
    key = memory.memory_variables[0]
    messages = memory.load_memory_variables({})[key]
    store[session_id] = InMemoryChatMessageHistory(messages=messages)
    return store[session_id]

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

# Create a conversation chain with memory
conversation_chain = chain = RunnableWithMessageHistory(llm, get_session_history)