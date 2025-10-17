'use client';

import { useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { services } from '@/constants/services';

const SubCategories = () => {
  const { language, dark } = useSelector((state: any) => state.user);
  const router = useRouter();
  const searchParams = useSearchParams();
  const service = searchParams.get('service') || 'Electrician';

  const findByName = (nameToFind: string) => {
    const serv = services.find((obj: any) => obj.english === nameToFind);
    return serv;
  };

  const result = findByName(service);

  return (
    <div className={`min-h-screen ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} `}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
          <header className="bg-white  shadow-sm border-b border-gray-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg bg-gray-100  hover:bg-gray-200  transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-600 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-800 ">
                {language ? "प्रोफ़ाइल" : "Home"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Theme Toggle or other header actions can go here */}
            </div>
          </div>
        </div>
      </header>

        {/* Subservices List */}
        <div className="px-4">
          {result?.subservices?.map((item: any, index: number) => (
            <button
              key={index}
              className={`flex justify-between items-center w-full px-5 py-4 mt-4 rounded-lg ${
                dark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'
              }`}
              onClick={() =>
                router.push(`/contractor-list?service=${service}&sub=${item.english}`)
              }
            >
              <p className={`text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
                {language ? item.hindi : item.english}
              </p>
              <FaArrowRight size={30} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategories;