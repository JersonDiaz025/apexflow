import { getAvatarInitials } from '@/utils/avatar.util';

export function mapToBoardCardDto(board: any) {
  return {
    id: board.id,
    title: board.title,
    description: board?.description || '',
    ownerId: board.ownerId,
    ownerName: board.owner?.name,
    totalColumns: board._count.columns,
    totalTasks: board.columns.reduce((acc: number, col: any) => acc + col._count.tasks, 0),
    members: board.members.map((m: any) => ({
      id: m.id,
      name: m.name,
      avatar: getAvatarInitials(m.name),
    })),
  };
}
