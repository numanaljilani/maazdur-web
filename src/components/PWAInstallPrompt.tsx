'use client';

import { usePWA } from '../hooks/usePWA';
import { useEffect, useState } from 'react';

export default function PWAInstallPrompt() {
  const { isInstallable, install } = usePWA();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInstallable) {
      // Check if user has dismissed the prompt recently
      const dismissedTime = localStorage.getItem('pwa-prompt-dismissed');
      if (dismissedTime) {
        const timeDiff = Date.now() - parseInt(dismissedTime);
        const daysSinceDismissal = timeDiff / (1000 * 60 * 60 * 24);
        
        // Show again after 7 days
        if (daysSinceDismissal < 7) {
          return;
        }
      }

      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isInstallable]);

  const handleInstall = async () => {
    const installed = await install();
    if (installed) {
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            Install Mazdur+ App
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
            Get the full app experience with fast access and offline functionality
          </p>
          
          <div className="flex space-x-2">
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Not Now
            </button>
            <button
              onClick={handleInstall}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Install App
            </button>
          </div>
        </div>
        
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}