import { cn } from '@/utils/cn';
import { InputProps } from '@/types/input.types';

export const Input = ({ hasError, className, ...props }: InputProps) => {
    return (
        <input
            {...props}
            className={cn(
                'w-full h-12 px-4 rounded-md bg-white border border-gray-200 text-gray-900 placeholder-gray-400 outline-none transition-all duration-150',
                'focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10',
                hasError &&
                    'border-red-500 focus:border-red-500 focus:ring-red-500/10 bg-red-50/10',
                className
            )}
        />
    );
};
