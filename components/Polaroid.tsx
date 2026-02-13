
import React from 'react';

interface PolaroidProps {
  imageUrl: string;
  caption?: string;
  rotation?: string;
  size?: 'sm' | 'md' | 'lg';
  hasWashiTape?: boolean;
  onClick?: () => void;
}

const Polaroid: React.FC<PolaroidProps> = ({
  imageUrl,
  caption,
  rotation = 'rotate-0',
  size = 'md',
  hasWashiTape = false,
  onClick
}) => {
  const sizeClasses = {
    sm: 'max-w-[200px]',
    md: 'max-w-[320px]',
    lg: 'max-w-md'
  };

  const aspectClasses = {
    sm: 'aspect-square',
    md: 'aspect-square',
    lg: 'aspect-[4/5]'
  };

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto group ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      {hasWashiTape && (
        <div className="absolute -top-4 -left-6 bg-primary/40 w-20 h-6 -rotate-[15deg] z-10 shadow-sm pointer-events-none"></div>
      )}
      <div className={`bg-white p-4 pb-12 shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:rotate-0 ${rotation}`}>
        <div
          className={`w-full ${aspectClasses[size]} bg-cover bg-center overflow-hidden rounded-sm`}
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
        {caption && (
          <p className="mt-4 text-center font-display italic text-gray-700 text-lg">
            "{caption}"
          </p>
        )}
      </div>
    </div>
  );
};

export default Polaroid;
