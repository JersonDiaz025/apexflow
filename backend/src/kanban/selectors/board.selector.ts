export const boardCardSelect = {
  id: true,
  title: true,
  description: true,
  ownerId: true,
  owner: {
    select: { name: true, email: true },
  },
  members: {
    select: {
      id: true,
      name: true,
    },
    take: 5,
  },
  columns: {
    select: {
      _count: {
        select: { tasks: true },
      },
    },
  },
  _count: {
    select: { columns: true },
  },
} as const;
