import React from 'react';
import Link from 'next/link';
import CaretRight from '../icons/CaretRight';
import data from '@/app/data/data.json';
import { currencyFormat } from '@/utils/currencyFormatter';

export default function OverviewRecurringBills() {
    return (
        <div className='flex flex-col w-full rounded-lg bg-white my-4 py-6 px-5'>
            <div className='flex flex-row items-center justify-between'>
                <h1 className="text-black text-preset-2">Recurring Bills</h1>
                <Link className='flex items-center' href={'/recurringBills'} aria-label='See Recurring Bills'>
                    <p className='text-preset-4 text-gray-500 mr-4'>See Details</p>
                    <CaretRight />
                </Link>
            </div>
        </div>
    )
}
