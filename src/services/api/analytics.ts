import { apiClient } from './client';
import type { Analytics } from '@/types';

/**
 * Fetch analytics data
 */
export const getAnalytics = async (): Promise<Analytics> => {
  try {
    const response = await apiClient.get<Analytics>('/analytics');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    throw error;
  }
};

/**
 * Fetch department cost breakdown
 */
export const getDepartmentCosts = async () => {
  try {
    const response = await apiClient.get('/analytics/department-costs');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch department costs:', error);
    throw error;
  }
};

/**
 * Fetch top tools by usage
 */
export const getTopTools = async (limit: number = 6) => {
  try {
    const response = await apiClient.get('/analytics/top-tools', {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch top tools:', error);
    throw error;
  }
};

/**
 * Fetch cost evolution over time
 */
export const getCostEvolution = async (period: string = '6m') => {
  try {
    const response = await apiClient.get('/analytics/cost-evolution', {
      params: { period },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch cost evolution:', error);
    throw error;
  }
};
