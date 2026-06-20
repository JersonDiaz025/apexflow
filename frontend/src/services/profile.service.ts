import { api } from '@/axios/api';
import { User } from '@/types/auth.types';
import { ROUTES } from '@/constants/routes.constant';

export const profileService = {
    getFullProfile: async (): Promise<User | undefined> => {
        const endpoint = ROUTES.PROFILE.ME;
        try {
            return await api.get(endpoint, {});
        } catch (error) {
            console.log(error);
            // return null;
        }
    },
};
