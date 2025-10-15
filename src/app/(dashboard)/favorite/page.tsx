"use client";

import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft, FaSearch, FaSync } from "react-icons/fa";
import { toast } from "react-toastify";
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
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(language ? "कुछ गलत हुआ" : "Something went wrong", {
        position: "top-right",
        autoClose: 3000,
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
          position: "top-right",
          autoClose: 3000,
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
      } p-4 sm:p-6 lg:p-8`}
    >
      {skLoading && <ActivityIndicator />}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-5">
            
            <h1
              className={`text-xl sm:text-2xl font-semibold ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              {language ? "मेरे बुकमार्क" : "My Bookmarks"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* <button>
              <FaSearch size={24} className="text-purple-900" />
            </button> */}
            <button onClick={onRefresh} disabled={refreshing}>
              <FaSync
                size={24}
                className={`text-purple-900 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>

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
