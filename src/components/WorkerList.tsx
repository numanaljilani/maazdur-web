'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { FaPhone, FaStarHalfAlt } from 'react-icons/fa';
import { useBookmarkMutation } from '@/service/api/userApi';

interface WorkerListProps {
  item: any;
  contractors: any[];
  setContractors: any;
  fromBookmark?: boolean;
}

const WorkerList: React.FC<WorkerListProps> = ({ item, contractors, setContractors, fromBookmark }) => {
  const { userData, language, dark } = useSelector((state: any) => state.user);
  const [addToBookmark] = useBookmarkMutation();

  const addToBookmarks = async () => {
    try {
      const res: any = await addToBookmark({
        contractorId: item.id || item.contractorId,
        isBookmark: fromBookmark ? fromBookmark : item.isBookmark,
      });
      if (res.data) {
        const updatedContractors = contractors.map((data: any) =>
          (item.id || item.contractorId) === data.id
            ? { ...data, isBookmark: item.isBookmark ? false : true }
            : data
        );
        setContractors(updatedContractors);
        toast.success('Successfully added to bookmarks', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error(res.error?.data?.message || 'Failed to update bookmark', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${item?.phone}`;
  };

  return (
    <Link
      href={`/contractor-details/${fromBookmark ? item.contractorId : item._id}?bookmarked=${item?.isBookmark || false}`}
      className={`flex items-center p-3 my-2 rounded-3xl shadow-md ${
        dark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
      } hover:bg-purple-100 dark:hover:bg-purple-900 transition`}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden">
        {item?.image || item?.contractor?.image ? (
          <Image
            src={
              item?.image?.includes('googleusercontent') ||
              item?.contractor?.image?.includes('googleusercontent')
                ? item?.image || item?.contractor?.image
                : `${item?.image || item?.contractor?.image}`
            }
            alt="profile"
            width={48}
            height={48}
            className="w-full h-full object-cover"
            
          />
        ) : (
          <Image
            src="/user.png"
            alt="user"
            width={48}
            height={48}
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(100%)' }}
          />
        )}
      </div>
      <div className="flex-1 px-3 flex justify-between items-center">
        <div>
          <div className="flex justify-between items-center">
            <span className={`text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
              {item?.service || 'Electrician'}
            </span>
            {/* <button onClick={(e) => { e.preventDefault(); addToBookmarks(); }} className="ml-2">
              <Image
                src={fromBookmark || item?.isBookmark ? '/icons/bookmark.png' : '/icons/bookmark1.png'}
                alt="bookmark"
                width={28}
                height={28}
                className="text-purple-600"
              />
            </button> */}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <FaStarHalfAlt className="text-yellow-500" size={17} />
              <span className="text-gray-500 font-semibold text-sm">
                {item?.rating || item?.contractor?.rating || 5}
              </span>
            </div>
            <div className="border-l h-4" />
            <span className="text-gray-500 font-semibold text-sm">
              {(item?.rewies || item?.contractor?.rewies || 0)} + Reviews
            </span>
          </div>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); handleCall(); }}
          className="w-12 h-12 rounded-full bg-purple-600 flex justify-center items-center"
        >
          <FaPhone className="text-white" size={20} />
        </button>
      </div>
    </Link>
  );
};

export default WorkerList;