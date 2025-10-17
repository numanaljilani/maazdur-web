'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaBookmark, FaStar, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useContractorDetailsMutation, useUploadPostMutation, useBookmarkMutation } from '@/service/api/userApi';
import ActivityIndicator from '@/components/ActivityIndicator';

const WorkDetails = ({  }: {  }) => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookmarked = searchParams.get('bookmarked') === 'true';
  const { userData, language, dark } = useSelector((state: any) => state.user);
  const [contractorDetails, setContractorDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookmark, setBookmark] = useState(bookmarked);
  const [rating, setRating] = useState(1);
  const [text, setText] = useState('');
  const [seeMore, setSeeMore] = useState(false);
  const [posts, setPosts] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [getContractorDetails, { data, isSuccess, isError, error }] = useContractorDetailsMutation();
  const [uploadPost] = useUploadPostMutation();
  const [addToBookmark] = useBookmarkMutation();

  const getDetails = async () => {
    setLoading(true);
    try {
      const res: any = await getContractorDetails({ id: params.id });
      if (res.data) {
        setContractorDetails(res.data);
      } else {
        toast.error(res.error?.data?.message || 'Failed to fetch contractor details', {
          position: 'top-center',
        
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong', { position: 'top-center',  });
    }
    setLoading(false);
  };

  const addToBookmarks = async () => {
    try {
      const res: any = await addToBookmark({
        contractorId: params.id,
        isBookmark: !bookmark,
      });
      if (res.data) {
        setBookmark(!bookmark);
        toast.success('Successfully updated bookmark', {
          position: 'top-center',
        
        });
      } else {
        toast.error(res.error?.data?.message || 'Failed to update bookmark', {
          position: 'top-center',
        
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong', { position: 'top-center',  });
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('userId', userData._id);
    formData.append('file', file);

    try {
      const res: any = await uploadPost({ body: formData, token: userData.accessToken });
      if (res.data) {
        toast.success('Image uploaded successfully', {
          position: 'top-center',
        
        });
      } else {
        toast.error(res.error?.data?.message || 'Failed to upload image', {
          position: 'top-center',
        
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong', { position: 'top-center',  });
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${contractorDetails?.phone}`;
  };

  useEffect(() => {
    getDetails();
  }, []);

  const ReadMoreText: React.FC<{ children: string; maxChars: number }> = ({ children, maxChars }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const truncatedText = children.length > maxChars ? children.slice(0, maxChars) + '...' : children;

    return (
      <div>
        <p className={`${dark ? 'text-white' : 'text-gray-900'} text-sm md:text-base`}>
          {isExpanded ? children : truncatedText}
        </p>
        {children.length > maxChars && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-blue-500 text-sm mt-1 hover:text-blue-600 transition-colors"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>
    );
  };

  const ButtonGroup: React.FC<{ values: string[]; isPressed: string | null; handlePress: (value: string) => void }> = ({
    values,
    isPressed,
    handlePress,
  }) => {
    return (
      <div className="flex space-x-2 overflow-x-auto py-2 scrollbar-hide">
        {values.map((value, index) => (
          <button
            key={index}
            onClick={() => handlePress(value)}
            className={`px-3 py-2 rounded-full border-2 border-purple-600 text-xs sm:text-sm font-medium whitespace-nowrap min-w-max ${
              isPressed === value 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-purple-600  '
            } transition-colors duration-200`}
          >
            {value}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen relative pb-25 ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} relative pb-20`}>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ActivityIndicator />
        </div>
      ) : (
        <>
          {/* Back Button */}
         

          {/* Image Carousel */}
          <div className="relative w-full h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
            <div className="flex w-full h-full items-center justify-center">
              <img
                src={
                  contractorDetails?.image 
                    ? contractorDetails.image 
                    : '/icons/icon-512x512.png'
                }
                alt="contractor"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/icons/icon-512x512.png';
                }}
              />
            </div>
          </div>

          {/* Contractor Info */}
          <div className="mt-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <h1 className={`text-xl xs:text-2xl sm:text-3xl font-semibold truncate ${dark ? 'text-white' : 'text-gray-900'}`}>
                  {contractorDetails?.service || '-'}
                </h1>
                <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 mt-1">
                  <p className="text-purple-600 text-base font-semibold truncate">{contractorDetails?.fullname || '-'}</p>
                  <div className="flex items-center gap-2">
                    <img
                      src="/star.png"
                      alt="star"
                      width={20}
                      height={20}
                      className={`${dark ? 'filter invert' : ''}`}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <p className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {contractorDetails?.rating || 5} ({contractorDetails?.rewies || 0} reviews)
                    </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={addToBookmarks}
                className="flex-shrink-0 p-2 hover:bg-gray-100  rounded-full transition-colors"
              >
                <FaBookmark
                  size={28}
                  className={bookmark ? 'text-purple-600' : 'text-gray-400'}
                />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              <span className="bg-purple-100 text-purple-600 text-xs font-medium px-3 py-1.5 rounded-lg w-fit">
                {contractorDetails?.service || ''}
              </span>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt size={18} className="text-purple-600 flex-shrink-0" />
                <p className={`text-xs ${dark ? 'text-gray-300' : 'text-gray-600'} truncate`}>
                  {contractorDetails?.address || '-'}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 mt-3">
              <div className="flex items-center gap-2">
                <p className="text-purple-600 text-2xl sm:text-3xl font-semibold">₹ {contractorDetails?.price || ''}</p>
                <p className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>({contractorDetails?.unit || ''})</p>
              </div>
            </div>
            <div className="border-b border-gray-300  my-4" />
          </div>

          {/* About */}
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className={`text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'} mb-3`}>About me</h2>
            <ReadMoreText maxChars={120}>{contractorDetails?.about || ''}</ReadMoreText>
          </div>

          {/* Photos & Videos */}
          <div className="px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className={`text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>Photos & Videos</h2>
              {posts.length > 0 && (
                <Link 
                  href={`/dashboard/more-posts?contractorId=${params.id}`} 
                  className="text-purple-600 font-semibold text-sm hover:text-purple-700 transition-colors"
                >
                  See all
                </Link>
              )}
            </div>
            
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
              {posts.slice(0, 5).map((item: any, index: number) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-200 ">
                  <img
                    src={item.imageurl || '/placeholder-image.jpg'}
                    alt="post"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.jpg';
                    }}
                  />
                </div>
              ))}
            </div>
            
            {userData._id === params.id && (
              <div className="mt-4 flex justify-end">
                <label className="bg-gray-200  rounded-lg w-full xs:w-1/2 sm:w-1/3 md:w-1/4 py-8 flex justify-center items-center cursor-pointer hover:bg-gray-300  transition-colors">
                  <span className="text-4xl text-gray-400">+</span>
                  <input type="file" className="hidden" accept="image/*" onChange={uploadImage} />
                </label>
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="px-4 sm:px-6 lg:px-8 mt-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <img
                  src="/star.png"
                  alt="star"
                  width={28}
                  height={28}
                  className={`${dark ? 'filter invert' : ''}`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <h2 className={`text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
                  {contractorDetails?.rating || 5} ({contractorDetails?.rewies || 0} reviews)
                </h2>
              </div>
              {reviewsData.length > 0 && (
                <Link 
                  href={`/dashboard/reviews?contractorId=${params.id}`} 
                  className="text-purple-600 font-semibold text-sm hover:text-purple-700 transition-colors"
                >
                  See all
                </Link>
              )}
            </div>

            {searchParams.get('canPost') === 'true' && (
              <div className="border border-gray-300  p-4 rounded-2xl sm:rounded-3xl mt-4 mb-6">
                <div className="flex gap-1 sm:gap-2 justify-center sm:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <FaStar 
                        size={22} 
                        className={rating >= star ? 'text-purple-600' : 'text-gray-400'} 
                      />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Post your comment"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={`w-full mt-4 p-3 rounded-lg text-sm sm:text-base ${
                    dark 
                      ? 'bg-gray-700 text-white placeholder-gray-400' 
                      : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors`}
                />
                <div className="flex justify-end mt-3">
                  <button
                    // onClick={postReview}
                    className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {reviewsData.map((item: any, index: number) => (
                <div key={index} className="pb-4 border-b border-gray-200  last:border-b-0">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-300  rounded-full overflow-hidden">
                        <img
                          src={item?.user?.image || '/avatar.png'}
                          alt="user"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/avatar.png';
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`${dark ? 'text-white' : 'text-gray-900'} text-sm font-medium truncate`}>
                          {item?.user?.fullname || 'Anonymous'}
                        </p>
                        <p className={`${dark ? 'text-gray-300' : 'text-gray-600'} text-xs mt-1`}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="border border-purple-600 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {reviewsData.length > 0 && (
              <div className="border-b border-gray-300  my-6" />
            )}
          </div>

          {/* Call Button - Fixed Bottom */}
          <div className="fixed bottom-15 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent ">
            <div className="max-w-4xl mx-auto">
              <button
                onClick={handleCall}
                className="w-full flex items-center justify-center bg-white border-2 border-purple-600 text-purple-600 py-4 px-6 rounded-2xl hover:bg-purple-50   transition-colors duration-200 shadow-lg"
              >
                <div className="flex items-center justify-center gap-3">
                  <FaPhone size={20} className="text-purple-600" />
                  <span className="text-lg font-semibold">Call Now</span>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkDetails;