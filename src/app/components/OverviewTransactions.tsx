import React from 'react';
import Link from 'next/link';
import CaretRight from '../icons/CaretRight';
import data from '@/app/data/data.json';
import { currencyFormat } from '@/utils/currencyFormatter';

export default function OverviewTransactions() {
    const firstFiveTransactions = data.transactions.slice(0, 5)
    return (
        <div className='flex flex-col py-6 px-5 w-full rounded-lg bg-white my-4'>
            <div className="flex flex-row justify-between">
                <p className='text-black text-preset-2'>Transactions</p>
                <Link className='flex flex-row items-center' href={'/transactions'} aria-label='see details'>
                    <p className='text-preset-4 text-gray-500 mr-4'>See Details</p>
                    <CaretRight />
                </Link>
            </div>

            <div className='flex flex-col mt-8'>
                {firstFiveTransactions.map((pot, index) => (
                    <div key={pot.name} className='flex'>
                        <img
                            width={32}
                            height={32}
                            src={data.transactions[index].avatar}
                            alt={`Avatar for ${data.transactions[index].name || 'user'}`}
                        />
                        <p className='text-black text-preset-4-bold'>{data.transactions[index].name}</p>
                        <div className="flex flex-col">
                            <p className="text-green text-preset-4-bold">{currencyFormat(data.transactions[index].amount)}</p>
                            <p className="text-grey-500 text-preset-5">{data.transactions[index].date}</p>
                        </div>
                    </div>
                ))}

            </div>


        </div>
    )
}
