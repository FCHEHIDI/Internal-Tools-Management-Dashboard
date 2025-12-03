import { useQuery } from '@tanstack/react-query';
import { getAnalytics, getDepartmentCosts, getTopTools, getCostEvolution } from '@/services/api';

/**
 * Hook to fetch general analytics data
 */
export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: getAnalytics,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch department cost breakdown
 */
export const useDepartmentCosts = () => {
  return useQuery({
    queryKey: ['analytics', 'department-costs'],
    queryFn: getDepartmentCosts,
    staleTime: 1000 * 60 * 10,
  });
};

/**
 * Hook to fetch top tools by usage
 */
export const useTopTools = (limit: number = 6) => {
  return useQuery({
    queryKey: ['analytics', 'top-tools', limit],
    queryFn: () => getTopTools(limit),
    staleTime: 1000 * 60 * 10,
  });
};

/**
 * Hook to fetch cost evolution over time
 */
export const useCostEvolution = (period: string = '6m') => {
  return useQuery({
    queryKey: ['analytics', 'cost-evolution', period],
    queryFn: () => getCostEvolution(period),
    staleTime: 1000 * 60 * 10,
  });
};
