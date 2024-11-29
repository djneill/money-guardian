'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import AuthButton from './AuthButton';
import { signUp } from '../../../../actions/auth';
import Link from 'next/link';
import LoginGithub from './LoginGithub';
import LoginGoogle from './LoginGoogle';

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
            <form onSubmit={handleSubmit} action="" className='w-80 sm:w-[560px] flex flex-col gap-4 ~px-5/8 ~py-6/8 p- rounded-lg bg-white text-black justify-center'>
                <h1 className='text-preset-1 text-black pb-8'>Sign Up</h1>
                <div>
                    <label className='flex text-preset-5-bold' htmlFor="Username">Username</label>
                    <input type="text"
                        placeholder='Choose Your Username'
                        id='username'
                        name='username'
                        className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-grey-500 text-grey-500' />
                </div>

                <div>
                    <label htmlFor="Email" className='flex text-preset-5-bold'>Email</label>
                    <input type="text"
                        placeholder='Enter Your Email'
                        id='email'
                        name='email'
                        className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-grey-500 text-grey-500' />
                </div>

                <div>
                    <label htmlFor="password" className='flex text-preset-5-bold'>Password</label>
                    <input type="password"
                        placeholder='Enter Your Password'
                        name='password'
                        id='password'
                        className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-grey-500 text-grey-500' />
                </div>
                <div className="mt-4">
                    <AuthButton type='signup' loading={loading} />
                </div>
                <div className="flex">
                    <h1 className='text-preset-4'>Already have an account?</h1>
                    <Link className='text-preset-4-bold ml-2 underline' href='/signin'>
                        Sign In</Link>
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                <LoginGithub type='signup' />
                <LoginGoogle type='signup' />
            </form>
        </div>
    );
}