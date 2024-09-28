from src.llama_agent import LlamaAgent
from src.extraction_agent import ExtractionAgent

class ExperienceAgent:
    def __init__(self):
        self.llama_agent = LlamaAgent()
        self.extraction_agent = ExtractionAgent()

    def vagueness_score(self, text):
        system_prompt = "You are a hiring agent evaluating a CV. Your task is to score some content between 0 to 5 based on trust. \
                        Consider the following:\n\n \
                        - Vagueness: Heavily penalize vague or unclear statements.\n \
                        - Content Quality: Judge the overall content based on how trustable it sounds.\n\n \
                        Provide only the score as output in the format 'Score: ', and nothing else.\n\n "
        user_prompt = "Content :" + text
        
        return self.llama_agent.generate(system_prompt, user_prompt, max_new_tokens=10)

    def get_timeline_analysis(self, text):
        #TODO
        pass