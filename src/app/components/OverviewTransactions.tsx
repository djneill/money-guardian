import React from 'react';
import Link from 'next/link';
import CaretRight from '../icons/CaretRight';
import data from '@/app/data/data.json';
import { currencyFormat } from '@/utils/currencyFormatter';

export default function OverviewTransactions() {
    return (
        <div className='flex flex-col py-6 px-5 w-full rounded-lg bg-white my-4'>
            <div className="flex flex-row justify-between">
                <p className='text-black text-preset-2'>Transactions</p>
                <Link className='flex flex-row items-center' href={'/transactions'} aria-label='see details'>
                    <p className='text-preset-4 text-gray-500 mr-4'>See Details</p>
                    <CaretRight />
                </Link>
            </div>


        </div>
    )
}
