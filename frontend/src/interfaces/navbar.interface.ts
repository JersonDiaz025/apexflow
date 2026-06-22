import { ModalStore } from './modal.interface';

export interface TopNavbarProps {
    title?: string;
    showSearch?: boolean;
    showMembers?: boolean;
    showBtnAdd?: boolean;
    searchPlaceholder?: string;
    showNotifications?: boolean;
    searchValue?: string;
    handleOpenModal: ModalStore['onOpen'];
    onSearchChange?: (value: string) => void;
    members?: Array<{ id: string; name: string; avatar?: string }>;
    onAddMemberClick?: () => void;
}

export interface BottonNavbarProps {
    handleOpenModal: ModalStore['onOpen'];
}
