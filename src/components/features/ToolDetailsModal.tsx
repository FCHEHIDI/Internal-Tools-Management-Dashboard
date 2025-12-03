import { Modal, Badge } from '@/components/ui';
import { useModalStore } from '@/stores';
import { useToolById } from '@/hooks';
import { LoadingSpinner } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { Users, DollarSign, Calendar } from 'lucide-react';

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
              <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-2xl">
                {tool.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-foreground">{tool.name}</h3>
                  <Badge status={tool.status}>
                    {tool.status.charAt(0).toUpperCase() + tool.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-foreground-secondary mt-1">{tool.category}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Description</h4>
              <p className="text-sm text-foreground-secondary">{tool.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-foreground-secondary" />
                <span className="text-foreground-secondary">Monthly Cost:</span>
                <span className="font-semibold text-foreground">{formatCurrency(tool.monthly_cost)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-foreground-secondary" />
                <span className="text-foreground-secondary">Active Users:</span>
                <span className="font-semibold text-foreground">{tool.active_users_count}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-foreground-secondary" />
                <span className="text-foreground-secondary">Department:</span>
                <span className="font-semibold text-foreground">{tool.owner_department}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-foreground-secondary">Owner:</span>
                <span className="font-semibold text-foreground">{tool.owner_id}</span>
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
