import { apiClient } from './client';
import type { Analytics } from '@/types';

/**
 * Fetch analytics data
 */
export const getAnalytics = async (): Promise<Analytics> => {
  const response = await apiClient.get<Analytics>('/analytics');
  return response.data;
};

/**
 * Fetch department cost breakdown
 */
export const getDepartmentCosts = async () => {
  const response = await apiClient.get('/analytics/department-costs');
  return response.data;
};

/**
 * Fetch top tools by usage
 */
export const getTopTools = async (limit: number = 6) => {
  const response = await apiClient.get('/analytics/top-tools', {
    params: { limit },
  });
  return response.data;
};

/**
 * Fetch cost evolution over time
 */
export const getCostEvolution = async (period: string = '6m') => {
  const response = await apiClient.get('/analytics/cost-evolution', {
    params: { period },
  });
  return response.data;
};
