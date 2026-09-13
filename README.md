# Meal Planner

Enter the ingredients you have on hand, get matching recipes from a built-in recipe list,
and see what's missing from each one.

## Setup

### Backend

```
cd meal-planner\backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs at http://localhost:8000. Test it: http://localhost:8000/health

### Frontend (separate terminal)

```
cd meal-planner\frontend
npm install
npm run dev
```

Open http://localhost:5173

## How It Works

1. Type in ingredients you have (comma-separated)
2. Backend matches them against a built-in recipe list ([backend/recipes.py](backend/recipes.py))
3. Recipes are ranked by percentage of ingredients you already have
4. Missing ingredients are called out per recipe

## Next Steps

- Add more recipes to `backend/recipes.py`
- Add a weekly meal plan + consolidated grocery list feature
- Swap the built-in recipe list for a real recipe API (e.g. Spoonacular) once you have an API key
