'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import { setUser } from '@/service/slice/userSlice'; 
import { useCompleteProfileMutation } from '@/service/api/userApi'; 
import Button from '@/components/Button';
import ActivityIndicator from '@/components/ActivityIndicator';

// Placeholder icons; replace with your actual icon paths
const icons = {
  back: '/back.png',
  avatar: '/avatar.png',
  user: '/user.png',
  signature: '/signature.png',
  email: '/mail.png',
  calendar: '/calendar.png',
  india: '/india.png',
  location: '/location.png',
};

// Zod schema for form validation
const profileSchema = z.object({
  fullname: z.string().nonempty('Full name is required'),
  nikname: z.string().optional(),
  email: z.string().email('Invalid email').nonempty('Email is required'),
  phone: z.string().optional(),
  address: z.string().optional(),
  dob: z.date().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const CompleteProfilePage = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, dark } = useSelector((state: any) => state.user);
  const [completeProfile, { data, isSuccess, isError, error }] = useCompleteProfileMutation();

  const emailParam = searchParams.get('email') || '';
  const passwordParam = searchParams.get('password') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: emailParam,
      dob: new Date(),
    },
  });

  const dob = watch('dob');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (formData: ProfileFormData) => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      if (profileImage) {
        formDataToSend.append('file', profileImage);
      }
      formDataToSend.append('fullname', formData.fullname);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', passwordParam);
      if (formData.nikname) formDataToSend.append('nikname', formData.nikname);
      if (formData.phone) formDataToSend.append('phone', formData.phone);
      if (formData.address) formDataToSend.append('address', formData.address);
      if (formData.dob) {
        formDataToSend.append('dob', formData.dob.toISOString().split('T')[0]);
      }

      const response: any = await completeProfile({ body: formDataToSend });
      if (response.error) {
        toast.error(response.error.data?.error || 'Profile creation failed.', {
          position: 'top-right',
          autoClose: 3000,
        });
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data.user));
      router.push('/login');
      toast.success('User Created Successfully. Please login.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setLoading(false);
    }
  }, [isSuccess, data, dispatch, router]);

  useEffect(() => {
    if (isError && error) {
      // @ts-ignore
      toast.error(error?.data?.error || 'User creation failed. This user may already be registered.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setLoading(false);
    }
  }, [isError, error]);

  return (
    <div
      className={`min-h-screen py-3 ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
    >
      <div className="px-5 flex items-center justify-between my-3">
        <Link href="/signup">
          <Image src={icons.back} alt="back" width={32} height={32} />
        </Link>
        <h1
          className={`text-2xl font-semibold text-center ${
            dark ? 'text-white' : 'text-black'
          }`}
        >
          {language ? 'प्रोफ़ाइल पूर्ण करें' : 'Fill Your Profile'}
        </h1>
        <div className="w-8" /> {/* Spacer for alignment */}
      </div>

      <div className="relative w-36 h-36 mx-auto flex justify-center items-center">
        <label
          className="w-36 h-36 rounded-full bg-gray-50 my-3 flex justify-center items-center overflow-hidden cursor-pointer"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="profile"
              width={144}
              height={144}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={icons.avatar}
              alt="avatar"
              width={144}
              height={144}
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(100%)' }} // Mimic tintColor
            />
          )}
        </label>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 space-y-4 max-w-md mx-auto"
      >
        <div>
          <label className="text-gray-500 font-medium">
            {language ? 'नाम' : 'Full Name'}
          </label>
          <div className="relative">
            <Image
              src={icons.user}
              alt="user icon"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              {...register('fullname')}
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={language ? 'नाम' : 'Full Name'}
            />
          </div>
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>
          )}
        </div>

        <div>
          <label className="text-gray-500 font-medium">
            {language ? 'उपनाम' : 'Nickname'}
          </label>
          <div className="relative">
            <Image
              src={icons.signature}
              alt="signature icon"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              {...register('nikname')}
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={language ? 'उपनाम' : 'Nickname'}
            />
          </div>
          {errors.nikname && (
            <p className="text-red-500 text-sm mt-1">{errors.nikname.message}</p>
          )}
        </div>

        <div>
          <label className="text-gray-500 font-medium">
            {language ? 'ईमेल' : 'Email'}
          </label>
          <div className="relative">
            <Image
              src={icons.email}
              alt="email icon"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              {...register('email')}
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={language ? 'ईमेल' : 'Email'}
              disabled
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-gray-500 font-medium">
            {language ? 'जन्म की तारीख' : 'Date of Birth'}
          </label>
          <div
            className="relative flex items-center bg-gray-100 rounded-xl py-3 px-5 cursor-pointer"
            onClick={() => setCalendarOpen(true)}
          >
            <Image
              src={icons.calendar}
              alt="calendar icon"
              width={24}
              height={24}
              className="mr-4"
              style={{ filter: 'grayscale(100%)' }}
            />
            <DatePicker
              selected={dob}
              onChange={(date: Date) => setValue('dob', date)}
              dateFormat="dd/MM/yyyy"
              className="bg-transparent text-black font-semibold focus:outline-none"
              open={calendarOpen}
              onClickOutside={() => setCalendarOpen(false)}
              onSelect={() => setCalendarOpen(false)}
            />
          </div>
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
          )}
        </div>

        <div>
          <label className="text-gray-500 font-medium">
            {language ? 'फ़ोन' : 'Phone'}
          </label>
          <div className="relative">
            <Image
              src={icons.india}
              alt="india icon"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              {...register('phone')}
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={language ? 'फ़ोन' : 'Phone'}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="text-gray-500 font-medium">
            {language ? 'पता' : 'Address'}
          </label>
          <div className="relative">
            <Image
              src={icons.location}
              alt="location icon"
              width={20}
              height={20}
              className="absolute left-3 top-4"
            />
            <textarea
              {...register('address')}
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={language ? 'पता' : 'Address'}
              rows={4}
            />
          </div>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        <Button
          onPressFunction={handleSubmit(onSubmit)}
          text={language ? 'जारी रखें' : 'Continue'}
        />
      </form>
      {loading && <ActivityIndicator />}
    </div>
  );
};

export default CompleteProfilePage;