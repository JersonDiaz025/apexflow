import { ROUTES } from '@/constants/routes.constant';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

interface BoardActionsProps {
    members: Array<{ id: string; name: string; bg: string; initial: string }>;
    isActivityOpen: boolean;
    setIsActivityOpen: (open: boolean) => void;
}

export function BoardActions({
    members = [],
    isActivityOpen,
    setIsActivityOpen,
}: BoardActionsProps) {
    return (
        <div className='flex items-center gap-4'>
            {/* Grupo de Avatares en cascada */}
            <div className='flex -space-x-2 overflow-hidden'>
                {members.map((member) => (
                    <div
                        key={member.id}
                        title={member.name}
                        className={`inline-block h-8 w-8 rounded-full ${member.bg} text-white text-xs font-bold flex items-center justify-center ring-2 ring-white`}
                    >
                        {member.initial}
                    </div>
                ))}
            </div>

            {/* Botón de Invitar */}
            <Link
                href={ROUTES.TEAM}
                className='flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 text-pink-600 hover:bg-pink-100 font-semibold text-xs rounded-lg transition-all border border-pink-200/40 cursor-pointer'
            >
                <UserPlus size={14} />
                <span className='hidden md:inline'>Invitar miembros</span>
            </Link>

            <div className='h-4 w-[1px] bg-gray-200' />

            {/* Botón Historial de Actividad */}
            <button
                onClick={() => setIsActivityOpen(!isActivityOpen)}
                className='px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer'
            >
                {isActivityOpen ? 'Hide Activity' : 'Show Activity'}
            </button>
        </div>
    );
}
