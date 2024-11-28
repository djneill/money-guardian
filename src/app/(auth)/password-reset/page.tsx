'use client'
import React, { FormEvent, useState } from 'react';
import { Client, Account } from "appwrite";
import { useSearchParams } from 'next/navigation';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

const PasswordReset = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('');
    const searchParams = useSearchParams();

    const handleReset = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userId = searchParams.get('userId');
            const secret = searchParams.get('secret');

            if (!userId || !secret) {
                throw new Error('Missing recovery parameters');
            }

            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            await account.updateRecovery(userId, secret, password);
            setStatus('Password successfully reset!');
        } catch (error) {
            setStatus('Error: ' + (error as Error).message);
        }
    };

    return (
        <div>
            <form onSubmit={handleReset}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                />
                <button type="submit">Reset Password</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default PasswordReset;