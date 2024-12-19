import React, { useState, useCallback } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'welcome' | 'mobile' | 'desktop';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '',
  variant = 'mobile'
}) => {
  const [hue, setHue] = useState(0);

  const handleClick = useCallback(() => {
    setHue(Math.floor(Math.random() * 360));
  }, []);

  const logoUrls = {
    welcome: 'https://foauuciychrtgigargva.supabase.co/storage/v1/object/sign/Images/Color%20Snatch_color.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQ29sb3IgU25hdGNoX2NvbG9yLnN2ZyIsImlhdCI6MTczMzIwNjIwOCwiZXhwIjoxNzY0NzQyMjA4fQ.lmDookijL0qDBH5BfYZRpIbuFCboNar2q4xpqoqGMj0&t=2024-12-03T06%3A10%3A08.852Z',
    mobile: 'https://foauuciychrtgigargva.supabase.co/storage/v1/object/sign/Images/Color%20Snatch_grey.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQ29sb3IgU25hdGNoX2dyZXkuc3ZnIiwiaWF0IjoxNzMzMjA2NTEzLCJleHAiOjE4OTA4ODY1MTN9.goqfGA4Ve7MGHAuAEtVcjTfY2hH5I5hbJN3sg-tBzZE&t=2024-12-03T06%3A15%3A13.668Z',
    desktop: {
      default: 'https://foauuciychrtgigargva.supabase.co/storage/v1/object/sign/Images/Color%20Snatch_sq_grey.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQ29sb3IgU25hdGNoX3NxX2dyZXkuc3ZnIiwiaWF0IjoxNzMzMjA2NDI2LCJleHAiOjE3NjQ3NDI0MjZ9.1n-QQ-dUQuK5FrvuyRetZRH6B-VGPZ-isZvEeZBT950&t=2024-12-03T06%3A13%3A46.053Z',
      hover: 'https://foauuciychrtgigargva.supabase.co/storage/v1/object/sign/Images/Color%20Snatch_sq_color.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQ29sb3IgU25hdGNoX3NxX2NvbG9yLnN2ZyIsImlhdCI6MTczMzIwNjQ1MywiZXhwIjoxODkwODg2NDUzfQ.MtAZz7rzYS_JrmvF5j_YOMW-gDhOIU__BzHvAKRhVrc&t=2024-12-03T06%3A14%3A13.817Z'
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  const logoUrl = variant === 'desktop' 
    ? (isHovered ? logoUrls.desktop.hover : logoUrls.desktop.default)
    : logoUrls[variant];

  return (
    <img 
      src={logoUrl}
      alt="Color Snatch"
      className={`${className} w-auto cursor-pointer transition-all duration-300`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        filter: variant === 'welcome' ? `hue-rotate(${hue}deg)` : 'none',
      }}
    />
  );
};