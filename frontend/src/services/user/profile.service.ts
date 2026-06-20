import { api } from '@/axios/api-client';
import { User } from '@/types/auth.types';
import { ROUTES } from '@/constants/routes.constant';

export const profileService = {
    getFullProfile: async (): Promise<User | undefined> => {
        try {
            return await api.get(ROUTES.PROFILE, {});
        } catch (error) {
            console.log(error);
        }
    },
};
