import { Suspense } from 'react';
import HeaderTitle from "../../components/HeaderTitle";
import OverviewCurrentBalance from "../../components/OverviewCurrentBalance";
import OverviewPots from "../../components/OverviewPots";
import OverviewTransactions from "../../components/OverviewTransactions";
import OverviewBudgets from "../../components/OverviewBudgets";
import OverviewRecurringBills from "../../components/OverviewRecurringBills";
import ClientWrapperDesktopNav from '../../components/ClientWrapperDesktopNav';
import SigninButtonWrapper from '../../(auth)/components/SigninButtonWrapper';

export default function Home() {
    return (
        <ClientWrapperDesktopNav>
            <div className="mx-4 sm:mx-10 my-6 pb-8 mb-12">
                <div className="flex justify-between items-center">
                    <HeaderTitle />
                    <Suspense fallback={<div>Loading...</div>}>
                        <SigninButtonWrapper />
                    </Suspense>
                </div>
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
        </ClientWrapperDesktopNav>
    );
}