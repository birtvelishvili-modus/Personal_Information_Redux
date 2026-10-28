import React from 'react';

interface StarWatermarkProps {
  className?: string;
  size?: number;
}

export const StarWatermark: React.FC<StarWatermarkProps> = ({ className = '', size }) => {
  return (
    <div
      className={`relative select-none pointer-events-none flex items-center justify-center ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circle */}
        <circle
          cx="250"
          cy="250"
          r="236"
          stroke="currentColor"
          strokeWidth="2.2"
        />

        {/* Inner Circle */}
        <circle
          cx="250"
          cy="250"
          r="192"
          stroke="currentColor"
          strokeWidth="2.2"
        />

        {/* Text Curved Paths */}
        <defs>
          <path
            id="textPathUpper"
            d="M 37,250 A 213,213 0 1,1 463,250"
            fill="none"
          />
          <path
            id="textPathLower"
            d="M 463,250 A 213,213 0 0,1 37,250"
            fill="none"
          />
        </defs>

        {/* Upper Arc Text */}
        <text
          fontSize="15"
          fill="currentColor"
          letterSpacing="4.5"
          fontWeight="600"
          className="uppercase tracking-widest font-sans"
        >
          <textPath href="#textPathUpper" startOffset="50%" textAnchor="middle">
            DIGITAL TRANSFORMATION AGENCY REDBERRY •
          </textPath>
        </text>

        {/* Lower Arc Text */}
        <text
          fontSize="15.5"
          fill="currentColor"
          letterSpacing="5"
          fontWeight="600"
          className="uppercase tracking-widest font-sans"
        >
          <textPath href="#textPathLower" startOffset="50%" textAnchor="middle">
            • 405060419 •
          </textPath>
        </text>

        {/* Center 4-Point Outlined Curved Star */}
        <path
          d="M 250,172 Q 250,250 328,250 Q 250,250 250,328 Q 250,250 172,250 Q 250,250 250,172 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        />
      </svg>
    </div>
  );
};
