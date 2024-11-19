'use client'
import React from 'react'
import Link from 'next/link'

interface Props {
    user: UserDetails | null
}
console.log('hello')
export default function SigninButton({ user }: Props) {
    return (
        <div>
            <div>
                {!user ? (
                    <Link href={'/signin'}>
                        <div className='bg-red text-white text-preset-4 py-2 px-4 rounded-lg'>
                            Login
                        </div>
                    </Link>
                ) : (
                    <div className='flex items-center gap-x-2 text-preset-4 text-black'>
                        {user?.username}
                    </div>
                )}
            </div>
        </div>
    )
}