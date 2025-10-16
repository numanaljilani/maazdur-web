'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import BottomTabs from '@/components/Sidebar';


const inter = Poppins({ subsets: ["latin"], weight: "500" });
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dark } = useSelector((state: any) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`min-h-screen flex ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} ${inter.className}`}>
      {/* Sidebar */}
      {/* <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> */}

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Hamburger Menu for Mobile */}
        {/* <button
          className="sm:hidden mb-4 p-2 rounded-md bg-gray-200 dark:bg-gray-700"
          onClick={toggleSidebar}
        >
          <Image
            src="/menu.png"
            alt="menu"
            width={24}
            height={24}
            className={dark ? 'filter invert' : ''}
          />
        </button> */}
        {children}

         <BottomTabs />
      </main>
    </div>
  );
}