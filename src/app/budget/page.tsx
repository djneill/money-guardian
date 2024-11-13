import { useState } from 'react';
import HeaderTitle from "../components/HeaderTitle";
import NavBar from "../components/NavBar";

export default function Home() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
            <div className="mx-4 mt-6">
                <HeaderTitle />
            </div>
            <NavBar onSidebarCollapse={setIsSidebarCollapsed} />
        </main>
    );
}