'use client';

import { ProfileFormProps } from '../types/profile-page.types';

export default function ProfileForm({ user }: ProfileFormProps) {
    return (
        <div>
            <p className='text-sm font-medium text-slate-600'>Nombre de usuario</p>
            <p className='text-lg font-bold text-slate-900 mb-4'>{user?.name}</p>

            <p className='text-sm font-medium text-slate-600'>Correo Electrónico</p>
            <p className='text-lg font-bold text-slate-900'>{user?.email}</p>
        </div>
    );
}
