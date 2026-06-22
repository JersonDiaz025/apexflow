'use client';

import Link from 'next/link';
import { Bell, Settings } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/constants/routes.constant';
import { TopNavbarProps } from '@/interfaces/navbar.interface';
import { MODAL_TYPES } from '@/constants/modal-types.constants';
import { MemberGroup, SearchInput, UserDropdown, Title, AddButton } from '@/components';

const TopNavbar = ({
    title = 'ApexFlow',
    showSearch = true,
    showMembers = false,
    searchPlaceholder = 'Buscar...',
    searchValue,
    showBtnAdd = false,
    showNotifications = false,
    onSearchChange,
    handleOpenModal,
    members,
    onAddMemberClick,
}: TopNavbarProps) => {
    // const { user } = useAuthStore();
    return (
        <header className='h-16 border-b border-outline-variant bg-white/85 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 w-full select-none'>
            <div className='flex items-center gap-4 md:gap-6 min-w-0'>
                <div className='flex items-center gap-2 min-w-0'>
                    <Link href={ROUTES.BOARDS}>
                        <Title
                            text={title}
                            className='text-base md:text-lg font-bold text-on-surface truncate'
                        />
                    </Link>
                </div>

                {showMembers && (
                    <MemberGroup members={members} onAddMemberClick={onAddMemberClick} />
                )}
            </div>

            <div className='flex items-center gap-1 md:gap-3'>
                {showSearch && (
                    <SearchInput
                        placeholder={searchPlaceholder}
                        value={searchValue}
                        onChange={onSearchChange}
                    />
                )}

                {showBtnAdd && (
                    <AddButton
                        type='submit'
                        iconSize={18}
                        className='hidden md:flex'
                        onClick={() => handleOpenModal(MODAL_TYPES.CREATE_BOARD)}
                    >
                        Crear tablero
                    </AddButton>
                )}

                {showNotifications && (
                    <button className='p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors relative'>
                        <Bell size={19} />
                        <span className='absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white' />
                    </button>
                )}

                <Link
                    className='p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors'
                    href={ROUTES.CONFIG}
                >
                    <Settings size={19} />
                </Link>

                <div className='h-6 w-[1px] bg-outline-variant/60 mx-1 hidden sm:block' />
                <UserDropdown />
            </div>
        </header>
    );
};

export default TopNavbar;
