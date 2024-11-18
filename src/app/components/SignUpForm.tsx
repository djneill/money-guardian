'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import AuthButton from './AuthButton';
import { signUp } from '../../../actions/auth';

export default function SignUpForm() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const result = await signUp(formData);

        if (result?.error) {
            setError(result?.error);
        } else if (result?.success) {
            router.push('/dashboard/overview')
        }
        setLoading(false)
    };

    return (
        <div>
            <form onSubmit={handleSubmit} action="" className='w-full flex flex-col gap-4 bg-grey-900 p-6 rounded-md '>
                <div>
                    <label className='flex text-preset-4' htmlFor="Username">Username</label>
                    <input type="text"
                        placeholder='Username'
                        id='username'
                        name='username'
                        className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-white text-black' />
                </div>

                <div>
                    <label htmlFor="Email" className='flex text-preset-4'>Email</label>
                    <input type="text"
                        placeholder='Email'
                        id='email'
                        name='email'
                        className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-white text-black' />
                </div>

                <div>
                    <label htmlFor="password" className='flex text-preset-4'>Password</label>
                    <input type="password"
                        placeholder='Password'
                        name='password'
                        id='password'
                        className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-white text-black' />
                </div>
                <div className="mt-4">
                    <AuthButton type='signup' loading={loading} />
                </div>
                {error && <p className='text-red-500'>{error}</p>}
            </form>
        </div>
    );
};

