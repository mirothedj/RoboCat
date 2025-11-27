import React from 'react';
import { BatteryCharging, Zap } from 'lucide-react';

interface PowerMeterProps {
  percent: number;
}

const PowerMeter: React.FC<PowerMeterProps> = ({ percent }) => {
  return (
    <div className="bg-slate-800 border-2 border-cyan-900 rounded-xl p-4 shadow-lg glow-box w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-cyan-400">
          <BatteryCharging className="w-6 h-6" />
          <span className="tech-font font-bold text-lg tracking-wider">SYSTEM POWER</span>
        </div>
        <span className="text-cyan-400 font-mono font-bold text-xl">{percent}%</span>
      </div>
      
      {/* Bar Container */}
      <div className="h-8 bg-slate-900 rounded-full overflow-hidden border border-slate-700 relative">
        {/* Grid lines over bar */}
        <div className="absolute inset-0 flex justify-between px-2 z-10">
            {[1,2,3,4].map(i => (
                <div key={i} className="h-full w-0.5 bg-slate-800/50"></div>
            ))}
        </div>
        
        {/* Fill */}
        <div 
          className={`h-full transition-all duration-1000 ease-out flex items-center justify-end pr-2 ${
            percent === 100 
            ? 'bg-gradient-to-r from-cyan-500 via-green-400 to-green-500 shadow-[0_0_20px_#22c55e]' 
            : 'bg-gradient-to-r from-cyan-800 to-cyan-500'
          }`}
          style={{ width: `${percent}%` }}
        >
          {percent === 100 && <Zap className="w-5 h-5 text-white animate-pulse" />}
        </div>
      </div>
      
      <div className="flex justify-between mt-1 text-[10px] text-slate-500 font-mono uppercase">
        <span>Offline</span>
        <span>Initializing</span>
        <span>Operational</span>
      </div>
    </div>
  );
};

export default PowerMeter;