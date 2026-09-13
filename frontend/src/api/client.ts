import type { MatchResponse, RecipesResponse } from "../types/api";

const BASE_URL = import.meta.env.VITE_API_URL ?? `http://${window.location.hostname}:8000`;

export async function matchRecipes(ingredients: string[]): Promise<MatchResponse> {
  const res = await fetch(`${BASE_URL}/match`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

export async function listRecipes(): Promise<RecipesResponse> {
  const res = await fetch(`${BASE_URL}/recipes`);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}
