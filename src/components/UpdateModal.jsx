import React from 'react';
import { X, Info } from 'lucide-react';
import { TEAMS } from '../constants/teams';

export default function UpdateModal({ overwrittenMatches, onClose }) {
  if (!overwrittenMatches || overwrittenMatches.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-app-bg border border-theme-border rounded-2xl w-full max-w-md shadow-2xl shadow-emerald-900/20 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-slate-800/50 p-4 border-b border-theme-border flex items-center justify-between sticky top-0">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-400" />
            <h2 className="text-white font-bold text-lg">Official Updates</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-sm text-slate-300">
          <p>
            The following matches have concluded in real life. Your predictions have been overridden with the official final scores:
          </p>

          <div className="space-y-3">
            {overwrittenMatches.map((m, idx) => {
              const t1 = TEAMS[m.t1Code]?.name || m.t1Code;
              const t2 = TEAMS[m.t2Code]?.name || m.t2Code;
              
              return (
                <div key={idx} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
                  <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                    {m.type === 'group' ? 'Group Stage' : 'Knockout Stage'} • {m.id}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1 w-full max-w-[120px]">
                      <span className="font-semibold text-white truncate">{t1}</span>
                      <span className="font-semibold text-white truncate">{t2}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center mx-2 text-slate-500 text-xs text-center leading-tight">
                      <span className="text-[9px] uppercase tracking-wider mb-0.5">Your Pick</span>
                      <span className="line-through decoration-red-500/50 font-mono">{m.oldScore1} - {m.oldScore2}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <span className="text-[9px] text-emerald-500 uppercase tracking-wider mb-0.5 font-bold">Official</span>
                      <span className="text-lg font-black text-emerald-400 font-mono">{m.newScore1} - {m.newScore2}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-theme-border bg-slate-800/30 mt-auto">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
