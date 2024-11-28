'use client'
import React, { FormEvent, useState } from 'react';
import { Client, Account } from "appwrite";

// Initialize Appwrite
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

const PasswordRecovery = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleRecovery = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // The URL where users will be redirected after clicking the email link
            const redirectUrl = 'https://money-guardian.vercel.app/password-reset';

            await account.createRecovery(email, redirectUrl);
            setStatus('Recovery email sent! Please check your inbox.');
        } catch (error) {
            setStatus('Error: ' + (error as Error).message);
        }
    };

    return (
        <div>
            <form onSubmit={handleRecovery}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
                <button type="submit">Send Recovery Email</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default PasswordRecovery;