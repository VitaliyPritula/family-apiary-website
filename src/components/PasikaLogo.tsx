interface PasikaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export function PasikaLogo({ size = 'md', showText = true }: PasikaLogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-5xl'
  };

  return (
    <div className="flex items-center gap-3">
      {/* Honeycomb with Bee Icon */}
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        {/* Honeycomb Background */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Hexagons forming honeycomb pattern */}
          <g fill="#F59E0B" opacity="0.9">
            {/* Center hexagon */}
            <polygon points="50,20 65,28 65,44 50,52 35,44 35,28" />
            
            {/* Surrounding hexagons */}
            <polygon points="35,10 50,2 65,10 65,20 50,28 35,20" opacity="0.7" />
            <polygon points="20,28 35,20 50,28 50,44 35,52 20,44" opacity="0.7" />
            <polygon points="65,28 80,20 95,28 95,44 80,52 65,44" opacity="0.7" />
            <polygon points="35,52 50,44 65,52 65,68 50,76 35,68" opacity="0.7" />
            <polygon points="20,68 35,60 50,68 50,84 35,92 20,84" opacity="0.6" />
            <polygon points="65,68 80,60 95,68 95,84 80,92 65,84" opacity="0.6" />
          </g>
        </svg>
        
        {/* Bee Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none" stroke="currentColor">
            {/* Bee body */}
            <ellipse cx="12" cy="12" rx="4" ry="6" fill="#FCD34D" stroke="#92400E" strokeWidth="1"/>
            
            {/* Bee stripes */}
            <line x1="8" y1="10" x2="16" y2="10" stroke="#92400E" strokeWidth="1.5"/>
            <line x1="8" y1="14" x2="16" y2="14" stroke="#92400E" strokeWidth="1.5"/>
            
            {/* Wings */}
            <ellipse cx="9" cy="8" rx="3" ry="4" fill="white" opacity="0.7" stroke="#92400E" strokeWidth="0.5" transform="rotate(-20 9 8)"/>
            <ellipse cx="15" cy="8" rx="3" ry="4" fill="white" opacity="0.7" stroke="#92400E" strokeWidth="0.5" transform="rotate(20 15 8)"/>
            
            {/* Antennae */}
            <line x1="11" y1="7" x2="10" y2="5" stroke="#92400E" strokeWidth="0.8"/>
            <line x1="13" y1="7" x2="14" y2="5" stroke="#92400E" strokeWidth="0.8"/>
            <circle cx="10" cy="5" r="0.8" fill="#92400E"/>
            <circle cx="14" cy="5" r="0.8" fill="#92400E"/>
          </svg>
        </div>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold text-[#92400E] text leading-tight`}>
            Власна<br/> Пасіка
          </span>
          {/* <span className="text-sm text-[#92400E]">
            Натуральний мед
          </span> */}
        </div>
      )}
    </div>
  );
}