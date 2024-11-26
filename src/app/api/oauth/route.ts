import { createAdminClient } from "@/lib/server/appwrite";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from 'node-appwrite'

export async function GET(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get("userId");
        const secret = request.nextUrl.searchParams.get("secret");

        console.log("DEBUG: Starting OAuth callback", { userId, hasSecret: !!secret });

        if (!userId || !secret) {
            console.log("DEBUG: Missing parameters");
            return NextResponse.redirect(`${request.nextUrl.origin}/signin?error=missing_params`);
        }

        console.log("DEBUG: Creating admin client");
        const { account, database, user } = await createAdminClient();

        try {
            console.log("DEBUG: Creating session");
            const session = await account.createSession(userId, secret);
            console.log("DEBUG: Session created successfully");

            console.log("DEBUG: Getting user details");
            const userDetails = await user.get(userId);
            console.log("DEBUG: Got user details", {
                userId: userDetails.$id,
                email: userDetails.email
            });

            console.log("DEBUG: Checking database for existing user");
            const existingUser = await database.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
                [Query.equal('userId', [userId])]
            );

            if (existingUser.documents.length === 0) {
                console.log("DEBUG: Creating new user document");
                await database.createDocument(
                    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                    process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
                    ID.unique(),
                    {
                        userId: userDetails.$id,
                        email: userDetails.email,
                        username: userDetails.name || userDetails.email.split('@')[0],
                    }
                );
                console.log("DEBUG: User document created");
            } else {
                console.log("DEBUG: User already exists in database");
            }

            // Create response with redirect
            const response = NextResponse.redirect(
                new URL('/dashboard/overview', request.nextUrl.origin),
                { status: 303 }  // Force GET request
            );

            // Set the session cookie on the response
            response.cookies.set("appwrite-session", session.secret, {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: true,
            });

            // Set temporary auth state cookie
            response.cookies.set("auth-state", "redirecting", {
                path: "/",
                maxAge: 5,  // 5 seconds
            });

            console.log("DEBUG: Redirecting with cookies set");
            return response;

        } catch (error) {
            console.error('DEBUG: Error in OAuth process:', {
                message: error instanceof Error ? error.message : 'Unknown error',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                code: error instanceof Error ? (error as any).code : undefined,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                type: error instanceof Error ? (error as any).type : undefined
            });
            return NextResponse.redirect(
                new URL(`/signin?error=oauth_failed&message=${encodeURIComponent(error instanceof Error ? error.message : 'unknown')}`,
                    request.nextUrl.origin)
            );
        }
    } catch (error) {
        console.error('DEBUG: Fatal OAuth error:', {
            message: error instanceof Error ? error.message : 'Unknown error'
        });
        return NextResponse.redirect(
            new URL(`/signin?error=fatal&message=${encodeURIComponent(error instanceof Error ? error.message : 'unknown')}`,
                request.nextUrl.origin)
        );
    }
}