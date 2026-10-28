import React from 'react';

/**
 * StarWatermark კომპონენტის Props ინტერფეისი
 */
interface StarWatermarkProps {
  className?: string; // დამატებითი Tailwind კლასები (ზომა, ფერი, opacity)
  size?: number;      // ზომა პიქსელებში (არასავალდებულო)
}

/**
 * Redberry-ის წრიული ბეჭდის (Watermark) კომპონენტი:
 * - გარეთა და შიდა წრეები
 * - წრიული ტექსტი: "DIGITAL TRANSFORMATION AGENCY REDBERRY •" და "• 405060419 •"
 * - ცენტრში 4-ქიმიანი მოხრილი კონტურული ვარსკვლავი
 */
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
        {/* გარეთა წრე */}
        <circle
          cx="250"
          cy="250"
          r="236"
          stroke="currentColor"
          strokeWidth="2.2"
        />

        {/* შიდა წრე */}
        <circle
          cx="250"
          cy="250"
          r="192"
          stroke="currentColor"
          strokeWidth="2.2"
        />

        {/* ტექსტის მოსახვევი გზები (Text Paths) */}
        <defs>
          {/* ზედა რკალი */}
          <path
            id="textPathUpper"
            d="M 37,250 A 213,213 0 1,1 463,250"
            fill="none"
          />
          {/* ქვედა რკალი */}
          <path
            id="textPathLower"
            d="M 463,250 A 213,213 0 0,1 37,250"
            fill="none"
          />
        </defs>

        {/* ზედა რკალის ტექსტი */}
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

        {/* ქვედა რკალის ტექსტი */}
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

        {/* ცენტრალური 4-ქიმიანი კონტურული ვარსკვლავი */}
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
