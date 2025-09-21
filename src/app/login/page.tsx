'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { setUser, setToken } from '@/service/slice/userSlice'
import { useLoginMutation } from '@/service/api/userApi'; 
import InputText from '@/components/InputText'; 
import Button from '@/components/Button'; 
import ActivityIndicator from '@/components/ActivityIndicator';
import Link from 'next/link';

// Placeholder icons; replace with your actual icon paths
const icons = {
  email: '/mail.png',
  password: '/password.png',
  show: '/eye.png',
  hide: '/hide.png',
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { language, dark } = useSelector((state: any) => state.user);
  const [login, { data, isSuccess, error, isError }] = useLoginMutation();

  const securePass = () => setSecure(!secure);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Email and Password must be provided.', {
        // icon: '❌',
      });
      return;
    }
    try {
      setLoading(true);
      await login({ email: email.trim(), password });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
        console.log(data , "data")
      dispatch(setUser(data.user));
      dispatch(setToken(data.accessToken));
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      router.push('/home'); // Replace with your route (e.g., dashboard)
      toast.success(data.message || 'Login successful', {
        // icon: '✅',
      });
      setLoading(false);
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError && error) {
      // @ts-ignore
      toast.error(error?.data?.message || 'Invalid email or password', {
        // icon: '❌',
      });
      setLoading(false);
    }
  }, [isError, error]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center px-8 ${
        dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h1
        className={`font-medium text-6xl  leading-relaxed  text-center ${
          dark ? 'text-purple-600' : 'text-purple-600'
        }`}
      >
        {language ? 'अपने अकाउंट में लॉग इन करें' : 'Mazdur'}
      </h1>
      <h1
        className={`font-medium text-4xl leading-relaxed mb-3 text-center ${
          dark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {language ? 'अपने अकाउंट में लॉग इन करें' : 'Login to your account'}
      </h1>
      <h1
        className={`font-medium text-xl leading-relaxed mb-6 text-center ${
          dark ? 'text-white' : 'text-gray-900'
        }`}
      >
        अपने अकाउंट में लॉग इन करें
      </h1>
      <div className="w-full space-y-4 max-w-md mx-auto">
        <InputText
          label={language ? 'फ़ोन' : 'Email'}
          value={email}
          setData={setEmail}
          icon={icons.email}
        />
        <InputText
          label={language ? 'पासवर्ड' : 'Password'}
          value={password}
          setData={setPassword}
          icon={icons.password}
          secure
          right={secure ? icons.show : icons.hide}
          securePass={securePass}
          pass={!secure}
        />
        <Button
          onPressFunction={handleLogin}
          text={language ? 'लॉग इन करें' : 'Login'}
        />
        {/* <Link href="/forget-password" className="block text-center py-4">
          <span className="text-purple-600 font-medium tracking-wider">
            {language ? 'पासवर्ड भूल गए' : 'Forget the password ?'}
          </span>
        </Link> */}
        <Link
          href="/terms-and-conditions"
          className="flex justify-center items-center space-x-2"
        >
          <span className="text-gray-500 font-medium text-sm tracking-tight">
            {language ? 'या जारी रखें' : 'Terms and conditions'}
          </span>
        </Link>
      </div>
      <div className="mt-8 text-center">
        <Link href="/signup">
          <span className="text-gray-500 font-medium">
            {language ? 'कोई खाता नहीं है?' : "Don't have an account ?"}{' '}
            <span className="text-purple-600 tracking-wider font-medium">
              {language ? 'साइन अप करें' : 'Sign up'}
            </span>
          </span>
        </Link>
      </div>
      {loading && <ActivityIndicator />}
    </div>
  );
};

export default LoginPage;