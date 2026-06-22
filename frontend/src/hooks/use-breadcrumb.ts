'use client';

import { BreadcrumbLink } from '@/interfaces/breadcrumb.interface';

export function useBreadcrumb(items: BreadcrumbLink[] = []): BreadcrumbLink[] {
    return [...items];
}
