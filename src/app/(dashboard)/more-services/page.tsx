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
import { icons } from '@/constants/icons';
import { JSX } from 'react';

const serviceIcons: { [key: string]: JSX.Element | string } = {
  Helper: <FaBoxes size={40} className="text-[#00BCD2]" />,
  Maid: <FaFemale size={40} className="text-[#4CAC58]" />,
  Farming: icons.farmer,
  Repairing: <FaTools size={40} className="text-[#FE971E]" />,
  Painter: <FaPaintRoller size={40} className="text-[#1A96F0]" />,
  Laundery: <FaTshirt size={40} className="text-[#FDC02D]" />,
  Appliances: <FaPlug size={40} className="text-[#E94032]" />,
  'Moving and Packing': <FaTruck size={40} className="text-[#00BCD2]" />,
  Plumbing: <Image src={icons.plumber} alt="Plumber" width={48} height={48} className="w-12 h-12" onError={() => console.error("Failed to load plumber icon")} />,
  Electrician: <FaBolt size={40} className="text-[#822BFF]" />,
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
  'Priest/Ceremonial': <Image src={icons.acharya} alt="Priest" width={48} height={48} className="w-12 h-12" onError={() => console.error("Failed to load acharya icon")} />,
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
              src={icons.back}
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
          {/* Helper */}
          <Link href="/subcategories?service=Helper" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Helper}`}>
              {serviceIcons.Helper}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'सहायक' : 'Helper'}
            </p>
          </Link>
           {/* Priest/Ceremonial */}
          <Link href="/subcategories?service=Priest" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors['Priest/Ceremonial']}`}>
              {serviceIcons['Priest/Ceremonial']}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'आचार्य/पुरोहित' : 'Priest/Ceremonial'}
            </p>
          </Link>

          {/* Maid */}
          <Link href="/subcategories?service=Maid" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Maid}`}>
              {serviceIcons.Maid}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'नौकरानी' : 'Maid'}
            </p>
          </Link>

          {/* Farming */}
          <Link href="/subcategories?service=Farming" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Farming}`}>
              <Image
                src={serviceIcons.Farming as string}
                alt="Farming"
                width={48}
                height={48}
                className={`w-9 h-9 sm:w-12 sm:h-12 ${dark ? 'filter invert' : ''}`}
              />
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'खेती/कृषि' : 'Farming'}
            </p>
          </Link>

          {/* Repairing */}
          <Link href="/subcategories?service=Repairing" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Repairing}`}>
              {serviceIcons.Repairing}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'सामान्य बनाना' : 'Repairing'}
            </p>
          </Link>

          {/* Painter */}
          <Link href="/subcategories?service=Painter" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Painter}`}>
              {serviceIcons.Painter}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'पेंटर' : 'Painter'}
            </p>
          </Link>

          {/* Laundery */}
          <Link href="/subcategories?service=Laundery" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Laundery}`}>
              {serviceIcons.Laundery}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'धोबी' : 'Laundery'}
            </p>
          </Link>

          {/* Appliances */}
          <Link href="/subcategories?service=Appliances" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Appliances}`}>
              {serviceIcons.Appliances}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'उपकरण' : 'Appliances'}
            </p>
          </Link>

          {/* Moving and Packing */}
          <Link href="/subcategories?service=Moving%20and%20Packing" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors['Moving and Packing']}`}>
              {serviceIcons['Moving and Packing']}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'मूविंग और पैकिंग' : 'Moving and Packing'}
            </p>
          </Link>

          {/* Plumbing */}
          <Link href="/subcategories?service=Plumbing" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Plumbing}`}>
              {serviceIcons.Plumbing}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'नलकार' : 'Plumbing'}
            </p>
          </Link>

          {/* Electrician */}
          <Link href="/subcategories?service=Electrician" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Electrician}`}>
              {serviceIcons.Electrician}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'बिजलीवाला' : 'Electrician'}
            </p>
          </Link>

          {/* Carpenter */}
          <Link href="/subcategories?service=Carpenter" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Carpenter}`}>
              {serviceIcons.Carpenter}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'कारपेंटर' : 'Carpenter'}
            </p>
          </Link>

          {/* HVAC */}
          <Link href="/subcategories?service=HVAC" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.HVAC}`}>
              {serviceIcons.HVAC}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'एचवीएसी' : 'HVAC'}
            </p>
          </Link>

          {/* Gardener */}
          <Link href="/subcategories?service=Gardener" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Gardener}`}>
              {serviceIcons.Gardener}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'बागवान' : 'Gardener'}
            </p>
          </Link>

          {/* Roofing */}
          <Link href="/subcategories?service=Roofing" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Roofing}`}>
              {serviceIcons.Roofing}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'छत विशेषज्ञ' : 'Roofing'}
            </p>
          </Link>

          {/* Flooring */}
          <Link href="/subcategories?service=Flooring" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Flooring}`}>
              {serviceIcons.Flooring}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'फ़्लोरिंग' : 'Flooring'}
            </p>
          </Link>

          {/* Locksmith */}
          <Link href="/subcategories?service=Locksmith" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Locksmith}`}>
              {serviceIcons.Locksmith}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'लॉकस्मिथ' : 'Locksmith'}
            </p>
          </Link>

          {/* Pest Control */}
          <Link href="/subcategories?service=Pest%20Control" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors['Pest Control']}`}>
              {serviceIcons['Pest Control']}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'कीट नियंत्रण' : 'Pest Control'}
            </p>
          </Link>

          {/* Interior */}
          <Link href="/subcategories?service=Interior" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Interior}`}>
              {serviceIcons.Interior}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'इंटीरियर' : 'Interior'}
            </p>
          </Link>

          {/* Security */}
          <Link href="/subcategories?service=Security" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Security}`}>
              {serviceIcons.Security}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'सुरक्षा' : 'Security'}
            </p>
          </Link>

          {/* Renovation */}
          <Link href="/subcategories?service=Renovation" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Renovation}`}>
              {serviceIcons.Renovation}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'नवीनीकरण' : 'Renovation'}
            </p>
          </Link>

          {/* Masonry */}
          <Link href="/subcategories?service=Masonry" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Masonry}`}>
              {serviceIcons.Masonry}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'ईंट बाँधनेवाला' : 'Masonry'}
            </p>
          </Link>

          {/* Window and Door */}
          <Link href="/subcategories?service=Window%20and%20Door" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors['Window and Door']}`}>
              {serviceIcons['Window and Door']}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'खिड़की और दरवाजा' : 'Window and Door'}
            </p>
          </Link>

          {/* Pool */}
          <Link href="/subcategories?service=Pool" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Pool}`}>
              {serviceIcons.Pool}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'पूल' : 'Pool'}
            </p>
          </Link>

          {/* Cook/Chef */}
          <Link href="/subcategories?service=Cook%2FChef" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors['Cook/Chef']}`}>
              {serviceIcons['Cook/Chef']}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'रसोइया/बावर्ची' : 'Cook/Chef'}
            </p>
          </Link>

          {/* Driver */}
          <Link href="/subcategories?service=Driver" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors.Driver}`}>
              {serviceIcons.Driver}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'चालक/ड्राइवर' : 'Driver'}
            </p>
          </Link>

         

          {/* Local Skilled Worker */}
          <Link href="/subcategories?service=Local%20Skilled%20Worker" className="flex flex-col items-center w-20 sm:w-24 text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${bgColors['Local Skilled Worker']}`}>
              {serviceIcons['Local Skilled Worker']}
            </div>
            <p className="mt-2 text-sm sm:text-base font-medium line-clamp-2">
              {language ? 'स्थानीय कुशल कारीगर' : 'Local Skilled Worker'}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;