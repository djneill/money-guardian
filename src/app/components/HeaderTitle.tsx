'use client'
import React from 'react';
import { usePathname } from 'next/navigation';

export default function HeaderTitle() {
    const pathname = usePathname();

    const getTitle = () => {
        switch (pathname) {
            case '/':
                return 'Overview';
            case '/transactions':
                return 'Transactions';
            case '/budget':
                return 'Budget';
            case '/pots':
                return 'Pots';
            case '/recurringBills':
                return 'Recurring Bills';
            default:
                return 'Money Guardian'
        }
    };

    return (
        <h1 className='text-black text-preset-1 font-sans'>
            {getTitle()}
        </h1>
    )
}
