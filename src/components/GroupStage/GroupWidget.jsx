import React from 'react';
import { Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { TEAMS } from '../../constants/teams';
import { GROUP_MATCH_PAIRINGS } from '../../constants/groups';
import { PRESET_SCORES } from '../../constants/presetScores';

export default function GroupWidget({
  groupName,
  teamsList,
  standings,
  matches,
  onScoreChange,
  isExpanded,
  onToggle,
  bestThirdsQualified
}) {
  return (
    <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${isExpanded
      ? 'border-emerald-500/40 bg-slate-900/70 shadow-lg shadow-emerald-500/5'
      : 'border-slate-800/80 hover:border-slate-750 bg-slate-900/30'
      }`}>

      {/* Clickable Header */}
      <button
        onClick={onToggle}
        className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-slate-800/20 active:bg-slate-800/40 transition"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-emerald-500/10 rounded flex items-center justify-center text-[10px] font-black text-emerald-400 border border-emerald-500/20">
            {groupName}
          </div>
          <span className="font-extrabold text-slate-200 text-xs tracking-wider uppercase">Group {groupName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1">
            {teamsList.map(code => (
              <span key={code} className="text-[10px] transform scale-95 border border-slate-900 rounded-full" title={TEAMS[code]?.name}>
                {TEAMS[code]?.emoji}
              </span>
            ))}
          </div>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </div>
      </button>

      {/* Standings list */}
      <div className="px-3 pb-2.5 border-t border-slate-800/40 pt-1.5 bg-slate-950/20">
        <table className="w-full text-[10px] text-left">
          <thead>
            <tr className="text-slate-500 font-bold border-b border-slate-900/80 pb-1 uppercase text-[8px] tracking-wider">
              <th className="py-0.5">Team</th>
              <th className="py-0.5 text-center w-7">PL</th>
              <th className="py-0.5 text-center w-7">GD</th>
              <th className="py-0.5 text-center w-7 text-amber-400 font-extrabold">PTS</th>
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
                  <td className="py-1 flex items-center gap-1.5 font-medium">
                    <span className={`w-1 h-2 rounded-full ${isFirstOrSecond ? 'bg-emerald-500' : isBestThird ? 'bg-blue-400' : 'bg-slate-800'
                      }`}></span>
                    <span className="text-[11px]">{TEAMS[team.code]?.emoji}</span>
                    <span className="text-slate-200 font-bold truncate max-w-[90px]">{TEAMS[team.code]?.name}</span>
                  </td>
                  <td className="py-1 text-center font-bold text-slate-300">{team.played}</td>
                  <td className={`py-1 text-center font-bold ${team.gd >= 0 ? 'text-slate-300' : 'text-red-400'}`}>
                    {team.gd >= 0 ? `+${team.gd}` : team.gd}
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

      {/* Fixtures Expanded Draw Area */}
      {isExpanded && (
        <div className="bg-slate-900/70 p-2.5 border-t border-slate-850 space-y-1.5 animate-fadeIn">
          <div className="text-[8px] font-black uppercase text-amber-400 tracking-wider flex items-center justify-between mb-1.5">
            <span>Match Predictor Draw</span>
            <span className="text-slate-500 font-normal normal-case">Updates group standings live</span>
          </div>

          <div className="space-y-1.5">
            {GROUP_MATCH_PAIRINGS.map((match, idx) => {
              const id = `G-${groupName}-${idx}`;
              const state = matches[id] || { score1: '', score2: '', locked: false };
              const t1Code = teamsList[match.t1];
              const t2Code = teamsList[match.t2];
              const isLocked = PRESET_SCORES[id]?.locked;

              return (
                <div
                  key={id}
                  className={`flex items-center justify-between p-1.5 rounded border ${isLocked ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-950 border-slate-900/60'
                    }`}
                >
                  <div className="text-[8px] text-slate-500 font-bold uppercase w-10">{match.date}</div>

                  <div className="flex items-center gap-1 flex-grow justify-end pr-1.5 max-w-[95px] truncate">
                    <span className="text-[10px] truncate text-slate-300 text-right font-medium">{TEAMS[t1Code]?.name}</span>
                    <span className="text-xs">{TEAMS[t1Code]?.emoji}</span>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <input
                      type="text"
                      pattern="[0-9]*"
                      placeholder="-"
                      value={state.score1}
                      disabled={isLocked}
                      onChange={(e) => onScoreChange(id, 'score1', e.target.value)}
                      className={`w-6 h-6 rounded text-center text-xs font-black outline-none transition-all ${isLocked
                        ? 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-800'
                        : 'bg-slate-800 text-white border border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                        }`}
                    />
                    <span className="text-slate-600 font-black text-[10px]">:</span>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      placeholder="-"
                      value={state.score2}
                      disabled={isLocked}
                      onChange={(e) => onScoreChange(id, 'score2', e.target.value)}
                      className={`w-6 h-6 rounded text-center text-xs font-black outline-none transition-all ${isLocked
                        ? 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-800'
                        : 'bg-slate-800 text-white border border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                        }`}
                    />
                  </div>

                  <div className="flex items-center gap-1 flex-grow pl-1.5 max-w-[95px] truncate">
                    <span className="text-xs">{TEAMS[t2Code]?.emoji}</span>
                    <span className="text-[10px] truncate text-slate-300 font-medium">{TEAMS[t2Code]?.name}</span>
                  </div>

                  <div className="w-3 text-center">
                    {isLocked && <Lock className="w-2.5 h-2.5 text-amber-500 mx-auto" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
