'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { services } from '@/constants/services';
import { units } from '@/constants/unit';
import { useBecomeContractorMutation, useContractorDetailsMutation } from '@/service/api/userApi';
import { setUser } from '@/service/slice/userSlice';
import ActivityIndicator from '@/components/ActivityIndicator';

const WorkDetailsInput = () => {
  const { userData, language, dark } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [service, setService] = useState(userData?.service || '');
  const [phone, setPhone] = useState(userData?.phone || '');
  const [unit, setUnit] = useState(userData?.unit || '');
  const [contractorDetails, setContractorDetails] = useState<any>(null);
  const [price, setPrice] = useState(userData?.price || '');
  const [about, setAbout] = useState(userData?.bio || '');
  const [selectedSubServices, setSelectedSubServices] = useState<string[]>(userData?.subService || []);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!service) newErrors.service = language ? 'सेवा आवश्यक है' : 'Service is required';
    if (!phone) newErrors.phone = language ? 'फोन नंबर आवश्यक है' : 'Phone number is required';
    if (!price) newErrors.price = language ? 'मूल्य आवश्यक है' : 'Price is required';
    if (!unit) newErrors.unit = language ? 'इकाई आवश्यक है' : 'Unit is required';
    if (selectedSubServices.length === 0 && service)
      newErrors.subServices = language ? 'कम से कम एक उप-सेवा चुनें' : 'Select at least one sub-service';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerContractor = async () => {
    if (!validateForm()) {
      toast.error(language ? 'सभी फ़ील्ड आवश्यक हैं' : 'All fields are required', {
        position: 'top-center',
      });
      return;
    }

    const formData = new FormData();
    formData.append('service', service);
    formData.append('phone', phone);
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
        toast.success(language ? 'पंजीकरण सफल' : 'Registration successful', {
          position: 'top-center',
        });
      } else {
        toast.error(res.error?.data?.message || (language ? 'पंजीकरण विफल' : 'Registration failed'), {
          position: 'top-center',
        });
      }
    } catch (err) {
      console.error(err);
      toast.error(language ? 'कुछ गलत हुआ' : 'Something went wrong', {
        position: 'top-center',
      });
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
      setService(contractorDetailsData?.service || '');
      setPhone(contractorDetailsData?.phone || '');
      setPrice(contractorDetailsData?.price || '');
      setUnit(contractorDetailsData?.unit || '');
      setAbout(contractorDetailsData?.about || '');
      setSelectedSubServices(contractorDetailsData?.subServices || []);
    }
  }, [detailsIsSuccess, contractorDetailsData]);

  return (
    <div className={`min-h-screen ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-4 sm:p-6 lg:p-8`}>
      {isLoading && <ActivityIndicator />}
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-xl sm:text-2xl font-[Poppins-SemiBold] text-purple-700">
            {language ? 'ठेकेदार पंजीकरण' : 'Contractor Registration'}
          </h1>
          <p className="text-sm text-gray-500 font-[Poppins-Regular] mt-2">
            {language
              ? 'अपनी पहुंच बढ़ाने, ग्राहकों को आसानी से प्रबंधित करने और अपने व्यवसाय को सहजता से बढ़ाने के लिए एक सेवा प्रदाता के रूप में हमसे जुड़ें।'
              : 'Join us as a service provider to expand your reach, manage clients easily, and grow your business effortlessly.'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-500 font-[Poppins-Medium] mb-1">
              {language ? 'सेवा' : 'Service'}
            </label>
            <select
              value={service}
              onChange={(e) => {
                setService(e.target.value);
                setSelectedSubServices([]);
                setErrors((prev) => ({ ...prev, service: '' }));
              }}
              className={`w-full p-3 border rounded-lg ${
                dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                errors.service ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">{userData.isContractor ? contractorDetails?.service : language ? 'सेवा चुनें' : 'Select Service'}</option>
              {services.map((item, index) => (
                <option key={index} value={item.english}>
                  {language ? item.hindi : item.english}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="text-red-500 text-sm mt-1">{errors.service}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 font-[Poppins-Medium] mb-1">
              {language ? 'फोन नंबर' : 'Phone Number'}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors((prev) => ({ ...prev, phone: '' }));
              }}
              placeholder={language ? 'फोन नंबर' : 'Phone Number'}
              className={`w-full p-3 border rounded-lg ${
                dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {service && (
            <div className="mb-4">
              <label className="block text-gray-500 font-[Poppins-Medium] mb-2">
                {language ? 'उप-सेवाएँ' : 'Sub-Services'}
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedSubServices.map((subService) => (
                  <div
                    key={subService}
                    className="flex items-center bg-gray-200 px-3 py-1 rounded-full"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {subServices.map((item) => (
                  <label key={item.english} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSubServices.includes(item.english)}
                      onChange={() => {
                        toggleSubService(item.english);
                        setErrors((prev) => ({ ...prev, subServices: '' }));
                      }}
                      className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-600 border-gray-300 rounded"
                    />
                    <span className="text-sm">{language ? item.hindi : item.english}</span>
                  </label>
                ))}
              </div>
              {errors.subServices && (
                <p className="text-red-500 text-sm mt-1">{errors.subServices}</p>
              )}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-500 font-[Poppins-Medium] mb-1">
              {language ? 'मूल्य' : 'Price'}
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setErrors((prev) => ({ ...prev, price: '' }));
              }}
              placeholder={language ? 'मूल्य' : 'Price'}
              className={`w-full p-3 border rounded-lg ${
                dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 font-[Poppins-Medium] mb-1">
              {language ? 'इकाई' : 'Unit'}
            </label>
            <select
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
                setErrors((prev) => ({ ...prev, unit: '' }));
              }}
              className={`w-full p-3 border rounded-lg ${
                dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                errors.unit ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">{userData.isContractor ? contractorDetails?.unit : language ? 'इकाई चुनें' : 'Select Unit'}</option>
              {units.map((item, index) => (
                <option key={index} value={item.english}>
                  {language ? item.hindi : item.english}
                </option>
              ))}
            </select>
            {errors.unit && (
              <p className="text-red-500 text-sm mt-1">{errors.unit}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 font-[Poppins-Medium] mb-1">
              {language ? 'के बारे में' : 'About'}
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder={userData.isContractor ? contractorDetails?.about : language ? 'के बारे में' : 'About'}
              rows={4}
              className={`w-full p-3 border rounded-lg ${
                dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-purple-600 border-gray-300`}
            />
          </div>

          <button
            onClick={registerContractor}
            className="w-full bg-purple-600 text-white py-3 rounded-full font-[Poppins-Medium] text-lg tracking-wider"
          >
            {language ? 'जारी रखें' : 'Continue'}
          </button>

          {userData.isContractor && (
            <button
              onClick={() => router.push(`/contractor-details/${userData._id}`)}
              className="w-full bg-purple-600 text-white py-3 rounded-full mt-2 font-[Poppins-Medium] text-lg tracking-wider"
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