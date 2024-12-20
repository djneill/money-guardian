import React from 'react';
import Link from 'next/link';
import CaretRight from '../icons/CaretRight';
import data from '@/app/data/data.json';
import { currencyFormat } from '@/utils/currencyFormatter';
import PieChart from '@/app/components/PieChart';

const colors: string[] = ['bg-green', 'bg-cyan', 'bg-yellow', 'bg-navy']
const pieColors: string[] = ['#277C78', '#82C9D7', '#F2CDAC', '#626070']

export default function OverviewBudgets() {

    const totalBudget = data.budgets.reduce((sum, max) => sum += max.maximum, 0)
    const firstFourBudgets = data.budgets.slice(0, 4)

    const augustTransactionTotal = data.transactions.reduce((total, transaction) => {
        const transactionDate = new Date(transaction.date);
        if (transactionDate.getMonth() === 7) { // 7 represents August
            return total + transaction.amount;
        }
        return Math.abs(total);
    }, 0);

    // Saving for db integration
    // const currentMonthTransactionTotal = data.transactions.reduce((total, transaction) => {
    //     const transactionDate = new Date(transaction.date);
    //     const currentDate = new Date();
    //     if (transactionDate.getMonth() === currentDate.getMonth() &&
    //         transactionDate.getFullYear() === currentDate.getFullYear()) {
    //         return total + transaction.amount;
    //     }
    //     return Math.abs(total);
    // }, 0);

    const chartData = firstFourBudgets.map((budget, index) => ({
        category: budget.category,
        amount: budget.maximum,
        color: pieColors[index]
    }));

    return (
        <div className='flex flex-col w-full rounded-lg bg-white my-4 py-6 px-5'>
            <div className="flex flex-row items-center justify-between">
                <h1 className='text-black text-preset-2'>Budgets</h1>
                <Link className='flex items-center' href={'/budget'} aria-label='See Details budgets'>
                    <p className="text-preset-4 text-gray-500 mr-4">See Details</p>
                    <CaretRight />
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:w-full sm:h-full sm:justify-center sm:gap-5 sm:items-center">
                <div className="flex mt-5 sm:justify-center sm:items-center sm:mx-auto">
                    <PieChart data={chartData} limit={totalBudget} totalSpent={augustTransactionTotal} />
                </div>
                <div className="grid grid-cols-2 mt-5 gap-4 sm:grid-cols-1 sm:ml-auto">
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

        </div>
    )
}

