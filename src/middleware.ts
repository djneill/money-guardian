import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getLoggedInUser } from '@/lib/server/appwrite'

const protectedRoutes = ['/dashboard']

export async function middleware(request: NextRequest) {
    // Check if this is an OAuth callback redirect
    const isOAuthCallback = request.nextUrl.pathname === '/api/oauth';
    const isOAuthRedirect = request.nextUrl.pathname.startsWith('/dashboard') &&
        request.cookies.has('auth-state');

    // Allow OAuth-related requests to proceed
    if (isOAuthCallback || isOAuthRedirect) {
        return NextResponse.next();
    }

    // For all other requests, check user authentication
    const user = await getLoggedInUser()

    const isProtected = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (!user && isProtected) {
        return NextResponse.redirect(new URL('/signin', request.nextUrl.origin))
    }

    if (user && (request.nextUrl.pathname === '/')) {
        return NextResponse.redirect(new URL('/dashboard/overview', request.nextUrl.origin))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}