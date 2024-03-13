# from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any, List

class Post(BaseModel):
    post_url: str
    title: str
    created_at: str
    num_hugs: int
    patient_description: str
    assessment: str
    question: str
    selected: bool = True
    comments: Dict[str, Any]