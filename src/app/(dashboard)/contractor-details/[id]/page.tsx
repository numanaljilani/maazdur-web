'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
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
//   const [getPosts] = useGetPostsMutation();
//   const [createPost] = useCreatePostMutation();
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

//   const getPostsData = async () => {
//     try {
//       const res: any = await getPosts({ contractorId: params.id, take: 20, skip: 0 });
//       if (res.data) {
//         setPosts(res.data.images || []);
//         setReviewsData(res.data.getPosts || []);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

  const addToBookmarks = async () => {
    try {
      const res: any = await addToBookmark({
        contractorId: params.id,
        isBookmark: !bookmark,
      });
      if (res.data) {
        setBookmark(!bookmark);
        toast.success('Successfully updated bookmark', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error(res.error?.data?.message || 'Failed to update bookmark', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong', { position: 'top-right', autoClose: 3000 });
    }
  };

//   const postReview = async () => {
//     try {
//       const res: any = await createPost({
//         contractorId: contractorDetails?.id,
//         rating: rating.toString(),
//         serviceId: '123444', // Replace with actual serviceId
//         text,
//       });
//       if (res.data) {
//         getPostsData();
//         setText('');
//         setRating(1);
//         toast.success('Review posted successfully', {
//           position: 'top-right',
//           autoClose: 3000,
//         });
//       } else {
//         toast.error(res.error?.data?.message || 'Failed to post review', {
//           position: 'top-right',
//           autoClose: 3000,
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Something went wrong', { position: 'top-right', autoClose: 3000 });
//     }
//   };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('userId', userData._id);
    formData.append('file', file);

    try {
      const res: any = await uploadPost({ body: formData, token: userData.accessToken });
      if (res.data) {
        // getPostsData();
        toast.success('Image uploaded successfully', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error(res.error?.data?.message || 'Failed to upload image', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong', { position: 'top-right', autoClose: 3000 });
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${contractorDetails?.phone}`;
  };

  useEffect(() => {
    getDetails();
    // getPostsData();
  }, []);

  const ReadMoreText: React.FC<{ children: string; maxChars: number }> = ({ children, maxChars }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const truncatedText = children.length > maxChars ? children.slice(0, maxChars) + '...' : children;

    return (
      <div>
        <p className={`${dark ? 'text-white' : 'text-gray-900'} text-sm`}>
          {isExpanded ? children : truncatedText}
        </p>
        {children.length > maxChars && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-500 text-sm">
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
      <div className="flex space-x-2 overflow-x-auto py-2">
        {values.map((value, index) => (
          <button
            key={index}
            onClick={() => handlePress(value)}
            className={`px-4 py-2 rounded-full border-2 border-purple-600 text-sm font-medium ${
              isPressed === value ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 dark:bg-gray-700 dark:text-white'
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={` ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} relative mb-10`}>
      {loading ? (
        <div>
        <ActivityIndicator />
        </div>
      ) : (
        <>
          {/* Back Button */}
          {/* <button onClick={() => router.back()} className="absolute top-4 left-4 z-10">
            <FaArrowLeft size={24} className={`${dark ? 'text-white' : 'text-gray-900'}`} />
          </button> */}

          {/* Image Carousel */}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
            <div className="flex h-[50vh] md:h-[80vh] w-full  items-center justify-center">
              <img
                src={
               'https://plus.unsplash.com/premium_photo-1664299941780-e8badc0b1617?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29uc3RydWN0aW9uJTIwd29ya2VyfGVufDB8fDB8fHww'} // Replace with your storage URL}
                alt="contractor"
                width={500}
                height={300}
                className="w-full h-full  rounded-2xl overflow-hidden object-cover"
                onError={() => console.error('Failed to load contractor image')}
              />
            </div>
          </div>

          {/* Contractor Info */}
          <div className="mt-4 px-4">
            <div className="flex justify-between items-center">
              <h1 className={`text-2xl sm:text-3xl font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
                {contractorDetails?.service || '-'}
              </h1>
              <button onClick={addToBookmarks}>
                <FaBookmark
                  size={30}
                  className={bookmark ? 'text-purple-600' : 'text-gray-400'}
                />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-purple-600 text-base font-semibold">{contractorDetails?.fullname || '-'}</p>
              <div className="flex items-center gap-2">
                <img
                  src="/star.png"
                  alt="star"
                  width={24}
                  height={24}
                  className={`${dark ? 'filter invert' : ''}`}
                  onError={() => console.error('Failed to load star icon')}
                />
                <p className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {contractorDetails?.rating || 5} ({contractorDetails?.rewies || 0} reviews)
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <span className="bg-purple-100 text-purple-600 text-xs font-medium px-2 py-1 rounded-lg">
                {contractorDetails?.service || ''}
              </span>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt size={20} className="text-purple-600" />
                <p className={`text-xs ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {contractorDetails?.address || '-'}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <p className="text-purple-600 text-2xl sm:text-3xl font-semibold">₹ {contractorDetails?.price || ''}</p>
                <p className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>({contractorDetails?.unit || ''})</p>
              </div>
            </div>
            <div className="border-b border-gray-300 dark:border-gray-600 my-4" />
          </div>

          {/* About */}
          <div className="px-4">
            <h2 className={`text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'} mb-2`}>About me</h2>
            <ReadMoreText maxChars={80}>{contractorDetails?.about || ''}</ReadMoreText>
          </div>

          {/* Photos & Videos */}
          <div className="px-4 mt-4">
            {/* <div className="flex justify-between items-center">
              <h2 className={`text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'} mb-2`}>Photos & Videos</h2>
              {posts.length > 0 && (
                <Link href={`/dashboard/more-posts?contractorId=${params.id}`} className="text-purple-600 font-semibold">
                  See all
                </Link>
              )}
            </div> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {posts.slice(0, 5).map((item: any, index: number) => (
                <img
                  key={index}
                  src={`https://your-storage-url.com/${item.imageurl}`} // Replace with your storage URL
                  alt="post"
                  width={150}
                  height={130}
                  className="rounded-lg object-contain"
                  onError={() => console.error('Failed to load post image')}
                />
              ))}
            </div>
            {userData._id === params.id && (
              <div className="mt-4 flex justify-end">
                <label className="bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 sm:w-1/4 py-8 flex justify-center items-center cursor-pointer">
                  <span className="text-4xl text-gray-400">+</span>
                  <input type="file" className="hidden" accept="image/*" onChange={uploadImage} />
                </label>
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="px-4 mt-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src="/star.png"
                  alt="star"
                  width={32}
                  height={32}
                  className={`${dark ? 'filter invert' : ''}`}
                  onError={() => console.error('Failed to load star icon')}
                />
                <h2 className={`text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
                  {contractorDetails?.rating || 5} ({contractorDetails?.rewies || 0} reviews)
                </h2>
              </div>
              {/* <Link href={`/dashboard/reviews?contractorId=${params.id}`} className="text-purple-600 font-semibold">
                See all
              </Link> */}
            </div>

            {searchParams.get('canPost') === 'true' && (
              <div className="border border-gray-400 dark:border-gray-600 p-4 rounded-3xl mt-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setRating(star)}>
                      <FaStar size={25} className={rating >= star ? 'text-purple-600' : 'text-gray-400'} />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Post your comment"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={`w-full mt-4 p-2 rounded-lg ${dark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
                />
                <button
                //   onClick={postReview}
                  className="bg-purple-600 text-white py-2 px-4 rounded-lg mt-3 self-end"
                >
                  Post
                </button>
              </div>
            )}

            <div className="mt-4">
              {reviewsData.map((item: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={item?.user?.image ? `https://your-storage-url.com/${item.user.image}` : '/avatar.png'}
                        alt="user"
                        width={32}
                        height={32}
                        className="rounded-full"
                        onError={() => console.error('Failed to load review user image')}
                      />
                      <p className={`${dark ? 'text-white' : 'text-gray-900'} text-sm`}>{item?.user?.fullname}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="border border-purple-600 text-purple-600 px-2 py-1 rounded-full text-xs">
                        {item.rating}
                      </button>
                    </div>
                  </div>
                  <p className={`${dark ? 'text-white' : 'text-gray-900'} text-sm mt-1`}>{item.text}</p>
                </div>
              ))}
            </div>
            <div className="border-b border-gray-300 dark:border-gray-600 my-4" />
          </div>

          {/* Call Button */}
          <div className="fixed bottom-4 left-4 text right-4 flex justify-center">
            <button
              onClick={handleCall}
              className="flex-1 flex items-center justify-center border bg-white border-purple-600 text-purple-600 py-3 rounded-full sm:w-1/2"
            >
              <img
                src="/phone.png"
                color='#9810fa'
                alt="phone"
                width={20}
                height={20}
                className={`${dark ? 'filter invert' : ''}`}
                onError={() => console.error('Failed to load phone icon')}
              />
              <span className="ml-2 text-base">Call</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkDetails;