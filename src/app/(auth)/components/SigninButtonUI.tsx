import React from 'react'
import { getLoggedInUser } from '../../../../actions/auth'
import Link from 'next/link'

export default async function SigninButtonWrapper() {
    const user = await getLoggedInUser();

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