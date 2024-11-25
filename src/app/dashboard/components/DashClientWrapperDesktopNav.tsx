'use client'
import { useState } from 'react';
import NavBar from './DashNavBar';

interface Props {
    children: React.ReactNode;
}

export default function ClientWrapperDesktopNav({ children }: Props) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen">
            <NavBar onSidebarCollapse={setIsSidebarCollapsed} />
            <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                {children}
            </main>
        </div>
    );
}