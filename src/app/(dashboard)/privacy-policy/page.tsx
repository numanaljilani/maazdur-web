'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

const PrivacyPolicy = () => {
  const { language, dark } = useSelector((state: any) => state.user);
  const router = useRouter();

  // Translated content for Hindi
  const content = {
    title: language ? 'गोपनीयता नीति' : 'Privacy Policy',
    sections: [
      {
        heading: language ? '1. हम जो जानकारी एकत्र करते हैं' : '1. Information We Collect',
        text: language
          ? 'हम केवल वही व्यक्तिगत जानकारी एकत्र करते हैं जो आप स्वेच्छा से प्रदान करते हैं, जैसे आपका नाम, फोन नंबर, और प्रोफाइल फोटो। इसमें संपर्क विवरण शामिल हो सकते हैं यदि आप सेवा प्रदाता के रूप में पंजीकरण करना चुनते हैं।'
          : 'We only collect personal information that you voluntarily provide, such as your name, phone number, and profile photo. This may include contact details if you choose to register as a service provider.',
      },
      {
        heading: language ? '2. हम आपकी जानकारी का उपयोग कैसे करते हैं' : '2. How We Use Your Information',
        text: language
          ? 'हम आपकी जानकारी का उपयोग ऐप को संचालित करने और सुधारने, व्यक्तिगत सेवाएं प्रदान करने, उपयोगकर्ता-से-प्रदाता संचार को सक्षम करने, और समर्थन या कानूनी अनुपालन के लिए करते हैं। हम आपकी सहमति से सेवा-संबंधी संचार भी भेज सकते हैं।'
          : 'We use your information to operate and improve the App, provide personalized services, enable user-to-provider communication, and for support or legal compliance. We may also use it to send you service-related communications (with your consent).',
      },
      {
        heading: language ? '3. आपकी जानकारी का प्रकटीकरण' : '3. Disclosure of Your Information',
        text: language
          ? 'हम आपकी जानकारी को विश्वसनीय सेवा प्रदाताओं (गोपनीयता समझौतों के साथ), कानूनी कारणों (अदालती आदेश), या व्यवसाय हस्तांतरण (विलय, अधिग्रहण) के लिए प्रकट कर सकते हैं।'
          : 'We may disclose your information to trusted service providers (confidentiality agreements), for legal reasons (court orders), or during business transfers (mergers, acquisitions).',
      },
      {
        heading: language ? '4. डेटा प्रतिधारण' : '4. Data Retention',
        text: language
          ? 'हम आपकी जानकारी को केवल उतने समय तक रखते हैं जितना इस नीति में उल्लिखित उद्देश्यों को पूरा करने के लिए आवश्यक है, या कानून द्वारा आवश्यक है। सुरक्षा, कानूनी, या ऑडिट उद्देश्यों के लिए डेटा को लंबे समय तक रखा जा सकता है।'
          : 'We retain your information only as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Data may be retained for longer for security, legal, or audit purposes.',
      },
      {
        heading: language ? '5. आपके अधिकार' : '5. Your Rights',
        text: language
          ? 'आपको अपने डेटा तक पहुंचने, उसे ठीक करने, या हटाने, और हम इसे कैसे संसाधित करते हैं इसे प्रतिबंधित करने या आपत्ति करने का अधिकार है। आप किसी भी समय विपणन संचार के लिए सहमति वापस ले सकते हैं।'
          : 'You have the right to access, correct, or delete your data, and to restrict or object to how we process it. You can also withdraw consent to marketing communications at any time.',
      },
      {
        heading: language ? '6. सुरक्षा' : '6. Security',
        text: language
          ? 'हम आपकी डेटा को अनधिकृत पहुंच या दुरुपयोग से बचाने के लिए उचित कदम उठाते हैं। हालांकि, कोई भी सिस्टम पूरी तरह से सुरक्षित नहीं है, और हम पूर्ण सुरक्षा की गारंटी नहीं दे सकते।'
          : 'We take reasonable steps to safeguard your data from unauthorized access or misuse. However, no system is completely secure, and we cannot guarantee absolute security.',
      },
      {
        heading: language ? '7. बच्चों की गोपनीयता' : '7. Children\'s Privacy',
        text: language
          ? 'मजदूर+ 14 वर्ष से कम उम्र के बच्चों के लिए नहीं है। हम जानबूझकर बच्चों से व्यक्तिगत डेटा एकत्र नहीं करते। यदि हमें ऐसी डेटा की जानकारी होती है, तो हम इसे तुरंत हटा देंगे।'
          : 'Mazdur+ is not intended for children under 14 years of age. We do not knowingly collect personal data from children. If we become aware of such data, we will delete it immediately.',
      },
      {
        heading: language ? '8. इस गोपनीयता नीति में परिवर्तन' : '8. Changes to this Privacy Policy',
        text: language
          ? 'हम इस नीति को समय-समय पर अपडेट कर सकते हैं। परिवर्तन ऐप के भीतर सूचित किए जाएंगे, और आपका निरंतर उपयोग संशोधित नीति की स्वीकृति माना जाएगा।'
          : 'We may update this policy from time to time. Changes will be communicated within the App, and your continued use will constitute acceptance of the revised policy.',
      },
      {
        heading: language ? '9. हमसे संपर्क करें' : '9. Contact Us',
        text: language
          ? 'यदि आपके पास इस गोपनीयता नीति के संबंध में प्रश्न या चिंताएं हैं, तो कृपया हमसे संपर्क करें: mazdur@gmail.com।'
          : 'If you have questions or concerns regarding this Privacy Policy, please contact us at: mazdur@gmail.com.',
      },
      {
        heading: language ? '10. अतिरिक्त जानकारी' : '10. Additional Information',
        text: language
          ? 'इस नीति का विस्तृत संस्करण अनुरोध पर या आपके ऐप की कानूनी सेटिंग्स में उपलब्ध है।'
          : 'A more detailed version of this policy is available upon request or in your app’s legal settings.',
      },
    ],
  };

  return (
    <div className={`min-h-screen ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-4 sm:p-6 lg:p-8`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-5 mb-6">
          <button onClick={() => router.back()} className="flex items-center">
            <FaArrowLeft size={24} className={`${dark ? 'text-white' : 'text-gray-900'}`} />
          </button>
          <h1 className={`text-xl sm:text-2xl font-[Poppins-Medium] ${dark ? 'text-white' : 'text-gray-900'}`}>
            {content.title}
          </h1>
        </div>

        {/* Content Sections */}
        {content.sections.map((section, index) => (
          <div key={index} className="py-2">
            <h2 className={`text-base sm:text-lg font-[Poppins-Medium] ${dark ? 'text-white' : 'text-gray-900'}`}>
              {section.heading}
            </h2>
            <p className={`text-sm sm:text-base font-[Poppins-Light] ${dark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
              {section.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;