import React, { useState, useEffect } from 'react';
import { LEVELS, PARTS_INFO } from './constants';
import { PartType, AssembledState } from './types';
import RobotChassis from './components/RobotChassis';
import OverheadRail from './components/OverheadRail';
import HolographicModal from './components/HolographicModal';
import PowerMeter from './components/PowerMeter';
import SuccessScreen from './components/SuccessScreen';
import { Settings, Power } from 'lucide-react';

const INITIAL_ASSEMBLED_STATE: AssembledState = {
  [PartType.HEAD]: false,
  [PartType.TORSO]: false,
  [PartType.ARM_RIGHT]: false,
  [PartType.ARM_LEFT]: false,
  [PartType.LEGS]: false,
};

export default function App() {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [assembledParts, setAssembledParts] = useState<AssembledState>(INITIAL_ASSEMBLED_STATE);
  const [activeConfigPart, setActiveConfigPart] = useState<PartType | null>(null);
  const [powerLevel, setPowerLevel] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentLevelData = LEVELS[currentLevelIdx];

  useEffect(() => {
    const totalParts = 5;
    const installedCount = Object.values(assembledParts).filter(Boolean).length;
    const newPower = Math.floor((installedCount / totalParts) * 100);
    setPowerLevel(newPower);
  }, [assembledParts]);

  // Handle click from Rail OR Chassis
  const handlePartClick = (type: PartType) => {
    // If it's already installed, we might want to edit it or play a sound, 
    // but for now we only open config if it's NOT installed OR if we allow re-config.
    // The design implies we pick from rail to install. 
    // If installed, we can click chassis to modify.
    setActiveConfigPart(type);
  };

  const playInstallSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(150, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
      
      gain1.gain.setValueAtTime(0.3, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      
      osc1.start();
      osc1.stop(ctx.currentTime + 0.15);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1200, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.1);
      
      gain2.gain.setValueAtTime(0.1, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      osc2.start(ctx.currentTime + 0.05);
      osc2.stop(ctx.currentTime + 0.25);

    } catch (e) {
      console.error("Audio playback failed", e);
    }
  };

  const handleValidationSuccess = (isValid: boolean) => {
    if (isValid && activeConfigPart) {
      playInstallSound();
      setAssembledParts(prev => ({
        ...prev,
        [activeConfigPart]: true
      }));
      setActiveConfigPart(null);
    }
  };

  const handlePowerUp = () => {
    if (powerLevel === 100) {
      setIsComplete(true);
    }
  };

  const nextLevel = () => {
    if (currentLevelIdx < LEVELS.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
      setAssembledParts(INITIAL_ASSEMBLED_STATE);
      setPowerLevel(0);
      setIsComplete(false);
    }
  };

  const restartLevel = () => {
      setAssembledParts(INITIAL_ASSEMBLED_STATE);
      setPowerLevel(0);
      setIsComplete(false);
  }

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-200 flex overflow-hidden font-mono">
      <div className="absolute inset-0 scanline pointer-events-none z-50"></div>

      {/* LEFT SIDEBAR - CONTROLS */}
      <div className="w-full md:w-96 flex-shrink-0 bg-slate-900/90 border-r border-slate-800 flex flex-col z-20 shadow-2xl relative">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900">
           <div className="flex items-center gap-3 mb-1">
             <Settings className="text-cyan-400 w-5 h-5 animate-spin-slow" />
             <h1 className="text-2xl font-black tech-font text-white tracking-widest neon-text-cyan">AGENT LAB</h1>
           </div>
           <p className="text-[10px] text-cyan-600 font-bold uppercase tracking-[0.3em]">Build // Program // Deploy</p>
        </div>

        {/* Mission Brief Area */}
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
           <div className="mb-6">
              <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Current Mission</div>
              <div className="text-xl font-bold text-white neon-text-yellow tech-font mb-4">{currentLevelData.title}</div>
              
              <div className="bg-slate-950/50 border border-slate-700 p-4 rounded-xl relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                 <h2 className="text-cyan-400 font-bold text-xs uppercase mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
                    Briefing
                 </h2>
                 <p className="text-slate-300 text-sm leading-relaxed mb-4 neon-text-cyan opacity-90">
                   {currentLevelData.missionBrief}
                 </p>
                 <div className="bg-cyan-900/20 p-3 rounded border border-cyan-800/50">
                    <p className="text-cyan-500 text-[10px] font-bold uppercase mb-1">Target Protocol</p>
                    <p className="text-white text-xs italic">"{currentLevelData.missionGoal}"</p>
                 </div>
              </div>
           </div>
           
           <div className="mb-8">
             <PowerMeter percent={powerLevel} />
           </div>

           <div className="text-xs text-slate-500 leading-relaxed border-t border-slate-800 pt-4">
             <strong className="text-slate-400">INSTRUCTIONS:</strong> Retrieve components from the overhead rail. Configure logic gates to install.
           </div>
        </div>

        {/* Bottom Actions - Activate Button */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 backdrop-blur">
          <button
             onClick={handlePowerUp}
             disabled={powerLevel !== 100}
             className={`w-full group relative overflow-hidden rounded-lg border transition-all duration-300 ${
                powerLevel === 100 
                  ? 'bg-green-600 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] cursor-pointer' 
                  : 'bg-slate-800 border-slate-700 opacity-50 cursor-not-allowed'
             }`}
          >
             <div className="relative z-10 py-4 flex items-center justify-center gap-3">
                <Power className={`w-6 h-6 ${powerLevel === 100 ? 'text-white animate-pulse' : 'text-slate-500'}`} />
                <span className={`font-black tech-font tracking-widest text-lg ${powerLevel === 100 ? 'text-white neon-text-green' : 'text-slate-500'}`}>
                   ACTIVATE AGENT
                </span>
             </div>
             {powerLevel === 100 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
             )}
          </button>
        </div>
      </div>

      {/* RIGHT MAIN - ASSEMBLY BAY */}
      <div className="flex-1 flex flex-col relative bg-slate-950 circuit-bg overflow-hidden">
         {/* Background Ambient Glows */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>
         
         {/* TOP: OVERHEAD CONVEYOR RAIL */}
         <OverheadRail 
            assembledParts={assembledParts}
            onPartSelect={handlePartClick}
            isLocked={isComplete}
         />

         {/* CENTER: ROBOT CHASSIS */}
         <div className="flex-1 w-full flex items-center justify-center relative z-10 pb-8">
            <RobotChassis 
              assembledParts={assembledParts}
              onPartClick={handlePartClick}
              activeLevel={!isComplete}
            />
         </div>
         
         <div className="absolute bottom-6 right-6 text-slate-700 font-mono text-xs tracking-widest pointer-events-none select-none">
            ASSEMBLY_BAY_01 // SECURE_CONNECTION
         </div>
      </div>

      {/* Modals */}
      {activeConfigPart && (
        <HolographicModal 
            part={PARTS_INFO[activeConfigPart]}
            levelData={currentLevelData}
            onClose={() => setActiveConfigPart(null)}
            onValidate={handleValidationSuccess}
        />
      )}

      {isComplete && (
          <SuccessScreen 
            levelTitle={currentLevelData.title}
            onNextLevel={nextLevel}
            isLastLevel={currentLevelIdx === LEVELS.length - 1}
            onRestart={restartLevel}
          />
      )}
    </div>
  );
}