import { create } from 'zustand';

interface ModalState {
  // Add Tool Modal
  isAddToolModalOpen: boolean;
  openAddToolModal: () => void;
  closeAddToolModal: () => void;

  // Edit Tool Modal
  isEditToolModalOpen: boolean;
  editingToolId: number | null;
  openEditToolModal: (toolId: number) => void;
  closeEditToolModal: () => void;

  // Delete Confirmation Modal
  isDeleteConfirmOpen: boolean;
  deletingToolId: number | null;
  openDeleteConfirm: (toolId: number) => void;
  closeDeleteConfirm: () => void;

  // Tool Details Modal
  isToolDetailsOpen: boolean;
  viewingToolId: number | null;
  openToolDetails: (toolId: number) => void;
  closeToolDetails: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  // Add Tool Modal
  isAddToolModalOpen: false,
  openAddToolModal: () => set({ isAddToolModalOpen: true }),
  closeAddToolModal: () => set({ isAddToolModalOpen: false }),

  // Edit Tool Modal
  isEditToolModalOpen: false,
  editingToolId: null,
  openEditToolModal: (toolId) => set({ isEditToolModalOpen: true, editingToolId: toolId }),
  closeEditToolModal: () => set({ isEditToolModalOpen: false, editingToolId: null }),

  // Delete Confirmation Modal
  isDeleteConfirmOpen: false,
  deletingToolId: null,
  openDeleteConfirm: (toolId) => set({ isDeleteConfirmOpen: true, deletingToolId: toolId }),
  closeDeleteConfirm: () => set({ isDeleteConfirmOpen: false, deletingToolId: null }),

  // Tool Details Modal
  isToolDetailsOpen: false,
  viewingToolId: null,
  openToolDetails: (toolId) => set({ isToolDetailsOpen: true, viewingToolId: toolId }),
  closeToolDetails: () => set({ isToolDetailsOpen: false, viewingToolId: null }),
}));
