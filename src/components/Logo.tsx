import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bowl / Plate Base */}
      <path
        d="M15 50C15 69.33 30.67 85 50 85C69.33 85 85 69.33 85 50"
        stroke="#3D6B4F"
        strokeWidth="8"
        strokeLinecap="round"
      />
      
      {/* Leaf - Representing Nutrition/Gizi */}
      <path
        d="M50 20C50 20 70 30 70 50C70 70 50 80 50 80C50 80 30 70 30 50C30 30 50 20 50 20Z"
        fill="#3D6B4F"
      />
      <path
        d="M50 20V80"
        stroke="#FAF6EF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Steam / Aroma Lines - Warmth */}
      <path
        d="M40 15C40 15 38 10 40 5"
        stroke="#F5A623"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M60 15C60 15 62 10 60 5"
        stroke="#F5A623"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Decorative Sparkle - The "Bite" of energy */}
      <circle cx="75" cy="25" r="6" fill="#E8503A" />
    </svg>
  );
};
