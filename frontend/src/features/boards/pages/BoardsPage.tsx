'use client';
import { AddButton } from '@/components';
import LayoutPages from '@/layouts/LayoutPages';
import { BoardsPageProps } from '../interfaces/board.interfaces';
import BoardCard from '@/features/boards/components/BoardCard';

const BoardsPage = ({ data }: BoardsPageProps) => {
    const MOCK_BOARDS = [
        {
            id: 'board-1',
            title: '🚀 Product Roadmap 2026',
            description:
                'Planificación estratégica de las features core de ApexFlow, despliegues en la nube y optimización de arquitectura.',
            totalColumns: 4,
            totalTasks: 24,
            members: [
                { id: 'm1', name: 'Jerson Ramos', avatar: 'JR' },
                { id: 'm2', name: 'Carlos Mendoza', avatar: 'CM' },
                { id: 'm3', name: 'Ana Alcántara', avatar: 'AA' },
                { id: 'm4', name: 'David Ortiz', avatar: 'DO' },
            ],
        },
        {
            id: 'board-1',
            title: '🚀 Product Roadmap 2026',
            description:
                'Planificación estratégica de las features core de ApexFlow, despliegues en la nube y optimización de arquitectura.',
            totalColumns: 4,
            totalTasks: 24,
            members: [
                { id: 'm1', name: 'Jerson Ramos', avatar: 'JR' },
                { id: 'm2', name: 'Carlos Mendoza', avatar: 'CM' },
                { id: 'm3', name: 'Ana Alcántara', avatar: 'AA' },
                { id: 'm4', name: 'David Ortiz', avatar: 'DO' },
            ],
        },
        {
            id: 'board-1',
            title: '🚀 Product Roadmap 2026',
            description:
                'Planificación estratégica de las features core de ApexFlow, despliegues en la nube y optimización de arquitectura.',
            totalColumns: 4,
            totalTasks: 24,
            members: [
                { id: 'm1', name: 'Jerson Ramos', avatar: 'JR' },
                { id: 'm2', name: 'Carlos Mendoza', avatar: 'CM' },
                { id: 'm3', name: 'Ana Alcántara', avatar: 'AA' },
                { id: 'm4', name: 'David Ortiz', avatar: 'DO' },
            ],
        },
        {
            id: 'board-1',
            title: '🚀 Product Roadmap 2026',
            description:
                'Planificación estratégica de las features core de ApexFlow, despliegues en la nube y optimización de arquitectura.',
            totalColumns: 4,
            totalTasks: 24,
            members: [
                { id: 'm1', name: 'Jerson Ramos', avatar: 'JR' },
                { id: 'm2', name: 'Carlos Mendoza', avatar: 'CM' },
                { id: 'm3', name: 'Ana Alcántara', avatar: 'AA' },
                { id: 'm4', name: 'David Ortiz', avatar: 'DO' },
            ],
        },

        {
            id: 'board-1',
            title: '🚀 Product Roadmap 2026',
            description:
                'Planificación estratégica de las features core de ApexFlow, despliegues en la nube y optimización de arquitectura.',
            totalColumns: 4,
            totalTasks: 24,
            members: [
                { id: 'm1', name: 'Jerson Ramos', avatar: 'JR' },
                { id: 'm2', name: 'Carlos Mendoza', avatar: 'CM' },
                { id: 'm3', name: 'Ana Alcántara', avatar: 'AA' },
                { id: 'm4', name: 'David Ortiz', avatar: 'DO' },
            ],
        },
        {
            id: 'board-1',
            title: '🚀 Product Roadmap 2026',
            description:
                'Planificación estratégica de las features core de ApexFlow, despliegues en la nube y optimización de arquitectura.',
            totalColumns: 4,
            totalTasks: 24,
            members: [
                { id: 'm1', name: 'Jerson Ramos', avatar: 'JR' },
                { id: 'm2', name: 'Carlos Mendoza', avatar: 'CM' },
                { id: 'm3', name: 'Ana Alcántara', avatar: 'AA' },
                { id: 'm4', name: 'David Ortiz', avatar: 'DO' },
            ],
        },
        {
            id: 'board-1',
            title: '🚀 Product Roadmap 2026',
            description:
                'Planificación estratégica de las features core de ApexFlow, despliegues en la nube y optimización de arquitectura.',
            totalColumns: 4,
            totalTasks: 24,
            members: [
                { id: 'm1', name: 'Jerson Ramos', avatar: 'JR' },
                { id: 'm2', name: 'Carlos Mendoza', avatar: 'CM' },
                { id: 'm3', name: 'Ana Alcántara', avatar: 'AA' },
                { id: 'm4', name: 'David Ortiz', avatar: 'DO' },
            ],
        },
        {
            id: 'board-1',
            title: '🚀 Product Roadmap 2026',
            description:
                'Planificación estratégica de las features core de ApexFlow, despliegues en la nube y optimización de arquitectura.',
            totalColumns: 4,
            totalTasks: 24,
            members: [
                { id: 'm1', name: 'Jerson Ramos', avatar: 'JR' },
                { id: 'm2', name: 'Carlos Mendoza', avatar: 'CM' },
                { id: 'm3', name: 'Ana Alcántara', avatar: 'AA' },
                { id: 'm4', name: 'David Ortiz', avatar: 'DO' },
            ],
        },
        {
            id: 'board-1',
            title: '🚀 Product Roadmap 2026',
            description:
                'Planificación estratégica de las features core de ApexFlow, despliegues en la nube y optimización de arquitectura.',
            totalColumns: 4,
            totalTasks: 24,
            members: [
                { id: 'm1', name: 'Jerson Ramos', avatar: 'JR' },
                { id: 'm2', name: 'Carlos Mendoza', avatar: 'CM' },
                { id: 'm3', name: 'Ana Alcántara', avatar: 'AA' },
                { id: 'm4', name: 'David Ortiz', avatar: 'DO' },
            ],
        },
        {
            id: 'board-1',
            title: '🚀 Product Roadmap 2026',
            description:
                'Planificación estratégica de las features core de ApexFlow, despliegues en la nube y optimización de arquitectura.',
            totalColumns: 4,
            totalTasks: 24,
            members: [
                { id: 'm1', name: 'Jerson Ramos', avatar: 'JR' },
                { id: 'm2', name: 'Carlos Mendoza', avatar: 'CM' },
                { id: 'm3', name: 'Ana Alcántara', avatar: 'AA' },
                { id: 'm4', name: 'David Ortiz', avatar: 'DO' },
            ],
        },
        {
            id: 'board-1',
            title: '🚀 Product Roadmap 2026',
            description:
                'Planificación estratégica de las features core de ApexFlow, despliegues en la nube y optimización de arquitectura.',
            totalColumns: 4,
            totalTasks: 24,
            members: [
                { id: 'm1', name: 'Jerson Ramos', avatar: 'JR' },
                { id: 'm2', name: 'Carlos Mendoza', avatar: 'CM' },
                { id: 'm3', name: 'Ana Alcántara', avatar: 'AA' },
                { id: 'm4', name: 'David Ortiz', avatar: 'DO' },
            ],
        },
        {
            id: 'board-1',
            title: '🚀 Product Roadmap 2026',
            description:
                'Planificación estratégica de las features core de ApexFlow, despliegues en la nube y optimización de arquitectura.',
            totalColumns: 4,
            totalTasks: 24,
            members: [
                { id: 'm1', name: 'Jerson Ramos', avatar: 'JR' },
                { id: 'm2', name: 'Carlos Mendoza', avatar: 'CM' },
                { id: 'm3', name: 'Ana Alcántara', avatar: 'AA' },
                { id: 'm4', name: 'David Ortiz', avatar: 'DO' },
            ],
        },
        {
            id: 'board-2',
            title: '🎨 Rediseño UI/UX (Design System)',
            description:
                'Tokens de diseño, componentes atómicos en Tailwind CSS, estados de carga y guías de accesibilidad.',
            totalColumns: 3,
            totalTasks: 12,
            members: [
                { id: 'm1', name: 'Jerson Ramos', avatar: 'JR' },
                { id: 'm3', name: 'Ana Alcántara', avatar: 'AA' },
            ],
        },
        {
            id: 'board-3',
            title: '🔒 Seguridad y Backend Core',
            description:
                'Configuración de guards en NestJS, rotación de tokens JWT en cookies httpOnly e interceptores globales.',
            totalColumns: 5,
            totalTasks: 8,
            members: [
                { id: 'm1', name: 'Jerson Ramos', avatar: 'JR' },
                { id: 'm2', name: 'Carlos Mendoza', avatar: 'CM' },
                { id: 'm5', name: 'Elena Rostova', avatar: 'ER' },
                { id: 'm6', name: 'Bryan Cruz', avatar: 'BC' },
                { id: 'm7', name: 'Fiona G.', avatar: 'FG' },
            ],
        },
    ];
    return (
        <LayoutPages
            title='Mis tableros'
            subTitle='Gestiona tus espacios de trabajo, realiza el seguimiento de tus tareas y colabora con tu equipo en ApexFlow.'
        >
            {/* Contenedor Grid Responsivo de Alta Precisión */}
            <AddButton size={14} iconSize={26} onClick={() => {}}  className='absolute right-12 top-20'/>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 px-1'>
                {MOCK_BOARDS.map((board) => (
                    <BoardCard
                        key={board.id}
                        id={board.id}
                        title={board.title}
                        description={board.description}
                        totalColumns={board.totalColumns}
                        totalTasks={board.totalTasks}
                        members={board.members}
                    />
                ))}
            </div>
        </LayoutPages>
    );
};

export default BoardsPage;
