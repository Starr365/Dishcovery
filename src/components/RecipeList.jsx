import RecipeCard from './RecipeCard'

function RecipeList({ recipes, favorites, onToggleFavorite, onOpen }) {
  if (!recipes?.length) {
    return (
      <div className="text-center text-neutral-600">
        No recipes found. Try a different search.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.includes(recipe.id)}
          onToggleFavorite={() => onToggleFavorite(recipe.id)}
          onOpen={() => onOpen?.(recipe)}
        />)
      )}
    </div>
  )
}

export default RecipeList


