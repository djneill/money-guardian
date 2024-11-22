import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getLoggedInUser } from '@/lib/server/appwrite'

export async function middleware(request: NextRequest) {
    const user = await getLoggedInUser()

    if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    if (user && (request.nextUrl.pathname === '/')) {
        return NextResponse.redirect(new URL('/dashboard/overview', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // All routes that need middleware checks
        '/signin',
        '/signup',
        '/dashboard/:path*'
    ]
}

// ####### CLERK MIDDLEWARE #######
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])

// export default clerkMiddleware((auth, request) => {
//     if (!isPublicRoute(request)) {
//         auth().protect()
//     }
// })

// export const config = {
//     matcher: [
//         // Skip Next.js internals and all static files, unless found in search params
//         '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//         // Always run for API routes
//         '/(api|trpc)(.*)',
//     ],
// }