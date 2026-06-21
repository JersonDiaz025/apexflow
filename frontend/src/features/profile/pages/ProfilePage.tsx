'use client';

import { ProfileForm } from '@/features/profile';
import LayoutPages from '@/layouts/LayoutPages';
import { useAuthStore } from '@/store/auth.store';

const ProfilePage = () => {
    const { user } = useAuthStore();
    return (
        <LayoutPages title='Mi perfil' subTitle=' Gestiona la información de tu cuenta en ApexFlow.'>
            <ProfileForm user={user} />
        </LayoutPages>
    );
};

export default ProfilePage;
