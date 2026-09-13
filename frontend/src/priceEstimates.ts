// Rough U.S. national-average grocery prices per typical purchase unit
// (e.g. "a bunch", "a dozen", "a lb"). NOT live or store-specific pricing.
export const PRICE_ESTIMATES: Record<string, number> = {
  spaghetti: 1.8,
  garlic: 0.6,
  "olive oil": 7.5,
  "red pepper flakes": 3.0,
  parsley: 1.5,
  parmesan: 4.5,
  broccoli: 2.0,
  carrot: 1.8,
  "bell pepper": 1.2,
  "soy sauce": 3.0,
  ginger: 0.8,
  rice: 3.5,
  eggs: 3.2,
  cheese: 4.0,
  butter: 4.5,
  salt: 1.0,
  pepper: 3.0,
  "chicken breast": 4.5,
  "romaine lettuce": 2.0,
  croutons: 2.5,
  "caesar dressing": 3.5,
  "black beans": 1.2,
  tortillas: 3.0,
  onion: 0.8,
  salsa: 3.5,
  lime: 0.5,
  "canned tomatoes": 1.5,
  "vegetable broth": 2.8,
  cream: 3.0,
  flour: 3.5,
  milk: 3.8,
  sugar: 3.2,
  "baking powder": 3.0,
  bread: 3.0,
  shrimp: 9.0,
  peas: 2.2,
  lentils: 2.5,
  "curry powder": 3.5,
  "ground beef": 5.5,
  lettuce: 2.0,
  tomato: 0.7,
  mozzarella: 4.0,
  basil: 2.5,
  "balsamic vinegar": 4.5,
  celery: 2.0,
  "egg noodles": 2.5,
  "chicken broth": 2.8,
  avocado: 1.2,
  salmon: 9.5,
  lemon: 0.6,
};

export function getPriceEstimate(name: string): number | null {
  const price = PRICE_ESTIMATES[name.trim().toLowerCase()];
  return price ?? null;
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
