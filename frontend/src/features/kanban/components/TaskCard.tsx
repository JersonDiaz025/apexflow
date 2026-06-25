import { Calendar } from 'lucide-react';

const TaskCard = ({ task }) => {
    return (
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
    );
};

export default TaskCard;
