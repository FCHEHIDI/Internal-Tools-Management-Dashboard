import { Modal } from '@/components/ui';
import { useModalStore } from '@/stores';
import { useToolById } from '@/hooks';
import { LoadingSpinner } from '@/components/ui';

export function EditToolModal() {
  const { isEditToolModalOpen, editingToolId, closeEditToolModal } = useModalStore();
  const { data: tool, isLoading } = useToolById(editingToolId || 0, { enabled: !!editingToolId });

  if (!isEditToolModalOpen) return null;

  return (
    <Modal isOpen={isEditToolModalOpen} onClose={closeEditToolModal} title="Edit Tool">
      <div className="p-6">
        {isLoading ? (
          <LoadingSpinner />
        ) : tool ? (
          <div className="space-y-4">
            <p className="text-foreground-secondary">
              Editing tool: <span className="font-semibold text-foreground">{tool.name}</span>
            </p>
            <p className="text-sm text-foreground-secondary">
              Edit functionality coming soon. This will allow you to modify tool details.
            </p>
          </div>
        ) : (
          <p className="text-foreground-secondary">Tool not found.</p>
        )}
      </div>
    </Modal>
  );
}
