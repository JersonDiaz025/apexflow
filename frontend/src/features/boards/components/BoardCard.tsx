'use client';

import { Columns, CheckSquare, ChevronRight } from 'lucide-react';

export interface BoardCardProps {
    id: string;
    title: string;
    description: string;
    totalTasks: number;
    totalColumns: number;
    members: Array<{ id: string; name: string; avatar: string }>;
}

export default function BoardCard({
    title,
    description,
    totalTasks,
    totalColumns,
    members = [],
}: BoardCardProps) {
    const maxVisibleMembers = 3;
    const visibleMembers = members.slice(0, maxVisibleMembers);
    const extraMembers = members.length - maxVisibleMembers;

    return (
        <article
            role='article'
            aria-label={`Tablero ${title}`}
            tabIndex={0}
            className='group bg-white border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transform transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between min-h-[200px] cursor-pointer'
        >
            {/* Cabecera: Título y Flecha de acción */}
            <div>
                <div className='flex items-start justify-between gap-4'>
                    <h3 className='font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors truncate'>
                        {title}
                    </h3>
                    <span className='text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all p-1 rounded-lg group-hover:bg-primary/5 flex-shrink-0'>
                        <ChevronRight size={18} />
                    </span>
                </div>

                {/* Descripción Corta */}
                <p className='text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed'>
                    {description || 'Sin descripción disponible.'}
                </p>
            </div>

            {/* Pie de la Tarjeta: Métricas y Miembros */}
            <div className='mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-4'>
                {/* Grupo de Avatares Solapados */}
                <div className='flex -space-x-2 overflow-hidden'>
                    {visibleMembers.map((member) => (
                        <div
                            key={member.id}
                            title={member.name}
                            className='w-7 h-7 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center text-[10px] font-bold text-primary uppercase select-none flex-shrink-0'
                        >
                            {member.avatar}
                        </div>
                    ))}
                    {extraMembers > 0 && (
                        <div className='w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-600 flex-shrink-0'>
                            +{extraMembers}
                        </div>
                    )}
                </div>

                {/* Contadores Estadísticos (Columnas y Tareas) */}
                <div className='flex items-center gap-3 text-xs font-medium text-gray-500'>
                    <div className='flex items-center gap-1' title='Columnas'>
                        <Columns size={14} className='text-gray-400' />
                        <span>{totalColumns}</span>
                    </div>
                    <div className='flex items-center gap-1' title='Tareas totales'>
                        <CheckSquare size={14} className='text-gray-400' />
                        <span>{totalTasks}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
