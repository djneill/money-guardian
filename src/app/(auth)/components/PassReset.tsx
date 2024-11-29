'use client'
import React, { FormEvent, useState, Suspense } from 'react';
import { Client, Account } from "appwrite";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

const PasswordResetForm = () => {
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
            <form onSubmit={handleReset} className='w-80 sm:w-[560px] flex flex-col gap-4 ~px-5/8 ~py-6/8 p- rounded-lg bg-white text-black justify-center'>
                <h1 className='text-preset-1 text-black pb-8'>Reset Password</h1>
                <div>
                    <label htmlFor="password" className='flex text-preset-5-bold'>New Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        id="password"
                        name="password"
                        className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-grey-500 text-grey-500'
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className='flex text-preset-5-bold'>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-grey-500 text-grey-500'
                    />
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg shadow-lg shadow-slate-600"
                    >
                        Reset Password
                    </button>
                </div>
                <div className="flex">
                    <h1 className='text-preset-4'>Ready to login?</h1>
                    <Link className='text-preset-4-bold ml-2 underline' href='/signin'>
                        Login
                    </Link>
                </div>
                {status && <p className={`${status.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{status}</p>}
            </form>
        </div>
    );
};

const PasswordReset = () => {
    return (
        <Suspense fallback={
            <div className='w-80 sm:w-[560px] flex flex-col gap-4 ~px-5/8 ~py-6/8 p- rounded-lg bg-white text-black justify-center items-center'>
                <h1 className='text-preset-1 text-black'>Loading...</h1>
            </div>
        }>
            <PasswordResetForm />
        </Suspense>
    );
};

export default PasswordReset;