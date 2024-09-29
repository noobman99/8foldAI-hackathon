from src.llama_agent import LlamaAgent

class RecoAgent:
    def __init__(self):
        self.llama_agent = LlamaAgent()

    def trust_score(self, reco_text):
        system_prompt = "You are a hiring agent evaluating a CV. Your task is to score some content between 0 to 5 based on trust. \
                        Consider the following:\n\n \
                        - Vagueness: Heavily penalize vague or unclear statements.\n \
                        - Content Quality: Judge the overall content based on how trustable it sounds.\n\n \
                        Provide only the score as output in the format 'Score: ', and nothing else.\n\n "
        user_prompt = "Content :" + reco_text
        
        return self.llama_agent.generate(system_prompt, user_prompt, max_new_tokens=10)
    
    def sentiment_score(self, reco_text):
        system_prompt = "You are a hiring agent evaluating a CV. Your task is to score some content between 0 to 5 based on sentiment. \
                        Consider the following:\n\n \
                        - Positive Sentiment: Reward positive statements.\n \
                        - Negative Sentiment: Penalize negative statements.\n\n \
                        Provide only the score as output in the format 'Score: ', and nothing else.\n\n "
        user_prompt = "Content :" + reco_text
        
        return self.llama_agent.generate(system_prompt, user_prompt, max_new_tokens=10)