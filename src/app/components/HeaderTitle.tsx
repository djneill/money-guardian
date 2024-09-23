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
            case '/budgets':
                return 'Budgets';
            case '/pots':
                return 'Pots';
            case '/recurring-bills':
                return 'Recurring Bills';
            default:
                return 'Money Guardian'
        }
    };

    return (
        <h1 className='text-black text-preset-1 font-sans pt-300 pl-200'>
            {getTitle()}
        </h1>
    )
}
