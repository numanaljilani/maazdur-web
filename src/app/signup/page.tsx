'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/Button';
import ActivityIndicator from '@/components/ActivityIndicator';
import Link from 'next/link';
import Image from 'next/image';
import { useIsAvailableMutation } from '@/service/api/userApi'; 

// Placeholder icons; replace with your actual icon paths
const icons = {
  email: '/mail.png',
  password: '/password.png',
  show: '/show.png',
  hide: '/hide.png',
};

// Zod schema for form validation
const signupSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email')
    .refine((val) => val.endsWith('@gmail.com'), {
      message: 'Email must be a Gmail address',
    }),
  password: z.string().nonempty('Password is required'),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const [secure, setSecure] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { language, dark } = useSelector((state: any) => state.user);
  const [isEmailAvailable, { data, isSuccess, error, isError }] =
    useIsAvailableMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const securePass = () => setSecure(!secure);

  const onSubmit = async (formData: SignupFormData) => {
    try {
      setLoading(true);
      const response: any = await isEmailAvailable({ email: formData.email.trim() });
      if (response.data?.success) {
        router.push(
          `/complete-profile?email=${encodeURIComponent(formData.email.trim())}&password=${encodeURIComponent(formData.password)}`
        );
      } else {
        toast.error(response.error?.data?.message || 'Something went wrong.', {
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
    if (isSuccess && data?.success) {
      toast.success('Email is available, proceed to complete your profile.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setLoading(false);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      // @ts-ignore
      toast.error(error?.data?.message || 'Email is already taken.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setLoading(false);
    }
  }, [isError, error]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center px-4 sm:px-8 ${
        dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h1
        className={`font-medium text-4xl sm:text-6xl leading-relaxed text-center text-purple-600`}
      >
        {language ? 'मजदूर' : 'Mazdur'}
      </h1>
      <h2
        className={`font-semibold text-3xl sm:text-4xl leading-relaxed text-center mt-2 ${
          dark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {language ? 'अपना खाता बनाएं' : 'Create your Account'}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 max-w-md mx-auto mt-4"
      >
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
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="text-gray-500 font-medium">
            {language ? 'पासवर्ड' : 'Password'}
          </label>
          <div className="relative">
            <Image
              src={icons.password}
              alt="password icon"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type={secure ? 'password' : 'text'}
              {...register('password')}
              className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={language ? 'पासवर्ड' : 'Password'}
            />
            <button
              type="button"
              onClick={securePass}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Image
                src={secure ? icons.show : icons.hide}
                alt="toggle visibility"
                width={20}
                height={20}
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <Button
          onPressFunction={handleSubmit(onSubmit)}
          text={language ? 'साइन अप करें' : 'Sign up'}
        />
      </form>
      <div className="mt-8 text-center">
        <Link href="/login">
          <span className="text-gray-500 font-medium">
            {language ? 'पहले से एक खाता मौजूद है?' : 'Already have an account ?'}{' '}
            <span className="text-purple-600 tracking-wider font-medium">
              {language ? 'साइन इन करें' : 'Sign in'}
            </span>
          </span>
        </Link>
      </div>
      {loading && <ActivityIndicator />}
    </div>
  );
};

export default SignupPage;