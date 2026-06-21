import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/constants/session.constants';

export async function createSession(token: string) {
    const expiresInSeconds = Number(process.env.NEXT_PUBLIC_SESSION_EXPIRES_IN) || 5;
    const duration = expiresInSeconds * 1000;
    const expiresAt = new Date(Date.now() + duration);

    (await cookies()).set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function deleteSession() {
    (await cookies()).delete(SESSION_COOKIE_NAME);
}

export async function getSessionToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    return token;
}

export async function getAuthHeaders() {
    const token = await getSessionToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}
