'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/utils/notification.util';
import { ROUTES } from '@/constants/routes.constant';
import {  GenericFormState } from '@/types/form.types';

export function useActionToast<T>(
    state: GenericFormState<T>,
    currentRoute: string,
    onSuccess?: () => void
) {
    const router = useRouter();
    const alreadyMsg = state?.message;

    useEffect(() => {
        if (!state) return;

        if (state?.success) {
            if (alreadyMsg) toast.success(alreadyMsg);
            if (onSuccess) {
                setTimeout(() => {
                    onSuccess();
                }, 0);
            } else {
                router.push(currentRoute === ROUTES.REGISTER ? ROUTES.LOGIN : ROUTES.BOARDS);
            }
        } else {
            if (alreadyMsg) toast.error(alreadyMsg);
        }
    }, [state.message, state.success, router, currentRoute, onSuccess]);
}

export default useActionToast;
