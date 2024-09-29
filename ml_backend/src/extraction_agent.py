import pandas as pd
import regex as re
from pypdf import PdfReader

class ExtractionAgent:

    def __init__(self):
        self.DIR = "data/"
        self.RESUME_STOP_KEYWORDS = {
                "skills": "skills",
                "competencies": "skills",
                "skill highlight": "skills",
                "qualification": "skills",
                "experience": "experience",
                "work history": "experience",
                "summary": "summary",
                "profile": "summary",
                "objective": "summary",
                "career focus": "summary",
                "education": "education",
                "training": "training",
                "educational background": "education",
                "educational highlight": "education",
                "accomplishment": "accomplishments",
                "highlight": "accomplishments",
                "achievenment": "accomplishments",
                "awards": "accomplishments",
                "licenses": "licenses",
                "certifications": "licenses",
                "affiliations": "volunteer",
                "volunteer": "volunteer",
                "community service": "volunteer",
                "interests": "interests",
                "additional information": "interests",
                "publication":"publications",
                "technical reports": "publications",
                "languages": "languages",
                "personal information": "personal information",
                "contact information": "contact information",
                "salary": "salary"
            }

    def get_pdf_text(self, pdf_path):
        # Load the PDF file
        text = "" 
        reader = PdfReader(self.DIR + pdf_path)
        for page in reader.pages:
            text += page.extract_text()
        id = pdf_path.split('_')[-1].split('.')[0]

        return text
    
    def get_sections(self, text):
        def is_section(line: str):
            linar = list(line.lower().split())
            rawline = " ".join(linar)
            if len(linar) >= 1 and len(linar) < 4:
                inds = [i for i in self.RESUME_STOP_KEYWORDS if rawline.find(i) != -1]
                if inds:
                    return self.RESUME_STOP_KEYWORDS[inds[0]]
            return False
        
        sections = {}
        current_section = "skiplines"

        # Split the text into lines
        lines = text.splitlines()   

        for line in lines:
            line = line.strip()
            section = is_section(line)
            if section:
                current_section = section
                if not section in sections:
                    sections[current_section] = []
            else:
                # concat the current line with the last list element in the current section content list
                if current_section != "skiplines":
                    sections[current_section].append(line)

        for i in sections:
            sections[i] = "\n".join(sections[i])

        return sections



    def extract_company_names(self, text):
        # Define the regex pattern for matching month names (full and abbreviated), and month numbers
        month_pattern = r'(?:January|February|March|April|May|June|July|August|September|October|November|December|' \
                        r'Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec|' \
                        r'0?[1-9]|1[0-2])'  # Full month names, abbreviations, or month numbers (01-12)
        
        # Define the pattern for day and year (optional day and required 4-digit year)
        day_pattern = r'(?:[ \n,/]*\d{1,2})?'  # Optional day (1-31), can be separated by space, newline, or slash
        year_pattern = r'[ \n,/]*\d{4}'  # 4-digit year
        
        # Final date pattern combining month, day (optional), and year
        date_pattern = f'{month_pattern}{year_pattern}'
        
        # Full pattern to match date ranges "{date} to {date}" or "{date} to Current"
        pattern = r'([^0-9\n]*\n*)?' \
                r'([^0-9\n]*\n*)?' \
                r'(' + date_pattern + r'[ \n]*to[ \n]*(?:' + date_pattern + r'|current))' \
                r'[ \n]*'\
                r'(.*\n*)?' \
                r'(.*\n)?'
        
        try :

        # Extract the matched patterns from the text
            matches = re.findall(pattern, text, re.IGNORECASE)

            # If no matches, return empty list
            if not matches:
                return []

            companies = []

            # print(matches)

            counter = -1
            
            for match in matches:
                # Collect surrounding lines and relevant info
                baseline = [line for line in match if line]
                if counter == -1:
                    counter = len(baseline)
                baseliner = baseline[-counter:]
                # print(baseliner)
                final = ""
                for i in range(3):
                    if (counter - i - 3 != 0):
                        final += baseliner[i]
                companies.append(final)
        except Exception as e:
            companies = []
            print(f"Error in extracting companies for {text} : {e}, {matches}")
        return companies
    
    def get_reco_texts(self, reco_txt_paths):
        reco_texts = ""
        for reco_txt_path in reco_txt_paths:
            reco_texts += open(self.DIR + reco_txt_path, "r").read()

        return reco_texts