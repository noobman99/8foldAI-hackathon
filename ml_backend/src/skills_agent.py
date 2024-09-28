from src.llama_agent import LlamaAgent

class SkillsAgent:
    def __init__(self):
        self.llama_agent = LlamaAgent()

    def get_skills_trust_score(self, role, skills_text, experience_text):
        system_prompt = f"Your role is to score the accuracy of information provided by \
                        a candidate applying for the role of {role}. \
                        You are provided the candidate's experienence along with his skills. \
                        Use this information to judge whether or not the skills align with \
                        the work experience of the candidate. If there is a skill that cannot be obtained \
                        by the given work experience, give a lower score. \
                        Give only a score from 1 to 5. Do not \
                        say anything else"
        user_prompt = "Experience :" + experience_text + "\n Skills: " + skills_text
        
        return self.llama_agent.generate(system_prompt, user_prompt, max_new_tokens=10)