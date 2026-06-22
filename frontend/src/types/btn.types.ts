import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    isPrimary?: boolean;
    iconSize?: number;
    icon?: LucideIcon;
    variant?: 'primary' | 'secondary';
}

export interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    iconSize?: ButtonProps['iconSize'];
    icon?: ButtonProps['icon'];
    children?: React.ReactNode;
}
