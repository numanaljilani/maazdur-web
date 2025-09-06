import { useSelector } from 'react-redux';
import Link from 'next/link';

interface PhoneWarningProps {
  setModal: (visible: boolean) => void;
}

const PhoneWarning: React.FC<PhoneWarningProps> = ({ setModal }) => {
  const { language, dark } = useSelector((state: any) => state.user);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-lg p-6 max-w-sm w-full ${dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-lg font-[Poppins-Medium] mb-4">
          {language ? 'फोन नंबर आवश्यक' : 'Phone Number Required'}
        </h2>
        <p className="text-sm mb-4">
          {language
            ? 'कृपया ठेकेदार के रूप में पंजीकरण करने के लिए अपनी प्रोफाइल में फोन नंबर जोड़ें।'
            : 'Please add a phone number to your profile to register as a contractor.'}
        </p>
        <div className="flex justify-between">
          <button
            onClick={() => setModal(false)}
            className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg"
          >
            {language ? 'रद्द करें' : 'Cancel'}
          </button>
          <Link
            href="/dashboard/profile"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setModal(false)}
          >
            {language ? 'प्रोफाइल अपडेट करें' : 'Update Profile'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PhoneWarning;