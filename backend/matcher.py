from __future__ import annotations
from recipes import RECIPES


def _normalize(items: list[str]) -> set[str]:
    return {item.strip().lower() for item in items if item.strip()}


def match_recipes(have_ingredients: list[str]) -> list[dict]:
    have = _normalize(have_ingredients)
    results = []

    for recipe in RECIPES:
        needed = _normalize(recipe["ingredients"])
        have_for_recipe = sorted(needed & have)
        missing = sorted(needed - have)
        match_ratio = len(have_for_recipe) / len(needed) if needed else 0.0

        results.append({
            "name": recipe["name"],
            "instructions": recipe["instructions"],
            "have": have_for_recipe,
            "missing": missing,
            "match_ratio": round(match_ratio, 2),
        })

    results.sort(key=lambda r: (-r["match_ratio"], len(r["missing"])))
    return results
