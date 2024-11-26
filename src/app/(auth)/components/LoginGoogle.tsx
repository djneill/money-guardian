'use client';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { signUpWithGoogle } from '../../../../actions/auth';

export default function LoginGoogle() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handleGoogleLogin = () => {
        startTransition(async () => {
            const redirectUrl = await signUpWithGoogle();
            if (redirectUrl) router.push(redirectUrl);
        })
    }
    return (
        <div
            onClick={handleGoogleLogin}
            className=' flex justify-center items-center w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-blue rounded-md'
        >
            <FaGoogle className="text-white" />
            <p className='text-white'>
                {isPending ? "Redirecting..." : "Login with Google"}
            </p>
        </div>
    )
}
