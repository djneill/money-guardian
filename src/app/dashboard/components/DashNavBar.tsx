'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import OverviewIcon from '../../icons/OverviewIcon';
import TransactionsIcon from '../../icons/TransactionsIcon';
import BudgetsIcon from '../../icons/BudgetsIcon';
import PotsIcon from '../../icons/PotsIcon';
import BillsIcon from '../../icons/BillsIcon';
import DesktopSidebar from './DashDesktopNavBar';

type NavBarProps = {
    onSidebarCollapse: (collapsed: boolean) => void;
};

export default function NavBar({ onSidebarCollapse }: NavBarProps) {
    const pathname = usePathname()

    const navItems = [
        { href: '/dashboard/overview', icon: OverviewIcon },
        { href: '/dashboard/transactions', icon: TransactionsIcon },
        { href: '/dashboard/budget', icon: BudgetsIcon },
        { href: '/dashboard/pots', icon: PotsIcon },
        { href: '/dashboard/recurringBills', icon: BillsIcon },

    ]
    return (
        <>
            {/* Desktop Sidebar */}
            <DesktopSidebar onCollapsedChange={onSidebarCollapse} />

            {/* Mobile Footer Nav */}
            <nav className='lg:hidden bg-grey-900 fixed bottom-0 left-0 right-0 px-4 pt-4 rounded-t-xl'>
                <ul className='flex justify-between items-center'>
                    {navItems.map(({ href, icon: Icon }) => {
                        const isActive = pathname === href;
                        return (
                            <li key={href} className={`flex-1 rounded-t-xl ${isActive ? 'bg-white' : ''}`}>
                                <Link href={href} className={`block p-4 ${isActive ? 'relative' : ''}`}>
                                    <Icon className='mx-auto'
                                        fill={isActive ? '#277C78' : '#B3B3B3'} />
                                    {isActive && (
                                        <div className='absolute bottom-0 left-0 right-0 h-1 bg-green'></div>
                                    )}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}