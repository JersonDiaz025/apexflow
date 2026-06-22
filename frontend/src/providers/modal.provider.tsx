'use client';

import { useEffect, useState } from 'react';
import { useModalStore } from '@/store/modal.store';
import { Modal } from '@/components/shared/Modal';
import { MODAL_TYPES } from '@/constants/modal-types.constants';
import CreateBoardForm from '@/features/boards/components/CreateBoardForm';

const ViewTaskContent = ({ id }: { id?: string }) => (
    <div className='text-sm text-gray-600'>Contenido del las tarjeta: {id}</div>
);

export function ModalProvider() {
    const { isOpen, type, data, onClose } = useModalStore();
    const [isMounted, setIsMounted] = useState(false);

    // Evita errores de Hidratación en Next.js (SSR vs CSR)
    useEffect(() => {
        // Defer setting mounted to avoid synchronous setState within effect
        const t = setTimeout(() => setIsMounted(true), 0);
        return () => clearTimeout(t);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            {/* MODAL 1: CREAR TABLERO */}
            <Modal
                isOpen={isOpen && type === MODAL_TYPES.CREATE_BOARD}
                onClose={onClose}
                title='Crear nuevo tablero'
                description='Los tableros te permiten organizar tus columnas y tareas de forma ágil.'
            >
                <CreateBoardForm />
            </Modal>

            {/* MODAL 2: VER DETALLE DE CARD
            <Modal
                isOpen={isOpen && type === 'viewBoardCard'}
                onClose={onClose}
                title='Detalles del Tablero'
                description='Monitorea y edita la metadata del espacio seleccionado.'
            >
                <ViewBoardCardContent id={data.boardId} />
            </Modal> */}

            {/* MODAL 2: VER DETALLE DE TASK */}
            <Modal
                isOpen={isOpen && type === MODAL_TYPES.TASK_DETAIL}
                onClose={onClose}
                title='Detalles de card'
                description='Viendo detalle de card'
            >
                <ViewTaskContent id={data.boardId} />
            </Modal>
        </>
    );
}
