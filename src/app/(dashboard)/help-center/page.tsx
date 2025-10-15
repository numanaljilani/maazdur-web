'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import ContactUsBtn from '@/components/ContactUsBtn';
import React from 'react';

const HelpCenter = () => {
  const { language, dark } = useSelector((state: any) => state.user);
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('contact'); // Default to 'contact' since FAQ is commented out

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  // Translated content
  const content = {
    title: language ? 'सहायता केंद्र' : 'Help Center',
    tabs: {
      // faq: language ? 'अक्सर पूछे जाने वाले प्रश्न' : 'FAQ',
      contact: language ? 'हमसे संपर्क करें' : 'Contact us',
    },
    buttons: [
      {
        text: 'Customer Service',
        icon: 'headset',
        onPress: () => window.open('https://www.mazdur.in/contact', '_blank'),
      },
      { text: 'Mail', subText: 'mazdur001@gmail.com', icon: 'mail' },
      { text: 'WhatsApp', subText: '+918788628712', icon: 'logo-whatsapp' },
      {
        text: 'Website',
        subText: 'https://mazdur.in',
        icon: 'planet-outline',
        onPress: () => window.open('https://mazdur.in', '_blank'),
      },
    ],
  };

  return (
    <div className={`min-h-screen ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-4 sm:p-6 lg:p-8`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-6">
         
          <h1 className={`text-lg sm:text-xl font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
            {content.title}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-300 dark:border-gray-600">
          {/* <button
            onClick={() => handleTabPress('faq')}
            className={`flex-1 py-4 text-center border-b-4 ${
              activeTab === 'faq' ? 'border-purple-600 text-purple-600' : 'border-gray-300 text-gray-400'
            } font-semibold text-base sm:text-lg`}
          >
            {content.tabs.faq}
          </button> */}
          <button
            onClick={() => handleTabPress('contact')}
            className={`flex-1 py-4 text-center border-b-4 ${
              activeTab === 'contact' ? 'border-purple-600 text-purple-600' : 'border-gray-300 text-gray-400'
            } font-semibold text-base sm:text-lg`}
          >
            {content.tabs.contact}
          </button>
        </div>

        {/* Contact Us Section */}
        {activeTab === 'contact' && (
          <div className="mt-4">
            {content.buttons.map((btn, index) => (
              <ContactUsBtn
                key={index}
                text={btn.text}
                subText={btn.subText}
                icon={btn.icon}
                onPress={btn.onPress}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;