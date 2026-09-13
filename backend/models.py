from __future__ import annotations
from pydantic import BaseModel


class MatchRequest(BaseModel):
    ingredients: list[str]


class RecipeMatch(BaseModel):
    name: str
    instructions: str
    have: list[str]
    missing: list[str]
    match_ratio: float


class MatchResponse(BaseModel):
    matches: list[RecipeMatch]
