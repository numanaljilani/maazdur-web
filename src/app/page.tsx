'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { setLanguage, setToken, setUser } from '@/service/slice/userSlice';
import { useMeMutation } from '@/service/api/userApi';

const Splash = () => {
  const { language, dark } = useSelector((state: any) => state.user);
  const data2= useSelector((state: any) => state.user);
  console.log(data2)
  const dispatch = useDispatch();
  const router = useRouter();
  const [me, { isSuccess, isError, error, data }] = useMeMutation();

  const navigateToAuthorizedScreen = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const lang = localStorage.getItem('lang');
      const onboarding = localStorage.getItem('onboarding');

      if (lang) {
        dispatch(setLanguage(JSON.parse(lang)));
      }

      if (!token) {
        const checkOnboarding = onboarding ? JSON.parse(onboarding) : null;
        if (checkOnboarding && !checkOnboarding.onboarding) {
          router.replace('/login');
        } else {
          router.replace('/login');
        }
        return;
      }

      dispatch(setToken(JSON.parse(token)));
      await me({});
    } catch (error) {
      console.error('Splash screen error:', error);
      router.replace('/login');
    }
  };

  useEffect(() => {
    navigateToAuthorizedScreen();
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data.user));
      dispatch(setToken(data.accessToken));
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      router.replace('/home');
      toast.success(data.message || (language ? 'लॉगिन सफल' : 'Login successful'), {
        // description: language ? 'मजदूर ऐप में आपका स्वागत है।' : 'Welcome back to Mazdur app.',
        position: 'top-center',
      
      });
    }
  }, [isSuccess, data, dispatch, router, language]);

  useEffect(() => {
    if (isError && error) {
      console.error('Me mutation error:', error);
      router.replace('/login');
    }
  }, [isError, error, router]);

  return (
    <div className={`min-h-screen ${dark ? 'bg-gray-900' : 'bg-white'} flex flex-col items-center justify-center p-4`}>
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/icons/icon-512x512.png"
          alt="Mazdur Logo"
          width={80}
          height={80}
          className="w-20 h-20 object-contain"
        />
        <h1 className="text-4xl font-semibold text-purple-600 tracking-widest">
          Mazdur
        </h1>
      </div>
      <div className="absolute bottom-28">
        <div className="w-8 h-8 border-4 border-t-purple-600 rounded-full animate-spin" />
      </div>
      <div className="absolute bottom-5 text-center">
        <p className="text-xs text-gray-400 font-[Poppins-Regular]">
          © 2025 Shramik Katta Consulting Services Pvt Ltd. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Splash;