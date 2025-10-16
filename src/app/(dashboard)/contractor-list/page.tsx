"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import WorkerList from "@/components/WorkerList";

import { useGetContractorsMutation } from "@/service/api/userApi";

// Icons (replace with your actual icon paths)
const icons = {
  back: "/back.png",
};

const ContractorListScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userData, language, dark } = useSelector((state: any) => state.user);
  const [contractors, setContractors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const service = searchParams.get("service");
  const subService = searchParams.get("sub");
  const searchQuery = searchParams.get("search");

  const [getContractors, { data, isSuccess, isError, error }] =
    useGetContractorsMutation();

  const getContractorsByService = async () => {
    setLoading(true);
    try {
      const res: any = await getContractors({
        service: service,
        subService: subService,
      });
      if (res.data) {
        setContractors(res.data.contractors || []);
      } else {
        console.error("Failed to fetch contractors:", res.error);
      }
    } catch (err) {
      console.error("Error fetching contractors:", err);
    }
    setLoading(false);
  };

  const searchContractors = async () => {
    setLoading(true);
    try {
      const res: any = await getContractors({
        search: searchQuery,
        take: 20,
        skip: 0,
      });
      if (res.data) {
        setContractors(res.data.contractors || []);
      } else {
        console.error("Failed to search contractors:", res.error);
      }
    } catch (err) {
      console.error("Error searching contractors:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (service) {
      getContractorsByService();
    } else if (searchQuery) {
      searchContractors();
    }
  }, [service, searchQuery]);

  useEffect(() => {
    if (isSuccess && data) {
      setContractors(data.contractors || []);
    }
  }, [isSuccess, data]);

  return (
    <div
      className={`min-h-screen w-full  ${
        dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >


          <header className="bg-white  shadow-sm border-b border-gray-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg bg-gray-100  hover:bg-gray-200  transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>

              <h1 className="text-2xl font-bold text-gray-800 ">
                  {service && subService
                  ? ` ${subService}`
                  : searchQuery}
              </h1>
                 <p
                className={`text-sm ${
                  dark ? "text-gray-300" : "text-gray-600"
                } mt-1 truncate`}
              >
                {service ? service : `Search results for "${searchQuery}"`}
              </p>
              </div>
             
            </div>
            <div className="flex items-center space-x-4">
              {/* Theme Toggle or other header actions can go here */}
            
            </div>
            
          </div>
        </div>
        </header>
      {/* Header */}
     

      {/* Content */}
      <div className="px-4 sm:px-6  py-4">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : contractors?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {contractors.map((contractor, index) => (
              <WorkerList
                key={contractor.id || index}
                item={contractor}
                contractors={contractors}
                setContractors={setContractors}
                fromBookmark={false}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-12">
            <NotFound />
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && contractors.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      )}
    </div>
  );
};

export default ContractorListScreen;

const NotFound = () => {
  const { dark, language } = useSelector((state: any) => state.user);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* <div className="mb-6">
        <Image
          src="/not-found.png"
          alt="No contractors found"
          width={200}
          height={200}
          className="opacity-70"
        />
      </div>
      <h2
        className={`text-2xl font-semibold mb-3 ${
          dark ? "text-white" : "text-gray-900"
        }`}
      >
        {language ? "कोई कर्मचारी नहीं मिला" : "No Workers Found"}
      </h2> */}
      <p
        className={`text-lg mb-6 max-w-md ${
          dark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {language
          ? "हमें आपकी खोज से मेल खाने वाला कोई कर्मचारी नहीं मिला। कृपया दूसरे कीवर्ड के साथ कोशिश करें।"
          : "We couldn't find any workers matching your search. Please try with different keywords."}
      </p>
      <Link
        href="/home"
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
      >
        {language ? "वापस खोजें" : "Back to Search"}
      </Link>
    </div>
  );
};

export { NotFound };
