'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { FaSearch, FaBoxes, FaFemale, FaHammer, FaPaintRoller, FaTruck, FaTools, FaEllipsisH } from 'react-icons/fa';
import { LuWashingMachine } from 'react-icons/lu';
import { MdMicrowave } from 'react-icons/md';
import ServicesList from '@/components/ServicesList';
import WorkerList from '@/components/WorkerList';
import { useGetContractorsMutation } from '@/service/api/userApi';
import ActivityIndicator from '@/components/ActivityIndicator';
import {services} from "@/constants/services"

// Mock services data (replace with your actual services constant)
// const services = [
//   { id: '1', english: 'Electrician', hindi: 'इलेक्ट्रीशियन' },
//   { id: '2', english: 'Plumber', hindi: 'नलकारी' },
//   { id: '3', english: 'Carpenter', hindi: 'बढ़ई' },
//   // Add more services as needed
// ];

const HomePage = () => {
  const [contractors, setContractors] = useState([]);
  const [service, setService] = useState('Electrician');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { userData, language, dark } = useSelector((state: any) => state.user);
  const [getContractors, { data, isSuccess, isError, error }] = useGetContractorsMutation();

  const getContractorsByService = async () => {
    setLoading(true);
    try {
      const res: any = await getContractors({ service });
      if (res.data) {
        setContractors(res.data.contractors || []);
      } else {
        toast.error(res.error?.data?.message || 'Failed to fetch contractors', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong', { position: 'top-right', autoClose: 3000 });
    }
    setLoading(false);
  };

  useEffect(() => {
    getContractorsByService();
  }, [service]);

  useEffect(() => {
    if (isSuccess && data) {
      setContractors(data.contractors || []);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      // @ts-ignore
      toast.error(error?.data?.message || 'Failed to fetch contractors', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [isError, error]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getContractorsByService();
    setTimeout(() => setRefreshing(false), 2000);
  }, [service]);

  return (
    <div className={`p-4 min-h-screen ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Refresh Button (replacing pull-to-refresh) */}


      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="flex items-center gap-3">
      
        
        </div>
        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          
        
          <div className="relative w-full sm:w-64">
            <FaSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${dark ? 'text-white' : 'text-gray-900'}`} size={20} />
            <input
              type="text"
              placeholder={language ? 'खोजें' : 'Search'}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${dark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
            />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mt-3">
        <h2 className={`text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
          {language ? 'सेवाएं' : 'Services'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 justify-center">
          {[
            { name: language ? 'सहायक' : 'Helper', icon: <FaBoxes className="text-cyan-500" size={25} />, service: 'Helper' },
            { name: language ? 'नौकरानी' : 'Maid', icon: <FaFemale className="text-green-500" size={25} />, service: 'Maid' },
            { name: language ? 'किसान' : 'Farming', icon: <Image src="/farmer.png" alt="farmer" width={32} height={32} className={`${dark ? 'filter invert' : ''}`} onError={() => console.error('Failed to load farmer icon')} />, service: 'Farming' },
            { name: language ? 'मरम्मत' : 'Repairing', icon: <FaHammer className="text-orange-500" size={25} />, service: 'Repairing' },
            { name: language ? 'चित्रकारी' : 'Painting', icon: <FaPaintRoller className="text-blue-500" size={25} />, service: 'Painting' },
            { name: language ? 'कपड़े धोना' : 'Laundry', icon: <LuWashingMachine className="text-yellow-500" size={25} />, service: 'Laundry' },
            { name: language ? 'उपकरण' : 'Appliances', icon: <MdMicrowave className="text-red-500" size={25} />, service: 'Appliances' },
            { name: language ? 'स्थानांतरण' : 'Shifting', icon: <FaTruck className="text-cyan-500" size={25} />, service: 'Shifting' },
            { name: language ? 'नलकारी' : 'Plumbing', icon: <FaTools className="text-green-500" size={25} />, service: 'Plumbing' },
            // { name: language ? 'अधिक' : 'More', icon: <FaEllipsisH className="text-purple-600" size={25} />, service: 'More' },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.service === 'More' ? '/more-services' : `/subcategories?service=${item.service}`}
              className="flex flex-col items-center"
            >
              <div className={`w-11 h-11 rounded-full flex justify-center items-center bg-opacity-10 ${item.service === 'Helper' ? 'bg-cyan-200' : item.service === 'Maid' ? 'bg-green-200' : item.service === 'Farming' ? 'bg-purple-200' : item.service === 'Repairing' ? 'bg-orange-200' : item.service === 'Painting' ? 'bg-blue-200' : item.service === 'Laundry' ? 'bg-yellow-200' : item.service === 'Appliances' ? 'bg-red-200' : item.service === 'Shifting' ? 'bg-cyan-200' : item.service === 'Plumbing' ? 'bg-green-200' : 'bg-purple-200'}`}>
          {item.icon}
              </div>
              <span className={`text-center text-sm font-medium ${dark ? 'text-white' : 'text-gray-900'} mt-1`}>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Most Popular Services */}
      <div className="mt-4">
        <h2 className={`text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
          {language ? 'सर्वाधिक लोकप्रिय सेवाएँ' : 'Most Popular Services'}
        </h2>
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {services.map((item) => (
            <ServicesList
              key={item.id}
              item={item}
              service={service}
              setService={setService}
              language={language}
            />
          ))}
        </div>
      </div>

      {/* Contractors List */}
      <div className="mt-4">
        {loading ? (
          <ActivityIndicator />
        ) : contractors.length > 0 ? (
          contractors.map((item, index) => (
            <WorkerList
              key={index}
              item={item}
              contractors={contractors}
              setContractors={setContractors}
              fromBookmark={false}
            />
          ))
        ) : (
          <div className="min-h-[200px] flex justify-center items-center">
            <p className="text-center text-lg font-semibold">
              {language
                ? 'कोई कर्मचारी नहीं मिला'
                : `No ${service ? service + ' service found' : 'worker Found'}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;