import React from 'react';
import Link from 'next/link';
import OverviewIcon from '../icons/OverviewIcon';
import TransactionsIcon from '../icons/TransactionsIcon';

export default function NavBar() {
    return (
        <nav className='bg-grey-900 flex rounded-t-xl fixed bottom-0 left-0 right-0 p-4'>
            <div className="flex justify-around w-full mt-2 mx-4">
                <ul className='flex flex-row gap-4'>
                    <li className='w-16 h-11 flex justify-center items-center'>
                        <Link href={'/'}>
                            <OverviewIcon />
                        </Link>
                    </li>
                    <li className='w-16 h-11 flex fill-white justify-center items-center'>
                        <Link href={'/transactions'}>
                            <TransactionsIcon />
                        </Link>
                    </li>
                    <li className='w-16 h-11 flex justify-center items-center'>
                        <a href="#" className="text-white">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}