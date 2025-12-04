import { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { ToolsFilters } from '@/components/features/ToolsFilters';
import { ToolsCatalog } from '@/components/features/ToolsCatalog';
import { ExportDialog } from '@/components/features/ExportDialog';
import { useFiltersStore, useModalStore } from '@/stores';
import { useTools } from '@/hooks';
import { ExportColumn } from '@/lib/exportUtils';

export function Tools() {
  const [showFilters, setShowFilters] = useState(true);
  const [showExportDialog, setShowExportDialog] = useState(false);
  
  // Use Zustand stores
  const { searchQuery, setSearchQuery, selectedCategories, selectedDepartments, selectedStatus, minCost, maxCost } = useFiltersStore();
  const { openAddToolModal } = useModalStore();
  
  // Fetch ALL tools data for export
  const { data: toolsData } = useTools({ _limit: 1000 });

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
          <h1 className="text-h1 font-bold bg-gradient-to-r from-cyan-300 via-blue-600 to-cyan-300 bg-clip-text text-transparent animate-gradient-title">
            Tools
          </h1>
          <div className="overflow-hidden mt-2">
            <p className="text-foreground-secondary animate-scroll-left whitespace-nowrap">
              Manage your SaaS tools catalog
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setShowExportDialog(true)}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-slate-400 text-white hover:from-blue-700 hover:to-slate-500 transition-all" onClick={handleAddTool}>
            <Plus className="w-4 h-4 mr-2" />
            Add Tool
          </Button>
        </div>
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

      {/* Export Dialog */}
      <ExportDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        data={toolsData?.tools || []}
        availableColumns={[
          { header: 'Tool Name', key: 'name' },
          { header: 'Category', key: 'category' },
          { header: 'Department', key: 'department' },
          { header: 'Status', key: 'status' },
          { header: 'Cost (€)', key: 'cost' },
          { header: 'Users', key: 'users' },
          { header: 'Renewal Date', key: 'renewalDate' },
          { header: 'Description', key: 'description', width: 40 },
        ]}
        defaultFilename="tools-catalog"
        title="Internal Tools Catalog"
      />
    </div>
  );
}
