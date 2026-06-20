import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/constants/session.constants';

export async function createSession(token: string) {
    const expiresInSeconds = Number(process.env.NEXT_PUBLIC_SESSION_EXPIRES_IN) || 5;
    const duration = expiresInSeconds * 1000;
    const expiresAt = new Date(Date.now() + duration);

    (await cookies()).set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function deleteSession() {
    (await cookies()).delete(SESSION_COOKIE_NAME);
}

// NUEVO: Recupera el token crudo de forma centralizada
export async function getSessionToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

// NUEVO: Retorna el objeto de cabecera listo para Axios/Fetch
export async function getAuthHeaders() {
    const token = await getSessionToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}
