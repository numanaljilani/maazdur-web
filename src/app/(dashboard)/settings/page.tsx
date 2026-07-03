'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from '@/service/slice/userSlice';
import { useState } from 'react';
import env from '../../../env';

const ProfilePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { language, dark, userData } = useSelector((state: any) => state.user);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const tabs = [
    // { name: language ? 'घर' : 'Home', path: '/home', icon: '/home.png', loginRequired: false },
    { name: language ? 'उपयोगकर्ता' : 'User', path: '/profile', icon: '/user.png', loginRequired: true },
    { name: language ? 'प्रोफ़ाइल संपादित करें' : 'Edit Profile', path: '/edit-profile', icon: '/edit.png', loginRequired: true },
    { name: language ? 'पसंदीदा' : 'Favorite', path: '/favorite', icon: '/bookmark.png', loginRequired: true },
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

  // Show Toast
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Toggle Active/Deactive with Switch
  const handleToggleActive = async () => {
    if (!userData?.email || loading) return;

    setLoading(true);
    let token = await localStorage?.getItem('accessToken') || "";
    token = token.slice(1, -1);
  
    try {
      const res = await fetch(`${env.server}/api/v1/is-active`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isActive: !userData.isActive,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(setUser({
          ...userData,
          isActive: !userData.isActive,
        }));

        showToast(
          language ? 'स्थिति सफलतापूर्वक अपडेट की गई' : 'Status updated successfully',
          'success'
        );
      } else {
        showToast(
          data.message || (language ? 'कुछ गलत हुआ' : 'Something went wrong'),
          'error'
        );
      }
    } catch (error) {
      console.error("Toggle active error:", error);
      showToast(language ? 'सर्वर त्रुटि' : 'Server error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20 ">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                {language ? 'प्रोफ़ाइल' : 'Profile'}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <img 
                src={userData?.image || "/icons/icon-512x512.png"} 
                alt="Profile" 
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-purple-200 shadow-lg"
                onError={(e) => { e.currentTarget.src = "/default-avatar.png"; }}
              />
              {userData?.email && (
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {userData?.fullname || "Guest"}
              </h2>
              <p className="text-gray-600 mb-3 text-lg">
                {userData?.email || '-'}
              </p>
              
              {userData?.email ? (
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {language ? 'ऑनलाइन' : 'Online'}
                  </span>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    userData.isActive ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {userData.isActive ? (language ? 'सक्रिय' : 'Active') : (language ? 'निष्क्रिय' : 'Inactive')}
                  </span>
                </div>
              ) : (
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {language ? 'अतिथि' : 'Guest'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {userData?.email && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 text-center shadow-lg">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-gray-600 text-sm">{language ? 'कार्य' : 'Calls'}</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-lg">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-gray-600 text-sm">{language ? 'पूर्ण' : 'Review'}</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-lg">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-gray-600 text-sm">{language ? 'रेटिंग' : 'Rating'}</div>
            </div>
          </div>
        )}

        {/* Navigation Grid */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {language ? 'त्वरित मेनू' : 'Quick Menu'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tabs.map((tab) => 
                (userData?.email || !tab?.loginRequired) ? (
                  <Link
                    key={tab.path}
                    href={tab.path}
                    className="flex items-center p-4 rounded-xl transition-all duration-200 hover:bg-purple-50 hover:shadow-md border border-gray-100 hover:border-purple-200 group"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="relative">
                        <img src={tab.icon} alt={`${tab.name} icon`} width={24} height={24} className="transition-transform group-hover:scale-110" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">{tab.name}</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : null
              )}
            </div>
          </div>

          {/* Account Actions */}
          <div className="border-t border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {language ? 'खाता क्रियाएँ' : 'Account Actions'}
            </h3>
            
            <div className="space-y-3">
              {userData?.email ? (
                <>
                  {/* Toggle Switch */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-800">{language ? 'खाता स्थिति' : 'Account Status'}</p>
                        <p className="text-sm text-gray-500">
                          {userData.isActive ? 
                            (language ? 'सक्रिय' : 'Active') : 
                            (language ? 'निष्क्रिय' : 'Inactive')}
                        </p>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!userData.isActive}
                        onChange={handleToggleActive}
                        disabled={loading}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors ${loading ? 'opacity-50' : ''}`}></div>
                      <div className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 peer-checked:translate-x-5`}></div>
                    </label>
                  </div>

                  {/* Original Buttons (Settings + Logout) - Kept as requested */}
                  <button
                    onClick={() => router.push('/settings')}
                    className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:bg-gray-50 border border-gray-100 text-gray-700 hover:text-gray-900"
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
                    className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 bg-red-50 hover:bg-red-100 border border-red-100 text-red-700 hover:text-red-800 font-medium"
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
                <button onClick={() => router.push('/login')} className="w-full flex items-center justify-center p-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-lg hover:shadow-xl">
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

      {/* Toast Message */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-xl text-white flex items-center gap-2 z-50 transition-all ${
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;