import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MinimizeMenu from '../icons/MinimizeMenu';
import OverviewIcon from '../icons/OverviewIcon';
import TransactionsIcon from '../icons/TransactionsIcon';
import BudgetsIcon from '../icons/BudgetsIcon';
import PotsIcon from '../icons/PotsIcon';
import BillsIcon from '../icons/BillsIcon';

const DesktopSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Overview', icon: OverviewIcon },
        { href: '/transactions', label: 'Transactions', icon: TransactionsIcon },
        { href: '/budget', label: 'Budgets', icon: BudgetsIcon },
        { href: '/pots', label: 'Pots', icon: PotsIcon },
        { href: '/recurringBills', label: 'Recurring Bills', icon: BillsIcon },
    ];

    return (
        <nav
            className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-grey-900 p-4 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Header */}
            <div className="mb-8">
                {!isCollapsed && (
                    <h1 className="text-preset-1 font-bold text-white">Money Guardian</h1>
                )}
            </div>

            {/* Navigation Links */}
            <ul className="space-y-2">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`flex items-center py-3 px-4 rounded-2xl transition-colors ${isActive
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
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Minimize Menu Button */}
            <div className="mt-auto pt-4">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white gap-3"
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