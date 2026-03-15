import { useQuery } from '@tanstack/react-query';
import { searchMeals } from '../api/recipeService';

export function useRecipeSearch(query) {
  return useQuery({
    queryKey: ['recipes', 'search', query],
    queryFn: () => searchMeals(query),
    enabled: !!query && query.length > 0,
    staleTime: 5 * 60 * 1000, 
  });
}
