import {
    KANBAN_ROUTES,
    PROTECTED_PREFIXES,
    PUBLIC_ROUTES,
    ROUTES,
} from '@/constants/routes.constant';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/constants/session.constants';

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;

    const isAuthRoute = PUBLIC_ROUTES.includes(pathname);
    const isProtectedRoute = PROTECTED_PREFIXES.some((route) => pathname.startsWith(route));

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
    }

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL(KANBAN_ROUTES.BOARD_APP, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
