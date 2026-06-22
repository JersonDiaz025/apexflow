'use client';

import { useActionState } from 'react';
import { useModalStore } from '@/store/modal.store';
import { useActionToast } from '@/hooks/use-action-toast';
// import { createBoardAction } from '@/actions/board.actions';
import { FormField } from '@/components/shared/FormField';
import { AddButton } from '@/components/shared/AddButton';
import { ErrorLabel } from '@/components/shared/ErrorLabel';
import { FolderPlus } from 'lucide-react';
import { createBoardAction } from '@/actions/kanban/board.actions';
import { INITIAL_BOARD_FORM_STATE } from '@/schemas/board.schema';
import { ROUTES } from '@/constants/routes.constant';

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
            {/* Campo: Título del Tablero */}
            <FormField
                label='Título del Tablero'
                name='title'
                type='text'
                required
                disabled={pending}
                defaultValue={state?.data?.title ?? ''}
                errorLabel={state?.errors?.title?.[0]}
                placeholder='Ej. Sprint Backlog, Desarrollo Web...'
            />

            {/* Campo: Descripción (Opcional, gracias a tu migración de DB) */}
            <FormField
                label='Descripción corta'
                name='description'
                type='text'
                disabled={pending}
                defaultValue={state?.data?.description ?? ''}
                errorLabel={state?.errors?.description?.[0]}
                placeholder='¿De qué trata este espacio de trabajo?'
            />

            {/* Alerta de error global en el pie del formulario si falla */}
            {state?.message && !state.success && (
                <div className='pt-2'>
                    <ErrorLabel errorLabel={state.message} />
                </div>
            )}

            {/* Footer de Acciones del Modal */}
            <div className='flex items-center justify-end gap-3 pt-4 border-t border-gray-100'>
                <button
                    type='button'
                    disabled={pending}
                    onClick={closeModal}
                    className='px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors disabled:opacity-50'
                >
                    Cancelar
                </button>

                {/* Tu AddButton polimórfico en acción: Ícono + Texto */}
                <AddButton type='submit' disabled={pending} icon={FolderPlus} iconSize={18}>
                    {pending ? 'Creando espacio...' : 'Crear Tablero'}
                </AddButton>
            </div>
        </form>
    );
}
