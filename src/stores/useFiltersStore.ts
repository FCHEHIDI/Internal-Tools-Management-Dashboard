import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FiltersState {
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Categories
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  clearCategories: () => void;

  // Departments
  selectedDepartments: string[];
  toggleDepartment: (department: string) => void;
  clearDepartments: () => void;

  // Status
  selectedStatus: string[];
  toggleStatus: (status: string) => void;
  clearStatus: () => void;

  // Cost Range
  minCost: number | null;
  maxCost: number | null;
  setMinCost: (cost: number | null) => void;
  setMaxCost: (cost: number | null) => void;

  // Clear all filters
  clearAllFilters: () => void;
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      // Initial state
      searchQuery: '',
      selectedCategories: [],
      selectedDepartments: [],
      selectedStatus: [],
      minCost: null,
      maxCost: null,

      // Actions
      setSearchQuery: (query) => set({ searchQuery: query }),

      toggleCategory: (category) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category],
        })),

      clearCategories: () => set({ selectedCategories: [] }),

      toggleDepartment: (department) =>
        set((state) => ({
          selectedDepartments: state.selectedDepartments.includes(department)
            ? state.selectedDepartments.filter((d) => d !== department)
            : [...state.selectedDepartments, department],
        })),

      clearDepartments: () => set({ selectedDepartments: [] }),

      toggleStatus: (status) =>
        set((state) => ({
          selectedStatus: state.selectedStatus.includes(status)
            ? state.selectedStatus.filter((s) => s !== status)
            : [...state.selectedStatus, status],
        })),

      clearStatus: () => set({ selectedStatus: [] }),

      setMinCost: (cost) => set({ minCost: cost }),
      setMaxCost: (cost) => set({ maxCost: cost }),

      clearAllFilters: () =>
        set({
          searchQuery: '',
          selectedCategories: [],
          selectedDepartments: [],
          selectedStatus: [],
          minCost: null,
          maxCost: null,
        }),
    }),
    {
      name: 'tools-filters-storage', // Persist in localStorage
      partialize: (state) => ({
        selectedCategories: state.selectedCategories,
        selectedDepartments: state.selectedDepartments,
        selectedStatus: state.selectedStatus,
        minCost: state.minCost,
        maxCost: state.maxCost,
      }),
    }
  )
);
