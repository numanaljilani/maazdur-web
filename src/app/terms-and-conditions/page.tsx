'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {icons} from '../../constants/icons';
import {
  bg_color2,
  secondary_text_color,
  text_color,
} from '../../constants/color';

const Privacy = () => {
  const router = useRouter();
  const { language, dark } = useSelector((state: any) => state?.user);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen">
      <div className={`${bg_color2(dark)} px-6 py-5`}>
        <div className="flex gap-x-5 items-center">
          <button 
            onClick={handleGoBack}
            className="flex items-center justify-center"
          >
            <Image
              src={icons.back}
              alt="Back"
              width={28}
              height={28}
              className={`${dark ? 'invert' : ''}`}
            />
          </button>
          <h1 className={`${text_color(dark)} text-xl font-[Poppins-Medium]`}>
            Privacy Policy
          </h1>
        </div>
        
        <div className="py-2">
          <h2 className={`${text_color(dark)} text-base font-[Poppins-Medium]`}>
            1. Information We Collect
          </h2>
          <p className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            <span className={`${secondary_text_color(dark)} text-base font-[Poppins-Regular]`}>
              Personal Information :
            </span>{' '}
            We only collect personal information that you voluntarily provide,
            such as your name, phone number, and profile photo. This may include
            contact details if you choose to register as a service provider.
          </p>
        </div>

        <div className="py-2">
          <h2 className={`${text_color(dark)} text-base font-[Poppins-Medium]`}>
            2. How We Use Your Information:
          </h2>
          <p className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            We use your information to operate and improve the App, provide
            personalized services, enable user-to-provider communication, and
            for support or legal compliance. We may also use it to send you
            service-related communications (with your consent).
          </p>
        </div>

        <div className="py-2">
          <h2 className={`${text_color(dark)} text-base font-[Poppins-Medium]`}>
            3. Disclosure of Your Information:
          </h2>
          <p className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            We may disclose your information to trusted service providers
            (confidentiality agreements), for legal reasons (court orders), or
            during business transfers (mergers, acquisitions).
          </p>
        </div>

        <div className="py-2">
          <h2 className={`${text_color(dark)} text-base font-[Poppins-Medium]`}>
            4. Data Retention:
          </h2>
          <p className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            We retain your information only as long as necessary to fulfill the
            purposes outlined in this policy, or as required by law. Data may be
            retained for longer for security, legal, or audit purposes.
          </p>
        </div>

        <div className="py-2">
          <h2 className={`${text_color(dark)} text-base font-[Poppins-Medium]`}>
            5. Your Rights:
          </h2>
          <p className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            You have the right to access, correct, or delete your data, and to
            restrict or object to how we process it. You can also withdraw
            consent to marketing communications at any time.
          </p>
        </div>

        <div className="py-2">
          <h2 className={`${text_color(dark)} text-base font-[Poppins-Medium]`}>
            6. Security
          </h2>
          <p className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            We take reasonable steps to safeguard your data from unauthorized
            access or misuse. However, no system is completely secure, and we
            cannot guarantee absolute security.
          </p>
        </div>

        <div className="py-2">
          <h2 className={`${text_color(dark)} text-base font-[Poppins-Medium]`}>
            7. Children's Privacy:
          </h2>
          <p className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            Mazdur+ is not intended for children under 14 years of age. We do
            not knowingly collect personal data from children. If we become
            aware of such data, we will delete it immediately.
          </p>
        </div>

        <div className="py-2">
          <h2 className={`${text_color(dark)} text-base font-[Poppins-Medium]`}>
            8. Changes to this Privacy Policy:
          </h2>
          <p className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            We may update this policy from time to time. Changes will be
            communicated within the App, and your continued use will constitute
            acceptance of the revised policy.
          </p>
        </div>

        <div className="py-2">
          <h2 className={`${text_color(dark)} text-base font-[Poppins-Medium]`}>
            9. Contact Us:
          </h2>
          <p className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            If you have questions or concerns regarding this Privacy Policy,
            please contact us at: mazdur@gmail.com.
          </p>
        </div>

        <div className="py-2">
          <h2 className={`${text_color(dark)} text-base font-[Poppins-Medium]`}>
            10. Additional Information:
          </h2>
          <p className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            A more detailed version of this policy is available upon request or
            in your app's legal settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;