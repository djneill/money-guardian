'use client'

import { useState } from 'react';
import HeaderTitle from "../../components/HeaderTitle";
import NavBar from "../../components/NavBar";
import OverviewCurrentBalance from "../../components/OverviewCurrentBalance";
import OverviewPots from "../../components/OverviewPots";
import OverviewTransactions from "../../components/OverviewTransactions";
import OverviewBudgets from "../../components/OverviewBudgets";
import OverviewRecurringBills from "../../components/OverviewRecurringBills";
// import SigninButtonWrapper from '@/app/(auth)/components/SigninButtonWrapper';
// import ClientWrapperDesktopNav from '../../components/ClientWrapperDesktopNav';

export default function Home() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <main>
            <div className="flex min-h-screen">
                <NavBar onSidebarCollapse={setIsSidebarCollapsed} />
                <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                    <div className="mx-4 sm:mx-10 my-6 pb-8 mb-12">
                        <HeaderTitle />
                        <OverviewCurrentBalance />
                        <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 lg:gap-6">
                            <div className="lg:space-y-6">
                                <OverviewPots />
                                <OverviewTransactions />
                            </div>
                            <div className="lg:space-y-6">
                                <OverviewBudgets />
                                <OverviewRecurringBills />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </main>
    );
}