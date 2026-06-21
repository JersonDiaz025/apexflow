'use client';

import { Plus, LucideIcon } from 'lucide-react';

interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: number;
    iconSize?: number;
    icon?: LucideIcon;
}

export function AddButton({
    size = 14,
    iconSize = 26,
    icon: Icon = Plus,
    className = '',
    onClick,
    ...props
}: AddButtonProps) {
    return (
        <button
            type='button'
            aria-label='Botón de acción'
            onClick={onClick}
            className={`w-${size} h-${size} bg-primary text-white rounded-2xl flex items-center justify-center shadow-md shadow-primary/30 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/40 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 group ${className}`}
            {...props}
        >
            <Icon
                size={iconSize}
                className='transition-transform duration-200 group-hover:rotate-90'
            />
        </button>
    );
}

export default AddButton;
