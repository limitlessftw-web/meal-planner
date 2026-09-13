export interface RecipeMatch {
  name: string;
  instructions: string;
  have: string[];
  missing: string[];
  match_ratio: number;
}

export interface MatchResponse {
  matches: RecipeMatch[];
}

export interface RecipeSummary {
  name: string;
}

export interface RecipesResponse {
  recipes: RecipeSummary[];
}
