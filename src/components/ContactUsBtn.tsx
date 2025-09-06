import { JSX } from 'react';
import { FaHeadset, FaEnvelope, FaWhatsapp, FaGlobe } from 'react-icons/fa';
import { useSelector } from 'react-redux';

interface ContactUsBtnProps {
  text: string;
  subText?: string;
  icon: string;
  onPress?: () => void;
}

const ContactUsBtn: React.FC<ContactUsBtnProps> = ({ text, subText, icon, onPress }) => {
  const { dark, language } = useSelector((state: any) => state.user);

  const iconMap: { [key: string]: JSX.Element } = {
    headset: <FaHeadset size={24} className="text-purple-600" />,
    mail: <FaEnvelope size={24} className="text-purple-600" />,
    'logo-whatsapp': <FaWhatsapp size={24} className="text-purple-600" />,
    'planet-outline': <FaGlobe size={24} className="text-purple-600" />,
  };

  // Translated text for Hindi
  const translatedText = language
    ? {
        'Customer Service': 'ग्राहक सेवा',
        'Mail': 'मेल',
        'WhatsApp': 'व्हाट्सएप',
        'Website': 'वेबसाइट',
      }[text] || text
    : text;

  return (
    <button
      onClick={onPress}
      className={`flex items-center gap-3 p-3 rounded-lg my-2 ${
        dark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
      } hover:bg-purple-100 dark:hover:bg-purple-900 transition`}
      disabled={!onPress}
    >
      {iconMap[icon] || <FaHeadset size={24} className="text-purple-600" />}
      <div className="flex-1 text-left">
        <p className={`text-base font-[Poppins-Medium] ${dark ? 'text-white' : 'text-gray-900'}`}>
          {translatedText}
        </p>
        {subText && (
          <p className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{subText}</p>
        )}
      </div>
    </button>
  );
};

export default ContactUsBtn;