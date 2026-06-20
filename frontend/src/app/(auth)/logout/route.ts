'use server';

import { redirect } from 'next/navigation';
import { deleteSession } from '@/utils/session.lib';
import { ROUTES } from '@/constants/routes.constant';

export async function logout() {
    await deleteSession();
    redirect(ROUTES.LOGIN);
}
