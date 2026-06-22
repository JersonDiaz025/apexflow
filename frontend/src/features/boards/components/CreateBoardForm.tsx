'use client';

import { useActionState } from 'react';
import { Button, AddButton } from '@/components';
import { useModalStore } from '@/store/modal.store';
import { ROUTES } from '@/constants/routes.constant';
import { useActionToast } from '@/hooks/use-action-toast';
import { FormField } from '@/components/shared/FormField';
import { ErrorLabel } from '@/components/shared/ErrorLabel';
import { createBoardAction } from '@/actions/kanban/board.actions';
import { INITIAL_BOARD_FORM_STATE } from '@/schemas/board.schema';
import { FORM_TYPES } from '@/constants/form-types.constants';

export default function CreateBoardForm() {
    const closeModal = useModalStore((state) => state.onClose);

    // Hook nativo de React para controlar la mutación y el estado de carga
    const [state, formAction, pending] = useActionState(
        createBoardAction,
        INITIAL_BOARD_FORM_STATE
    );

    // 🔥 Escucha el estado: Dispara el toast de Sileo (top-center) y cierra el modal al triunfar
    useActionToast(state, ROUTES.BOARDS, () => {
        closeModal();
    });

    return (
        <form action={formAction} className='space-y-5'>
            <FormField
                type='text'
                label='Título'
                disabled={pending}
                name={FORM_TYPES.TITLE}
                defaultValue={state?.data?.title ?? ''}
                errorLabel={state?.errors?.title?.[0]}
                placeholder='Ej. Sprint Backlog, Desarrollo Web...'
            />

            <FormField
                type='text'
                label='Descripción'
                disabled={pending}
                name={FORM_TYPES.DESCRIPTION}
                defaultValue={state?.data?.description ?? ''}
                errorLabel={state?.errors?.description?.[0]}
                placeholder='¿De qué trata este espacio de trabajo?'
            />

            {state?.message && !state.success && (
                <div className='pt-2'>
                    <ErrorLabel errorLabel={state.message} />
                </div>
            )}

            <div className='flex items-center justify-end gap-3 pt-4 border-t border-gray-100'>
                <Button
                    type='button'
                    disabled={pending}
                    onClick={closeModal}
                    className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-500 rounded-md transition-colors disabled:opacity-50'
                >
                    Cancelar
                </Button>

                <AddButton type='submit' disabled={pending} iconSize={18}>
                    {pending ? 'Creando espacio...' : 'Crear tablero'}
                </AddButton>
            </div>
        </form>
    );
}
