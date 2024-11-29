'use client'
import React, { FormEvent, useState } from 'react';
import { Client, Account } from "appwrite";
import Link from 'next/link';

// Initialize Appwrite
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export default function PasswordRecovery() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleRecovery = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const redirectUrl = 'https://money-guardian.vercel.app/password-reset';
            await account.createRecovery(email, redirectUrl);
            setStatus('Recovery email sent! Please check your inbox.');
        } catch (error) {
            setStatus('Error: ' + (error as Error).message);
        }
    };

    return (
        <div>
            <form onSubmit={handleRecovery} className='w-80 sm:w-[560px] flex flex-col gap-4 ~px-5/8 ~py-6/8 p- rounded-lg bg-white text-black justify-center'>
                <h1 className='text-preset-1 text-black pb-8'>Password Recovery</h1>
                <div>
                    <label htmlFor="Email" className='flex text-preset-5-bold'>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email"
                        id="email"
                        name="email"
                        className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-grey-500 text-grey-500'
                    />
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg shadow-lg shadow-slate-600"
                    >
                        Send Recovery Email
                    </button>
                </div>
                <div className="flex">
                    <h1 className='text-preset-4'>Remember your password?</h1>
                    <Link className='text-preset-4-bold ml-2 underline' href='/signin'>
                        Login
                    </Link>
                </div>
                {status && <p className={`${status.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{status}</p>}
            </form>
        </div>
    );
}