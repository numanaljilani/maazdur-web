'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { setUser, setToken } from '@/service/slice/userSlice';
import { useLoginMutation, useGoogleAuthMutation } from '@/service/api/userApi';
import InputText from '@/components/InputText';
import Button from '@/components/Button';
import ActivityIndicator from '@/components/ActivityIndicator';
import Link from 'next/link';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import { GoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

// Placeholder icons
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
  const [googleAuth, { data: googleData, isSuccess: googleSuccess, error: googleError, isError: googleIsError }] = useGoogleAuthMutation();

  const securePass = () => setSecure(!secure);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error(language ? 'ईमेल और पासवर्ड प्रदान करना होगा।' : 'Email and Password must be provided.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
    try {
      setLoading(true);
      await login({ email: email.trim(), password });
    } catch (err) {
      console.error(err);
      toast.error(language ? 'कुछ गलत हुआ।' : 'Something went wrong.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      const response: any = await googleAuth({ token: credentialResponse.credential });
      console.log(response)
      if (response.data) {
        dispatch(setUser(response.data.user));
        dispatch(setToken(response.data.accessToken));
        localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 3000,
        });
        if (response.data.isNewUser) {
          // router.push(`/complete-profile?email=${encodeURIComponent(response.data.user.email)}`);
         router.push('/home');
        } else {
          router.push('/home');
        }
      } else {
        toast.error(language ? 'Google लॉगिन विफल हुआ।' : 'Google login failed.', {
          position: 'top-right',
          autoClose: 3000,
        });
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(language ? 'Google प्रमाणीकरण में कुछ गलत हुआ।' : 'Something went wrong with Google authentication.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error(language ? 'Google लॉगिन विफल हुआ।' : 'Google login failed.', {
      position: 'top-right',
      autoClose: 3000,
    });
    setLoading(false);
  };

  useEffect(() => {
    
    if (isSuccess && data) {
      dispatch(setUser(data.user));
      dispatch(setToken(data.accessToken));
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      router.push('/home');
      toast.success(data.message || (language ? 'लॉगिन सफल' : 'Login successful'), {
        position: 'top-right',
        autoClose: 3000,
      });
      setLoading(false);
    }
  }, [isSuccess, data, dispatch, router, language]);

  useEffect(() => {
    if (isError && error) {
      toast.error((error as any)?.data?.message || (language ? 'अमान्य ईमेल या पासवर्ड' : 'Invalid email or password'), {
        position: 'top-right',
        autoClose: 3000,
      });
      setLoading(false);
    }
  }, [isError, error, language]);

  useEffect(() => {
    if (googleSuccess && googleData) {
      setLoading(false);
    }
  }, [googleSuccess, googleData]);

  useEffect(() => {
    if (googleIsError && googleError) {
      toast.error((googleError as any)?.data?.message || (language ? 'Google प्रमाणीकरण विफल हुआ।' : 'Google authentication failed.'), {
        position: 'top-right',
        autoClose: 3000,
      });
      setLoading(false);
    }
  }, [googleIsError, googleError, language]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center px-8 ${
        dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h1
        className={`font-medium text-6xl leading-relaxed text-center text-purple-600`}
      >
        {language ? 'मजदूर' : 'Mazdur'}
      </h1>
      <h2
        className={`font-medium text-4xl leading-relaxed mb-3 text-center ${
          dark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {language ? 'अपने अकाउंट में लॉग इन करें' : 'Login to your account'}
      </h2>
      <div className="w-full space-y-4 max-w-md mx-auto">
        <InputText
          label={language ? 'ईमेल' : 'Email'}
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
        <div className="mt-4  flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            text="signin_with"
            width="100%"
          />
        </div>
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
            {language ? 'नियम और शर्तें' : 'Terms and conditions'}
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
      <div className="mt-8 text-center">
        <Link href="/home">
          <span className="text-gray-500 font-medium">
            <span className="text-purple-600 tracking-wider font-medium">
              {language ? 'अतिथि के रूप में जारी रखें' : 'Continue as guest'}
            </span>
          </span>
        </Link>
      </div>
      {loading && <ActivityIndicator />}
      <PWAInstallPrompt />
    </div>
  );
};

export default LoginPage;