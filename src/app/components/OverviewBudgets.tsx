import React from 'react';
import Link from 'next/link';
import CaretRight from '../icons/CaretRight';
import data from '@/app/data/data.json';
import { currencyFormat } from '@/utils/currencyFormatter';

const colors: string[] = ['bg-green', 'bg-cyan', 'bg-yellow', 'bg-navy']

export default function OverviewBudgets() {

    const totalBudget = data.budgets.reduce((sum, max) => sum += max.maximum, 0)
    const firstFourBudgets = data.budgets.slice(0, 4)

    return (
        <div className='flex flex-col w-full rounded-lg bg-white my-4 pt-6 px-5'>
            <div className="flex flex-row items-center justify-between">
                <h1 className='text-black text-preset-2'>Budgets</h1>
                <Link className='flex items-center' href={'/budget'} aria-label='See budgets'>
                    <p className="text-preset-4 text-gray-500 mr-4">See Budgets</p>
                    <CaretRight />
                </Link>
            </div>

            <div className="grid grid-cols-2 mt-5 gap-4">
                {firstFourBudgets.map((budget, index) => (
                    <div key={budget.category} className='flex'>
                        <div className={`px-25 h-full rounded ${colors[index]}`}></div>
                        <div className='flex flex-col px-4'>
                            <p className='text-preset-5 text-grey-500'>{budget.category}</p>
                            <p className='text-preset-4-bold text-grey-900'>{currencyFormat(budget.maximum)}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}