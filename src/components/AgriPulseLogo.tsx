import React from 'react';

interface AgriPulseLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'mark-only';
  theme?: 'light' | 'dark';
}

export const AgriPulseLogo: React.FC<AgriPulseLogoProps> = ({
  className = 'h-10',
  variant = 'horizontal',
  theme = 'light',
}) => {
  const forestGreen = theme === 'dark' ? '#38EF7D' : '#004D25';
  const limeGreen = '#62B62D';
  const goldHarvest = '#E8A817';
  const textDark = theme === 'dark' ? '#FFFFFF' : '#004D25';
  const taglineColor = theme === 'dark' ? '#A7F3D0' : '#004D25';

  if (variant === 'mark-only') {
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Globe Grid lines behind truck */}
        <path d="M100 40 C125 40 145 55 145 75 C145 95 125 110 100 110 C75 110 55 95 55 75 C55 55 75 40 100 40 Z" stroke="#004D25" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.4" />
        <path d="M70 75 L130 75" stroke="#004D25" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.4" />
        <path d="M100 40 L100 110" stroke="#004D25" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.4" />

        {/* Outer Circular Arc Frame */}
        <path d="M55 120 C35 80 50 40 95 25 C140 10 175 40 170 85 C168 100 160 115 148 125" stroke="#004D25" strokeWidth="6" strokeLinecap="round" />

        {/* Leaves on the left */}
        <path d="M48 65 C25 50 35 25 55 35 C55 55 48 65 48 65 Z" fill="#62B62D" />
        <path d="M62 80 C40 70 45 48 65 58 C65 75 62 80 62 80 Z" fill="#62B62D" />

        {/* Golden Grain Stalk on the right */}
        <path d="M162 60 C168 55 175 58 172 65 C168 70 162 65 162 60 Z" fill="#E8A817" />
        <path d="M158 72 C165 67 172 70 168 77 C164 82 158 77 158 72 Z" fill="#E8A817" />
        <path d="M152 84 C160 79 166 82 163 89 C159 94 152 89 152 84 Z" fill="#E8A817" />
        <path d="M144 95 C152 90 158 93 154 100 C150 105 144 100 144 95 Z" fill="#E8A817" />

        {/* Logistics Truck */}
        <g transform="translate(80, 62) scale(0.85)">
          {/* Truck Body */}
          <rect x="0" y="0" width="34" height="22" rx="2" fill="#004D25" />
          <path d="M34 8 L44 8 L48 14 L48 22 L34 22 Z" fill="#004D25" />
          {/* Leaf on Truck Trailer */}
          <path d="M12 11 C12 6 22 6 22 11 C22 16 12 16 12 11 Z" fill="#62B62D" />
          <path d="M12 11 C17 11 22 11 22 11" stroke="#FFFFFF" strokeWidth="0.8" />
          {/* Truck Wheels */}
          <circle cx="8" cy="23" r="4" fill="#004D25" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="38" cy="23" r="4" fill="#004D25" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* Agricultural Field Curves below */}
        <path d="M30 145 C60 120 140 120 170 145" stroke="#004D25" strokeWidth="6" strokeLinecap="round" />
        <path d="M40 158 C70 135 130 135 160 158" stroke="#62B62D" strokeWidth="5" strokeLinecap="round" />
        <path d="M52 170 C80 150 120 150 148 170" stroke="#004D25" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {/* Emblem SVG */}
        <svg viewBox="0 0 200 200" className="h-10 w-10 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Globe lines */}
          <ellipse cx="100" cy="75" rx="45" ry="32" stroke={forestGreen} strokeWidth="1.8" strokeDasharray="3 2" opacity="0.35" />
          <path d="M55 75 L145 75" stroke={forestGreen} strokeWidth="1.8" strokeDasharray="3 2" opacity="0.35" />
          <path d="M100 43 L100 107" stroke={forestGreen} strokeWidth="1.8" strokeDasharray="3 2" opacity="0.35" />

          {/* Circle Frame */}
          <path d="M50 115 C30 75 48 35 95 20 C142 5 180 38 172 88 C169 105 158 120 142 130" stroke={forestGreen} strokeWidth="7" strokeLinecap="round" />

          {/* Leaves on left */}
          <path d="M42 60 C18 45 30 20 52 30 C52 50 42 60 42 60 Z" fill={limeGreen} />
          <path d="M58 78 C34 68 40 44 62 55 C62 72 58 78 58 78 Z" fill={limeGreen} />

          {/* Golden Grains on right */}
          <path d="M165 55 C172 50 179 53 176 60 C171 66 165 60 165 55 Z" fill={goldHarvest} />
          <path d="M160 68 C168 62 175 66 171 73 C166 79 160 73 160 68 Z" fill={goldHarvest} />
          <path d="M154 80 C162 74 169 78 165 85 C160 91 154 85 154 80 Z" fill={goldHarvest} />
          <path d="M145 92 C154 86 160 90 156 97 C151 103 145 97 145 92 Z" fill={goldHarvest} />

          {/* Truck */}
          <g transform="translate(76, 60) scale(0.9)">
            <rect x="0" y="0" width="34" height="22" rx="2" fill={forestGreen} />
            <path d="M34 8 L44 8 L48 14 L48 22 L34 22 Z" fill={forestGreen} />
            <path d="M12 11 C12 6 22 6 22 11 C22 16 12 16 12 11 Z" fill={limeGreen} />
            <circle cx="8" cy="23" r="4" fill={forestGreen} stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="38" cy="23" r="4" fill={forestGreen} stroke="#FFFFFF" strokeWidth="1.5" />
          </g>

          {/* Field Curves */}
          <path d="M25 142 C58 116 142 116 175 142" stroke={forestGreen} strokeWidth="7" strokeLinecap="round" />
          <path d="M38 156 C68 132 132 132 162 156" stroke={limeGreen} strokeWidth="6" strokeLinecap="round" />
          <path d="M50 168 C78 148 122 148 150 168" stroke={forestGreen} strokeWidth="5" strokeLinecap="round" />
        </svg>

        {/* Text Group */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5 leading-none">
            <span className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: forestGreen }}>
              Agri
            </span>
            <span className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: limeGreen }}>
              Pulse
            </span>
            
            {/* GHANA label + Flag */}
            <div className="flex items-center space-x-1 ml-1 pl-1 border-l border-emerald-700/40">
              <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase" style={{ color: textDark }}>
                GHANA
              </span>
              {/* Ghana Flag */}
              <div className="w-4 h-2.5 flex flex-col rounded-xs overflow-hidden border border-black/20 shrink-0">
                <div className="h-1/3 bg-[#CE1126]" />
                <div className="h-1/3 bg-[#FCD116] flex items-center justify-center">
                  <div className="w-1 h-1 bg-black clip-star" />
                </div>
                <div className="h-1/3 bg-[#006B3F]" />
              </div>
            </div>
          </div>

          <div className="text-[8px] sm:text-[9.5px] font-extrabold tracking-wider uppercase mt-1 flex items-center gap-1" style={{ color: taglineColor }}>
            <span className="h-[1.5px] w-2 bg-[#62B62D] rounded-full inline-block" />
            <span>SMART AGRI-LOGISTICS PLATFORM</span>
            <span className="h-[1.5px] w-2 bg-[#62B62D] rounded-full inline-block" />
          </div>
        </div>
      </div>
    );
  }

  // Full Stacked Logo (as in the uploaded emblem image)
  return (
    <div className={`flex flex-col items-center text-center p-4 ${className}`}>
      {/* Large Emblem SVG */}
      <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Globe Grid lines behind truck */}
        <ellipse cx="100" cy="75" rx="48" ry="34" stroke="#004D25" strokeWidth="1.8" strokeDasharray="3 2" opacity="0.35" />
        <path d="M52 75 L148 75" stroke="#004D25" strokeWidth="1.8" strokeDasharray="3 2" opacity="0.35" />
        <path d="M100 41 L100 109" stroke="#004D25" strokeWidth="1.8" strokeDasharray="3 2" opacity="0.35" />

        {/* Outer Circular Arc Frame */}
        <path d="M50 115 C30 75 48 35 95 20 C142 5 180 38 172 88 C169 105 158 120 142 130" stroke="#004D25" strokeWidth="7" strokeLinecap="round" />

        {/* Leaves on left */}
        <path d="M42 60 C18 45 30 20 52 30 C52 50 42 60 42 60 Z" fill="#62B62D" />
        <path d="M58 78 C34 68 40 44 62 55 C62 72 58 78 58 78 Z" fill="#62B62D" />

        {/* Golden Grains on right */}
        <path d="M165 55 C172 50 179 53 176 60 C171 66 165 60 165 55 Z" fill="#E8A817" />
        <path d="M160 68 C168 62 175 66 171 73 C166 79 160 73 160 68 Z" fill="#E8A817" />
        <path d="M154 80 C162 74 169 78 165 85 C160 91 154 85 154 80 Z" fill="#E8A817" />
        <path d="M145 92 C154 86 160 90 156 97 C151 103 145 97 145 92 Z" fill="#E8A817" />

        {/* Logistics Truck */}
        <g transform="translate(76, 60) scale(0.9)">
          <rect x="0" y="0" width="34" height="22" rx="2" fill="#004D25" />
          <path d="M34 8 L44 8 L48 14 L48 22 L34 22 Z" fill="#004D25" />
          <path d="M12 11 C12 6 22 6 22 11 C22 16 12 16 12 11 Z" fill="#62B62D" />
          <circle cx="8" cy="23" r="4" fill="#004D25" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="38" cy="23" r="4" fill="#004D25" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* Field Curves */}
        <path d="M25 142 C58 116 142 116 175 142" stroke="#004D25" strokeWidth="7" strokeLinecap="round" />
        <path d="M38 156 C68 132 132 132 162 156" stroke="#62B62D" strokeWidth="6" strokeLinecap="round" />
        <path d="M50 168 C78 148 122 148 150 168" stroke="#004D25" strokeWidth="5" strokeLinecap="round" />
      </svg>

      {/* Main Typography */}
      <div className="flex items-center justify-center space-x-1 mt-2">
        <span className="text-3xl font-black tracking-tight text-[#004D25]">Agri</span>
        <span className="text-3xl font-black tracking-tight text-[#62B62D]">Pulse</span>
        
        <div className="flex items-center space-x-1.5 ml-2 pl-2 border-l-2 border-[#004D25]">
          <span className="text-base font-black text-[#004D25] tracking-widest uppercase">GHANA</span>
          <div className="w-5 h-3 flex flex-col rounded-xs overflow-hidden border border-black/20">
            <div className="h-1/3 bg-[#CE1126]" />
            <div className="h-1/3 bg-[#FCD116]" />
            <div className="h-1/3 bg-[#006B3F]" />
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="flex items-center space-x-2 mt-2">
        <div className="h-0.5 w-8 bg-[#62B62D]" />
        <span className="text-[10px] font-extrabold text-[#004D25] tracking-wider uppercase">
          SMART AGRI-SUPPLY CHAIN &amp; QUALITY LOGISTICS PLATFORM
        </span>
        <div className="h-0.5 w-8 bg-[#62B62D]" />
      </div>
    </div>
  );
};
