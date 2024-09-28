# use fastapi
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

from src.user_agent import UserAgent


class User(BaseModel):
    name: str
    role: str
    pdf_path: str
    reco_txt_paths: list
    ideal_skills_list: list

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/user_analysis")
async def user_analysis(user: User):
    try:
        user_agent = UserAgent()
        analysis = user_agent.get_user_analysis(user.role, user.pdf_path, user.reco_txt_paths, user.ideal_skills_list)
        return JSONResponse(content=jsonable_encoder(analysis))
    except Exception as e:
        return JSONResponse(content=jsonable_encoder({"error": str(e)}), status_code=500)
