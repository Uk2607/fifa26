import React from 'react';
import { TEAMS } from '../../constants/teams';

// ================================================================================
// 🏟️ GROUP WIDGET — standings table (click opens modal popup)
// ================================================================================
const GroupWidget = React.memo(function GroupWidget({
  groupName,
  teamsList,
  standings,
  onToggle,
  bestThirdsQualified
}) {
  return (
    <div
      style={{ fontSize: `calc(10px * var(--zoom-scale, 1))` }} className="rounded-[1.6em] overflow-hidden p-[0.1em] bg-gradient-to-br from-theme-border/60 via-theme-border/20 to-theme-border/60 hover:from-emerald-500/50 hover:via-theme-border/50 hover:to-blue-500/50 cursor-pointer group shadow-lg"
      onClick={() => onToggle(groupName)}
    >
      <div className="bg-card-bg/80 rounded-[1.5em] overflow-hidden h-full flex flex-col">

        {/* Clickable Header */}
        <div className="w-full px-[1.2em] py-[1em] flex items-center justify-between text-left">
          <div className="flex items-center gap-2">
            <div className="w-[2em] h-[2em] bg-emerald-500/10 rounded-[0.4em] flex items-center justify-center text-[1em] font-black text-emerald-400 border border-emerald-500/20">
              {groupName}
            </div>
            {/* <span className="font-extrabold text-slate-200 text-[1.2em] tracking-wider uppercase">Group {groupName}</span> */}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-1">
              {teamsList.map(code => (
                <span key={code} className="shadow-sm border border-theme-border/50 rounded-[0.2em] overflow-hidden leading-none" title={TEAMS[code]?.name}>
                  <img src={`https://flagcdn.com/${TEAMS[code]?.iso2}.svg`} alt="flag" className="block w-[1.6em] h-[1.1em] object-cover" />
                </span>
              ))}
            </div>
            <span className="text-[0.8em] text-slate-500 font-bold uppercase tracking-wider hidden group-hover:block ml-1">
              Open ↗
            </span>
          </div>
        </div>

        {/* ── Enriched Standings Table ── */}
        <div className="px-[1em] pb-[1em] border-t border-theme-border/40 pt-[0.6em] bg-app-bg/20">
          <div className="overflow-x-auto">
            <table className="w-full text-[1em] text-left min-w-[29em]">
              <thead>
                <tr className="text-slate-500 font-bold border-b border-theme-border/80 uppercase text-[0.7em] tracking-wider">
                  <th className="py-[0.2em] pl-[0.2em]">Team</th>
                  <th className="py-[0.2em] text-center w-[2.2em]">PL</th>
                  <th className="py-[0.2em] text-center w-[2.2em]">W</th>
                  <th className="py-[0.2em] text-center w-[2.2em]">D</th>
                  <th className="py-[0.2em] text-center w-[2.2em]">L</th>
                  <th className="py-[0.2em] text-center w-[2.4em]">GF</th>
                  <th className="py-[0.2em] text-center w-[2.4em]">GA</th>
                  <th className="py-[0.2em] text-center w-[2.8em]">GD</th>
                  <th className="py-[0.2em] text-center w-[2.8em]" title="Fair Play">FP</th>
                  <th className="py-[0.2em] text-center w-[3em] text-amber-400 font-extrabold">PTS</th>
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
                      className={`border-b border-theme-border/50 last:border-0 transition-all ${isFirstOrSecond ? 'bg-emerald-500/15 hover:bg-emerald-500/25' : isBestThird ? 'bg-blue-500/15 hover:bg-blue-500/25' : 'hover:bg-slate-800/10'}`}
                    >
                      <td className="py-[0.4em] flex items-center gap-[0.4em] font-medium pl-[0.2em]">
                        <span
                          className={`w-[0.4em] h-[0.8em] rounded-full flex-shrink-0 ${!isFirstOrSecond && !isBestThird ? 'bg-slate-800' : ''}`}
                          style={(isFirstOrSecond || isBestThird) ? { backgroundColor: TEAMS[team.code]?.color, boxShadow: `0 0 6px ${TEAMS[team.code]?.color}80` } : {}}
                        />
                        <span className={`text-[1.1em] ${isFirstOrSecond ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : isBestThird ? 'drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]' : ''}`}><img src={`https://flagcdn.com/${TEAMS[team.code]?.iso2}.svg`} alt="flag" className="inline-block w-[1.6em] h-[1.1em] object-cover rounded-[0.2em]" /></span>
                        <span
                          className="px-[0.4em] py-[0.05em] rounded-[0.4em] text-[0.6em] font-black uppercase tracking-wider"
                          style={{ backgroundColor: TEAMS[team.code]?.color, color: TEAMS[team.code]?.textColor }}
                        >
                          {team.code}
                        </span>
                        <span className={`font-bold truncate max-w-[12em] text-[0.9em] ${isFirstOrSecond ? 'text-emerald-50' : isBestThird ? 'text-blue-50' : 'text-slate-200'}`}>
                          {TEAMS[team.code]?.name}
                        </span>
                        {team.isQ && <span className="ml-[0.2em] text-[0.7em] font-black text-emerald-400" title="Guaranteed Top 2">(Q)</span>}
                        {team.isE && <span className="ml-[0.2em] text-[0.7em] font-black text-red-500" title="Mathematically Eliminated">(E)</span>}
                      </td>
                      <td className="py-[0.4em] text-center font-bold text-slate-400">{team.played}</td>
                      <td className="py-[0.4em] text-center font-bold text-slate-400">{team.won}</td>
                      <td className="py-[0.4em] text-center font-bold text-slate-400">{team.drawn}</td>
                      <td className="py-[0.4em] text-center font-bold text-slate-400">{team.lost}</td>
                      <td className="py-[0.4em] text-center font-bold text-slate-300">{team.gf}</td>
                      <td className="py-[0.4em] text-center font-bold text-slate-300">{team.ga}</td>
                      <td className={`py-[0.4em] text-center font-bold ${team.gd >= 0 ? 'text-slate-300' : 'text-red-400'}`}>
                        {team.gd >= 0 ? `+${team.gd}` : team.gd}
                      </td>
                      <td className={`py-[0.4em] text-center font-bold text-[0.9em] ${team.fairPlay < 0 ? 'text-amber-400' : 'text-slate-500'
                        }`}>
                        {team.fairPlay || 0}
                      </td>
                      <td className={`py-[0.4em] text-center font-black cursor-help ${highlightClass}`} title={team.tiebreakerReason}>
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
});

export default GroupWidget;
