'use client';

import { useEffect } from 'react';
import { useSocketBoard } from './useSocketBoard';
import { Board } from '@/interfaces/kanban.interface';
import { useKanbanStore } from '@/store/useKanbanStore';

export function useBoard(initialBoard: Board) {
    const { board, setBoard } = useKanbanStore();

    useSocketBoard(initialBoard.id);

    useEffect(() => {
        setBoard(initialBoard);
    }, [initialBoard, setBoard]);

    return board ?? initialBoard;
}
