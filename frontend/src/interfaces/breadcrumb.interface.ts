import { LucideIcon } from 'lucide-react';

export interface BreadcrumbLink {
    label: string;
    href?: string;
    icon?: LucideIcon;
}

export interface BreadcrumbProps {
    items: BreadcrumbLink[];
}
