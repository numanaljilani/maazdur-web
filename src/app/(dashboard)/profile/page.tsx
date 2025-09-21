'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaArrowLeft, FaEdit, FaUser, FaSignature, FaEnvelope, FaPhone, FaMapMarkerAlt, FaStar, FaBriefcase } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ActivityIndicator from '@/components/ActivityIndicator';
import { useMeMutation } from '@/service/api/userApi';
import { setUser } from '@/service/slice/userSlice';

const Profile = () => {
  const { userData, language, dark } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [me] = useMeMutation();

  console.log(userData, "????")

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res: any = await me({});
      if (res.data) {
        dispatch(setUser(res.data.user));
      } else {
        toast.error('Failed to fetch user data', { position: 'top-right', autoClose: 3000 });
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong', { position: 'top-right', autoClose: 3000 });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
  }, []);

  return (
    <div className={`min-h-screen ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-4 sm:p-6 lg:p-8`}>
      {loading && <ActivityIndicator />}
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-5">
            <button onClick={() => router.push('/home')}>
              <FaArrowLeft size={24} className={`${dark ? 'text-white' : 'text-gray-900'}`} />
            </button>
            <h1 className={`text-xl sm:text-2xl font-[Poppins-SemiBold] ${dark ? 'text-white' : 'text-gray-900'}`}>
              {language ? 'मेरी प्रोफ़ाइल' : 'My Profile'}
            </h1>
          </div>
          <button
            onClick={() => router.push('/edit-profile')}
            className="flex items-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-full font-[Poppins-Regular] text-base"
          >
            <FaEdit size={16} />
            {language ? 'संपादित करें' : 'Edit'}
          </button>
        </div>

        {/* Profile Card */}
        <div className={`rounded-lg shadow-lg p-6 ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          {/* Profile Image */}
          <div className="relative w-36 h-36 mx-auto mb-6">
            <img
              src={userData?.image}
              alt="profile"
              width={144}
              height={144}
              className="w-full h-full rounded-full object-cover"
              style={{ filter: userData?.image ? 'none' : 'grayscale(100%)' }}
            />
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaUser className="text-purple-600" size={20} />
              <div>
                <p className={`text-sm font-[Poppins-Regular] ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language ? 'नाम' : 'Full Name'}
                </p>
                <p className="text-lg font-[Poppins-SemiBold]">{userData?.fullname || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaSignature className="text-purple-600" size={20} />
              <div>
                <p className={`text-sm font-[Poppins-Regular] ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language ? 'उपनाम' : 'Nickname'}
                </p>
                <p className="text-lg font-[Poppins-SemiBold]">{userData?.nikname || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-purple-600" size={20} />
              <div>
                <p className={`text-sm font-[Poppins-Regular] ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language ? 'ईमेल' : 'Email'}
                </p>
                <p className="text-lg font-[Poppins-SemiBold]">{userData?.email || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaPhone className="text-purple-600" size={20} />
              <div>
                <p className={`text-sm font-[Poppins-Regular] ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language ? 'फ़ोन' : 'Phone'}
                </p>
                <p className="text-lg font-[Poppins-SemiBold]">{userData?.phone || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-purple-600" size={20} />
              <div>
                <p className={`text-sm font-[Poppins-Regular] ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language ? 'पता' : 'Address'}
                </p>
                <p className="text-lg font-[Poppins-SemiBold]">{userData?.address || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaStar className="text-purple-600" size={20} />
              <div>
                <p className={`text-sm font-[Poppins-Regular] ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language ? 'रेटिंग' : 'Rating'}
                </p>
                <p className="text-lg font-[Poppins-SemiBold]">{userData?.rating || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaBriefcase className="text-purple-600" size={20} />
              <div>
                <p className={`text-sm font-[Poppins-Regular] ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language ? 'ठेकेदार स्थिति' : 'Contractor Status'}
                </p>
                <p className="text-lg font-[Poppins-SemiBold]">
                  {userData?.isContractor ? (language ? 'ठेकेदार' : 'Contractor') : (language ? 'नहीं' : 'Not a Contractor')}
                </p>
              </div>
            </div>
          </div>

          {/* Contractor Button (if not a contractor) */}
          {!userData?.isContractor && (
            <div className="mt-6">
              <button
                onClick={() => router.push('/contractor-registration')}
                className="w-full bg-purple-600 text-white py-3 rounded-full font-[Poppins-Regular] text-lg tracking-wider"
              >
                {language ? 'ठेकेदार बनें' : 'Become a Contractor'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;