import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PartDefinition, LevelData, PartType } from '../types';

interface HolographicModalProps {
  part: PartDefinition;
  levelData: LevelData;
  onClose: () => void;
  onValidate: (isValid: boolean) => void;
}

// Helper to map color themes to Tailwind classes
const getThemeClasses = (color: string) => {
  const map: Record<string, any> = {
    fuchsia: {
      border: 'border-fuchsia-500',
      text: 'text-fuchsia-400',
      textDim: 'text-fuchsia-200/70',
      bgHover: 'hover:bg-fuchsia-950/50',
      bgActive: 'bg-fuchsia-900/50',
      btn: 'bg-fuchsia-600 hover:bg-fuchsia-500 shadow-fuchsia-900/50',
      glow: 'shadow-[0_0_50px_rgba(232,121,249,0.3)]',
      pulse: 'bg-fuchsia-500',
      ring: 'focus:border-fuchsia-400 focus:ring-fuchsia-400'
    },
    cyan: {
      border: 'border-cyan-500',
      text: 'text-cyan-400',
      textDim: 'text-cyan-200/70',
      bgHover: 'hover:bg-cyan-950/50',
      bgActive: 'bg-cyan-900/50',
      btn: 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/50',
      glow: 'shadow-[0_0_50px_rgba(6,182,212,0.3)]',
      pulse: 'bg-cyan-500',
      ring: 'focus:border-cyan-400 focus:ring-cyan-400'
    },
    orange: {
      border: 'border-orange-500',
      text: 'text-orange-400',
      textDim: 'text-orange-200/70',
      bgHover: 'hover:bg-orange-950/50',
      bgActive: 'bg-orange-900/50',
      btn: 'bg-orange-600 hover:bg-orange-500 shadow-orange-900/50',
      glow: 'shadow-[0_0_50px_rgba(251,146,60,0.3)]',
      pulse: 'bg-orange-500',
      ring: 'focus:border-orange-400 focus:ring-orange-400'
    },
    yellow: {
      border: 'border-yellow-500',
      text: 'text-yellow-400',
      textDim: 'text-yellow-200/70',
      bgHover: 'hover:bg-yellow-950/50',
      bgActive: 'bg-yellow-900/50',
      btn: 'bg-yellow-600 hover:bg-yellow-500 shadow-yellow-900/50',
      glow: 'shadow-[0_0_50px_rgba(250,204,21,0.3)]',
      pulse: 'bg-yellow-500',
      ring: 'focus:border-yellow-400 focus:ring-yellow-400'
    },
    emerald: {
      border: 'border-emerald-500',
      text: 'text-emerald-400',
      textDim: 'text-emerald-200/70',
      bgHover: 'hover:bg-emerald-950/50',
      bgActive: 'bg-emerald-900/50',
      btn: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/50',
      glow: 'shadow-[0_0_50px_rgba(52,211,153,0.3)]',
      pulse: 'bg-emerald-500',
      ring: 'focus:border-emerald-400 focus:ring-emerald-400'
    }
  };
  return map[color] || map.cyan;
};

const HolographicModal: React.FC<HolographicModalProps> = ({ part, levelData, onClose, onValidate }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState<string | null>(null);

  const theme = getThemeClasses(part.colorTheme);
  const requirement = levelData.requirements[part.type];
  const options = levelData.availableOptions[part.type];

  // TEMPLATE: Get the lesson-specific label for this part
  const lessonLabel = levelData.anatomyLabels?.[part.type] || part.name;

  const handleSubmit = () => {
    let isValid = false;

    // Validation Logic
    if (part.type === PartType.TORSO) {
      if (!requirement.requiredKeywords) {
        isValid = true; 
      } else {
        const lowerInput = inputValue.toLowerCase();
        isValid = requirement.requiredKeywords.some(keyword => lowerInput.includes(keyword));
      }
    } else {
      isValid = selectedOption === requirement.correctOptionId;
    }

    if (isValid) {
      onValidate(true);
    } else {
      setError(requirement.hint);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className={`w-full max-w-xl bg-slate-900 border-2 rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-300 ${theme.border} ${theme.glow}`}>
        
        {/* Header */}
        <div className={`bg-slate-950/50 p-4 border-b ${theme.border} flex justify-between items-center`}>
          <div className="flex items-center gap-3">
             <div className={`w-2 h-8 rounded-full animate-pulse ${theme.pulse}`}></div>
             <div>
               <h3 className={`${theme.text} tech-font text-xl tracking-wider uppercase`}>Configuring: {lessonLabel}</h3>
               <p className={`${theme.textDim} text-xs font-mono`}>{part.name} // {part.aiTerm}</p>
             </div>
          </div>
          <button onClick={onClose} className={`${theme.text} hover:text-white transition-colors`}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-slate-300 mb-6 font-mono text-sm border-l-2 pl-4 py-2 bg-slate-950/20" style={{ borderColor: 'currentColor' }}>
            {part.description}
          </p>

          {/* INPUT AREA */}
          <div className="mb-6">
            {part.type === PartType.TORSO ? (
              <div className="space-y-2">
                 <label className={`${theme.text} text-xs font-bold uppercase tracking-widest`}>Enter Instructions ({lessonLabel}):</label>
                 <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder='e.g., "Initialize canvas, set variables..."'
                  className={`w-full h-32 bg-slate-950 border text-slate-200 p-4 rounded-lg focus:outline-none focus:ring-1 font-mono resize-none ${theme.border} ${theme.ring}`}
                 />
              </div>
            ) : (
              <div className="space-y-3">
                <label className={`${theme.text} text-xs font-bold uppercase tracking-widest`}>Select {lessonLabel} Logic:</label>
                <div className="grid gap-3">
                  {options?.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedOption(opt.id)}
                      className={`p-4 rounded-lg border text-left transition-all flex items-center gap-3 ${
                        selectedOption === opt.id
                          ? `${theme.bgActive} ${theme.border} text-white shadow-lg`
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-white hover:text-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedOption === opt.id ? 'border-white' : 'border-slate-600'}`}>
                        {selectedOption === opt.id && <div className={`w-2 h-2 rounded-full bg-white`} />}
                      </div>
                      <span className="font-mono text-sm">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-950/50 border border-red-500 text-red-200 p-3 rounded-lg flex items-start gap-3 animate-in slide-in-from-bottom-2">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <span className="text-sm font-mono">{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-4">
            <button 
              onClick={onClose}
              className={`px-6 py-2 font-mono rounded-lg transition-colors ${theme.text} ${theme.bgHover}`}
            >
              CANCEL
            </button>
            <button
              onClick={handleSubmit}
              className={`px-8 py-3 text-white font-bold tech-font rounded-lg shadow-lg flex items-center gap-2 transition-all transform active:scale-95 ${theme.btn}`}
            >
              <CheckCircle2 className="w-5 h-5" />
              INSTALL PART
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HolographicModal;