'use client';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { signUpWithGoogle } from '../../../../actions/auth';

interface LoginButtonProps {
    type: 'login' | 'signup';
}

export default function LoginGoogle({ type }: LoginButtonProps) {
    const googleText = type === 'login' ? 'Login with Google' : 'Sign Up with Google';

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
            className=' flex justify-center items-center w-full gap-4 hover:cursor-pointer mt-2 h-12 bg-gradient-to-r from-[#F4B400] via-[#DB4437] to-[#0F9D58] rounded-lg shadow-lg shadow-black'
        >
            <FaGoogle className="text-white" />
            <p className='text-white'>
                {isPending ? "Redirecting..." : googleText}
            </p>
        </div>
    )
}
