import React, { useState } from 'react';
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
  const [hoveredTeam, setHoveredTeam] = useState(null);
  
  const auraColor = hoveredTeam ? TEAMS[hoveredTeam]?.color : null;
  const outerStyle = auraColor ? {
    backgroundImage: `linear-gradient(to bottom right, ${auraColor}90, rgba(30, 41, 59, 0.4), ${auraColor}90)`
  } : {};

  return (
    <div
      className={`rounded-2xl transition-all duration-300 overflow-hidden p-[1px] cursor-pointer group shadow-lg ${!auraColor ? 'bg-gradient-to-br from-slate-800/60 via-slate-800/20 to-slate-800/60 hover:from-emerald-500/50 hover:via-slate-800/50 hover:to-blue-500/50' : ''}`}
      style={outerStyle}
      onClick={onToggle}
    >
      <div className="bg-slate-900/80 rounded-[15px] overflow-hidden h-full flex flex-col">

      {/* Clickable Header */}
      <div className="w-full px-3 py-2.5 flex items-center justify-between text-left">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-emerald-500/10 rounded flex items-center justify-center text-[10px] font-black text-emerald-400 border border-emerald-500/20">
            {groupName}
          </div>
          <span className="font-extrabold text-slate-200 text-xs tracking-wider uppercase">Group {groupName}</span>
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
                  <tr 
                    key={team.code} 
                    className={`border-b border-slate-900/50 last:border-0 transition-all ${isFirstOrSecond ? 'bg-emerald-950/15 hover:bg-emerald-950/25' : isBestThird ? 'bg-blue-950/15 hover:bg-blue-950/25' : 'hover:bg-slate-800/10'}`}
                    onMouseEnter={() => setHoveredTeam(team.code)}
                    onMouseLeave={() => setHoveredTeam(null)}
                  >
                    <td className="py-1 flex items-center gap-1 font-medium pl-0.5">
                      <span 
                        className={`w-1 h-2 rounded-full flex-shrink-0 ${!isFirstOrSecond && !isBestThird ? 'bg-slate-800' : ''}`} 
                        style={(isFirstOrSecond || isBestThird) ? { backgroundColor: TEAMS[team.code]?.color, boxShadow: `0 0 6px ${TEAMS[team.code]?.color}80` } : {}}
                      />
                      <span className={`text-[11px] ${isFirstOrSecond ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : isBestThird ? 'drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]' : ''}`}>{TEAMS[team.code]?.emoji}</span>
                      <span 
                        className="px-1 py-[0.5px] rounded text-[6px] font-black uppercase tracking-wider" 
                        style={{ backgroundColor: TEAMS[team.code]?.color, color: TEAMS[team.code]?.textColor }}
                      >
                        {team.code}
                      </span>
                      <span className={`font-bold truncate max-w-[60px] text-[9px] ${isFirstOrSecond ? 'text-emerald-50' : isBestThird ? 'text-blue-50' : 'text-slate-200'}`}>
                        {TEAMS[team.code]?.name}
                      </span>
                      {team.isQ && <span className="ml-0.5 text-[7px] font-black text-emerald-400" title="Guaranteed Top 2">(Q)</span>}
                      {team.isE && <span className="ml-0.5 text-[7px] font-black text-red-500" title="Mathematically Eliminated">(E)</span>}
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
                    <td className={`py-1 text-center font-black cursor-help ${highlightClass}`} title={team.tiebreakerReason}>
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
    </div>
  );
}
