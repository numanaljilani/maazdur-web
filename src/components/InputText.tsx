"use client"
import { FC, useState } from 'react';
import Image from 'next/image';

interface InputTextProps {
  label: string;
  value: string;
  setData: (value: string) => void;
  icon?: string;
  keyboard?: boolean;
  secure?: boolean;
  right?: string;
  securePass?: () => void;
  pass?: boolean;
}

const InputText: FC<InputTextProps> = ({
  label,
  value,
  setData,
  icon,
  secure,
  right,
  securePass,
  pass,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-500 font-medium">{label}</label>
      <div className="relative">
        {icon && (
          <Image
            src={icon}
            alt="icon"
            width={20}
            height={20}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
        )}
        <input
          type={secure && !pass ? 'password' : 'text'}
          value={value}
          onChange={(e) => setData(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder={label}
        />
        {right && (
          <button
            type="button"
            onClick={securePass}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <Image src={right} alt="toggle" width={20} height={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputText;