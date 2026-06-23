import { User } from '@/types/auth.types';

export interface InvitedMember {
    id: string;
    name: string;
    email: string;
}

export interface InviteUserResponse {
    id: string;
    title: string;
    members: InvitedMember[];
}

export interface ITeamService {
    inviteUserByEmail(boardId?: string, email: string): Promise<InviteUserResponse>;
    getUsers(search?: string): Promise<User[]>;
}

export interface PageProps {
    searchParams: Promise<{ search?: string }>;
}

export interface TeamUsersProps {
    teamData: User[];
    currentSearch?: string
}
