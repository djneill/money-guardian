import HeaderTitle from "./components/HeaderTitle";
import NavBar from "./components/NavBar";
import OverviewCurrentBalance from "./components/OverviewCurrentBalance";
import OverviewPots from "./components/OverviewPots";
import OverviewTransactions from "./components/OverviewTransactions";

export default function Home() {
  return (
    <main>
      <div className="mx-4 my-6 pb-8 mb-8">
        <HeaderTitle />
        <OverviewCurrentBalance />
        <OverviewPots />
        <OverviewTransactions />
      </div>
      <NavBar />
    </main>
  );
}
