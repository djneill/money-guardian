import React from 'react';
import Link from 'next/link';
import CaretRight from '../icons/CaretRight';
import data from '@/app/data/data.json';
import { currencyFormat } from '@/utils/currencyFormatter';
import { shortDateFormat } from '@/utils/shortDateFormat';
import Image from 'next/image';

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

            <div className='flex flex-col w-full'>
                {firstFiveTransactions.map((pot, index) => (
                    <div key={pot.name} className='flex py-8 items-center justify-between border-b-grey-100 border-b-2'>
                        <div className="flex items-center">
                            <img
                                width={36}
                                height={36}
                                src={data.transactions[index].avatar}
                                alt={`Avatar for ${data.transactions[index].name || 'user'}`}
                                className='rounded-full mr-4'
                            />
                            <p className='text-black text-preset-4-bold '>{data.transactions[index].name}</p>
                        </div>
                        <div className="flex flex-col items-end ml-auto">
                            <p className="text-green text-preset-4-bold">{currencyFormat(data.transactions[index].amount)}</p>
                            <p className="text-grey-500 text-preset-5">{shortDateFormat(data.transactions[index].date)}</p>
                        </div>
                        <div className="py-1 bg-grey-100"></div>
                    </div>
                ))}

            </div>


        </div>
    )
}
