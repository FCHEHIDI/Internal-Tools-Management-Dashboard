import { useQuery } from '@tanstack/react-query';
import { getToolById } from '@/services/api/tools';

interface UseToolByIdOptions {
  enabled?: boolean;
}

export const useToolById = (id: number, options?: UseToolByIdOptions) => {
  return useQuery({
    queryKey: ['tool', id],
    queryFn: () => getToolById(id),
    enabled: options?.enabled !== false && id > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
