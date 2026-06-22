'use client';

import { useState, useEffect } from 'react';
import { Board } from '@/interfaces/kanban.interface';
import ActivitySidebar from '@/components/navbar/ActivitySidebar';
import { Calendar, MoreHorizontal, Plus, UserPlus, X } from 'lucide-react';

interface Props {
    boardData: Board;
}

const MOCK_COLUMNS = [
    {
        id: 'col-1',
        title: 'BACKLOG',
        tasks: [
            {
                id: 'task-1',
                title: 'Auth Module Refactor',
                description:
                    'Clean up legacy authentication flow and implement JWT encryption standards.',
                category: 'FEATURE',
                categoryColor: 'bg-indigo-50 text-indigo-600',
                date: 'OCT 12',
            },
            {
                id: 'task-2',
                title: 'API Rate Limiting',
                description: 'Infrastructure task to prevent DDoS attacks on public endpoints.',
                category: 'HIGH PRIORITY',
                categoryColor: 'bg-red-50 text-red-500 font-bold',
                date: 'OCT 14',
            },
        ],
    },
    {
        id: 'col-2',
        title: 'IN PROGRESS',
        tasks: [
            {
                id: 'task-3',
                title: 'Stripe Connect Sync',
                description: 'Align webhooks handling with the multi-tenant subscription flow.',
                category: 'INTEGRATION',
                categoryColor: 'bg-blue-50 text-blue-600',
                date: 'OCT 16',
            },
        ],
    },
];

// Mock de miembros actuales del tablero para el diseño
const MOCK_MEMBERS = [
    { id: 'u1', name: 'Jerson Cuevas', initial: 'J', bg: 'bg-pink-500' },
    { id: 'u2', name: 'Victor', initial: 'V', bg: 'bg-indigo-500' },
    { id: 'u3', name: 'Jhan Pierre', initial: 'P', bg: 'bg-emerald-500' },
];

export default function MainKanban({ boardData }: Props) {
    // Estados de la UI
    const [isActivityOpen, setIsActivityOpen] = useState(false);
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [displayColumns, setDisplayColumns] = useState(MOCK_COLUMNS);

    // Estado simulación de miembros
    const [members, setMembers] = useState(MOCK_MEMBERS);

    useEffect(() => {
        if (boardData && boardData.columns && boardData.columns.length > 0) {
            const formattedColumns = boardData.columns.map((col) => ({
                id: col.id,
                title: col.title.toUpperCase(),
                tasks: col.tasks || [],
            }));
            setDisplayColumns(formattedColumns);
        }
    }, [boardData]);

    // Manejador del envío de la invitación
    const handleSendInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmail) return;

        // AQUÍ CONECTARÁS CON TU NESTJS EN EL FUTURO: axios.post('/api/boards/invite', { email: inviteEmail })
        console.log(`Invitación enviada a: ${inviteEmail}`);

        // Simulación visual añadiendo un miembro pendiente
        const newInitial = inviteEmail.charAt(0).toUpperCase();
        setMembers([
            ...members,
            {
                id: Date.now().toString(),
                name: inviteEmail,
                initial: newInitial,
                bg: 'bg-slate-400 animate-pulse',
            },
        ]);

        // Reset y cerrar
        setInviteEmail('');
        setIsInviteOpen(false);
    };

    return (
        <div className='flex h-full w-full overflow-hidden relative'>
            {/* Área Principal del Kanban */}
            <div className='flex-1 flex flex-col min-w-0 h-full'>
                {/* BARRA SUPERIOR ADAPTADA CON MIEMBROS E INVITACIÓN */}
                <div className='mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0'>
                    <div>
                        <h2 className='text-xl font-bold text-on-surface'>
                            {boardData?.title || 'Project Board (Preview)'}
                        </h2>
                    </div>

                    {/* Sección de Colaboradores e Historial */}
                    <div className='flex items-center gap-4 ml-auto sm:ml-0'>
                        {/* Grupo de Avatares en cascada */}
                        <div className='flex -space-x-2 overflow-hidden'>
                            {members.map((member) => (
                                <div
                                    key={member.id}
                                    title={member.name}
                                    className={`inline-block h-8 w-8 rounded-full ${member.bg} text-white text-xs font-bold font-mono flex items-center justify-center ring-2 ring-white`}
                                >
                                    {member.initial}
                                </div>
                            ))}
                        </div>

                        {/* Botón de Invitar */}
                        <button
                            onClick={() => setIsInviteOpen(true)}
                            className='flex items-center gap-1.5 px-3 py-1.5 bg-primary-soft text-primary hover:bg-pink-100 font-semibold text-xs rounded-precision transition-all border border-pink-200/40 cursor-pointer'
                        >
                            <UserPlus size={14} />
                            <span className='hidden md:inline'>Invite</span>
                        </button>

                        <div className='h-4 w-[1px] bg-outline-variant' />

                        {/* Botón Historial de Actividad */}
                        <button
                            onClick={() => setIsActivityOpen(!isActivityOpen)}
                            className='px-4 py-1.5 bg-white border border-outline-variant rounded-precision text-xs font-semibold text-on-surface hover:bg-surface-container-low transition-colors shadow-sm cursor-pointer'
                        >
                            {isActivityOpen ? 'Hide Activity' : 'Show Activity'}
                        </button>
                    </div>
                </div>

                {/* CONTENEDOR DE COLUMNAS (Mantiene tu scroll horizontal impecable) */}
                <div className='flex-1 flex gap-5 overflow-x-auto pb-4 snap-x scrollbar-thin select-none w-full items-start scroll-smooth'>
                    {displayColumns.map((column) => (
                        <div
                            key={column.id}
                            className='w-[330px] min-w-[290px] md:w-[350px] md:min-w-[340px] flex flex-col max-h-full flex-shrink-0'
                        >
                            {/* Header de columna */}
                            <div className='flex items-center justify-between mb-4 px-1 flex-shrink-0'>
                                <div className='flex items-center gap-2 font-mono tracking-wider text-xs font-bold text-on-surface-variant uppercase'>
                                    <h3>{column.title}</h3>
                                    <span className='bg-blue-100 text-blue-600 text-[11px] px-2 py-0.5 rounded font-bold'>
                                        {column.tasks?.length || 0}
                                    </span>
                                </div>
                                <button className='text-on-surface-variant hover:text-on-surface p-1 transition-colors'>
                                    <MoreHorizontal size={18} />
                                </button>
                            </div>

                            {/* Listado de Tarjetas */}
                            <div className='flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin max-h-[calc(100vh-240px)]'>
                                {column.tasks?.map((task: any) => (
                                    <div
                                        key={task.id}
                                        className='bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col gap-3'
                                    >
                                        <div>
                                            <span
                                                className={`text-[10px] font-bold tracking-wide px-2.5 py-1 rounded ${task.categoryColor || 'bg-purple-50 text-purple-600'}`}
                                            >
                                                {task.category || 'TASK'}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className='font-bold text-on-surface text-sm md:text-base leading-tight tracking-tight'>
                                                {task.title}
                                            </h4>
                                            {task.description && (
                                                <p className='text-xs md:text-sm text-on-surface-variant mt-1.5 leading-relaxed line-clamp-2'>
                                                    {task.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className='flex items-center justify-between pt-2 mt-1 border-t border-slate-50 text-on-surface-variant/60 text-[11px] font-mono'>
                                            <div className='flex items-center gap-1.5'>
                                                <Calendar size={13} />
                                                <span>{task.date || 'OCT 12'}</span>
                                            </div>
                                            <div className='w-6 h-6 rounded-full bg-surface-container-high border border-white flex items-center justify-center font-bold text-[10px] text-on-surface-variant'>
                                                U
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className='w-full py-3 bg-white/40 border border-dashed border-outline-variant rounded-xl text-[11px] font-bold text-on-surface-variant hover:bg-white hover:text-primary hover:border-primary/50 transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer'>
                                    <Plus size={14} />
                                    <span>Add Card</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SIDEBAR DE ACTIVIDAD */}
            <div
                className={`absolute right-0 top-0 h-full z-40 md:relative md:z-0 transition-all duration-300 bg-white ${isActivityOpen ? 'w-80 border-l border-outline-variant' : 'w-0 overflow-hidden border-l-0'}`}
            >
                {isActivityOpen && (
                    <button
                        onClick={() => setIsActivityOpen(false)}
                        className='md:hidden absolute right-4 top-4 z-50 w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant text-on-surface font-bold text-xs'
                    >
                        ✕
                    </button>
                )}
                <ActivitySidebar isOpen={isActivityOpen} />
            </div>

            {/* MODAL DE INVITACIÓN POR CORREO (Tailwind v4 overlay) */}
            {isInviteOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in'>
                    <div className='bg-white w-full max-w-md p-6 rounded-xl border border-outline-variant shadow-xl mx-4 relative animate-scale-up'>
                        {/* Botón Cerrar Modal */}
                        <button
                            onClick={() => setIsInviteOpen(false)}
                            className='absolute right-4 top-4 p-1 text-on-surface-variant hover:text-on-surface transition-colors rounded-full hover:bg-surface-container-low cursor-pointer'
                        >
                            <X size={18} />
                        </button>

                        {/* Contenido */}
                        <div className='mb-4'>
                            <h3 className='text-lg font-bold text-on-surface flex items-center gap-2'>
                                <UserPlus size={20} className='text-primary' />
                                Invite to Board
                            </h3>
                            <p className='text-xs text-on-surface-variant mt-1'>
                                Enter your teammate's email to share this workspace. They must log
                                in to collaborate.
                            </p>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSendInvite} className='space-y-4'>
                            <div>
                                <label className='block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5'>
                                    Email Address
                                </label>
                                <input
                                    type='email'
                                    required
                                    placeholder='name@company.com'
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    className='w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-precision text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all'
                                />
                            </div>

                            <div className='flex items-center justify-end gap-2 pt-2'>
                                <button
                                    type='button'
                                    onClick={() => setIsInviteOpen(false)}
                                    className='px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-precision transition-colors cursor-pointer'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='px-4 py-2 bg-primary text-white text-xs font-semibold rounded-precision hover:bg-pink-700 transition-colors shadow-sm cursor-pointer'
                                >
                                    Send Invitation
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
