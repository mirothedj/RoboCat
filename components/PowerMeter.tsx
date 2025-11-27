import React from 'react';
import { BatteryCharging, Zap } from 'lucide-react';

interface PowerMeterProps {
  percent: number;
  orientation?: 'horizontal' | 'vertical';
}

const PowerMeter: React.FC<PowerMeterProps> = ({ percent, orientation = 'horizontal' }) => {
  const isVertical = orientation === 'vertical';

  return (
    <div className={`bg-slate-900/80 backdrop-blur border border-cyan-900/50 rounded-xl p-3 shadow-lg glow-box flex transition-all duration-300 ${isVertical ? 'flex-col items-center gap-3 h-64 w-16' : 'flex-col w-full'}`}>
      
      {/* Label Section */}
      <div className={`flex ${isVertical ? 'flex-col-reverse justify-end' : 'justify-between'} items-center gap-1`}>
        <div className="flex items-center gap-1 text-cyan-400">
          <BatteryCharging className="w-4 h-4" />
          {isVertical ? (
             <span className="tech-font font-bold text-[9px] tracking-wider text-cyan-400" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>SYS.PWR</span>
          ) : (
             <span className="tech-font font-bold text-xs tracking-wider">SYSTEM POWER</span>
          )}
        </div>
        <span className={`text-cyan-400 font-mono font-bold ${isVertical ? 'text-xs rotate-0 mb-1' : 'text-sm'}`}>{percent}%</span>
      </div>
      
      {/* Bar Container */}
      <div className={`bg-slate-950 rounded-full overflow-hidden border border-slate-800 relative ${isVertical ? 'flex-1 w-3' : 'h-6 w-full'}`}>
        {/* Grid lines */}
        <div className={`absolute inset-0 flex ${isVertical ? 'flex-col justify-between py-2 items-center' : 'justify-between px-2 items-center'} z-10 opacity-30`}>
            {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className={`bg-cyan-500 ${isVertical ? 'w-full h-[1px]' : 'h-full w-[1px]'}`}></div>
            ))}
        </div>
        
        {/* Fill */}
        <div 
          className={`transition-all duration-1000 ease-out flex items-center justify-center
            ${percent === 100 
                ? 'bg-gradient-to-t from-cyan-500 via-green-400 to-green-500 shadow-[0_0_15px_#22c55e]' 
                : 'bg-gradient-to-t from-cyan-900 to-cyan-500'
            }
          `}
          style={{ 
              width: isVertical ? '100%' : `${percent}%`,
              height: isVertical ? `${percent}%` : '100%',
              marginTop: isVertical ? 'auto' : 0 // Fill from bottom up
          }}
        >
        </div>
      </div>
      
      {/* Icon at bottom/end */}
      <div className={`${isVertical ? 'h-4' : 'w-4'}`}>
        {percent === 100 && <Zap className="w-4 h-4 text-green-400 animate-pulse" />}
      </div>

    </div>
  );
};

export default PowerMeter;