'use client';

import { Plus } from 'lucide-react';
import { useModalStore } from '@/store/modal.store';
import { MODAL_TYPES } from '@/constants/modal-types.constants';
import BoardColumn from '@/features/kanban/components/BoardColumn';
import ColumnContainer from '@/features/kanban/components/ColumnContainer';
import { EmptyStateColumn } from '@/features/kanban/components/EmptyStateColumn';
import { BoardPageProps } from '@/features/kanban/interfaces/board-page.interface';

export default function MainKanban({ boardData }: BoardPageProps) {
    const columnsData = boardData.columns;
    const { onOpen } = useModalStore();

    const handleAdd = (type: string, id: string) => {
        if (type === MODAL_TYPES.CREATE_TASK) {
            onOpen(MODAL_TYPES.CREATE_TASK, { columnId: id });
        } else if (MODAL_TYPES.CREATE_COLUMN) {
            onOpen(MODAL_TYPES.CREATE_COLUMN, { boardId: id });
        }
    };

    return (
        <div className='flex h-full w-full overflow-hidden relative border-t-2 border-dashed border-slate-200'>
            <div className='flex-1 flex flex-col min-w-0 h-full'>
                {columnsData.length === 0 ? (
                    <EmptyStateColumn
                        onCreateColumn={() => handleAdd(MODAL_TYPES.CREATE_COLUMN, boardData.id)}
                    />
                ) : (
                    <div className='flex-1 flex gap-5 overflow-x-auto pb-4 snap-x scrollbar-thin select-none w-full items-start scroll-smooth p-2'>
                        {columnsData.map((column) => (
                            <ColumnContainer key={column?.id}>
                                <BoardColumn
                                    column={column}
                                    onAddTask={() => handleAdd(MODAL_TYPES.CREATE_TASK, column?.id)}
                                />
                            </ColumnContainer>
                        ))}
                        <button
                            onClick={() => handleAdd(MODAL_TYPES.CREATE_COLUMN, boardData.id)}
                            className='w-[280px] min-w-[250px] py-3 bg-white/40 border border-dashed border-gray-200 rounded-xl text-[11px] font-bold text-gray-400 hover:bg-white border-indigo-200 transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer'
                        >
                            <Plus size={16} />
                            <span>Añadir columna</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Modal Reutilizable para la creación de tareas
            {taskModal.isOpen && (
                <div>Create card</div>
                // <CreateTaskModal
                //     columnId={taskModal.columnId}
                //     boardId={boardData.id}
                //     onClose={() => setTaskModal({ isOpen: false, columnId: '' })}
                // />
            )} */}
        </div>
    );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { Board } from '@/interfaces/kanban.interface';
// import ActivitySidebar from '@/components/navbar/ActivitySidebar';
// import { Calendar, MoreHorizontal, Plus, UserPlus, X } from 'lucide-react';

// interface Props {
//     boardData: Board;
// }

// const MOCK_COLUMNS = [
//     {
//         id: 'col-1',
//         title: 'BACKLOG',
//         tasks: [
//             {
//                 id: 'task-1',
//                 title: 'Auth Module Refactor',
//                 description:
//                     'Clean up legacy authentication flow and implement JWT encryption standards.',
//                 category: 'FEATURE',
//                 categoryColor: 'bg-indigo-50 text-indigo-600',
//                 date: 'OCT 12',
//             },
//             {
//                 id: 'task-2',
//                 title: 'API Rate Limiting',
//                 description: 'Infrastructure task to prevent DDoS attacks on public endpoints.',
//                 category: 'HIGH PRIORITY',
//                 categoryColor: 'bg-red-50 text-red-500 font-bold',
//                 date: 'OCT 14',
//             },
//         ],
//     },
//     {
//         id: 'col-2',
//         title: 'IN PROGRESS',
//         tasks: [
//             {
//                 id: 'task-3',
//                 title: 'Stripe Connect Sync',
//                 description: 'Align webhooks handling with the multi-tenant subscription flow.',
//                 category: 'INTEGRATION',
//                 categoryColor: 'bg-blue-50 text-blue-600',
//                 date: 'OCT 16',
//             },
//         ],
//     },
// ];

// // Mock de miembros actuales del tablero para el diseño
// const MOCK_MEMBERS = [
//     { id: 'u1', name: 'Jerson Cuevas', initial: 'J', bg: 'bg-pink-500' },
//     { id: 'u2', name: 'Victor', initial: 'V', bg: 'bg-indigo-500' },
//     { id: 'u3', name: 'Jhan Pierre', initial: 'P', bg: 'bg-emerald-500' },
// ];

// export default function MainKanban({ boardData }: Props) {
//     console.log('Boards detail', boardData);

//     // Estados de la UI
//     const [inviteEmail, setInviteEmail] = useState('');
//     const [displayColumns, setDisplayColumns] = useState(MOCK_COLUMNS);

//     // Estado simulación de miembros
//     const [members, setMembers] = useState(MOCK_MEMBERS);

//     useEffect(() => {
//         if (boardData && boardData.columns && boardData.columns.length > 0) {
//             const formattedColumns = boardData.columns.map((col) => ({
//                 id: col.id,
//                 title: col.title.toUpperCase(),
//                 tasks: col.tasks || [],
//             }));
//             setDisplayColumns(formattedColumns);
//         }
//     }, [boardData]);

//     return (
//         <div className='flex h-full w-full overflow-hidden relative'>
//             {/* Área Principal del Kanban */}
//             <div className='flex-1 flex flex-col min-w-0 h-full'>
//                 <div className='flex-1 flex gap-5 overflow-x-auto pb-4 snap-x scrollbar-thin select-none w-full items-start scroll-smooth'>
//                     {displayColumns.map((column) => (
//                         <div
//                             key={column.id}
//                             className='w-[330px] min-w-[290px] md:w-[350px] md:min-w-[340px] flex flex-col max-h-full flex-shrink-0'
//                         >
//                             {/* Header de columna */}
//                             <div className='flex items-center justify-between mb-4 px-1 flex-shrink-0'>
//                                 <div className='flex items-center gap-2 font-mono tracking-wider text-xs font-bold text-on-surface-variant uppercase'>
//                                     <h3>{column.title}</h3>
//                                     <span className='bg-blue-100 text-blue-600 text-[11px] px-2 py-0.5 rounded font-bold'>
//                                         {column.tasks?.length || 0}
//                                     </span>
//                                 </div>
//                                 <button className='text-on-surface-variant hover:text-on-surface p-1 transition-colors'>
//                                     <MoreHorizontal size={18} />
//                                 </button>
//                             </div>

//                             {/* Listado de Tarjetas */}
//                             <div className='flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin max-h-[calc(100vh-240px)]'>
//                                 {column.tasks?.map((task: any) => (
//                                     <div
//                                         key={task.id}
//                                         className='bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col gap-3'
//                                     >
//                                         <div>
//                                             <span
//                                                 className={`text-[10px] font-bold tracking-wide px-2.5 py-1 rounded ${task.categoryColor || 'bg-purple-50 text-purple-600'}`}
//                                             >
//                                                 {task.category || 'TASK'}
//                                             </span>
//                                         </div>
//                                         <div>
//                                             <h4 className='font-bold text-on-surface text-sm md:text-base leading-tight tracking-tight'>
//                                                 {task.title}
//                                             </h4>
//                                             {task.description && (
//                                                 <p className='text-xs md:text-sm text-on-surface-variant mt-1.5 leading-relaxed line-clamp-2'>
//                                                     {task.description}
//                                                 </p>
//                                             )}
//                                         </div>
//                                         <div className='flex items-center justify-between pt-2 mt-1 border-t border-slate-50 text-on-surface-variant/60 text-[11px] font-mono'>
//                                             <div className='flex items-center gap-1.5'>
//                                                 <Calendar size={13} />
//                                                 <span>{task.date || 'OCT 12'}</span>
//                                             </div>
//                                             <div className='w-6 h-6 rounded-full bg-surface-container-high border border-white flex items-center justify-center font-bold text-[10px] text-on-surface-variant'>
//                                                 U
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                                 <button className='w-full py-3 bg-white/40 border border-dashed border-outline-variant rounded-xl text-[11px] font-bold text-on-surface-variant hover:bg-white hover:text-primary hover:border-primary/50 transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer'>
//                                     <Plus size={14} />
//                                     <span>Add Card</span>
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* SIDEBAR DE ACTIVIDAD */}
//             {/* <div
//                 className={`absolute right-0 top-0 h-full z-40 md:relative md:z-0 transition-all duration-300 bg-white ${isActivityOpen ? 'w-80 border-l border-outline-variant' : 'w-0 overflow-hidden border-l-0'}`}
//             >
//                 {isActivityOpen && (
//                     <button
//                         // onClick={() => setIsActivityOpen(false)}
//                         className='md:hidden absolute right-4 top-4 z-50 w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant text-on-surface font-bold text-xs'
//                     >
//                         ✕
//                     </button>
//                 )}
//                 <ActivitySidebar isOpen={isActivityOpen} />
//             </div> */}
//         </div>
//     );
// }
