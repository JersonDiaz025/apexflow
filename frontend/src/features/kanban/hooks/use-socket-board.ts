'use client';

import { useEffect, useState } from 'react';
import { useKanbanStore } from '@/store/kanban.store';
import { KanbanHookProps } from '@/features/kanban/interfaces/kanban-hook.interface';

export function useSocketBoard({ boardId, initialData }: KanbanHookProps) {
    const [isReady, setIsReady] = useState(false);

    const initSocket = useKanbanStore((state) => state.initSocket);
    const disconnectSocket = useKanbanStore((state) => state.disconnectSocket);
    const setBoard = useKanbanStore((state) => state.setBoard);

    useEffect(() => {
        // 1. Inyectamos los datos frescos del servidor al Store
        setBoard(initialData);

        // 2. Acoplamos el WebSocket para este espacio
        initSocket(boardId);

        // Marcamos que el entorno está listo para renderizar
        setIsReady(true);

        // 🚀 CLEANUP ABSOLUTO: Cuando el usuario abandona la vista, el socket muere
        return () => {
            disconnectSocket();
        };
    }, [boardId, initialData, initSocket, disconnectSocket, setBoard]);

    return { isReady };
}
