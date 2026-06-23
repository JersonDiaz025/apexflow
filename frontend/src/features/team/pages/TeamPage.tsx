'use client';

import { SearchBar } from '@/components';
import LayoutPages from '@/layouts/LayoutPages';
import { useModalStore } from '@/store/modal.store';
import { TeamUsersProps } from '@/interfaces/team.interface';
import InviteWithEmail from '@/features/team/components/InviteWithEmail';
import { useBreadcrumb } from '@/hooks/use-breadcrumb';
import { MODAL_TYPES } from '@/constants/modal-types.constants';

const TeamPage = ({ teamData, currentSearch }: TeamUsersProps) => {
    const { onOpen } = useModalStore();

    const items = useBreadcrumb([{ label: 'Usuarios', href: '#' }]);
    const breadcrumbItems = useBreadcrumb(items);
    return (
        <LayoutPages
            title='Usuarios'
            subTitle='Gestiona y busca todos los colaboradores registrados en la plataforma.'
            breadcrumbItems={breadcrumbItems}
            rightContent={
                <div className='flex w-full gap-2 justify-end'>
                    <SearchBar defaultValue={currentSearch ?? ''} />
                    <InviteWithEmail handleOpen={() => onOpen(MODAL_TYPES.INVITE_USER)} />
                </div>
            }
        >
            <div className='space-y-4'>
                {/* <div className='flex justify-between items-center flex-wrap gap-4'>
                    <SearchBar defaultValue={currentSearch ?? ''} />
                </div> */}

                {/* Lista de Miembros */}
                <div className='border-gray-200'>
                    {teamData.length === 0 ? (
                        <div className=' text-center text-gray-500'>
                            No se encontraron miembros para esta búsqueda.
                        </div>
                    ) : (
                        <div className='divide-y divide-gray-100'>
                            {teamData.map((user) => (
                                <div key={user.id} className='py-4 gap-4 flex items-center gap-3'>
                                    <div className='h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold border border-indigo-100'>
                                        {user.avatar}
                                    </div>
                                    <div>
                                        <h3 className='text-sm font-medium text-gray-900'>
                                            {user.name}
                                        </h3>
                                        <p className='text-xs text-gray-500'>{user.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </LayoutPages>
    );
};

export default TeamPage;
