'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { setToken, setUser } from '@/service/slice/userSlice';

const ProfilePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { language, dark, userData } = useSelector((state: any) => state.user);

  const tabs = [
    { name: language ? 'घर' : 'Home', path: '/home', icon: '/home.png', loginRequired: false },
    { name: language ? 'पसंदीदा' : 'Favorite', path: '/favorite', icon: '/bookmark.png', loginRequired: true },
    { name: language ? 'उपयोगकर्ता' : 'User', path: '/profile', icon: '/user.png', loginRequired: true },
    { name: language ? 'प्रोफ़ाइल संपादित करें' : 'Edit Profile', path: '/edit-profile', icon: '/edit.png', loginRequired: true },
    { name: language ? 'ठेकेदार' : 'Contractor', path: '/contractor-registration', icon: '/suitcase.png', loginRequired: true },
    { name: language ? 'गोपनीयता' : 'Privacy', path: '/privacy-policy', icon: '/secure-shield.png', loginRequired: false },
    { name: language ? 'सहायता केंद्र' : 'Help Center', path: '/help-center', icon: '/available.png', loginRequired: false },
  ];

  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {language ? 'प्रोफ़ाइल' : 'Profile'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Theme Toggle or other header actions can go here */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <img 
                src={userData?.image || "/default-avatar.png"} 
                alt="Profile" 
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-purple-200 dark:border-purple-800 shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = "/default-avatar.png";
                }}
              />
              {userData?.email && (
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              )}
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {userData?.fullname || "Guest"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-3 text-lg">
                {userData?.email || '-'}
              </p>
              
              {userData?.email ? (
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                    {language ? 'ऑनलाइन' : 'Online'}
                  </span>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
                    {language ? 'सक्रिय' : 'Active'}
                  </span>
                </div>
              ) : (
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-sm font-medium">
                  {language ? 'अतिथि' : 'Guest'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {userData?.email && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">0</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">{language ? 'कार्य' : 'Calls'}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">0</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">{language ? 'पूर्ण' : 'Review'}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">5</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">{language ? 'रेटिंग' : 'Rating'}</div>
            </div>
          </div>
        )}

        {/* Navigation Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              {language ? 'त्वरित मेनू' : 'Quick Menu'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tabs.map((tab) => 
                (userData?.email || !tab?.loginRequired) ? (
                  <Link
                    key={tab.path}
                    href={tab.path}
                    className="
                      flex items-center p-4 
                      rounded-xl 
                      transition-all duration-200
                      hover:bg-purple-50 dark:hover:bg-purple-900/30
                      hover:shadow-md
                      border border-gray-100 dark:border-gray-700
                      hover:border-purple-200 dark:hover:border-purple-800
                      group
                    "
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="relative">
                        <img
                          src={tab.icon}
                          alt={`${tab.name} icon`}
                          width={24}
                          height={24}
                          className="transition-transform group-hover:scale-110"
                        />
                      </div>
                      <span className="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base">
                        {tab.name}
                      </span>
                    </div>
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : null
              )}
            </div>
          </div>

          {/* Account Actions */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              {language ? 'खाता क्रियाएँ' : 'Account Actions'}
            </h3>
            
            <div className="space-y-3">
              {userData?.email ? (
                <>
                  <button
                    onClick={() => router.push('/settings')}
                    className="
                      w-full flex items-center justify-between p-4
                      rounded-xl 
                      transition-all duration-200
                      hover:bg-gray-50 dark:hover:bg-gray-700
                      border border-gray-100 dark:border-gray-700
                      text-gray-700 dark:text-gray-200
                      hover:text-gray-900 dark:hover:text-white
                    "
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{language ? 'सेटिंग्स' : 'Settings'}</span>
                    </div>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="
                      w-full flex items-center justify-between p-4
                      rounded-xl 
                      transition-all duration-200
                      bg-red-50 dark:bg-red-900/20
                      hover:bg-red-100 dark:hover:bg-red-900/30
                      border border-red-100 dark:border-red-800
                      text-red-700 dark:text-red-300
                      hover:text-red-800 dark:hover:text-red-200
                      font-medium
                    "
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>{language ? 'लॉग आउट' : 'Logout'}</span>
                    </div>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => router.push('/login')}
                  className="
                    w-full flex items-center justify-center p-4
                    rounded-xl 
                    transition-all duration-200
                    bg-purple-600 hover:bg-purple-700
                    text-white
                    font-medium
                    shadow-lg hover:shadow-xl
                  "
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  {language ? 'लॉगिन करें' : 'Login to Continue'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;