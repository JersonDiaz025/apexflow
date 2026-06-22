'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormState } from '@/types/form.types';
import { toast } from '@/utils/notification.util';
import { ROUTES } from '@/constants/routes.constant';

export function useActionToast(state: FormState, currentRoute: string) {
    const router = useRouter();
    const alreadyMsg = state?.message;

    useEffect(() => {
        if (!state) return;

        if (state?.success) {
            if (alreadyMsg) toast.success(alreadyMsg);
            router.push(currentRoute === ROUTES.REGISTER ? ROUTES.LOGIN : ROUTES.BOARDS);
        } else {
            if (alreadyMsg) toast.error(alreadyMsg);
        }
    }, [state.message, router, currentRoute]);
}

export default useActionToast;
