'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { FaArrowLeft, FaEdit, FaUser, FaSignature, FaEnvelope, FaCalendar, FaFlag, FaMapMarkerAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import ActivityIndicator from '@/components/ActivityIndicator';
import { useUpdateProfileMutation, useMeMutation } from '@/service/api/userApi';
import { setUser } from '@/service/slice/userSlice';

const UpdateProfile = () => {
  const { userData, language, dark } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dataFromScreenA = searchParams.get('data');
  const [name, setName] = useState(userData?.fullname || '');
  const [nikname, setNikname] = useState(userData?.nikname || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [address, setAddress] = useState(userData?.address || '');
  const [date, setDate] = useState(dayjs(userData?.dob || Date.now()));
  const [phone, setPhone] = useState(userData?.phone || '');
  const [profile, setProfile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [updateProfile, { isSuccess, isError, error }] = useUpdateProfileMutation();
  const [me] = useMeMutation();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile(file);
    }
  };

  const onChangeState = (value: any, field: string) => {
    console.log(value, field);
  };

  const completeProfile = async () => {
    setLoading(true);
    try {
      const inputFormData = new FormData();
      if (profile) {
        inputFormData.append('file', profile);
      }
      inputFormData.append('fullname', name);
      inputFormData.append('userId', userData._id);
      inputFormData.append('nikname', nikname);
      inputFormData.append('phone', phone);
      inputFormData.append('address', address);
      inputFormData.append('dob', date.format('YYYY-MM-DD'));

      const res: any = await updateProfile({ data: inputFormData });
      if (res.data) {
        dispatch(setUser(res.data.user));
        toast.success('Profile updated successfully', { position: 'top-center',  });
        router.back();
      } else {
        toast.error(res.error?.data?.message || 'Failed to update profile', {
          position: 'top-center',
        
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong', { position: 'top-center',  });
    }
    setLoading(false);
  };

  const getUpdatedData = async () => {
    try {
      const res: any = await me({});
      if (res.data) {
        dispatch(setUser(res.data.user));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/login');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error) {
      console.error(error);
      toast.error('Failed to update profile', { position: 'top-center',  });
    }
  }, [isError, error]);

  return (
    <div className={`min-h-screen ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-4 sm:p-6 lg:p-8`}>
      {loading && <ActivityIndicator />}
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-5 mb-6">
          <button onClick={() => router.back()}>
            <FaArrowLeft size={24} className={`${dark ? 'text-white' : 'text-gray-900'}`} />
          </button>
          <h1 className={`text-xl sm:text-2xl font-font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
            {language ? 'प्रोफ़ाइल पूर्ण करें' : 'Fill Your Profile'}
          </h1>
        </div>

        {/* Profile Image */}
        <div className="relative w-36 h-36 mx-auto">
          <label
            className="w-36 h-36 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer relative"
            onClick={() => document.getElementById('profile-upload')?.click()}
          >
            {profile ? (
              <Image
                src={URL.createObjectURL(profile)}
                alt="profile"
                width={144}
                height={144}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={userData?.profileImage ? `https://your-storage-url.com/${userData.profileImage}` : '/avatar.png'}
                alt="avatar"
                width={144}
                height={144}
                className="w-full h-full object-cover"
                style={{ filter: userData?.profileImage ? 'none' : 'grayscale(100%)' }}
              />
            )}
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </label>
          <div className="absolute bottom-1 right-1 bg-purple-600 rounded-xl p-2">
            <FaEdit className="text-white" size={16} />
          </div>
        </div>

        {/* Form */}
        <div className="mt-6 px-4">
          <div className="relative mb-4">
            <label className={`text-sm font-font-regular ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language ? 'नाम' : 'Full Name'}
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="p-3"><FaUser className="text-purple-600" /></div>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  onChangeState(e.target.value, 'fullname');
                }}
                placeholder={language ? 'नाम' : 'Full Name'}
                className={`flex-1 p-3 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
            </div>
          </div>

          <div className="relative mb-4">
            <label className={`text-sm font-font-regular ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language ? 'उपनाम' : 'Nickname'}
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="p-3"><FaSignature className="text-purple-600" /></div>
              <input
                type="text"
                value={nikname}
                onChange={(e) => {
                  setNikname(e.target.value);
                  onChangeState(e.target.value, 'nikname');
                }}
                placeholder={language ? 'उपनाम' : 'Nickname'}
                className={`flex-1 p-3 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
            </div>
          </div>

          <div className="relative mb-4">
            <label className={`text-sm font-font-regular ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language ? 'ईमेल' : 'Email'}
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="p-3"><FaEnvelope className="text-purple-600" /></div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value.trim());
                  onChangeState(e.target.value.trim(), 'email');
                }}
                placeholder={language ? 'ईमेल' : 'Email'}
                className={`flex-1 p-3 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
            </div>
          </div>

          <div className="relative mb-4">
            <label className={`text-sm font-font-regular ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language ? 'जन्म तिथि' : 'Date of Birth'}
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="p-3"><FaCalendar className="text-purple-600" /></div>
              <input
                type="date"
                value={date.format('YYYY-MM-DD')}
                onChange={(e) => {
                  setDate(dayjs(e.target.value));
                  onChangeState(e.target.value, 'dob');
                }}
                className={`flex-1 p-3 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
            </div>
          </div>

          <div className="relative mb-4">
            <label className={`text-sm font-font-regular ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language ? 'फ़ोन' : 'Phone'}
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="p-3"><FaFlag className="text-purple-600" /></div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  onChangeState(e.target.value, 'phone');
                }}
                placeholder={language ? 'फ़ोन' : 'Phone'}
                className={`flex-1 p-3 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
            </div>
          </div>

          <div className="relative mb-4">
            <label className={`text-sm font-font-regular ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language ? 'पता' : 'Address'}
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="p-3"><FaMapMarkerAlt className="text-purple-600" /></div>
              <textarea
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  onChangeState(e.target.value, 'address');
                }}
                placeholder={language ? 'पता' : 'Address'}
                rows={4}
                className={`flex-1 p-3 ${dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              onClick={() => router.push('/contractor-registration')}
              className="flex-1 bg-purple-600 text-white py-3 rounded-full font-font-regular text-lg tracking-wider"
            >
              {language ? 'ठेकेदार' : 'Contractor'}
            </button>
            <button
              onClick={completeProfile}
              className="flex-1 bg-purple-600 text-white py-3 rounded-full font-font-regular text-lg tracking-wider"
            >
              {language ? 'अद्यतन' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;