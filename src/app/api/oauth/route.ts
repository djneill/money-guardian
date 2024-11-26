import { createAdminClient } from "@/lib/server/appwrite";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from 'node-appwrite'

export async function GET(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get("userId");
        const secret = request.nextUrl.searchParams.get("secret");

        if (!userId || !secret) {
            return NextResponse.redirect(`${request.nextUrl.origin}/signin?error=missing_params`);
        }

        const { account, database, user } = await createAdminClient();

        // Create session
        const session = await account.createSession(userId, secret);
        const userDetails = await user.get(userId);

        // Check if user exists in database
        const existingUser = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
            [Query.equal('userId', [userId])]
        );

        if (existingUser.documents.length === 0) {
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
        }

        // Create response
        const response = NextResponse.redirect(
            new URL('/dashboard/overview', request.nextUrl.origin)
        );

        // Set cookies
        response.cookies.set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        // Add cache control headers
        response.headers.set('Cache-Control', 'no-store, max-age=0');
        response.headers.set('Pragma', 'no-cache');

        return response;
    } catch (error) {
        return NextResponse.redirect(`${request.nextUrl.origin}/signin?error=oauth_failed`);
    }
}