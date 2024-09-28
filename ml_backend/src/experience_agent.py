from src.llama_agent import LlamaAgent
from src.extraction_agent import ExtractionAgent

class ExperienceAgent:
    def __init__(self):
        self.llama_agent = LlamaAgent()
        self.extraction_agent = ExtractionAgent()

    def vagueness_score(self, text):
        #TODO
        pass

    def get_timeline_analysis(self, text):
        #TODO
        pass