"use client"
import { FC } from 'react';

const ActivityIndicator: FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-50">
      <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default ActivityIndicator;