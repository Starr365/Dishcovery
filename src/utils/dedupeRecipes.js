export function dedupeRecipes(recipes) {
  if (!Array.isArray(recipes)) return [];
  const map = new Map();
  for (const recipe of recipes) {
    if (recipe && recipe.id) {
      if (!map.has(recipe.id)) {
        map.set(recipe.id, recipe);
      }
    }
  }
  return Array.from(map.values());
}
