from src.llama_agent import LlamaAgent
from src.extraction_agent import ExtractionAgent
import re


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
        month_pattern = (
            r"(?:January|February|March|April|May|June|July|August|September|October|November|December|"
            r"Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec|"
            r"0?[1-9]|1[0-2])"
        )  # Full month names, abbreviations, or month numbers (01-12)

        # Define the pattern for day and year (optional day and required 4-digit year)
        day_pattern = r"(?:[ \n,/]*\d{1,2})?"  # Optional day (1-31), can be separated by space, newline, or slash
        year_pattern = r"[ \n,/]*\d{4}"  # 4-digit year

        # Final date pattern combining month, day (optional), and year
        date_pattern = f"{month_pattern}{year_pattern}"

        # Full pattern to match date ranges "{date} to {date}" or "{date} to Current"
        pattern = (
            r"(" + date_pattern + r")[ \n]*to[ \n]*(" + date_pattern + r"|current)"
        )

        patmat = re.findall(pattern, text, re.IGNORECASE)

        matches = [re.findall(r"\d{4}", " ".join(i)) for i in patmat]
        matches = sorted(matches, key=lambda x: x[0])
        if len(matches) == 0:
            return 0

        total_time_jobless = 0

        for i in range(1, len(matches) - 1):
            r = 2024
            if len(matches[i - 1]) > 1:
                r = matches[i - 1][1]
            gap = int(matches[i][0]) - int(r)
            if gap > 2:
                total_time_jobless += gap

        return total_time_jobless
        # pass
