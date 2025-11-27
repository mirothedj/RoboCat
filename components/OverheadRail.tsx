import React, { useRef } from 'react';
import { Settings } from 'lucide-react';
import { AssembledState, PartType } from '../types';
import { PARTS_INFO, PART_PATHS, THEME_COLORS, PART_CENTERS } from '../constants';

interface OverheadRailProps {
  assembledParts: AssembledState;
  onPartSelect: (type: PartType) => void;
  isLocked: boolean;
}

const OverheadRail: React.FC<OverheadRailProps> = ({ assembledParts, onPartSelect, isLocked }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Only show parts that haven't been assembled yet
  const availableParts = Object.values(PARTS_INFO).filter(
    (part) => !assembledParts[part.type]
  );

  return (
    <div className="w-full h-40 relative flex flex-col justify-end overflow-hidden select-none z-20">
      
      {/* Background Structure (Ceiling/Gantry) */}
      <div className="absolute top-0 left-0 w-full h-4 bg-slate-900 border-b border-slate-700 z-10"></div>
      
      {/* Gears Mechanism */}
      <div className="absolute top-0 left-4 z-0">
        <Settings className="w-16 h-16 text-slate-800 animate-spin-slow" />
      </div>
      <div className="absolute top-0 right-4 z-0">
         <Settings className="w-16 h-16 text-slate-800 animate-reverse-spin" />
      </div>

      {/* The Rail/Chain Line */}
      <div className="absolute top-8 left-0 w-full h-1 bg-slate-700/50 flex items-center overflow-hidden">
        {/* Animated Chain links pattern */}
        <div className="w-[200%] h-full flex animate-slide-left opacity-50">
             {[...Array(40)].map((_, i) => (
                 <div key={i} className="w-8 h-1 bg-slate-600 border-r border-slate-800 skew-x-12"></div>
             ))}
        </div>
      </div>

      {/* Scrolling Container for Parts */}
      <div 
        ref={containerRef}
        className="w-full h-full flex items-start justify-center overflow-x-auto overflow-y-hidden gap-12 pt-8 pb-4 px-12 no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {availableParts.length === 0 ? (
           <div className="flex items-center justify-center h-full w-full text-slate-600 font-mono text-sm tracking-widest animate-pulse mt-8">
              ALL COMPONENTS INSTALLED
           </div>
        ) : (
          availableParts.map((part, index) => {
            const color = THEME_COLORS[part.colorTheme];
            const center = PART_CENTERS[part.type];
            // Stagger animation delay so they don't sway in perfect unison
            const swayDelay = `${index * 0.2}s`;
            
            // Calculate Transform to zoom in and center the part
            // 1. Translate part center to origin (-center.x, -center.y)
            // 2. Scale up (3x)
            // 3. Translate to center of viewBox (200, 225)
            const zoomScale = 3.5;
            const transform = `translate(200, 225) scale(${zoomScale}) translate(-${center.x}, -${center.y})`;
            
            return (
              <div 
                key={part.id}
                onClick={() => !isLocked && onPartSelect(part.type)}
                className="relative group flex-shrink-0 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                style={{ 
                    animation: `sway 3s ease-in-out infinite alternate`,
                    animationDelay: swayDelay,
                    transformOrigin: 'top center'
                }}
              >
                {/* The "Rope" or "Cable" */}
                <div className="w-[2px] h-8 bg-slate-600 group-hover:bg-cyan-400 transition-colors"></div>
                
                {/* The Part Holder / Pod */}
                <div 
                  className="bg-slate-900/80 border-2 backdrop-blur-sm rounded-lg p-2 shadow-lg transition-all duration-300 w-16 h-16 flex items-center justify-center overflow-hidden"
                  style={{ borderColor: color, boxShadow: `0 0 10px ${color}30` }}
                >
                    <svg width="64" height="64" viewBox="0 0 400 450" className="overflow-visible">
                        <path 
                            d={PART_PATHS[part.type]} 
                            fill={color} 
                            stroke="white" 
                            strokeWidth="3"
                            transform={transform}
                        />
                    </svg>
                </div>
                
                {/* Label on Hover */}
                <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-[10px] text-white whitespace-nowrap border border-slate-700 z-50">
                    {part.name}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Decorative Gradient Fade on sides of rail */}
      <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default OverheadRail;