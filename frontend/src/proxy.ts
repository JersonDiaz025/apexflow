import {
    PROTECTED_PREFIXES,
    PUBLIC_ROUTES,
    ROUTES,
    RouteString,
} from '@/constants/routes.constant';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionToken } from '@/utils/session.lib';

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = await getSessionToken();

    const isAuthRoute = PUBLIC_ROUTES.includes(pathname as RouteString);
    const isProtectedRoute = PROTECTED_PREFIXES.some((route) => pathname.startsWith(route));

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
    }

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL(ROUTES.BOARDS, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
