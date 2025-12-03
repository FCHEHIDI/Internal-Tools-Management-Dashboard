import { Modal, Button } from '@/components/ui';
import { useModalStore } from '@/stores';
import { useToolById } from '@/hooks';
import { LoadingSpinner } from '@/components/ui';
import { Trash2 } from 'lucide-react';

export function DeleteConfirmModal() {
  const { isDeleteConfirmOpen, deletingToolId, closeDeleteConfirm } = useModalStore();
  const { data: tool, isLoading } = useToolById(deletingToolId || 0, { enabled: !!deletingToolId });

  if (!isDeleteConfirmOpen) return null;

  const handleDelete = () => {
    // TODO: Implement delete mutation
    console.log('Delete tool:', deletingToolId);
    closeDeleteConfirm();
  };

  return (
    <Modal isOpen={isDeleteConfirmOpen} onClose={closeDeleteConfirm} title="Confirm Deletion">
      <div className="p-6 space-y-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : tool ? (
          <>
            <div className="flex items-center gap-3 text-status-unused">
              <Trash2 className="w-8 h-8" />
              <div>
                <p className="font-semibold">Delete {tool.name}?</p>
                <p className="text-sm text-foreground-secondary">This action cannot be undone.</p>
              </div>
            </div>
            
            <div className="flex gap-3 justify-end pt-4">
              <Button variant="secondary" onClick={closeDeleteConfirm}>
                Cancel
              </Button>
              <Button variant="default" onClick={handleDelete} className="bg-status-unused hover:bg-red-600">
                Delete
              </Button>
            </div>
          </>
        ) : (
          <p className="text-foreground-secondary">Tool not found.</p>
        )}
      </div>
    </Modal>
  );
}
