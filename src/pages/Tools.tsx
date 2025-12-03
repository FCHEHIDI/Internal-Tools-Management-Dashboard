import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { ToolsFilters } from '@/components/features/ToolsFilters';
import { ToolsCatalog } from '@/components/features/ToolsCatalog';
import { useFiltersStore, useModalStore } from '@/stores';

export function Tools() {
  const [showFilters, setShowFilters] = useState(true);
  
  // Use Zustand stores
  const { searchQuery, setSearchQuery, selectedCategories, selectedDepartments, selectedStatus, minCost, maxCost } = useFiltersStore();
  const { openAddToolModal } = useModalStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddTool = () => {
    openAddToolModal();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-bold text-foreground">Tools</h1>
          <p className="text-foreground-secondary mt-2">
            Manage your SaaS tools catalog
          </p>
        </div>
        <Button onClick={handleAddTool}>
          <Plus className="w-4 h-4 mr-2" />
          Add Tool
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-secondary" />
          <Input
            type="text"
            placeholder="Search tools by name, category, or department..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Button 
          variant="secondary"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters {showFilters ? '(Hide)' : '(Show)'}
        </Button>
      </div>

      {/* Filters Sidebar and Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {showFilters && (
          <div className="lg:col-span-1">
            <ToolsFilters />
          </div>
        )}
        <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          <ToolsCatalog 
            searchQuery={searchQuery}
            filters={{
              categories: selectedCategories,
              departments: selectedDepartments,
              status: selectedStatus,
              minCost,
              maxCost,
            }}
          />
        </div>
      </div>
    </div>
  );
}
