import { Columns3 } from 'lucide-react';
import { AddButton, Title } from '@/components';
import { EmptyStateColumnProps } from '@/features/kanban/interfaces/empty-colum.interface';

export const EmptyStateColumn: React.FC<EmptyStateColumnProps> = ({ onCreateColumn }) => {
    return (
        <div className='max-w-md w-full px-6 py-8 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 mx-auto'>
            <div className='relative inline-block mb-2'>
                <div className='w-20 h-20 bg-surface-container-lowest border border-outline-variant rounded-2xl flex items-center justify-center relative z-10 shadow-sm'>
                    <Columns3 className='w-8 h-8 text-primary/40' />
                </div>
                <div className='absolute -top-3 -right-3 w-12 h-12 bg-primary/5 rounded-full border border-primary/10 z-0'/>
            </div>
            <div className='space-y-2'>
                <Title
                    text='Tu espacio de trabajo está listo.'
                    className='font-headline-lg text-2xl font-bold text-on-surface'
                />
                <Title
                    text='La precisión comienza con la estructura. Añade tu primera columna para empezar a
                    gestionar tus tareas.'
                    className='font-body-md text-sm text-on-surface-variant max-w-[340px] mx-auto leading-relaxed'
                />
            </div>
            <div className='flex justify-center w-full'>
                <AddButton
                    iconSize={18}
                    className='flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-xl shadow-sm hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50'
                    onClick={onCreateColumn}
                >
                    Crear columna
                </AddButton>
            </div>
        </div>
    );
};
