import React from 'react';
import { Trophy, ArrowRight, RefreshCw } from 'lucide-react';

interface SuccessScreenProps {
  levelTitle: string;
  onNextLevel: () => void;
  isLastLevel: boolean;
  onRestart: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ levelTitle, onNextLevel, isLastLevel, onRestart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="text-center animate-in zoom-in duration-500 flex flex-col items-center">
        <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_#eab308]">
          <Trophy className="w-12 h-12 text-black" />
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white tech-font mb-2 glow-text">
          AGENT ONLINE!
        </h2>
        <p className="text-cyan-300 font-mono text-lg mb-8">
          {levelTitle} successfully assembled.
        </p>

        <div className="flex gap-4">
            <button 
                onClick={onRestart}
                className="px-6 py-3 rounded-full border border-slate-600 text-slate-400 hover:text-white hover:border-white font-mono transition-colors flex items-center gap-2"
            >
                <RefreshCw className="w-4 h-4" /> REPLAY
            </button>
            
            {!isLastLevel ? (
                <button 
                    onClick={onNextLevel}
                    className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-400 text-black font-bold tech-font text-xl shadow-lg shadow-green-500/30 flex items-center gap-2 transition-transform hover:scale-105"
                >
                    NEXT MISSION <ArrowRight className="w-6 h-6" />
                </button>
            ) : (
                 <div className="px-8 py-3 bg-slate-800 rounded-full text-green-400 font-bold font-mono border border-green-500">
                     ALL MISSIONS COMPLETE
                 </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;