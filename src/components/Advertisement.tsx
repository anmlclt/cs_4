import React, { useEffect, useRef } from 'react';

interface AdvertisementProps {
  slot: string;
  format?: 'mobile' | 'desktop';
}

export const Advertisement: React.FC<AdvertisementProps> = ({ slot, format = 'desktop' }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (adRef.current && !isLoaded.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      } catch (err) {
        console.error('Ad error:', err);
      }
    }
  }, []);

  const dimensions = format === 'mobile' 
    ? { width: '320px', height: '100px' }
    : { width: '728px', height: '90px' };

  return (
    <div ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'inline-block',
          ...dimensions
        }}
        data-ad-client="ca-pub-2705229865080724"
        data-ad-slot={slot}
      />
    </div>
  );
};