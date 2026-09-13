from __future__ import annotations
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import MatchRequest, MatchResponse, RecipeMatch
from matcher import match_recipes

app = FastAPI(title="Meal Planner")

extra_origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=extra_origins,
    allow_origin_regex=r"http://(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):5173",
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/match", response_model=MatchResponse)
def match(request: MatchRequest):
    results = match_recipes(request.ingredients)
    return MatchResponse(matches=[RecipeMatch(**r) for r in results])
