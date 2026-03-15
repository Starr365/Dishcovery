import React from 'react';

function RecipeCard({ recipe, isFavorite, onToggleFavorite, onOpen }) {
  const { name, image, ingredients, category } = recipe
  
  const displayIngredients = ingredients?.slice(0, 3).join(', ') + 
    (ingredients?.length > 3 ? '...' : '');

  return (
    <button
      type="button"
      onClick={onOpen}
      className="card group relative flex flex-col overflow-hidden text-left bg-white border border-slate-100 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      aria-label={`Open details for ${name}`}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Subtle gradient overlay to make tags pop */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        {/* Favorite Button (Glassmorphism) */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite?.() }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute right-4 top-4 rounded-full backdrop-blur-md px-3 py-1.5 text-sm font-semibold shadow-sm transition-all duration-200 active:scale-95 ${
            isFavorite 
              ? 'bg-rose-500/90 text-white hover:bg-rose-600' 
              : 'bg-white/80 text-slate-700 hover:bg-white'
          }`}
        >
          {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
        </button>

        {/* Category Badge overlay on hover/bottom */}
        {category && (
          <div className="absolute bottom-4 left-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold tracking-wider uppercase text-rose-600 shadow-sm transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {category}
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="mb-2 line-clamp-1 text-xl font-bold text-slate-800 transition-colors group-hover:text-rose-600">
          {name}
        </h3>
        <p className="text-sm font-medium text-slate-500 line-clamp-2 leading-relaxed mt-auto">
          {displayIngredients}
        </p>
      </div>
    </button>
  )
}

export default React.memo(RecipeCard)
