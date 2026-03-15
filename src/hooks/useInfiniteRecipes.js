import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRandomMeals } from '../api/recipeService';

// Using useInfiniteQuery to simulate infinite scroll
export function useInfiniteRecipes() {
  return useInfiniteQuery({
    queryKey: ['recipes', 'infinite'],
    // PageParam isn't natively supported by standard TheMealDB random endpoint, 
    // so we just fetch 6 random meals every time we ask for a new page.
    queryFn: async () => {
      // simulate 'pages' by fetching random batches
      return await fetchRandomMeals(6);
    },
    getNextPageParam: (lastPage, allPages) => {
      // We will never hit an official "end" of randoms so we just always 
      // return the next artificial page index if we got results.
      // If we somehow got 0 results, we're done.
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
}
