import { useState, useEffect } from 'react';
import { ExternalLink, Edit, Trash2, Users, DollarSign } from 'lucide-react';
import { Card, Badge, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { useTools } from '@/hooks';
import { useModalStore } from '@/stores';

interface ToolsCatalogProps {
  searchQuery?: string;
  filters?: {
    categories: string[];
    departments: string[];
    status: string[];
  };
}

const ITEMS_PER_PAGE = 12;

export function ToolsCatalog({ searchQuery = '', filters }: ToolsCatalogProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('updated_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Fetch tools with filters
  const { data: toolsResponse, isLoading, error } = useTools({
    _page: currentPage,
    _limit: ITEMS_PER_PAGE,
    _sort: sortBy,
    _order: sortOrder,
    q: searchQuery || undefined,
    category: filters?.categories.length ? filters.categories[0] : undefined,
    owner_department: filters?.departments.length ? filters.departments[0] : undefined,
    status: filters?.status.length ? filters.status[0] : undefined,
  });

  const { openEditToolModal, openDeleteConfirm, openToolDetails } = useModalStore();

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    switch (value) {
      case 'name-asc':
        setSortBy('name');
        setSortOrder('asc');
        break;
      case 'cost-desc':
        setSortBy('monthly_cost');
        setSortOrder('desc');
        break;
      case 'cost-asc':
        setSortBy('monthly_cost');
        setSortOrder('asc');
        break;
      case 'users-desc':
        setSortBy('active_users_count');
        setSortOrder('desc');
        break;
      default:
        setSortBy('updated_at');
        setSortOrder('desc');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load tools. Please try again." />;
  }

  const tools = toolsResponse?.data || [];
  const totalItems = toolsResponse?.total || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // Generate page numbers array
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div>
      {/* Header with count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-foreground-secondary">
          Showing <span className="font-medium text-foreground">{startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)}</span> of <span className="font-medium text-foreground">{totalItems}</span> tools
        </p>
        <select 
          className="px-3 py-2 bg-surface border border-border rounded-lg text-sm text-foreground"
          onChange={handleSort}
        >
          <option value="updated-desc">Sort by: Recently Updated</option>
          <option value="name-asc">Sort by: Name (A-Z)</option>
          <option value="cost-desc">Sort by: Cost (High to Low)</option>
          <option value="cost-asc">Sort by: Cost (Low to High)</option>
          <option value="users-desc">Sort by: Users (Most to Least)</option>
        </select>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Card key={tool.id} className="p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
                  {tool.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{tool.name}</h3>
                    <Badge status={tool.status} size="sm">
                      {tool.status.charAt(0).toUpperCase() + tool.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground-secondary">{tool.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openToolDetails(tool.id)}
                  className="p-2 hover:bg-surface-hover rounded-lg transition-colors hover:text-primary"
                  title="View details"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openEditToolModal(tool.id)}
                  className="p-2 hover:bg-surface-hover rounded-lg transition-colors hover:text-primary"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openDeleteConfirm(tool.id)}
                  className="p-2 hover:bg-surface-hover rounded-lg transition-colors text-status-unused hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-foreground-secondary mt-3 line-clamp-2">
              {tool.description}
            </p>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-foreground-secondary">
                  <Users className="w-4 h-4" />
                  <span>{tool.active_users_count} users</span>
                </div>
                <div className="flex items-center gap-1 text-foreground-secondary">
                  <span className="text-xs">Department:</span>
                  <span className="font-medium text-foreground">{tool.owner_department}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-foreground-secondary" />
                <span className="font-semibold text-foreground">
                  {formatCurrency(tool.monthly_cost)}
                </span>
                <span className="text-xs text-foreground-secondary">/mo</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {tools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-foreground-secondary">No tools found matching your criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-border rounded-lg hover:bg-surface-hover transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-foreground-secondary">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as number)}
                  className={`w-8 h-8 rounded-lg font-medium transition-colors ${
                    currentPage === page 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-surface-hover'
                  }`}
                >
                  {page}
                </button>
              )
            ))}
          </div>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-border rounded-lg hover:bg-surface-hover transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
