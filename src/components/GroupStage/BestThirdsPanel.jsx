import React from 'react';
import { Award } from 'lucide-react';
import { TEAMS } from '../../constants/teams';

export default function BestThirdsPanel({ bestThirdsRanking }) {
  return (
    <div className="p-[1px] bg-gradient-to-br from-amber-500/30 via-slate-800/40 to-slate-800/40 rounded-xl shadow-lg">
      <div className="bg-slate-900/80 rounded-[11px] p-3">
        <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 mb-2">
        <Award className="w-3.5 h-3.5 text-amber-400" />
        <div>
          <h3 className="text-[10px] font-black uppercase text-slate-200 tracking-wider">Best 3rd-Place Rank</h3>
          <p className="text-[8px] text-slate-500">Real-time qualified tracker</p>
        </div>
      </div>

      <div className="space-y-1">
        {bestThirdsRanking.map((t, idx) => {
          const isQualified = idx < 8;
          return (
            <div
              key={t.code}
              className={`px-1.5 py-1 rounded-md border flex items-center justify-between transition-all ${isQualified
                ? 'bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-500/40'
                : 'bg-slate-950/40 border-slate-900'
                }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span className={`text-[7px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center ${isQualified ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                  {idx + 1}
                </span>
                <span className="text-[10px] leading-none"><img src={`https://flagcdn.com/w20/${TEAMS[t.code]?.iso2}.png`} alt="flag" className="inline-block w-4 h-[11px] object-cover rounded-[2px]" /></span>
                <span className="font-bold text-[9px] text-slate-300">{TEAMS[t.code]?.name}</span>
                <span className="text-[8px] text-slate-400">({t.groupName})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-bold text-slate-400">
                  {t.pts}pts · GD{t.gd >= 0 ? '+' : ''}{t.gd}
                  {t.fairPlay !== 0 && (
                    <span className="text-amber-400/80"> · FP{t.fairPlay}</span>
                  )}
                </span>
                <span className={`text-[7px] px-1 py-0.5 rounded font-black uppercase tracking-wider ${isQualified
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-slate-900 text-slate-500'
                  }`}>
                  {isQualified ? 'IN' : 'OUT'}
                </span>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
