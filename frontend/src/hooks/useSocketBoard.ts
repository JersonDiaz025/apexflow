'use client';

import { useEffect } from 'react';
import { useKanbanStore } from '@/store/useKanbanStore';

export function useSocketBoard(boardId: string) {
    const { initSocket, disconnectSocket } = useKanbanStore();

    useEffect(() => {
        initSocket(boardId);

        return () => {
            disconnectSocket();
        };
    }, [boardId]);
}
