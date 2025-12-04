import { Modal, Badge } from '@/components/ui';
import { useModalStore } from '@/stores';
import { useToolById } from '@/hooks';
import { LoadingSpinner } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { Users, DollarSign, Calendar } from 'lucide-react';
import { getToolLogo, getToolInitial } from '@/lib/toolLogos';

export function ToolDetailsModal() {
  const { isToolDetailsOpen, viewingToolId, closeToolDetails } = useModalStore();
  const { data: tool, isLoading } = useToolById(viewingToolId || 0, { enabled: !!viewingToolId });

  if (!isToolDetailsOpen) return null;

  return (
    <Modal isOpen={isToolDetailsOpen} onClose={closeToolDetails} title="Tool Details">
      <div className="p-6">
        {isLoading ? (
          <LoadingSpinner />
        ) : tool ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4">
              {getToolLogo(tool.name) ? (
                <img 
                  src={getToolLogo(tool.name)!} 
                  alt={tool.name || 'Tool'} 
                  className="w-16 h-16 rounded-lg object-contain bg-white p-3"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-2xl">
                  {getToolInitial(tool.name)}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-foreground">{tool.name || 'Unknown'}</h3>
                  <Badge status={tool.status || 'active'}>
                    {((tool.status || 'active').charAt(0).toUpperCase() + (tool.status || 'active').slice(1))}
                  </Badge>
                </div>
                <p className="text-sm text-foreground-secondary mt-1">{tool.category || 'N/A'}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Description</h4>
              <p className="text-sm text-foreground-secondary">{tool.description || 'No description available'}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-foreground-secondary" />
                <span className="text-foreground-secondary">Monthly Cost:</span>
                <span className="font-semibold text-foreground">{formatCurrency(tool.monthly_cost || 0)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-foreground-secondary" />
                <span className="text-foreground-secondary">Active Users:</span>
                <span className="font-semibold text-foreground">{tool.active_users_count || 0}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-foreground-secondary" />
                <span className="text-foreground-secondary">Department:</span>
                <span className="font-semibold text-foreground">{tool.owner_department || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-foreground-secondary">Owner:</span>
                <span className="font-semibold text-foreground">{tool.owner_id || 'N/A'}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-foreground-secondary">Tool not found.</p>
        )}
      </div>
    </Modal>
  );
}
