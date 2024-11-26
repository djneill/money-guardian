"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./const";

export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    const session = (await cookies()).get(SESSION_COOKIE);
    if (!session || !session.value) {
        return null;
    }

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
    };
}

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
        .setKey(process.env.APPWRITE_MAIN_API_KEY!);

    return {
        get account() {
            return new Account(client);
        },
        get database() {
            return new Databases(client);
        },
        get user() {
            return new Users(client);
        },
    };
}

export async function getLoggedInUser() {
    try {
        const client = await createSessionClient();
        if (!client) return null;

        const { account } = client;
        return await account.get();
    } catch (error) {
        return null;
    }
}