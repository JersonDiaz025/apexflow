import { BoardData, TaskMovedServerPayload } from '@/interfaces/kanban.interface';

/**
 * Mueve una tarea entre columnas de forma optimista e infiere los nuevos órdenes locales.
 */
export function applyTaskMovement(board: BoardData, data: TaskMovedServerPayload): BoardData {
  const updatedColumns = board.columns.map((col) => {
    let tasks = [...col.tasks];

    // 1. Remover del origen si corresponde
    if (col.id === data.fromColumnId) {
      tasks = tasks.filter((t) => t.id !== data.taskId);
    }

    // 2. Insertar en el destino con el nuevo orden
    if (col.id === data.toColumnId) {
      const targetTask = board.columns
        .flatMap((c) => c.tasks)
        .find((t) => t.id === data.taskId);

      if (targetTask) {
        const updatedTask = { ...targetTask, columnId: data.toColumnId, order: data.newOrder };
        tasks.splice(data.newOrder, 0, updatedTask);
      }
    }

    // 3. Re-indexar el orden interno para evitar gaps
    return {
      ...col,
      tasks: tasks.map((t, idx) => ({ ...t, order: idx })),
    };
  });

  return { ...board, columns: updatedColumns };
}
