'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaArrowLeft, FaBoxes, FaFemale, FaTools, FaPaintRoller, FaTshirt, FaPlug, FaTruck, FaWrench,
  FaBolt, FaHammer, FaFan, FaLeaf, FaHome, FaSquare, FaLock, FaBug, FaCouch, FaShieldAlt,
  FaUtensils, FaCar, FaPray, FaSwimmingPool, FaDoorOpen, FaCube
} from 'react-icons/fa';
import { services } from '@/constants/services';
import { icons } from '@/constants/icons';
import { JSX } from 'react';

const serviceIcons: { [key: string]: JSX.Element | string } = {
  Helper: <FaBoxes size={40} className="text-[#00BCD2]" />,
  Maid: <FaFemale size={40} className="text-[#4CAC58]" />,
    'Priest/Ceremonial': (
                <Image
                  src="/acharya.png"
                  style={{ color: "green" }}
                  alt="farmer"
                  width={32}
                  height={32}
                  className={``}
                  onError={() => console.error("Failed to load farmer icon")}
                />
              ),
  Farming: icons.farmer,
  Repairing: <FaTools size={40} className="text-[#FE971E]" />,
  Painter: <FaPaintRoller size={40} className="text-[#1A96F0]" />,
  Laundery: <FaTshirt size={40} className="text-[#FDC02D]" />,
  Appliances: <FaPlug size={40} className="text-[#E94032]" />,
  'Moving and Packing': <FaTruck size={40} className="text-[#00BCD2]" />,
  'Plumbing': (
                <Image
                  src="/plumber.png"
                  style={{ color: "green" }}
                  alt="plumber"
                  width={32}
                  height={32}
                  className={``}
                  onError={() => console.error("Failed to load farmer icon")}
                />
              ),
  Electrician: <FaBolt size={40} className="text-[rgb(130,43,255)]" />,
  Carpenter: <FaHammer size={40} className="text-[#FE971E]" />,
  HVAC: <FaFan size={40} className="text-[#1A96F0]" />,
  Gardener: <FaLeaf size={40} className="text-[#FDC02D]" />,
  Roofing: <FaHome size={40} className="text-[#E94032]" />,
  Flooring: <FaSquare size={40} className="text-[#00BCD2]" />,
  Locksmith: <FaLock size={40} className="text-[#4CAC58]" />,
  'Pest Control': <FaBug size={40} className="text-[#00BCD2]" />,
  Interior: <FaCouch size={40} className="text-[#4CAC58]" />,
  Security: <FaShieldAlt size={40} className="text-[#822BFF]" />,
  Renovation: <FaTools size={40} className="text-[#FE971E]" />,
  Masonry: <FaCube size={40} className="text-[#1A96F0]" />,
  'Window and Door': <FaDoorOpen size={40} className="text-[#FDC02D]" />,
  Pool: <FaSwimmingPool size={40} className="text-[#E94032]" />,
  'Cook/Chef': <FaUtensils size={40} className="text-[#00BCD2]" />,
  Driver: <FaCar size={40} className="text-[#4CAC58]" />,

  'Local Skilled Worker': <FaTools size={40} className="text-[#FE971E]" />,
};

const bgColors: { [key: string]: string } = {
  Helper: 'bg-[#00BCD2]/10',
  Maid: 'bg-[#4CAC58]/10',
  Farming: 'bg-[#822BFF]/10',
  Repairing: 'bg-[#FE971E]/10',
  Painter: 'bg-[#1A96F0]/10',
  Laundery: 'bg-[#FDC02D]/10',
  Appliances: 'bg-[#E94032]/10',
  'Moving and Packing': 'bg-[#00BCD2]/10',
  Plumbing: 'bg-[#4CAC58]/10',
  Electrician: 'bg-[#822BFF]/10',
  Carpenter: 'bg-[#FE971E]/10',
  HVAC: 'bg-[#1A96F0]/10',
  Gardener: 'bg-[#FDC02D]/10',
  Roofing: 'bg-[#E94032]/10',
  Flooring: 'bg-[#00BCD2]/10',
  Locksmith: 'bg-[#4CAC58]/10',
  'Pest Control': 'bg-[#00BCD2]/10',
  Interior: 'bg-[#4CAC58]/10',
  Security: 'bg-[#822BFF]/10',
  Renovation: 'bg-[#FE971E]/10',
  Masonry: 'bg-[#1A96F0]/10',
  'Window and Door': 'bg-[#FDC02D]/10',
  Pool: 'bg-[#E94032]/10',
  'Cook/Chef': 'bg-[#00BCD2]/10',
  Driver: 'bg-[#4CAC58]/10',
  'Priest/Ceremonial': 'bg-[#822BFF]/10',
  'Local Skilled Worker': 'bg-[#FE971E]/10',
};

const ServicesPage = () => {
  const { userData, language, dark } = useSelector((state: any) => state.user);
  const router = useRouter();

  return (
    <div className={`min-h-screen pb-52 ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-4 sm:p-6 lg:p-8`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-5 py-5">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Image
              src={'/back.png'}
              alt="Back"
              width={28}
              height={28}
              className={dark ? 'filter invert' : ''}
            />
          </button>
          <h1 className="text-xl sm:text-2xl font-medium text-purple-700">
            {language ? 'सभी सेवाएँ' : 'All Services'}
          </h1>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 justify-items-center">
          {services.map((service) => {
            console.log(service)
            return (
            <Link
              key={service.id}
              href={`/subcategories?service=${encodeURIComponent(service.english)}`}
              className="flex flex-col items-center w-20 sm:w-24 text-center"
            >
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors[service.english] || 'bg-purple-100'}`}
              >
                {typeof serviceIcons[service.english] === 'string' ? (
                  <Image
                    src={serviceIcons[service.english] as string}
                    alt={service.english}
                    width={48}
                    height={48}
                    className={`w-9 h-9 sm:w-12 sm:h-12 ${dark ? 'filter invert' : ''}`}
                  />
                ) : (
                  serviceIcons[service.english]
                )}
              </div>
              <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
                {language ? service.hindi : service.english}
              </p>
            </Link>
          )})}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;