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
    <div className={`min-h-screen ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-4 sm:p-6 lg:p-8`}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className={`flex items-center gap-3 mb-6 ${dark ? 'bg-gray-900' : 'bg-white'}`}>
          <button onClick={() => router.push('/home')}>
            <FaArrowLeft
              size={24}
              className={dark ? 'text-white' : 'text-gray-900'}
            />
          </button>
          <h1 className={`text-lg sm:text-xl font-[Poppins-SemiBold] ${dark ? 'text-white' : 'text-gray-900'} shadow-md`}>
            {language ? 'उपश्रेणी' : 'Sub Services'}
          </h1>
        </div>

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
              <p className={`text-lg font-[Poppins-SemiBold] ${dark ? 'text-white' : 'text-gray-900'}`}>
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