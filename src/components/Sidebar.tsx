'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from '@/service/slice/userSlice';
import { useRouter } from 'next/navigation';

const BottomTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { language, dark, userData } = useSelector((state: any) => state.user);

  const tabs = [
    {
      name: language ? 'घर' : 'Home',
      path: '/home',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: language ? 'प्रोफ़ाइल' : 'Profile',
      path: '/settings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  return (
    <>
      {/* Bottom Tabs Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`
                  flex flex-col items-center justify-center 
                  py-3 px-4 
                  transition-all duration-200 
                  flex-1
                  ${isActive 
                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }
                `}
              >
                <div className={`
                  transition-transform duration-200
                  ${isActive ? 'scale-110' : 'scale-100'}
                `}>
                  {tab.icon}
                </div>
                <span className={`
                  text-xs mt-1 font-medium
                  ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}
                `}>
                  {tab.name}
                </span>
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute top-0 w-12 h-1 bg-purple-600 dark:bg-purple-400 rounded-b-full" />
                )}
              </Link>
            );
          })}
        </div>
        
        {/* Safe area for mobile devices */}
        <div className="h-4 bg-white dark:bg-gray-800 sm:hidden" />
      </nav>

      {/* Add padding to main content to avoid overlap */}
      <style jsx global>{`
        main {
          padding-bottom: 80px;
        }
        @media (min-width: 640px) {
          main {
            padding-bottom: 0;
          }
        }
      `}</style>
    </>
  );
};

export default BottomTabs;