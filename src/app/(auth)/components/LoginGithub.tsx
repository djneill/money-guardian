'use client';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { FaGithub } from 'react-icons/fa'
import { signUpWithGithub } from '../../../../actions/auth';

export default function LoginGithub() {
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
            className=' flex justify-center items-center w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-blue rounded-md'
        >
            <FaGithub className="text-white" />
            <p className='text-white'>
                {isPending ? "Redirecting..." : "Login with Github"}
            </p>
        </div>
    )
}
