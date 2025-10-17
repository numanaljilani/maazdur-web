"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import toast from 'react-hot-toast';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import DatePicker from "react-datepicker";
import { setUser } from "@/service/slice/userSlice";
import { useCompleteProfileMutation } from "@/service/api/userApi";
import Button from "@/components/Button";
import ActivityIndicator from "@/components/ActivityIndicator";

// Leaflet imports
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Simple function to format coordinates as address
const getLocationDescription = (lat: number, lng: number): string => {
  return `Selected Location - Latitude: ${lat.toFixed(6)}, Longitude: ${lng.toFixed(6)}`;
};

// Custom hook for map events
function LocationMarker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number, address: string) => void }) {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      
      const locationDescription = getLocationDescription(lat, lng);
      onLocationSelect(lat, lng, locationDescription);
    },
  });

  return position === null ? null : <Marker position={position} />;
}

// Placeholder icons; replace with your actual icon paths
const icons = {
  back: "/back.png",
  avatar: "/avatar.png",
  user: "/user.png",
  signature: "/signature.png",
  email: "/mail.png",
  calendar: "/calendar.png",
  india: "/india.png",
  location: "/location.png",
};

// Zod schema for form validation
const profileSchema = z.object({
  fullname: z.string().nonempty("Full name is required"),
  nikname: z.string().optional(),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  dob: z.date().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const CompleteProfilePage = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [mapPosition, setMapPosition] = useState<[number, number]>([20.5937, 78.9629]); // Default to India
  const [showMap, setShowMap] = useState(false);
  
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, dark } = useSelector((state: any) => state.user);
  const [completeProfile, { data, isSuccess, isError, error }] =
    useCompleteProfileMutation();

  const emailParam = searchParams.get("email") || "";
  const passwordParam = searchParams.get("password") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: emailParam,
      dob: new Date(),
    },
  });

  const dob = watch("dob");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setValue("latitude", lat);
    setValue("longitude", lng);
    setValue("address", address);
    setMapPosition([lat, lng]);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapPosition([latitude, longitude]);
          setValue("latitude", latitude);
          setValue("longitude", longitude);
          
          const locationDescription = getLocationDescription(latitude, longitude);
          setValue("address", locationDescription);
          
          toast.success("Location found successfully!", {
            position: "top-center",
            autoClose: 2000,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          let errorMessage = "Could not get your location";
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access denied. Please enable location permissions.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out.";
              break;
          }
          
          toast.error(errorMessage, {
            position: "top-center",
          
          });
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser", {
        position: "top-center",
      
      });
    }
  };

  const onSubmit = async (formData: ProfileFormData) => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      if (profileImage) {
        formDataToSend.append("file", profileImage);
      }
      formDataToSend.append("fullname", formData.fullname);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", passwordParam);
      if (formData.nikname) formDataToSend.append("nikname", formData.nikname);
      if (formData.phone) formDataToSend.append("phone", formData.phone);
      if (formData.address) formDataToSend.append("address", formData.address);
      if (formData.dob) {
        formDataToSend.append(
          "dob",
          formData?.dob?.toISOString()?.split("T")[0]
        );
      }
      if (formData.latitude) formDataToSend.append("latitude", formData.latitude.toString());
      if (formData.longitude) formDataToSend.append("longitude", formData.longitude.toString());

      const response: any = await completeProfile({ body: formDataToSend });
      if (response.error) {
        toast.error(response.error.data?.error || "Profile creation failed.", {
          position: "top-center",
        
        });
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.", {
        position: "top-center",
      
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data.user));
      router.push("/login");
      toast.success("User Created Successfully. Please login.", {
        position: "top-center",
      
      });
      setLoading(false);
    }
  }, [isSuccess, data, dispatch, router]);

  useEffect(() => {
    if (isError && error) {
      // @ts-ignore
      toast.error(
          // @ts-ignore
        error?.data?.error ||
          "User creation failed. This user may already be registered.",
        {
          position: "top-center",
        
        }
      );
      setLoading(false);
    }
  }, [isError, error]);

  return (
    <div
      className={`min-h-screen py-3 ${
        dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="px-5 flex items-center justify-between my-3">
        <Link href="/signup">
          <Image src={icons.back} alt="back" width={32} height={32} />
        </Link>
        <h1
          className={`text-2xl font-semibold text-center ${
            dark ? "text-white" : "text-black"
          }`}
        >
          {language ? "प्रोफ़ाइल पूर्ण करें" : "Fill Your Profile"}
        </h1>
        <div className="w-8" /> {/* Spacer for alignment */}
      </div>

      <div className="relative w-36 h-36 mx-auto flex justify-center items-center">
        <label className="w-36 h-36 rounded-full bg-gray-50 my-3 flex justify-center items-center overflow-hidden cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="profile"
              width={144}
              height={144}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={icons.avatar}
              alt="avatar"
              width={144}
              height={144}
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(100%)" }} // Mimic tintColor
            />
          )}
        </label>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 space-y-4 max-w-md mx-auto"
      >
        <div>
          <label className="text-gray-500 font-medium">
            {language ? "नाम" : "Full Name"}
          </label>
          <div className="relative">
            <Image
              src={icons.user}
              alt="user icon"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              {...register("fullname")}
              className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                dark ? "bg-gray-800 border-gray-700 text-white" : "border-gray-300 text-gray-900"
              }`}
              placeholder={language ? "नाम" : "Full Name"}
            />
          </div>
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-gray-500 font-medium">
            {language ? "उपनाम" : "Nickname"}
          </label>
          <div className="relative">
            <Image
              src={icons.signature}
              alt="signature icon"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              {...register("nikname")}
              className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                dark ? "bg-gray-800 border-gray-700 text-white" : "border-gray-300 text-gray-900"
              }`}
              placeholder={language ? "उपनाम" : "Nickname"}
            />
          </div>
          {errors.nikname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nikname.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-gray-500 font-medium">
            {language ? "ईमेल" : "Email"}
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
              {...register("email")}
              className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                dark ? "bg-gray-800 border-gray-700 text-white" : "border-gray-300 text-gray-900 bg-gray-100"
              }`}
              placeholder={language ? "ईमेल" : "Email"}
              disabled
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-gray-500 font-medium">
            {language ? "जन्म की तारीख" : "Date of Birth"}
          </label>
          <div
            className={`relative flex items-center rounded-xl py-3 px-5 cursor-pointer ${
              dark ? "bg-gray-800" : "bg-gray-100"
            }`}
            onClick={() => setCalendarOpen(true)}
          >
            <Image
              src={icons.calendar}
              alt="calendar icon"
              width={24}
              height={24}
              className="mr-4"
              style={{ filter: "grayscale(100%)" }}
            />
            <DatePicker
              selected={dob}
              onChange={(date: Date | null) => {
                if (date) {
                  setValue("dob", date);
                }
              }}
              dateFormat="dd/MM/yyyy"
              className={`bg-transparent font-semibold focus:outline-none ${
                dark ? "text-white" : "text-black"
              }`}
              open={calendarOpen}
              onClickOutside={() => setCalendarOpen(false)}
              onSelect={() => setCalendarOpen(false)}
            />
          </div>
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
          )}
        </div>

        <div>
          <label className="text-gray-500 font-medium">
            {language ? "फ़ोन" : "Phone"}
          </label>
          <div className="relative">
            <Image
              src={icons.india}
              alt="india icon"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              {...register("phone")}
              className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                dark ? "bg-gray-800 border-gray-700 text-white" : "border-gray-300 text-gray-900"
              }`}
              placeholder={language ? "फ़ोन" : "Phone"}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="text-gray-500 font-medium">
            {language ? "पता" : "Address"}
          </label>
          <div className="relative">
            <Image
              src={icons.location}
              alt="location icon"
              width={20}
              height={20}
              className="absolute left-3 top-4"
            />
            <textarea
              {...register("address")}
              className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                dark ? "bg-gray-800 border-gray-700 text-white" : "border-gray-300 text-gray-900"
              }`}
              placeholder={language ? "पता" : "Address"}
              rows={4}
            />
          </div>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Map Section */}
        <div>
          <label className="text-gray-500 font-medium mb-2 block">
            {language ? "अपना स्थान चुनें" : "Select Your Location"}
          </label>
          
          <div className="flex gap-2 mb-3 flex-wrap">
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors flex-1 min-w-[120px]"
            >
              {showMap 
                ? (language ? "मानचित्र छिपाएं" : "Hide Map") 
                : (language ? "मानचित्र दिखाएं" : "Show Map")
              }
            </button>
            
            <button
              type="button"
              onClick={getUserLocation}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex-1 min-w-[120px]"
            >
              {language ? "मेरा स्थान" : "My Location"}
            </button>
          </div>

          {showMap && (
            <div className="h-64 w-full rounded-md overflow-hidden border border-gray-300">
              <MapContainer
                center={mapPosition}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker onLocationSelect={handleLocationSelect} />
              </MapContainer>
            </div>
          )}
          
          <p className="text-sm text-gray-500 mt-2">
            {language 
              ? "मानचित्र पर क्लिक करके अपना स्थान चुनें या 'मेरा स्थान' बटन दबाएं" 
              : "Click on the map to select your location or press 'My Location' button"
            }
          </p>
        </div>

        <Button
          onPressFunction={handleSubmit(onSubmit)}
          text={language ? "जारी रखें" : "Continue"}
        />
      </form>
      {loading && <ActivityIndicator />}
    </div>
  );
};

export default CompleteProfilePage;