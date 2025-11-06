import { useEffect, useMemo, useState } from 'react'
import SearchBar from './components/SearchBar'
import RecipeList from './components/RecipeList'
import recipesData from './data/recipes.json'
import DishcoveryLanding from './components/DishcoveryLanding'

function App() {
  // State: recipes (static), search, favorites, show favorites only
  const [recipes] = useState(recipesData)
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('dishcovery:favorites')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [rowsShown, setRowsShown] = useState(2)
  const [currentCols, setCurrentCols] = useState(1)

  // Determine columns by breakpoint to support row-based pagination
  useEffect(() => {
    const getCols = () => {
      if (window.matchMedia('(min-width: 1280px)').matches) return 4
      if (window.matchMedia('(min-width: 1024px)').matches) return 3
      if (window.matchMedia('(min-width: 640px)').matches) return 2
      return 1
    }
    const update = () => setCurrentCols(getCols())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Load initial search from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dishcovery:search')
    if (saved) setSearch(saved)
  }, [])

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('dishcovery:favorites', JSON.stringify(favorites))
  }, [favorites])

  // Filter logic: by name or ingredient, case-insensitive
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = recipes
    if (q) {
      list = list.filter((r) => {
        const inName = r.name.toLowerCase().includes(q)
        const inIngredients = r.ingredients.some((ing) =>
          ing.toLowerCase().includes(q)
        )
        return inName || inIngredients
      })
    }
    if (showFavoritesOnly) {
      list = list.filter((r) => favorites.includes(r.id))
    }
    return list
  }, [recipes, search, favorites, showFavoritesOnly])

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const visibleCount = rowsShown * currentCols
  const visibleRecipes = filtered.slice(0, visibleCount)

  return (
    <div className="min-h-screen">
    {/* Header */}
    < DishcoveryLanding/>

      {/* Main content */}
      <main id='recipes' className="mx-auto max-w-6xl px-4 py-8">
        {!selectedRecipe && (
          <>
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <SearchBar initialQuery={search} onChange={setSearch} />
              <button
                type="button"
                onClick={() => setShowFavoritesOnly((v) => !v)}
                className="btn-accent w-full sm:w-auto"
              >
                {showFavoritesOnly ? 'Show All' : 'Show Favorites Only'}
              </button>
            </div>

            {/* Recipe grid (limited by two rows initially, then adds one row per click) */}
            <RecipeList
              recipes={visibleRecipes}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onOpen={setSelectedRecipe}
            />

            {visibleRecipes.length < filtered.length && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setRowsShown((r) => r + 1)}
                  className="btn-primary"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}

        {selectedRecipe && (
          <article className="mx-auto max-w-3xl">
            <button
              type="button"
              onClick={() => setSelectedRecipe(null)}
              className="mb-6 inline-flex items-center gap-2 text-(--color-text) hover:underline"
            >
              ← Back to recipes
            </button>
            <div className="card overflow-hidden">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="h-auto w-full object-cover"
              />
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="text-3xl font-extrabold text-(--color-text)">
                    {selectedRecipe.name}
                  </h2>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(selectedRecipe.id)}
                    className="btn-accent whitespace-nowrap"
                  >
                    {favorites.includes(selectedRecipe.id) ? '❤️ Favorited' : '🤍 Favorite'}
                  </button>
                </div>

                <section className="mb-6">
                  <h3 className="mb-2 text-xl font-extrabold">Ingredients</h3>
                  <p className="text-lg font-semibold text-neutral-800">
                    {selectedRecipe.ingredients.join(', ')}
                  </p>
                </section>

                <section>
                  <h3 className="mb-2 text-xl font-extrabold">Instructions</h3>
                  {Array.isArray(selectedRecipe.instructions) ? (
                    <ul className="list-disc space-y-2 pl-6">
                      {selectedRecipe.instructions.map((step, idx) => (
                        <li key={idx} className="font-semibold text-neutral-800">
                          {step}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="list-disc space-y-2 pl-6">
                      <li className="font-semibold text-neutral-800">
                        {String(selectedRecipe.instructions)}
                      </li>
                    </ul>
                  )}
                </section>
              </div>
            </div>
          </article>
        )}
      </main>
    </div>
  )
}

export default App
