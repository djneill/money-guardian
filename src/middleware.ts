import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/server/const'

const protectedRoutes = ['/dashboard']

export async function middleware(request: NextRequest) {
    console.log("DEBUG: Middleware called for:", request.nextUrl.pathname);

    const hasSession = request.cookies.has(SESSION_COOKIE);
    const authState = request.cookies.get("auth-state");

    console.log("DEBUG: Auth state:", {
        hasSession,
        authState: authState?.value,
        path: request.nextUrl.pathname
    });

    const isProtected = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    // If we're in the OAuth redirect flow, allow it
    if (authState?.value === "redirecting") {
        console.log("DEBUG: Auth redirect in progress, allowing through");
        return NextResponse.next();
    }

    // Normal route protection
    if (!hasSession && isProtected) {
        console.log("DEBUG: No session, redirecting to signin");
        return NextResponse.redirect(new URL('/signin', request.nextUrl.origin))
    }

    if (hasSession && (request.nextUrl.pathname === '/')) {
        console.log("DEBUG: Has session, redirecting to dashboard");
        return NextResponse.redirect(new URL('/dashboard/overview', request.nextUrl.origin))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}