import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MinimizeMenu from '../../icons/MinimizeMenu';
import OverviewIcon from '../../icons/OverviewIcon';
import TransactionsIcon from '../../icons/TransactionsIcon';
import BudgetsIcon from '../../icons/BudgetsIcon';
import PotsIcon from '../../icons/PotsIcon';
import BillsIcon from '../../icons/BillsIcon';

type DesktopSidebarProps = {
    onCollapsedChange: (collapsed: boolean) => void;
};

const DesktopSidebar = ({ onCollapsedChange }: DesktopSidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const handleCollapse = () => {
        const newCollapsedState = !isCollapsed;
        setIsCollapsed(newCollapsedState);
        onCollapsedChange(newCollapsedState);
    }

    const navItems = [
        { href: '/dashboard/overview', label: 'Overview', icon: OverviewIcon },
        { href: '/dashboard/transactions', label: 'Transactions', icon: TransactionsIcon },
        { href: '/dashboard/budget', label: 'Budgets', icon: BudgetsIcon },
        { href: '/dashboard/pots', label: 'Pots', icon: PotsIcon },
        { href: '/dashboard/recurringBills', label: 'Recurring Bills', icon: BillsIcon },
    ];

    return (
        <nav
            className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-grey-900 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Header */}
            <div className="mb-8 px-4 pt-4">
                {!isCollapsed && (
                    <h1 className="text-preset-1 font-bold text-white">Money Guardian</h1>
                )}
            </div>

            {/* Navigation Links */}
            <ul className="space-y-2 pr-6 ">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <li key={href} className='relative'>
                            <Link
                                href={href}
                                className={`flex items-center py-3 px-4 rounded-r-xl transition-colors relative ${isActive
                                    ? 'bg-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <Icon
                                    className="w-6 h-6"
                                    fill={isActive ? '#277C78' : '#B3B3B3'}
                                />
                                {!isCollapsed && (
                                    <span className={`ml-3 ${isActive ? 'text-black font-medium' : ''}`}>
                                        {label}
                                    </span>
                                )}
                                {isActive && (
                                    <>
                                        <div className="absolute left-0 top-0 w-1 h-full bg-green"></div>
                                        {/* <div className="absolute right-0 top-0 h-full w-4 bg-white rounded-l-2xl"></div> */}
                                    </>
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Minimize Menu Button */}
            <div className="mt-auto mb-16 pt-4 px-4">
                <button
                    onClick={(handleCollapse)}
                    className="w-full flex items-center p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white gap-3"
                >
                    <div className={`w-6 h-6 transition-transform duration-300 ${isCollapsed ? 'scale-x-[-1]' : ''
                        }`}>
                        <MinimizeMenu />
                    </div>
                    {!isCollapsed && (
                        <span>Minimize Menu</span>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default DesktopSidebar;