'use client';

import Button from './Button';
import { Plus } from 'lucide-react';
import { AddButtonProps } from '@/types/btn.types';

export function AddButton({
    iconSize = 20,
    icon: Icon = Plus,
    className = '',
    onClick,
    children,
    ...props
}: AddButtonProps) {
    const isIconButton = !children;

    return (
        <Button
            type='button'
            aria-label={isIconButton ? 'Botón de acción' : undefined}
            onClick={onClick}
            className={`
                bg-primary text-white flex items-center justify-center gap-2
                shadow-md shadow-primary/30 hover:bg-primary/95 hover:shadow-lg
                hover:shadow-primary/40 active:scale-95 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-primary/40 group font-medium
                ${
                    isIconButton
                        ? 'w-12 h-12 rounded-2xl'
                        : 'px-5 py-2.5 rounded-precision text-sm w-full sm:w-auto'
                }
                ${className}
            `}
            {...props}
        >
            <Icon
                size={iconSize}
                className={`transition-transform duration-200 ${isIconButton ? 'group-hover:rotate-90' : 'group-hover:scale-110'}`}
            />

            {children && <span className='tracking-wide select-none'>{children}</span>}
        </Button>
    );
}

export default AddButton;
