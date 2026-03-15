import { useState, useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import { fetchRecipeById } from '../api/recipeService';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const raw = localStorage.getItem('dishcovery:favorites');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Keep local storage synced
  useEffect(() => {
    localStorage.setItem('dishcovery:favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Convert an array of IDs into multiple query calls
  // React Query useQueries hooks up dynamically based on state
  const favoriteQueries = useQueries({
    queries: favoriteIds.map(id => ({
      queryKey: ['recipe', 'favorite', id],
      queryFn: () => fetchRecipeById(id),
      staleTime: 60 * 60 * 1000, 
    })),
  });

  // Extract the actual objects and gracefully filter out unfetched or errored dependencies
  const favoritesData = favoriteQueries
    .map(query => query.data)
    .filter(Boolean); // Only non-null full recipe objects

  return {
    favoriteIds,
    toggleFavorite,
    favoritesData,
    isLoadingFavorites: favoriteQueries.some(query => query.isLoading)
  };
}
