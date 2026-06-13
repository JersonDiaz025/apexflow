'use client';

import { useState, useEffect } from 'react';
import { useBoard } from '@/hooks/useBoard';
import { Board } from '@/interfaces/kanban.interface';
import ActivitySidebar from '@/components/navbar/ActivitySidebar';
import { Calendar, MoreHorizontal, Plus } from 'lucide-react';

interface Props {
    initialBoard: Board;
}

// Estructura de mocks para visualizar el diseño de ApexFlow de inmediato
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
            {
                id: 'task-4',
                title: 'Dark Mode System',
                description: 'Developing the color tokens for a platform-wide dark theme.',
                category: 'UI DESIGN',
                categoryColor: 'bg-purple-50 text-purple-600',
                date: 'OCT 18',
            },
        ],
    },
    {
        id: 'col-3',
        title: 'DONE',
        tasks: [
            {
                id: 'task-5',
                title: 'Firebase Migration',
                description:
                    'Successfully moved token registration storage to the cloud infrastructure.',
                category: 'DEVOPS',
                categoryColor: 'bg-emerald-50 text-emerald-600',
                date: 'OCT 05',
            },
        ],
    },
];

export default function KanbanBoard({ initialBoard }: Props) {
    // Intentamos consumir tu hook real
    const board = useBoard(initialBoard);

    // Estado para controlar el Sidebar de actividad
    const [isActivityOpen, setIsActivityOpen] = useState(false);

    // Estado local para las columnas que decide si usar el backend o el mock visual
    const [displayColumns, setDisplayColumns] = useState(MOCK_COLUMNS);

    // Si en el futuro tu backend responde con columnas reales, el componente se actualizará solo
    useEffect(() => {
        if (board && board.columns && board.columns.length > 0) {
            // Mapeamos los datos de tu backend adaptando la estructura si hace falta
            const formattedColumns = board.columns.map((col) => ({
                id: col.id,
                title: col.title.toUpperCase(),
                tasks: col.tasks || [],
            }));
            setDisplayColumns(formattedColumns);
        }
    }, [board]);

    // Helpers visuales para los badges cuando usas datos reales del backend
    const getBadgeStyles = (title: string, customColor?: string) => {
        if (customColor) return customColor;
        if (title.toLowerCase().includes('auth')) return 'bg-indigo-50 text-indigo-600';
        if (title.toLowerCase().includes('rate')) return 'bg-red-50 text-red-500 font-bold';
        if (title.toLowerCase().includes('stripe')) return 'bg-blue-50 text-blue-600';
        return 'bg-purple-50 text-purple-600';
    };

    const getCategory = (title: string, customCategory?: string) => {
        if (customCategory) return customCategory;
        if (title.toLowerCase().includes('auth')) return 'FEATURE';
        if (title.toLowerCase().includes('rate')) return 'HIGH PRIORITY';
        if (title.toLowerCase().includes('stripe')) return 'INTEGRATION';
        return 'UI DESIGN';
    };

    return (
        <div className='flex h-full w-full overflow-hidden relative'>
            {/* Área Principal del Kanban */}
            <div className='flex-1 flex flex-col min-w-0 h-full'>
                {/* Barra superior de herramientas */}
                <div className='mb-6 flex items-center justify-between flex-shrink-0'>
                    <div>
                        <h2 className='text-xl font-bold text-on-surface'>
                            {board?.title || 'Project Board (Preview)'}
                        </h2>
                        <p className='text-sm text-on-surface-variant hidden sm:block mt-1'>
                            Manage, organize, and track your team tasks.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsActivityOpen(!isActivityOpen)}
                        className='ml-auto px-4 py-2 bg-white border border-outline-variant rounded-precision text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors shadow-sm'
                    >
                        {isActivityOpen ? 'Hide Activity' : 'Show Activity'}
                    </button>
                </div>

                {/* CONTENEDOR PADRE CON SCROLL HORIZONTAL (Usa tus clases globales de Tailwind v4) */}
                <div className='flex-1 flex gap-5 overflow-x-auto pb-4 snap-x scrollbar-thin select-none w-full items-start scroll-smooth'>
                    {displayColumns.map((column) => (
                        /* Columna Kanban adaptada con el ancho de tu UI design */
                        <div
                            key={column.id}
                            className='w-[330px] min-w-[290px] md:w-[350px] md:min-w-[340px] flex flex-col max-h-full flex-shrink-0'
                        >
                            {/* Header de la Columna */}
                            <div className='flex items-center justify-between mb-4 px-1 flex-shrink-0'>
                                <div className='flex items-center gap-2 font-mono tracking-wider text-xs font-bold text-on-surface-variant uppercase'>
                                    <h3>{column.title}</h3>
                                    <span className='bg-blue-100 text-blue-600 text-[11px] px-2 py-0.5 rounded font-sans font-bold'>
                                        {column.tasks?.length || 0}
                                    </span>
                                </div>
                                <button className='text-on-surface-variant hover:text-on-surface p-1 transition-colors rounded'>
                                    <MoreHorizontal size={18} />
                                </button>
                            </div>

                            {/* Contenedor de las Tarjetas de Tareas (.task-card de tu globals.css) */}
                            <div className='flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin max-h-[calc(100vh-240px)]'>
                                {column.tasks?.map((task: any) => (
                                    <div
                                        key={task.id}
                                        className='bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all cursor-grab active:cursor-grabbing flex flex-col gap-3'
                                    >
                                        {/* Badge Superior */}
                                        <div>
                                            <span
                                                className={`text-[10px] md:text-[11px] font-bold tracking-wide px-2.5 py-1 rounded ${getBadgeStyles(task.title, task.categoryColor)}`}
                                            >
                                                {getCategory(task.title, task.category)}
                                            </span>
                                        </div>

                                        {/* Cuerpo de la Tarea */}
                                        <div>
                                            <h4 className='font-bold text-on-surface text-sm md:text-base leading-tight tracking-tight'>
                                                {task.title}
                                            </h4>
                                            {task.description && (
                                                <p className='text-xs md:text-sm text-on-surface-variant mt-1.5 leading-relaxed font-normal line-clamp-2'>
                                                    {task.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Footer de la Tarjeta */}
                                        <div className='flex items-center justify-between pt-2 mt-1 border-t border-slate-50 text-on-surface-variant/60'>
                                            <div className='flex items-center gap-1.5 text-[11px] font-medium font-mono'>
                                                <Calendar size={13} />
                                                <span>{task.date || 'OCT 12'}</span>
                                            </div>

                                            <div className='w-6 h-6 rounded-full bg-surface-container-high border border-white shadow-inner flex items-center justify-center text-[10px] font-bold text-on-surface-variant'>
                                                U
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Botón interactivo de + Add Card */}
                                <button className='w-full py-3 bg-white/40 border border-dashed border-outline-variant rounded-xl text-[11px] font-bold text-on-surface-variant hover:bg-white hover:text-primary hover:border-primary/50 transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer'>
                                    <Plus size={14} />
                                    <span>Add Card</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* BARRA DE ACTIVIDAD ADAPTATIVA (Sidebar) */}
            <div
                className={`
                absolute right-0 top-0 h-full z-50 md:relative md:z-0 transition-all duration-300 bg-white
                ${isActivityOpen ? 'w-80 border-l border-outline-variant' : 'w-0 overflow-hidden border-l-0'}
            `}
            >
                {isActivityOpen && (
                    <button
                        onClick={() => setIsActivityOpen(false)}
                        className='md:hidden absolute right-4 top-4 z-50 w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant text-on-surface font-bold text-xs hover:bg-surface-container-low'
                    >
                        ✕
                    </button>
                )}
                <ActivitySidebar isOpen={isActivityOpen} />
            </div>
        </div>
    );
}
