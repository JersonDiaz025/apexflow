export interface MemberGroupProps {
    members?: Array<{ id: string; name: string; avatar?: string }>;
    maxVisible?: number;
    onAddMemberClick?: () => void;
}
