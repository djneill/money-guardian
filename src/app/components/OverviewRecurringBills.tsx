import React from 'react';
import Link from 'next/link';
import CaretRight from '../icons/CaretRight';
import data from '@/app/data/data.json';
import { currencyFormat } from '@/utils/currencyFormatter';

export default function OverviewRecurringBills() {

    const filterRecurringBills = () => {
        return data.transactions.filter(transaction => {
            const date = new Date(transaction.date);
            return transaction.recurring &&
                date.getMonth() === 7 &&
                date.getFullYear() === 2024
        });
    };

    const calculateTotals = () => {
        const recurringBills = filterRecurringBills();
        const now = new Date();

        const paid = recurringBills
            .filter(t => new Date(t.date).getTime() < now.getTime())
            .reduce((sum, t) => sum + t.amount, 0);

        const upcoming = recurringBills
            .filter(t => new Date(t.date).getTime() >= now.getTime())
            .reduce((sum, t) => sum + t.amount, 0);

        const dueSoon = recurringBills
            .filter(t => {
                const dueDate = new Date(t.date);
                const diffDays = Math.ceil(
                    (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
                );
                return diffDays <= 7 && diffDays >= 0;
            })
            .reduce((sum, t) => sum + t.amount, 0);

        return { paid, upcoming, dueSoon };
    };

    const totals = calculateTotals();

    return (
        <div className='flex flex-col w-full rounded-lg bg-white my-4 py-6 px-5'>
            <div className='flex flex-row items-center justify-between mb-4'>
                <h1 className="text-black text-preset-2">Recurring Bills</h1>
                <Link className='flex items-center' href={'/recurringBills'} aria-label='See Recurring Bills'>
                    <p className='text-preset-4 text-gray-500 mr-4'>See Details</p>
                    <CaretRight />
                </Link>
            </div>

            <div className='flex justify-between bg-beige-100 my-3 py-5 px-4 border-l-green border-l-4 rounded-l-lg rounded-lg'>
                <p className='text-preset-4 text-grey-500'>Paid Bills</p>
                <p className='text-preset-4-bold text-grey-900'>{currencyFormat(Math.abs(totals.paid))}</p>
            </div>

            <div className='flex justify-between bg-beige-100 my-3 py-5 px-4 border-l-yellow border-l-4 rounded-l-lg rounded-lg'>
                <p className='text-preset-4 text-grey-500'>Total Upcoming</p>
                <p className='text-preset-4-bold text-grey-900'>{currencyFormat(Math.abs(totals.upcoming))}</p>
            </div>

            <div className='flex justify-between bg-beige-100 my-3 py-5 px-4 border-l-cyan border-l-4 rounded-l-lg rounded-lg'>
                <p className='text-preset-4 text-grey-500'>Due Soon</p>
                <p className='text-preset-4-bold text-grey-900'>{currencyFormat(Math.abs(totals.dueSoon))}</p>
            </div>

        </div>
    )
}
