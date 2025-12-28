
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { PropertyImage } from '../types';

interface ComparisonSliderProps {
  imageLeft: PropertyImage;
  imageRight: PropertyImage;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ imageLeft, imageRight }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      if (e.cancelable) e.preventDefault();
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp, { passive: false });
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-2xl md:rounded-3xl bg-slate-200 select-none cursor-ew-resize shadow-2xl border border-white/10"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      <img 
        src={imageRight.imageUrl} 
        alt="Right" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      
      <div className="absolute right-3 top-3 md:right-4 md:top-4 bg-black/60 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-xl text-[9px] md:text-xs font-black backdrop-blur-md border border-white/20 shadow-lg">
        {imageRight.type} · {imageRight.space}
      </div>

      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={imageLeft.imageUrl} 
          alt="Left" 
          className="absolute inset-0 h-full object-cover max-w-none"
          style={{ width: containerRef.current?.offsetWidth || '100vw' }}
        />
        <div className="absolute left-3 top-3 md:left-4 md:top-4 bg-blue-600/90 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-xl text-[9px] md:text-xs font-black backdrop-blur-md border border-white/20 whitespace-nowrap shadow-xl">
          {imageLeft.type} · {imageLeft.space}
        </div>
      </div>

      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-slate-50 transition-transform duration-200 ${isDragging ? 'scale-125' : 'scale-100'}`}>
          <div className="flex gap-0.5">
            <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
            <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
