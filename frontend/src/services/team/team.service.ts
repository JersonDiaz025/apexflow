import { User } from '@/types/auth.types';
import { apiServer } from '@/axios/api-server';
import { API_ENDPOINTS } from '@/constants/routes.constant';
import { InviteUserResponse, ITeamService } from '@/interfaces/team.interface';

export const teamService: ITeamService = {
    inviteUserByEmail(boardId?: string, email: string): Promise<InviteUserResponse> {
        const url = boardId
            ? API_ENDPOINTS.TEAM.INVITE_USER(boardId)
            : API_ENDPOINTS.TEAM.INVITE_GLOBAL;

        return apiServer.post(url, { email });
    },

    getUsers(search?: string): Promise<User[]> {
        return apiServer.get(API_ENDPOINTS.USERS, {
            params: search ? { search } : {},
        });
    },
};
