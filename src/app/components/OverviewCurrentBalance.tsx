import React from 'react';
import data from '@/app/data/data.json';
import { currencyFormat } from '@/utils/currencyFormatter';

export default function OverviewCurrentBalance() {
    return (
        <div>
            <div className='flex flex-col bg-grey-900 text-white w-full h-28 rounded-lg justify-center gap-4 px-4 mt-8'>
                <p className='text-preset-4'>Current Balance</p>
                <p className='text-preset-1'>{currencyFormat(data.balance.current)}</p>
            </div>

            <div className="flex flex-col bg-white w-full h-28 rounded-lg justify-center gap-4 px-4 mt-3">
                <p className="text-preset-4 text-grey-500">Income</p>
                <p className='text-preset-1 text-grey-900'>{currencyFormat(data.balance.income)}</p>
            </div>

            <div className="flex flex-col bg-white w-full h-28 rounded-lg justify-center gap-4 px-4 mt-3">
                <p className="text-preset-4 text-grey-500">Expenses</p>
                <p className='text-preset-1 text-grey-900'>{currencyFormat(data.balance.expenses)}</p>
            </div>
        </div>


    )
}