import { User } from '@/types/auth.types';
import { apiServer } from '@/axios/api-server';
import { API_ENDPOINTS } from '@/constants/routes.constant';
import { handleActionError } from '@/utils/error-handler';

export const profileService = {
    getProfile: async (): Promise<User | undefined> => {
        try {
            return await apiServer.get(API_ENDPOINTS.AUTH.PROFILE);
        } catch (error) {
            handleActionError(error, {})
            // console.log(error);
        }
    },
};
