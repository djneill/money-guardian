import HeaderTitle from "./components/HeaderTitle";
import NavBar from "./components/NavBar";
import OverviewCurrentBalance from "./components/OverviewCurrentBalance";
import OverviewPots from "./components/OverviewPots";
import OverviewTransactions from "./components/OverviewTransactions";
import OverviewBudgets from "./components/OverviewBudgets";
import OverviewRecurringBills from "./components/OverviewRecurringBills";

export default function Home() {
  return (
    <main>
      <div className="mx-4 sm:mx-10 my-6 pb-8 mb-12">
        <HeaderTitle />
        <OverviewCurrentBalance />
        <OverviewPots />
        <OverviewTransactions />
        <OverviewBudgets />
        <OverviewRecurringBills />
      </div>
      <NavBar />
    </main>
  );
}
