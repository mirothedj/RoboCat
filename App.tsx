import React, { useState, useEffect } from 'react';
import { LEVELS, PARTS_INFO, THEME_COLORS } from './constants';
import { PartType, AssembledState } from './types';
import RobotChassis from './components/RobotChassis';
import OverheadRail from './components/OverheadRail';
import HolographicModal from './components/HolographicModal';
import PowerMeter from './components/PowerMeter';
import SuccessScreen from './components/SuccessScreen';
import { Settings, Power, Square, Play, Info, Terminal } from 'lucide-react';

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
    setActiveConfigPart(type);
  };

  const playInstallSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const now = ctx.currentTime;

      // 1. Mechanical Latch (Low Thud/Clunk)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(80, now);
      osc1.frequency.exponentialRampToValueAtTime(10, now + 0.1);
      
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      
      osc1.start(now);
      osc1.stop(now + 0.15);

      // 2. Sci-fi Power Up Chime (High Ping)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(600, now);
      osc2.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
      
      gain2.gain.setValueAtTime(0.05, now);
      gain2.gain.exponentialRampToValueAtTime(0.2, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      
      osc2.start(now + 0.05); // Slight delay
      osc2.stop(now + 0.6);

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

      {/* LEFT SIDEBAR - CONDENSED (25% max) */}
      <div className="w-1/4 max-w-[25%] flex-shrink-0 bg-slate-900/95 border-r border-slate-800 flex flex-col z-30 shadow-2xl relative">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900">
           <div className="flex items-center gap-2 mb-1">
             <Settings className="text-cyan-400 w-4 h-4 animate-spin-slow" />
             <h1 className="text-lg font-black tech-font text-white tracking-widest neon-text-cyan truncate">AGENT LAB</h1>
           </div>
           <p className="text-[9px] text-cyan-600 font-bold uppercase tracking-[0.2em]">Build // Program</p>
        </div>

        {/* Component Guide (Color Coordinated Hints) */}
        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
           <div className="mb-3 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Info className="w-3 h-3 text-cyan-400" />
              <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest neon-text-cyan">System Specs</h3>
           </div>
           
           <div className="space-y-3">
            {Object.values(PARTS_INFO).map((part) => {
                const colorHex = THEME_COLORS[part.colorTheme];
                return (
                <div key={part.id} className="group relative pl-2 hover:bg-slate-800/30 rounded transition-colors py-1 cursor-default">
                    {/* Vertical Color Bar */}
                    <div 
                        className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full transition-all duration-300 group-hover:w-1"
                        style={{ backgroundColor: colorHex, boxShadow: `0 0 5px ${colorHex}` }}
                    ></div>
                    
                    <div>
                        <div className="text-[10px] font-bold neon-text-cyan uppercase flex flex-col gap-0.5">
                            <span className="text-cyan-200 group-hover:text-white transition-colors">{part.name}</span>
                            <span className="text-[8px] font-normal normal-case text-slate-500 group-hover:text-cyan-400/70">
                                {part.aiTerm}
                            </span>
                        </div>
                        {/* Tooltip description */}
                        <div className="text-[9px] text-slate-400 leading-tight mt-1 hidden group-hover:block animate-in fade-in slide-in-from-left-2 duration-200 border-l border-slate-700 pl-2">
                           {part.description}
                        </div>
                    </div>
                </div>
                );
            })}
           </div>
        </div>

        {/* Bottom Actions Area - VERTICAL BUTTONS */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 backdrop-blur flex flex-col gap-3 items-center">
             
             {/* Activate (Large, Top of stack) */}
             <button
                onClick={handlePowerUp}
                disabled={powerLevel !== 100}
                className={`w-full flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 group ${
                   powerLevel === 100
                     ? 'bg-slate-800 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:bg-green-600 hover:text-white cursor-pointer'
                     : 'bg-slate-900 border-slate-800 opacity-50 cursor-not-allowed'
                }`}
                title="Activate Agent"
             >
                <Power className={`w-6 h-6 mb-1 ${powerLevel === 100 ? 'text-green-400 group-hover:text-white animate-pulse' : 'text-slate-600'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${powerLevel === 100 ? 'text-green-400 group-hover:text-white neon-text-green' : 'text-slate-600'}`}>
                    Activate
                </span>
             </button>

             {/* Secondary Controls Grid */}
             <div className="grid grid-cols-2 gap-2 w-full">
                {/* Shutdown */}
                <button
                    onClick={restartLevel}
                    className="flex flex-col items-center justify-center p-2 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-red-950/30 hover:border-red-500/50 group transition-all"
                >
                    <Square className="w-4 h-4 text-slate-600 group-hover:text-red-500 mb-1" />
                    <span className="text-[8px] font-bold text-slate-600 group-hover:text-red-400 uppercase">Shutdown</span>
                </button>

                {/* Demo */}
                <button
                    className="flex flex-col items-center justify-center p-2 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-blue-950/30 hover:border-blue-500/50 group transition-all cursor-not-allowed opacity-70"
                >
                    <Play className="w-4 h-4 text-slate-600 group-hover:text-blue-500 mb-1" />
                    <span className="text-[8px] font-bold text-slate-600 group-hover:text-blue-400 uppercase">Demo</span>
                </button>
             </div>
        </div>
      </div>

      {/* RIGHT MAIN - ASSEMBLY BAY */}
      <div className="flex-1 flex flex-col relative bg-slate-950 circuit-bg overflow-hidden">
         {/* Background Ambient Glows */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>
         
         {/* TOP: OVERHEAD CONVEYOR RAIL */}
         <div className="flex-shrink-0 z-20">
            <OverheadRail 
                assembledParts={assembledParts}
                onPartSelect={handlePartClick}
                isLocked={isComplete}
            />
         </div>

         {/* CENTER: ROBOT CHASSIS */}
         <div className="flex-1 w-full flex items-center justify-center relative z-10 pb-4">
            <RobotChassis 
              assembledParts={assembledParts}
              onPartClick={handlePartClick}
              activeLevel={!isComplete}
            />
         </div>

         {/* VERTICAL POWER METER - Bottom Right Absolute */}
         <div className="absolute bottom-6 right-6 z-40">
            <PowerMeter percent={powerLevel} orientation="vertical" />
         </div>

         {/* BOTTOM: MISSION CONTROL DECK */}
         <div className="flex-shrink-0 w-full bg-slate-900/90 border-t border-cyan-900/50 backdrop-blur-md relative z-30">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            
            <div className="max-w-5xl mx-auto px-6 py-4 flex gap-8 items-start">
                
                {/* Left: Title & ID */}
                <div className="flex-shrink-0 w-48 border-r border-slate-800 pr-4">
                    <div className="flex items-center gap-2 text-cyan-400 mb-1">
                        <Terminal className="w-4 h-4" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">Mission Control</span>
                    </div>
                    <h2 className="text-xl font-black text-white tech-font neon-text-yellow leading-none mb-2">{currentLevelData.title}</h2>
                    <div className="text-[9px] text-slate-600 font-mono">ID: #{String(currentLevelData.id).padStart(3, '0')}</div>
                </div>

                {/* Center: Briefing & Target */}
                <div className="flex-1 space-y-3">
                    {/* Main Briefing */}
                    <div className="text-slate-300 text-sm leading-relaxed font-mono">
                        {currentLevelData.missionBrief}
                    </div>
                    
                    {/* Target Protocol (Stacked Below) */}
                    <div className="inline-flex items-center gap-2 bg-cyan-950/30 border border-cyan-500/30 rounded px-3 py-1.5">
                         <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-wider">Target Protocol:</span>
                         <span className="text-xs font-bold text-white italic">"{currentLevelData.missionGoal}"</span>
                    </div>
                </div>
            </div>
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