import HeaderTitle from "./components/HeaderTitle";
import NavBar from "./components/NavBar";
import OverviewCurrentBalance from "./components/OverviewCurrentBalance";
import OverviewPots from "./components/OverviewPots";

export default function Home() {
  return (
    <main>
      <div className="mx-4 mt-6">
        <HeaderTitle />
        <OverviewCurrentBalance />
        <OverviewPots />
      </div>
      <NavBar />
    </main>
  );
}
