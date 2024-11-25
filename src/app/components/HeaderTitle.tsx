'use client'
import React from 'react';
import { usePathname } from 'next/navigation';

export default function HeaderTitle() {
    const pathname = usePathname();

    const getTitle = () => {
        switch (pathname) {
            case '/':
                return 'Overview';
            case '/dashboard/overview':
                return 'Overview';
            case '/transactions':
                return 'Transactions';
            case '/dashboard/transactions':
                return 'Transactions';
            case '/budget':
                return 'Budget';
            case '/dashboard/budget':
                return 'Budget';
            case '/pots':
                return 'Pots';
            case '/dashboard/pots':
                return 'Pots';
            case '/recurringBills':
                return 'Recurring Bills';
            case '/dashboard/recurringBills':
                return 'Recurring Bills';
            default:
                return 'Money Guardian'
        }
    };

    return (
        <div className="flex justify-start items-center">
            <h1 className='text-black text-preset-1 font-sans'>
                {getTitle()}
            </h1>
        </div>
    )
}
