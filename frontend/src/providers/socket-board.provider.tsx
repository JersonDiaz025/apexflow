'use client';

import React, { createContext, useContext } from 'react';
import { useSocketBoard } from '@/features/kanban/hooks/use-socket-board';
import { BoardSocketProviderProps } from '@/features/kanban/interfaces/kanban-provider.interface';

const BoardSocketContext = createContext<boolean>(false);

export function BoardSocketProvider({ boardId, initialData, children }: BoardSocketProviderProps) {
    const { isReady } = useSocketBoard({ boardId, initialData });

    if (!isReady) {
        return (
            <div className='flex h-96 w-full items-center justify-center'>
                <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-primary' />
            </div>
        );
    }

    return <BoardSocketContext.Provider value={isReady}>{children}</BoardSocketContext.Provider>;
}

export const useBoardSocketStatus = () => useContext(BoardSocketContext);
