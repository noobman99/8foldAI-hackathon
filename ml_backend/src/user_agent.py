from src.llama_agent import LlamaAgent
from src.extraction_agent import ExtractionAgent
from src.skills_agent import SkillsAgent
from src.reco_agent import RecoAgent
from src.experience_agent import ExperienceAgent

class UserAgent:
    def __init__(self):
        self.llama_agent = LlamaAgent()
        self.extraction_agent = ExtractionAgent()
        self.skills_agent = SkillsAgent()
        self.reco_agent = RecoAgent()
        self.experience_agent = ExperienceAgent()

    def get_user_analysis(self, role: str, pdf_path: str, reco_txt_paths: list, ideal_skills_list: list):
        full_text = self.extraction_agent.get_pdf_text(pdf_path)
        sections = self.extraction_agent.get_sections(full_text)
        experience = sections.get("experience", "")
        skills = sections.get("skills", "")
        reco_texts = self.extraction_agent.get_reco_texts(reco_txt_paths)

        skills_trust_score = self.skills_agent.get_skills_trust_score(role, skills, experience)
        skills_relevance_score = self.skills_agent.get_skills_relevance_score(role, skills, ideal_skills_list, experience)
        experience_vagueness_score = self.experience_agent.vagueness_score(experience)
        timeline_analysis = self.experience_agent.get_timeline_analysis(experience)
        reco_trust_score = self.reco_agent.trust_score(reco_texts)
        reco_sentiment_score = self.reco_agent.sentiment_score(reco_texts)

        return {
            "skills_trust_score": skills_trust_score,
            "experience_vagueness_score": experience_vagueness_score,
            "timeline_analysis": timeline_analysis,
            "reco_trust_score": reco_trust_score,
            "reco_sentiment_score": reco_sentiment_score
        }

