'use client';

import { ProfileFormProps } from '../types/profile-page.types';

export function ProfileForm({ user }: ProfileFormProps) {
    return (
        <main className='max-w-4xl mx-auto p-8'>
            <header className='mb-8'>
                <span className='text-xs font-semibold text-blue-600 uppercase tracking-wider'>
                    Configuración
                </span>
                <h1 className='text-3xl font-bold text-slate-900 mt-1'>Mi Perfil</h1>
                <p className='text-slate-500 text-sm'>
                    Gestiona la información de tu cuenta en ApexFlow.
                </p>
            </header>

            <div className='bg-white border rounded-xl p-6 shadow-sm'>
                {/* Aquí pintarás los inputs con el state para actualizar */}
                <p className='text-sm font-medium text-slate-600'>Nombre de usuario</p>
                <p className='text-lg font-bold text-slate-900 mb-4'>{user.name}</p>

                <p className='text-sm font-medium text-slate-600'>Correo Electrónico</p>
                <p className='text-lg font-bold text-slate-900'>{user.email}</p>
            </div>
        </main>
    );
}
