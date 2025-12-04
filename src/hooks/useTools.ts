import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTools, getToolById, createTool, updateTool, deleteTool, type ToolsQueryParams, type ToolsResponse } from '@/services/api';
import type { Tool } from '@/types';

// Re-export types for convenience
export type { ToolsQueryParams, ToolsResponse };

/**
 * Hook to fetch tools with optional filters and pagination
 */
export const useTools = (params?: ToolsQueryParams) => {
  return useQuery({
    queryKey: ['tools', params],
    queryFn: () => getTools(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook to fetch a single tool by ID
 */
export const useTool = (id: number) => {
  return useQuery({
    queryKey: ['tools', id],
    queryFn: () => getToolById(id),
    enabled: !!id,
  });
};

/**
 * Hook to create a new tool
 */
export const useCreateTool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tool: Omit<Tool, 'id' | 'created_at' | 'updated_at'>) => createTool(tool),
    onSuccess: () => {
      // Invalidate and refetch tools list
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
    onError: (error) => {
      console.error('Failed to create tool:', error);
    },
  });
};

/**
 * Hook to update an existing tool
 */
export const useUpdateTool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Tool> }) => updateTool(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific tool and tools list
      queryClient.invalidateQueries({ queryKey: ['tools', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
    onError: (error, variables) => {
      console.error(`Failed to update tool ${variables.id}:`, error);
    },
  });
};

/**
 * Hook to delete a tool
 */
export const useDeleteTool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTool(id),
    onSuccess: () => {
      // Invalidate tools list
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
    onError: (error, id) => {
      console.error(`Failed to delete tool ${id}:`, error);
    },
  });
};
