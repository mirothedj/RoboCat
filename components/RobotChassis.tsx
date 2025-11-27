import React from 'react';
import { Brain, ScanEye, Cpu, Wrench, Network, MonitorUp } from 'lucide-react';
import { PARTS_INFO, PART_PATHS, THEME_COLORS, PART_CENTERS } from '../constants';
import { AssembledState, PartType } from '../types';

interface RobotChassisProps {
  assembledParts: AssembledState;
  onPartClick: (type: PartType) => void;
  activeLevel: boolean;
}

const RobotChassis: React.FC<RobotChassisProps> = ({ assembledParts, onPartClick, activeLevel }) => {
  
  const renderPart = (type: PartType) => {
    const isInstalled = assembledParts[type];
    const partInfo = PARTS_INFO[type];
    const color = THEME_COLORS[partInfo.colorTheme] || '#22d3ee';
    const center = PART_CENTERS[type];
    
    // Dynamic Icon
    const Icon = {
      'Eye': ScanEye,
      'Cpu': Brain,
      'Wrench': Wrench,
      'Network': Network,
      'MonitorUp': MonitorUp
    }[partInfo.iconName] || Cpu;

    const isClickable = isInstalled && activeLevel;

    return (
      <g 
        key={`part-${type}-${isInstalled}`}
        onClick={() => isClickable && onPartClick(type)}
        className={`group transition-all duration-300 ${isClickable ? 'cursor-pointer' : ''}`}
        // Opacity 1 for both states to ensure maximum visibility of the outline
        style={{ opacity: 1 }} 
      >
        {/* The Shape Path */}
        <path
          d={PART_PATHS[type]}
          fill={isInstalled ? color : 'transparent'}
          // Bright Neon Cyan for empty, White for installed border
          stroke={isInstalled ? '#ffffff' : '#22d3ee'} 
          // Thicker stroke for empty state to be clearly visible
          strokeWidth={isInstalled ? 2 : 2.5} 
          strokeDasharray={isInstalled ? 'none' : '6 3'}
          className={`transition-all duration-300 ${isInstalled ? 'animate-install-flash' : ''}`}
          style={{
            // Stronger glow effect for empty state
            filter: isInstalled 
                ? `drop-shadow(0 0 10px ${color})` 
                : `drop-shadow(0 0 5px #22d3ee)` 
          }}
        />

        {/* Inner Content (Icon/Text) - Only when installed */}
        {isInstalled && (
            <foreignObject 
            x={center.x - 40} 
            y={center.y - 40} 
            width="80" 
            height="80" 
            className="pointer-events-none"
            >
            <div className="w-full h-full flex flex-col items-center justify-center animate-[zoomIn_0.3s_ease-out]">
                <Icon 
                    size={24} 
                    color="#ffffff" 
                    className="drop-shadow-md mb-1"
                />
                <span className="text-[8px] font-bold text-white uppercase bg-black/50 px-1 rounded backdrop-blur-sm tracking-tighter">
                {partInfo.name}
                </span>
            </div>
            </foreignObject>
        )}
        
        {/* Visual Cue for Empty Slot - A pulsing node at the center */}
        {!isInstalled && activeLevel && (
             <circle cx={center.x} cy={center.y} r="4" fill="#22d3ee" className="animate-pulse" />
        )}
      </g>
    );
  };

  return (
    // Updated Container: Added max-h-[70vh] to prevent it from being too tall and overlapping top/bottom elements
    <div className="relative w-full h-full max-h-[65vh] aspect-[4/5] flex items-center justify-center select-none p-4">
      
      {/* SVG Container for the Mech */}
      <svg 
        viewBox="0 0 400 450" 
        className="w-full h-full drop-shadow-2xl"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="mech-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Back Glow */}
        <circle cx="200" cy="225" r="150" fill="url(#mech-glow)" />

        {/* Connecting Wires (Background Layer) - Brighter */}
        <g stroke="#0e7490" strokeWidth="1.5" fill="none" opacity="0.6">
           <path d="M 200,135 L 200,140" />
           <path d="M 170,160 L 155,170" />
           <path d="M 230,160 L 245,170" />
           <path d="M 200,260 L 200,265" />
        </g>

        {/* Render Order */}
        {renderPart(PartType.LEGS)}
        {renderPart(PartType.ARM_LEFT)}
        {renderPart(PartType.ARM_RIGHT)}
        {renderPart(PartType.TORSO)}
        {renderPart(PartType.HEAD)}

      </svg>
    </div>
  );
};

export default RobotChassis;