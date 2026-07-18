import React from 'react';
import { Trophy, RefreshCw } from 'lucide-react';
import TeamSearch from './Search/TeamSearch';

export default function Header({ onReset, viewMode, onViewModeChange, onSelectTeam }) {
  return (
    <header className="relative z-[100] border-b border-theme-border bg-card-bg/50 backdrop-blur px-4 py-3.5 shadow-xl sticky top-0">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-500/10">
            <Trophy className="w-6 h-6 text-slate-950 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight bg-gradient-to-r from-emerald-300 via-amber-200 to-teal-300 bg-clip-text text-transparent">
                FIFA 2026 WORLD CUP BOARD
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Team Search */}
          <TeamSearch onSelectTeam={onSelectTeam} />

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-theme-border/60 ml-2 mr-2">
            <button
              onClick={() => onViewModeChange('compact')}
              className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${viewMode === 'compact' ? 'bg-emerald-500/20 text-emerald-400 shadow-sm border border-emerald-500/30' : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
            >
              Compact
            </button>
            <button
              onClick={() => onViewModeChange('readable')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${viewMode === 'readable' ? 'bg-emerald-500/20 text-emerald-400 shadow-sm border border-emerald-500/30' : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
            >
              Readable
            </button>
          </div>

          <button
            onClick={onReset}
            className="bg-card-bg hover:bg-red-950/40 text-red-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-red-900/20 transition active:scale-95 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3" />
            {/* Reset button */}
          </button>
        </div>
      </div>
    </header>
  );
}
