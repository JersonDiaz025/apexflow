'use client';

import { User } from 'lucide-react';
import React, { useActionState } from 'react';
import { AddButton, Button } from '@/components';
import { useModalStore } from '@/store/modal.store';
import { FormField } from '@/components/shared/FormField';
import { INITIAL_INVITE_FORM_STATE } from '@/schemas/team.schema';
import { inviteUserAction } from '@/actions/team/team.actions';
import { FORM_TYPES } from '@/constants/form-types.constants';
import useActionToast from '@/hooks/use-action-toast';

export const InviteUserForm = () => {
    const closeModal = useModalStore((state) => state.onClose);
    const modalData = useModalStore((state) => state.data);
    const boardId = modalData?.boardId;

    const inviteActionWithId = inviteUserAction.bind(null, boardId);

    const [state, formAction, pending] = useActionState(
        inviteActionWithId,
        INITIAL_INVITE_FORM_STATE
    );

    useActionToast(state, '', () => {
        closeModal();
    });

    return (
        <form action={formAction} className='space-y-5'>
            <FormField
                label='Correo eletrónico'
                name={FORM_TYPES.EMAIL}
                type={FORM_TYPES.EMAIL}
                placeholder='juan@gmail.com'
                disabled={pending}
                errorLabel={state?.success ? state?.errors?.email?.[0] : state.message}
            />

            <div className='flex items-center justify-end gap-3 pt-4 border-t border-gray-100'>
                <Button
                    type='button'
                    disabled={pending}
                    onClick={closeModal}
                    className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-500 rounded-md transition-colors disabled:opacity-50'
                >
                    Cancelar
                </Button>
                <AddButton type='submit' disabled={pending} icon={User} iconSize={18}>
                    {false ? 'Enviando invitación...' : 'Enviar invitación'}
                </AddButton>
            </div>
        </form>
    );
};

export default InviteUserForm;
