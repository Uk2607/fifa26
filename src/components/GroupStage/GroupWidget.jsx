import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { TEAMS } from '../../constants/teams';

// ================================================================================
// 🏟️ GROUP WIDGET — standings table (click opens modal popup)
// ================================================================================
export default function GroupWidget({
  groupName,
  teamsList,
  standings,
  onToggle,
  bestThirdsQualified
}) {
  const [showTiebreaker, setShowTiebreaker] = useState(false);

  return (
    <div
      className="rounded-xl border transition-all duration-300 overflow-hidden border-slate-800/80 hover:border-slate-700 bg-slate-900/30 hover:bg-slate-900/50 cursor-pointer group"
      onClick={onToggle}
    >

      {/* Clickable Header */}
      <div className="w-full px-3 py-2.5 flex items-center justify-between text-left">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-emerald-500/10 rounded flex items-center justify-center text-[10px] font-black text-emerald-400 border border-emerald-500/20">
            {groupName}
          </div>
          <span className="font-extrabold text-slate-200 text-xs tracking-wider uppercase">Group {groupName}</span>
          {/* ⓘ Tiebreaker Info Icon */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowTiebreaker(prev => !prev); }}
              onMouseEnter={() => setShowTiebreaker(true)}
              onMouseLeave={() => setShowTiebreaker(false)}
              className="w-4 h-4 rounded-full flex items-center justify-center bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:border-slate-500 transition-all"
              title="Ranking criteria"
            >
              <Info className="w-2.5 h-2.5 text-slate-400" />
            </button>
            {showTiebreaker && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-6 z-50 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-xl shadow-black/50 p-2.5 text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-[8px] font-black text-emerald-400 uppercase tracking-wider mb-1.5">Ranking Criteria (in order)</p>
                <ol className="text-[8px] text-slate-300 space-y-0.5 list-decimal list-inside">
                  <li>Points <span className="text-slate-500">(3W, 1D, 0L)</span></li>
                  <li>Head-to-head points</li>
                  <li>Head-to-head goal difference</li>
                  <li>Head-to-head goals scored</li>
                  <li>Overall goal difference</li>
                  <li>Overall goals scored</li>
                  <li>Fair Play score <span className="text-slate-500">(YC −1, 2Y −3, RC −4)</span></li>
                  <li>FIFA ranking <span className="text-slate-500">(alphabetical fallback)</span></li>
                </ol>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1">
            {teamsList.map(code => (
              <span key={code} className="text-[20px] transform scale-95 border border-slate-900 rounded-full" title={TEAMS[code]?.name}>
                {TEAMS[code]?.emoji}
              </span>
            ))}
          </div>
          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider hidden group-hover:block ml-1">
            Open ↗
          </span>
        </div>
      </div>

      {/* ── Enriched Standings Table ── */}
      <div className="px-2.5 pb-2.5 border-t border-slate-800/40 pt-1.5 bg-slate-950/20">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] text-left min-w-[290px]">
            <thead>
              <tr className="text-slate-500 font-bold border-b border-slate-900/80 uppercase text-[7px] tracking-wider">
                <th className="py-0.5 pl-0.5">Team</th>
                <th className="py-0.5 text-center w-5">PL</th>
                <th className="py-0.5 text-center w-5">W</th>
                <th className="py-0.5 text-center w-5">D</th>
                <th className="py-0.5 text-center w-5">L</th>
                <th className="py-0.5 text-center w-5">GF</th>
                <th className="py-0.5 text-center w-5">GA</th>
                <th className="py-0.5 text-center w-5">GD</th>
                <th className="py-0.5 text-center w-5" title="Fair Play">FP</th>
                <th className="py-0.5 text-center w-6 text-amber-400 font-extrabold">PTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, idx) => {
                const isFirstOrSecond = idx < 2;
                const isBestThird = idx === 2 && bestThirdsQualified.includes(team.code);

                let highlightClass = "text-slate-400";
                if (isFirstOrSecond) highlightClass = "text-emerald-400 font-black";
                else if (isBestThird) highlightClass = "text-blue-400 font-bold";

                return (
                  <tr key={team.code} className="border-b border-slate-900/50 last:border-0 hover:bg-slate-800/10 transition-all">
                    <td className="py-1 flex items-center gap-1 font-medium pl-0.5">
                      <span className={`w-1 h-2 rounded-full flex-shrink-0 ${isFirstOrSecond ? 'bg-emerald-500' : isBestThird ? 'bg-blue-400' : 'bg-slate-800'
                        }`} />
                      <span className="text-[11px]">{TEAMS[team.code]?.emoji}</span>
                      <span className="text-slate-200 font-bold truncate max-w-[70px] text-[9px]">{TEAMS[team.code]?.name}</span>
                    </td>
                    <td className="py-1 text-center font-bold text-slate-400">{team.played}</td>
                    <td className="py-1 text-center font-bold text-slate-400">{team.won}</td>
                    <td className="py-1 text-center font-bold text-slate-400">{team.drawn}</td>
                    <td className="py-1 text-center font-bold text-slate-400">{team.lost}</td>
                    <td className="py-1 text-center font-bold text-slate-300">{team.gf}</td>
                    <td className="py-1 text-center font-bold text-slate-300">{team.ga}</td>
                    <td className={`py-1 text-center font-bold ${team.gd >= 0 ? 'text-slate-300' : 'text-red-400'}`}>
                      {team.gd >= 0 ? `+${team.gd}` : team.gd}
                    </td>
                    <td className={`py-1 text-center font-bold text-[9px] ${team.fairPlay < 0 ? 'text-amber-400' : 'text-slate-500'
                      }`}>
                      {team.fairPlay || 0}
                    </td>
                    <td className={`py-1 text-center font-black ${highlightClass}`}>
                      {team.pts}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
