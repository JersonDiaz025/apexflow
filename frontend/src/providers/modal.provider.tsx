'use client';

import { useEffect, useState } from 'react';
import { useModalStore } from '@/store/modal.store';
import { Modal } from '@/components/shared/Modal';
import { MODAL_TYPES } from '@/constants/modal-types.constants';
import CreateBoardForm from '@/features/boards/components/CreateBoardForm';
import InviteUserForm from '@/features/team/components/InviteUserForm';

const ViewTaskContent = ({ id }: { id?: string }) => (
    <div className='text-sm text-gray-600'>Contenido del las tarjeta: {id}</div>
);

export function ModalProvider() {
    const { isOpen, type, data, onClose } = useModalStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setIsMounted(true), 0);
        return () => clearTimeout(t);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <Modal
                isOpen={isOpen && type === MODAL_TYPES.CREATE_BOARD}
                onClose={onClose}
                title='Crear nuevo tablero'
                description='Los tableros te permiten organizar tus columnas y tareas de forma ágil.'
            >
                <CreateBoardForm />
            </Modal>
            <Modal
                isOpen={isOpen && type === MODAL_TYPES.INVITE_USER}
                onClose={onClose}
                title='Enviar invitación'
                description='Ingresa el correo electrónico de tu compañero de equipo para compartir este espacio de trabajo.'
            >
                <InviteUserForm />
            </Modal>
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
