'use client';

import { ROUTES } from '@/constants/routes.constant';
import { usePathname, useParams } from 'next/navigation';
import { BreadcrumbLink } from '@/interfaces/breadcrumb.interface';

export function useBreadcrumb(staticItems?: BreadcrumbLink[]): BreadcrumbLink[] {
    const pathname = usePathname();
    const params = useParams();

    if (staticItems) {
        return staticItems;
    }

    const baseItems: BreadcrumbLink[] = [{ label: 'Tableros', href: ROUTES.BOARDS }];

    // Si estamos dentro de un tablero específico: "/board/[id]"
    if (params.id && pathname.includes('/board/')) {
        // NOTA: Aquí puedes conectar el hook a tu Zustand Store para sacar el título real:
        // const currentBoard = useBoardStore((state) => state.boards.find(b => b.id === params.id));
        // const boardName = currentBoard?.title || 'Cargando...';

        const boardName = 'Tablero Activo'; // Fallback temporal mientras se resuelve el fetch
        baseItems.push({
            label: boardName,
        });
    }

    return baseItems;
}
