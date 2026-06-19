import React from 'react';
import { Award } from 'lucide-react';
import { TEAMS } from '../../constants/teams';

export default function BestThirdsPanel({ bestThirdsRanking }) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 sticky top-[80px]">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-3">
          <Award className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-xs font-black uppercase text-slate-200 tracking-wider">Best 3rd-Place Rank</h3>
            <p className="text-[9px] text-slate-500">Real-time qualified tracker</p>
          </div>
        </div>

        <div className="space-y-2">
          {bestThirdsRanking.map((t, idx) => {
            const isQualified = idx < 8 && t.pts > 0;
            return (
              <div
                key={t.code}
                className={`p-2 rounded-lg border flex items-center justify-between transition-all ${isQualified
                  ? 'bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-500/40'
                  : 'bg-slate-950/40 border-slate-900'
                  }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={`text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ${isQualified ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                    {idx + 1}
                  </span>
                  <span className="text-sm leading-none">{TEAMS[t.code]?.emoji}</span>
                  <span className="font-bold text-xs text-slate-300">{TEAMS[t.code]?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400">{t.pts} pts / GD {t.gd}</span>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider ${isQualified ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-900 text-slate-500'
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
