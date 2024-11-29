'use client';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { FaGithub } from 'react-icons/fa'
import { signUpWithGithub } from '../../../../actions/auth';

interface LoginButtonProps {
    type: 'login' | 'signup';
}

export default function LoginGithub({ type }: LoginButtonProps) {
    const githubText = type === 'login' ? 'Login with GitHub' : 'Sign Up with GitHub';

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handleGithubLogin = () => {
        startTransition(async () => {
            const redirectUrl = await signUpWithGithub();
            if (redirectUrl) router.push(redirectUrl);
        })
    }
    return (
        <div
            onClick={handleGithubLogin}
            className=' flex justify-center items-center w-full gap-4 hover:cursor-pointer mt-2 h-12 bg-gradient-to-r from-[#040D21] to-[#2188FF] rounded-lg shadow-lg shadow-black'
        >
            <FaGithub className="text-white" />
            <p className='text-white'>
                {isPending ? "Redirecting..." : githubText}
            </p>
        </div>
    )
}
