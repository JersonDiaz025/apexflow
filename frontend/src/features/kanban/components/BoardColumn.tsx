import { MoreHorizontal, Plus } from 'lucide-react';
import { Column } from '@/interfaces/kanban.interface';
import TaskCard from './TaskCard';

interface BoardColumnProps {
    column: Column;
    onAddTask: () => void;
}

export default function BoardColumn({ column, onAddTask }: BoardColumnProps) {
    return (
        <>
            {/* Header de columna */}
            <div className="flex items-center justify-between mb-4 px-1 flex-shrink-0">
                <div className="flex items-center gap-2 font-mono tracking-wider text-xs font-bold text-gray-500 uppercase">
                    <h3>{column.title}</h3>
                    <span className="bg-blue-50 text-blue-600 text-[11px] px-2 py-0.5 rounded-md font-bold">
                        {column.tasks?.length || 0}
                    </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1 transition-colors cursor-pointer">
                    <MoreHorizontal size={18} />
                </button>
            </div>

            {/* Listado de Tarjetas */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin max-h-[calc(100vh-240px)]">
                {column.tasks?.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}

                <button
                    onClick={onAddTask}
                    className="w-full py-3 bg-white/40 border border-dashed border-gray-200 rounded-xl text-[11px] font-bold text-gray-400 hover:bg-white hover:text-indigo-600 hover:border-indigo-200 transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                    <Plus size={14} />
                    <span>Add Card</span>
                </button>
            </div>
        </>
    );
}
