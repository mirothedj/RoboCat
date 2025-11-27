import React from 'react';
import { Brain, ScanEye, Cpu, Wrench, Network, MonitorUp } from 'lucide-react';
import { PARTS_INFO, PART_PATHS, THEME_COLORS } from '../constants';
import { AssembledState, PartType } from '../types';

interface RobotChassisProps {
  assembledParts: AssembledState;
  onPartClick: (type: PartType) => void;
  activeLevel: boolean;
}

// Center points for icons (Coordinates matched to SVG paths)
const CENTERS = {
  [PartType.HEAD]: { x: 200, y: 108 },
  [PartType.TORSO]: { x: 200, y: 200 },
  [PartType.ARM_LEFT]: { x: 125, y: 195 },
  [PartType.ARM_RIGHT]: { x: 275, y: 195 },
  [PartType.LEGS]: { x: 200, y: 315 },
};

const RobotChassis: React.FC<RobotChassisProps> = ({ assembledParts, onPartClick, activeLevel }) => {
  
  const renderPart = (type: PartType) => {
    const isInstalled = assembledParts[type];
    const partInfo = PARTS_INFO[type];
    const color = THEME_COLORS[partInfo.colorTheme] || '#22d3ee';
    const center = CENTERS[type];
    
    // Dynamic Icon
    const Icon = {
      'Eye': ScanEye,
      'Cpu': Brain,
      'Wrench': Wrench,
      'Network': Network,
      'MonitorUp': MonitorUp
    }[partInfo.iconName] || Cpu;

    // NOTE: Clicking logic is now primarily handled by the OverheadRail, 
    // but we keep click-to-edit for installed parts.
    const isClickable = isInstalled && activeLevel;

    return (
      <g 
        key={type}
        onClick={() => isClickable && onPartClick(type)}
        className={`group transition-all duration-300 ${isClickable ? 'cursor-pointer' : ''}`}
        style={{ opacity: isInstalled ? 1 : 0.3 }}
      >
        {/* The Shape Path */}
        <path
          d={PART_PATHS[type]}
          fill={isInstalled ? color : 'transparent'}
          stroke={isInstalled ? '#ffffff' : '#334155'} // Dark grey if empty
          strokeWidth={isInstalled ? 2 : 1}
          strokeDasharray={isInstalled ? 'none' : '4 4'}
          className="transition-all duration-300"
          style={{
            filter: isInstalled ? `drop-shadow(0 0 10px ${color})` : 'none'
          }}
        />

        {/* Inner Content (Icon/Text) */}
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
        
        {/* Placeholder for empty slot - optional visual cue */}
        {!isInstalled && activeLevel && (
             <circle cx={center.x} cy={center.y} r="4" fill="#334155" opacity="0.5" />
        )}
      </g>
    );
  };

  return (
    <div className="relative w-full max-w-[500px] aspect-[4/5] flex items-center justify-center select-none">
      
      {/* SVG Container for the Mech */}
      <svg 
        viewBox="0 0 400 450" 
        className="w-full h-full drop-shadow-2xl"
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

        {/* Connecting Wires (Background Layer) */}
        <g stroke="#1e293b" strokeWidth="2" fill="none" opacity="0.5">
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