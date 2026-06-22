'use client';

import { useActionState } from 'react';
import { Button } from '@/components';
import useActionToast from '@/hooks/use-action-toast';
import { ROUTES } from '@/constants/routes.constant';
import { FormField } from '@/components/shared/FormField';
import { INITIAL_FORM_STATE } from '@/schemas/auth.schema';
import { BaseFormTexts, FormProps } from '@/types/form.types';
import { FORM_TYPES } from '@/constants/form-types.constants';

export default function FormContent<T extends BaseFormTexts>({
    isRegister = false,
    action,
    texts,
}: FormProps<T>) {
    const [state, formAction, pending] = useActionState(action, INITIAL_FORM_STATE);
    const currentRoute = isRegister ? ROUTES.REGISTER : ROUTES.LOGIN;
    useActionToast(state, currentRoute);

    return (
        <form action={formAction} className='space-y-6'>
            {isRegister && (
                <>
                    <FormField
                        label={texts?.nameLabel ?? ''}
                        name={FORM_TYPES.NAME}
                        type={FORM_TYPES.TEXT}
                        defaultValue={state?.data?.name ?? ''}
                        errorLabel={state?.errors?.name?.[0]}
                        placeholder={texts.namePlaceholder}
                    />
                </>
            )}
            <FormField
                label={texts.emailLabel}
                name={FORM_TYPES.EMAIL}
                type={FORM_TYPES.EMAIL}
                defaultValue={state?.data?.email}
                errorLabel={state?.errors?.email?.[0]}
                placeholder={texts.emailPlaceholder}
            />

            <FormField
                label={texts.passwordLabel}
                name={FORM_TYPES.PASSWORD}
                type={FORM_TYPES.PASSWORD}
                errorLabel={state?.errors?.password?.[0]}
                placeholder={texts.passwordPlaceholder}
            />

            <div className='pt-4'>
                <Button
                    type='submit'
                    disabled={pending}
                    label={pending ? texts.loadingButton : texts.submitButton}
                    className='w-full h-12 bg-indigo-600 text-white rounded-xl font-medium shadow-sm hover:bg-indigo-700 transition-all duration-150 active:scale-[0.98]'
                />
            </div>
        </form>
    );
}
