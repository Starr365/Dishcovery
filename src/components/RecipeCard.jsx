function RecipeCard({ recipe, isFavorite, onToggleFavorite, onOpen }) {
  const { name, image, ingredients } = recipe

  return (
    <button
      type="button"
      onClick={onOpen}
      className="card overflow-hidden group text-left"
      aria-label={`Open details for ${name}`}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite?.() }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-(--color-text) shadow hover:bg-white"
        >
          {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
        </button>
      </div>
      <div className="p-4">
        <h3 className="mb-2 line-clamp-1 text-2xl font-extrabold text-(--color-text)">{name}</h3>
        <p className="text-lg font-semibold text-neutral-700">
          Ingredients: {ingredients.join(', ')}
        </p>
      </div>
    </button>
  )
}

export default RecipeCard


