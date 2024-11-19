'use server';

import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";
import { redirect } from "next/navigation";

export const getUserDetails = async (userId: string) => {
    try {
        const { database } = await createAdminClient();
        const user = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
            [Query.equal('userId', [userId])]
        );
        return JSON.parse(JSON.stringify(user.documents[0]))
    } catch (error) {
        console.log(error)
    }
}

export async function getLoggedInUser() {
    const sessionClient = await createSessionClient();
    if (!sessionClient) return null;
    try {
        const { account } = sessionClient;
        const result = await account.get();
        let user;
        if (result) {
            user = await getUserDetails(result.$id);
        }

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        return null;
    }
}

export async function signUp(formData: FormData) {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const { account, database } = await createAdminClient();
        const newUserAccount = await account.create(ID.unique(), email, password, username);
        if (!newUserAccount) throw new Error('Error creating user account');

        const newUser = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
            ID.unique(),
            {
                userId: newUserAccount.$id,
                email: email,
                username: username,
            }
        );
        if (!newUser) throw new Error('Error creating user in database');

        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production',
        });

        return {
            success: true,
            redirectTo: '/dashboard/overview'
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return {
            error: error.message,
        }
    }
}