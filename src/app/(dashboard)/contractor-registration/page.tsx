'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { services } from '@/constants/services';
import { units } from '@/constants/unit';
import { useBecomeContractorMutation, useContractorDetailsMutation } from '@/service/api/userApi';
import { setUser } from '@/service/slice/userSlice';
import PhoneWarning from '@/components/PhoneWarning';
import ActivityIndicator from '@/components/ActivityIndicator';

const WorkDetailsInput = () => {
  const { userData, language, dark } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [service, setService] = useState(userData?.service || '');
  const [unit, setUnit] = useState(userData?.unit || '');
  const [contractorDetails, setContractorDetails] = useState<any>(null);
  const [price, setPrice] = useState(userData?.price || '');
  const [isLoading, setIsLoading] = useState(false);
  const [about, setAbout] = useState(userData?.bio || '');
  const [selectedSubServices, setSelectedSubServices] = useState<string[]>(userData?.subService || []);
  const [phoneModal, setPhoneModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [becomeContractor] = useBecomeContractorMutation();
  const [getContractorDetails, { isSuccess: detailsIsSuccess, data: contractorDetailsData }] =
    useContractorDetailsMutation();

  const subServices = services.find((s) => s.english === service)?.subservices || [];

  const toggleSubService = (subService: string) => {
    setSelectedSubServices((prev) =>
      prev.includes(subService) ? prev.filter((s) => s !== subService) : [...prev, subService]
    );
  };

  const removeSubService = (subService: string) => {
    setSelectedSubServices((prev) => prev.filter((s) => s !== subService));
  };

  const registerContractor = async () => {
    if (!userData.phone) {
      setPhoneModal(true);
      return;
    }
    if (!service || !price || !unit || selectedSubServices.length === 0) {
      toast.error('All fields are required', { position: 'top-right', autoClose: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append('service', service);
    formData.append('subServices', JSON.stringify(selectedSubServices));
    formData.append('price', price);
    formData.append('unit', unit);
    formData.append('about', about);

    setIsLoading(true);
    try {
      const res: any = await becomeContractor({ data: formData, id: userData._id });
      if (res.data) {
        dispatch(setUser(res.data.user));
        router.replace(`/contractor-details/${res.data.user._id}`);
        toast.success('Registration successful', { position: 'top-right', autoClose: 3000 });
      } else {
        toast.error(res.error?.data?.message || 'Registration failed', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong', { position: 'top-right', autoClose: 3000 });
    }
    setIsLoading(false);
  };

  const getDetails = async () => {
    if (userData.isContractor) {
      try {
        const res: any = await getContractorDetails({ id: userData._id });
        if (res.data) {
          setContractorDetails(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (detailsIsSuccess && contractorDetailsData) {
      setContractorDetails(contractorDetailsData);
      setPrice(contractorDetailsData?.price || '');
      setSelectedSubServices(contractorDetailsData?.subServices || []);
    }
  }, [detailsIsSuccess, contractorDetailsData]);

  return (
    <div className={`min-h-screen ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-4 sm:p-6 lg:p-8`}>
      {isLoading && <ActivityIndicator />}
      {phoneModal && <PhoneWarning setModal={setPhoneModal} />}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 max-w-md w-full ${dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-lg font-[Poppins-Medium] text-center mb-4">
              {language ? 'उप-सेवाएँ चुनें' : 'Select Sub-Services'}
            </h2>
            <div className="max-h-96 overflow-y-auto">
              {subServices.map((item) => (
                <button
                  key={item.english}
                  onClick={() => toggleSubService(item.english)}
                  className={`w-full p-3 border-b border-gray-200 dark:border-gray-700 text-left ${
                    selectedSubServices.includes(item.english) ? 'bg-purple-100 dark:bg-purple-900' : ''
                  }`}
                >
                  <span className="text-base">{language ? item.hindi : item.english}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setModalVisible(false)}
                className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg"
              >
                {language ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={() => setModalVisible(false)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg"
              >
                {language ? 'पुष्टि करें' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-xl sm:text-2xl font-font-semibold text-purple-700">
            {language ? 'ठेकेदार पंजीकरण' : 'Contractor Registration'}
          </h1>
          <p className="text-sm text-gray-500 font-font-regular mt-2">
            {language
              ? 'अपनी पहुंच बढ़ाने, ग्राहकों को आसानी से प्रबंधित करने और अपने व्यवसाय को सहजता से बढ़ाने के लिए एक सेवा प्रदाता के रूप में हमसे जुड़ें।'
              : 'Join us as a service provider to expand your reach, manage clients easily, and grow your business effortlessly.'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
          <select
            value={service}
            onChange={(e) => {
              setService(e.target.value);
              setSelectedSubServices([]);
            }}
            className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 ${
              dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-purple-600`}
          >
            <option value="">{userData.isContractor ? contractorDetails?.service : 'Select Service'}</option>
            {services.map((item, index) => (
              <option key={index} value={item.english}>
                {language ? item.hindi : item.english}
              </option>
            ))}
          </select>

          {service && (
            <>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSubServices.map((subService) => (
                  <div
                    key={subService}
                    className="flex items-center bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm mr-2">
                      {language
                        ? subServices.find((s) => s.english === subService)?.hindi
                        : subService}
                    </span>
                    <button onClick={() => removeSubService(subService)}>
                      <FaTimes className="text-purple-600" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setModalVisible(true)}
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg mb-4"
              >
                {language ? 'उप-सेवाएँ चुनें' : 'Select Sub-Services'}
              </button>
            </>
          )}

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 ${
              dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-purple-600`}
          />

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 ${
              dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-purple-600`}
          >
            <option value="">{userData.isContractor ? contractorDetails?.unit : 'Select Unit'}</option>
            {units.map((item, index) => (
              <option key={index} value={item.english}>
                {language ? item.hindi : item.english}
              </option>
            ))}
          </select>

          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder={userData.isContractor ? contractorDetails?.about : 'About'}
            rows={4}
            className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 ${
              dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-purple-600`}
          />

          <button
            onClick={registerContractor}
            className="w-full bg-purple-600 text-white py-3 rounded-full font-medium text-lg tracking-wider"
          >
            {language ? 'जारी रखें' : 'Continue'}
          </button>

          {userData.isContractor && (
            <button
              onClick={() => router.push(`/contractor-details/${userData._id}`)}
              className="w-full bg-purple-600 text-white py-3 rounded-full mt-2 font-medium text-lg tracking-wider"
            >
              {language ? 'प्रोफाइल देखें' : 'View Profile'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkDetailsInput;