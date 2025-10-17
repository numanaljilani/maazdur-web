"use client";

import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft, FaSearch, FaSync } from "react-icons/fa";
import toast from 'react-hot-toast';
import ActivityIndicator from "@/components/ActivityIndicator";
// import ServicesList from '@/components/Lists/ServicesList';
// import WorkerList from '@/components/Lists/WorkerList';
import { useMyBookmarkMutation } from "@/service/api/userApi";
import WorkerList from "@/components/WorkerList";
import ServicesList from "@/components/ServicesList";

// Mock services (replace with actual ../../constants/services)
const services = ["Electrician", "Plumber", "Carpenter"];

const Bookmarks = () => {
  const { userData, language, dark } = useSelector((state: any) => state.user);
  const router = useRouter();
  const [service, setService] = useState<string>("Electrician");
  const [myBookmarkList, setMyBookmarkList] = useState<any[]>([]);
  const [skLoading, setSkLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  const [myBookmarks, { isSuccess, isError, error, data }] =
    useMyBookmarkMutation();

  const getBookmarks = useCallback(async () => {
    setSkLoading(true);
    try {
      const res: any = await myBookmarks({
        userId: userData?._id,
        take: 20,
        skip: 0,
      });
      console.log(res.data, "RESPONSE");
      if (res?.data?.bookmarks) {
        setMyBookmarkList(res?.data?.bookmarks);
      } else {
        toast.error(
          language ? "बुकमार्क लाने में विफल" : "Failed to fetch bookmarks",
          {
            position: "top-center",
          
          }
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(language ? "कुछ गलत हुआ" : "Something went wrong", {
        position: "top-center",
      
      });
    }
    setSkLoading(false);
  }, [userData?._id, myBookmarks, language]);

  useEffect(() => {
    if (isSuccess && data?.bookmarks) {
      setMyBookmarkList(data.bookmarks);
      setSkLoading(false);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      console.error(error);
      toast.error(
        language ? "बुकमार्क लाने में विफल" : "Failed to fetch bookmarks",
        {
          position: "top-center",
        
        }
      );
      setSkLoading(false);
    }
  }, [isError, error, language]);

  useEffect(() => {
    getBookmarks();
  }, [service, getBookmarks]);

  const onRefresh = () => {
    setRefreshing(true);
    getBookmarks();
    setRefreshing(false);
  };

  return (
    <div
      className={`min-h-screen ${
        dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } lg:p-8`}
    >
      {skLoading && <ActivityIndicator />}
      <div className="max-w-4xl mx-auto">
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
                  {language ? "प्रोफ़ाइल" : "My Bookmarks"}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                {/* Theme Toggle or other header actions can go here */}
              </div>
            </div>
          </div>
        </header>

        {/* Services List */}
        {/* <div className="overflow-x-auto whitespace-nowrap mb-6">
          {services.map((item, index) => (
            <ServicesList
              key={index}
              item={item}
              service={service}
              setService={setService}
              language={language}
            />
          ))}
        </div> */}

        {/* Bookmarks List */}
        {myBookmarkList.length > 0 ? (
          <div className="space-y-4">
            {myBookmarkList.map((item, index) => (
              <WorkerList
                key={index}
                item={item}
                contractors={myBookmarkList}
                setContractors={setMyBookmarkList}
                fromBookmark={true}
                // funct={getBookmarks}
              />
            ))}
          </div>
        ) : (
          <div>
            <h1>Not Found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
