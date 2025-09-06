"use client"
import { FC } from 'react';

interface ButtonProps {
  onPressFunction: () => void;
  text: string;
}

const Button: FC<ButtonProps> = ({ onPressFunction, text }) => {
  return (
    <button
      onClick={onPressFunction}
      className="w-full bg-purple-600 text-white font-medium py-3 rounded-md hover:bg-purple-700 transition"
    >
      {text}
    </button>
  );
};

export default Button;