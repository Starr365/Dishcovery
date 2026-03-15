import { useEffect, useState, useRef, useCallback } from 'react'
import SearchBar from './components/SearchBar'
import RecipeList from './components/RecipeList'
import DishcoveryLanding from './components/DishcoveryLanding'
import Modal from './components/Modal'
import SkeletonRecipeCard from './components/SkeletonRecipeCard'
import { useInfiniteRecipes } from './hooks/useInfiniteRecipes'
import { useRecipeSearch } from './hooks/useRecipeSearch'
import { useFavorites } from './hooks/useFavorites'
import { dedupeRecipes } from './utils/dedupeRecipes'
function App() {
  const [search, setSearch] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  // Initialize saved search early
  useEffect(() => {
    const saved = localStorage.getItem('dishcovery:search')
    if (saved) setSearch(saved)
  }, [])

  // 1. Infinite Feed Data
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingInfinite,
  } = useInfiniteRecipes()

  // 2. Search Data
  const {
    data: searchData,
    isLoading: isLoadingSearch
  } = useRecipeSearch(search)

  // 3. Favorites Data
  const {
    favoriteIds,
    toggleFavorite,
    favoritesData,
    isLoadingFavorites
  } = useFavorites()

  // Determine what list of recipes to display
  let displayedRecipes = []
  let isLoading = false

  if (showFavoritesOnly) {
    displayedRecipes = favoritesData
    isLoading = isLoadingFavorites
  } else if (search.trim().length > 0) {
    // If searching, show search hits
    displayedRecipes = searchData || []
    isLoading = isLoadingSearch
  } else {
    // Default: infinite scroll randoms
    const flatRecipes = infiniteData?.pages.flat() || []
    displayedRecipes = dedupeRecipes(flatRecipes)
    isLoading = isLoadingInfinite
  }

  // Infinite Scroll Observer Setup
  const observer = useRef()
  const lastRecipeElementRef = useCallback(
    (node) => {
      // Don't trigger if searching or viewing favorites, or if currently fetching
      if (isLoading || isFetchingNextPage || showFavoritesOnly || search.trim().length > 0) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, isFetchingNextPage, showFavoritesOnly, search, hasNextPage, fetchNextPage]
  )

  return (
    <div className="min-h-screen">
      <DishcoveryLanding />

      <main id='recipes' className="mx-auto max-w-6xl px-4 py-8">
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

            {/* UI Feed loader indicator */}
            {isLoading && displayedRecipes.length === 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(6)].map((_, i) => (
                  <SkeletonRecipeCard key={i} />
                ))}
              </div>
            ) : (
              <RecipeList
                recipes={displayedRecipes}
                favorites={favoriteIds}
                onToggleFavorite={toggleFavorite}
                onOpen={setSelectedRecipe}
              />
            )}

            {/* Infinite Scroll Sentinel */}
            {!showFavoritesOnly && search.trim().length === 0 && (
              <div
                ref={lastRecipeElementRef}
                className="h-20 mt-8 flex justify-center items-center text-slate-500"
              >
                {isFetchingNextPage ? (
                  <svg className="animate-spin h-8 w-8 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : hasNextPage ? (
                  <span className="text-sm font-medium tracking-wide">Scroll down for more</span>
                ) : (
                  <span className="text-sm font-medium tracking-wide">No more recipes</span>
                )}
              </div>
            )}

            {/* If searching or favorites but need an end indicator */}
            {(showFavoritesOnly || search.trim().length > 0) && displayedRecipes.length > 0 && (
              <div className="h-10 mt-8 flex justify-center items-center text-neutral-400">
                End of results
              </div>
            )}

        {selectedRecipe && (
          <Modal isOpen={true} onClose={() => setSelectedRecipe(null)}>
            <article>
              <div className="overflow-hidden">
                <div className="relative aspect-video sm:aspect-21/9 w-full overflow-hidden">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 md:p-10">
                  <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      {selectedRecipe.category && (
                        <span className="mb-3 inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-700">
                          {selectedRecipe.category}
                        </span>
                      )}
                      <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                        {selectedRecipe.name}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(selectedRecipe.id)}
                      className="btn-accent whitespace-nowrap rounded-full! shrink-0"
                    >
                      {favoriteIds.includes(selectedRecipe.id) ? '❤️ Favorited' : '🤍 Favorite'}
                    </button>
                  </div>

                  <section className="mb-10">
                    <h3 className="mb-4 text-xl font-bold text-slate-800">Ingredients</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecipe.ingredients.map((ing, idx) => (
                        <span key={idx} className="rounded-full bg-slate-100 border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-4 text-xl font-bold text-slate-800">Instructions</h3>
                    {Array.isArray(selectedRecipe.instructions) ? (
                      <div className="space-y-4">
                        {selectedRecipe.instructions.map((step, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600">
                              {idx + 1}
                            </div>
                            <p className="text-base font-medium text-slate-600 leading-relaxed pt-1">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-base font-medium text-slate-600 leading-relaxed">
                        {String(selectedRecipe.instructions)}
                      </p>
                    )}
                  </section>
                </div>
              </div>
            </article>
          </Modal>
        )}
      </main>
    </div>
  )
}

export default App
