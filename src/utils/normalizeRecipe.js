export function normalizeRecipe(meal) {
  if (!meal) return null;

  const ingredients = [];
  // TheMealDB has up to 20 ingredients in strIngredient1 to strIngredient20
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    // Only add if the ingredient actually has text
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
    }
  }

  // Parse the instructions splitting by new lines or standardizing it somehow
  // if not we can return string or array string
  const instructions = meal.strInstructions 
    ? meal.strInstructions.split(/\r?\n/).filter(line => line.trim() !== '')
    : [];

  return {
    id: Number(meal.idMeal),
    name: meal.strMeal,
    image: meal.strMealThumb,
    ingredients,
    instructions,
    category: meal.strCategory || 'Uncategorized'
  };
}
