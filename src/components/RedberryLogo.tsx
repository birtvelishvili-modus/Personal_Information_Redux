import React from 'react';

interface RedberryLogoProps {
  className?: string;
  onClick?: () => void;
}

export const RedberryLogo: React.FC<RedberryLogoProps> = ({ className = '', onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Redberry - მთავარი გვერდი"
      className={`inline-flex items-center gap-1 select-none cursor-pointer group bg-transparent border-0 p-1 -m-1 rounded-md focus-visible:outline-2 focus-visible:outline-[#F93B1D] focus-visible:outline-offset-2 shrink-0 ${className}`}
    >
      <span className="font-black text-[#F93B1D] tracking-wider text-base min-[360px]:text-lg sm:text-xl uppercase font-sans">
        REDBERRY
      </span>
      <span
        aria-hidden="true"
        className="text-[#F93B1D] font-black text-xl sm:text-2xl leading-none -mt-0.5 group-hover:rotate-45 transition-transform duration-300"
      >
        +
      </span>
    </button>
  );
};
