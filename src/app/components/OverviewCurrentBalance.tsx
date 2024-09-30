import React from 'react';
import data from '@/app/data/data.json';
import { currencyFormat } from '@/utils/currencyFormatter';

export default function OverviewCurrentBalance() {
    return (
        <div className='flex flex-col bg-grey-900 text-white w-[343px] h-28 rounded-lg justify-center gap-4 px-4 mt-8'>
            <p className='text-preset-4'>Current Balance</p>
            <p className='text-preset-1'>{currencyFormat(data.balance.current)}</p>
        </div>
    )
}