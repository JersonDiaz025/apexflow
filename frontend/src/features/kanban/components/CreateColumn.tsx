'use client';

import { useActionState } from 'react';
import { Button, AddButton } from '@/components';
import { useModalStore } from '@/store/modal.store';
import { ROUTES } from '@/constants/routes.constant';
import { GenericFormState } from '@/types/form.types';
import { useActionToast } from '@/hooks/use-action-toast';
import { FormField } from '@/components/shared/FormField';
import { ErrorLabel } from '@/components/shared/ErrorLabel';
import { FORM_TYPES } from '@/constants/form-types.constants';
import { createColumnAction } from '@/actions/kanban/board.actions';
import { INITIAL_COLUMN_FORM_STATE } from '@/schemas/column.schema';
import { CreateColumnInput } from '../interfaces/column-state.interface';

export default function CreateColumnForm() {
    const { onClose, data } = useModalStore();
    const boardId = data?.boardId;

    const createColumnWithIdAction = createColumnAction.bind(null, boardId);

    const [state, formAction, pending] = useActionState(
        createColumnWithIdAction,
        INITIAL_COLUMN_FORM_STATE as GenericFormState<CreateColumnInput>
    );

    useActionToast(state, `${ROUTES.BOARDS}/${boardId}`, () => {
        onClose();
    });

    return (
        <div className='max-w-lg w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 mx-auto'>
            <form action={formAction} className='space-y-6 text-left'>
                <FormField
                    type='text'
                    label='Nombre de la columna'
                    disabled={pending}
                    name={FORM_TYPES.TITLE}
                    defaultValue={state?.data?.title ?? ''}
                    errorLabel={state?.errors?.title?.[0]}
                    placeholder='Ej. Backlog, En progreso, Validando...'
                    autoFocus
                />
                {state?.message && !state.success && (
                    <div className='pt-1'>
                        <ErrorLabel errorLabel={state.message} />
                    </div>
                )}
                <div className='flex items-center justify-end gap-3 pt-4 border-t border-gray-100'>
                    <Button
                        type='button'
                        disabled={pending}
                        onClick={() => onClose()}
                        className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-500 rounded-md transition-colors disabled:opacity-50'
                    >
                        Cancelar
                    </Button>
                    <AddButton type='submit' disabled={pending} iconSize={18}>
                        {pending ? 'Creando columna...' : 'Crear columna'}
                    </AddButton>
                </div>
            </form>
        </div>
    );
}
