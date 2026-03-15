import { normalizeRecipe } from '../utils/normalizeRecipe';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// The Meal DB API isn't exactly suited for typical 'infinite scroll' endpoints (with ?page=2), 
// so we'll simulate 'infinite scroll' for random meals by hitting randomselection.php or similar. 
// However, 'randomselection.php' requires a premium key. For free, we can map over 10 random.php calls.
export async function fetchRandomMeals(count = 10) {
  const promises = [];
  for (let i = 0; i < count; i++) {
    // lookup a single random meal 
    promises.push(fetch(`${BASE_URL}/random.php`).then(res => res.json()));
  }

  const results = await Promise.all(promises);
  
  // Extract meals and filter out nulls/errors
  const meals = results.flatMap(r => r.meals || []);
  
  // Return the normalized data
  return meals.map(normalizeRecipe).filter(Boolean);
}

// Search meals by query name
export async function searchMeals(query) {
  // If the query is just a single character let's use the first letter search
  const url = query.length === 1 
    ? `${BASE_URL}/search.php?f=${query}`
    : `${BASE_URL}/search.php?s=${query}`;
    
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  
  const data = await response.json();
  
  // API returns `{ meals: null }` if search has no results
  if (!data.meals) return [];

  return data.meals.map(normalizeRecipe).filter(Boolean);
}

// Fetch by ID (useful for hydration of favorites)
export async function fetchRecipeById(id) {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  if (!response.ok) throw new Error('Failed to fetch recipe by ID');
  const data = await response.json();
  
  if (!data.meals || data.meals.length === 0) return null;
  return normalizeRecipe(data.meals[0]);
}
