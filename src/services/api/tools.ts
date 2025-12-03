import { apiClient } from './client';
import type { Tool } from '@/types';

export interface ToolsQueryParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  category?: string;
  owner_department?: string;
  status?: string;
  q?: string; // Search query
}

export interface ToolsResponse {
  data: Tool[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Fetch tools with optional filters, pagination, and search
 */
export const getTools = async (params?: ToolsQueryParams): Promise<ToolsResponse> => {
  const response = await apiClient.get<Tool[]>('/tools', { params });
  
  // JSON Server returns total count in headers
  const total = parseInt(response.headers['x-total-count'] || '0', 10);
  
  return {
    data: response.data,
    total,
    page: params?._page || 1,
    limit: params?._limit || 10,
  };
};

/**
 * Fetch a single tool by ID
 */
export const getToolById = async (id: number): Promise<Tool> => {
  const response = await apiClient.get<Tool>(`/tools/${id}`);
  return response.data;
};

/**
 * Create a new tool
 */
export const createTool = async (tool: Omit<Tool, 'id' | 'created_at' | 'updated_at'>): Promise<Tool> => {
  const response = await apiClient.post<Tool>('/tools', {
    ...tool,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  return response.data;
};

/**
 * Update an existing tool
 */
export const updateTool = async (id: number, tool: Partial<Tool>): Promise<Tool> => {
  const response = await apiClient.patch<Tool>(`/tools/${id}`, {
    ...tool,
    updated_at: new Date().toISOString(),
  });
  return response.data;
};

/**
 * Delete a tool
 */
export const deleteTool = async (id: number): Promise<void> => {
  await apiClient.delete(`/tools/${id}`);
};
