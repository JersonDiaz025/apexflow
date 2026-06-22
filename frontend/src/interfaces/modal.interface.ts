export type ModalType = 'CREATE_BOARD' | 'TASK_DETAIL';

interface ModalData {
    boardId?: string;
    ownerId?: string;
}

export interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
}
