import React from 'react';
import { Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { TEAMS } from '../../constants/teams';
import { GROUP_MATCH_PAIRINGS, GROUP_MATCH_NUMBERS } from '../../constants/groups';
import { PRESET_SCORES } from '../../constants/presetScores';

// ── Tiny card input ──────────────────────────────────────────────────────────
function CardInput({ color, label, value, field, matchId, onScoreChange, disabled }) {
  return (
    <label className="flex items-center gap-0.5 cursor-pointer" title={label}>
      <span
        className="w-2 h-3 rounded-[2px] inline-block flex-shrink-0 border"
        style={{
          backgroundColor: color,
          borderColor: color,
          opacity: disabled ? 0.4 : 0.9,
        }}
      />
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value || 0}
        disabled={disabled}
        onChange={(e) => onScoreChange(matchId, field, e.target.value)}
        className={`w-4 h-4 rounded text-center text-[7px] font-bold outline-none transition-all ${disabled
          ? 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
          : 'bg-slate-800/60 text-slate-300 border border-slate-700/60 focus:border-slate-500 focus:ring-1 focus:ring-slate-500'
          }`}
      />
    </label>
  );
}

// ================================================================================
// 🏟️ GROUP WIDGET — standings table + match predictor + card inputs
// ================================================================================
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

      {/* ── Fixtures Expanded Draw Area ── */}
      {isExpanded && (
        <div className="bg-slate-900/70 p-2.5 border-t border-slate-850 space-y-1.5 animate-fadeIn">
          <div className="text-[8px] font-black uppercase text-amber-400 tracking-wider flex items-center justify-between mb-1.5">
            <span>Match Predictor Draw</span>
            <span className="text-slate-500 font-normal normal-case">Scores & cards update standings live</span>
          </div>

          <div className="space-y-2.5">
            {GROUP_MATCH_PAIRINGS
              .map((match, idx) => ({ match, idx, matchNum: GROUP_MATCH_NUMBERS[`G-${groupName}-${idx}`] || 0 }))
              .sort((a, b) => a.matchNum - b.matchNum)
              .map(({ match, idx, matchNum }) => {
                const id = `G-${groupName}-${idx}`;
                const state = matches[id] || {
                  score1: '', score2: '', locked: false,
                  yellow1: 0, yellow2: 0,
                  secondYellow1: 0, secondYellow2: 0,
                  red1: 0, red2: 0,
                };
                const t1Code = teamsList[match.t1];
                const t2Code = teamsList[match.t2];
                const isLocked = PRESET_SCORES[id]?.locked;

                return (
                  <div key={id} className="space-y-0.5">
                    {/* Score row */}
                    <div
                      className={`flex items-center justify-between p-1.5 rounded-t border ${isLocked ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-950 border-slate-900/60'
                        }`}
                    >
                      <div className="text-[8px] text-slate-500 font-bold uppercase w-10" title={`Match ${matchNum}`}>
                        {matchNum > 0 ? `M${matchNum}` : '—'}
                      </div>

                      <div className="flex items-center gap-1 flex-grow justify-end pr-1.5 max-w-[95px] truncate">
                        <span className="text-[10px] truncate text-slate-300 text-right font-medium">{TEAMS[t1Code]?.name}</span>
                        <span className="text-xs">{TEAMS[t1Code]?.emoji}</span>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <input
                          type="text"
                          inputMode="numeric"
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
                          inputMode="numeric"
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

                    {/* Card inputs row */}
                    <div className={`flex items-center justify-center gap-3 px-2 py-1 rounded-b border border-t-0 ${isLocked ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-950/80 border-slate-900/60'
                      }`}>
                      {/* Team 1 cards */}
                      <div className="flex items-center gap-0.5 text-[7px] text-slate-500">
                        <span className="text-[8px] mr-0.5 opacity-60">{TEAMS[t1Code]?.emoji}</span>
                        {/* IMPORTANT: Not tracking yellow cards for now */}
                        {/* <CardInput color="#facc15" label="Yellow Cards" value={state.yellow1} field="yellow1" matchId={id} onScoreChange={onScoreChange} disabled={isLocked} />
                        <CardInput color="#f97316" label="2nd Yellow → Red" value={state.secondYellow1} field="secondYellow1" matchId={id} onScoreChange={onScoreChange} disabled={isLocked} /> */}
                        <CardInput color="#ef4444" label="Direct Red Card" value={state.red1} field="red1" matchId={id} onScoreChange={onScoreChange} disabled={isLocked} />
                      </div>

                      <span className="text-slate-800 text-[8px]">│</span>

                      {/* Team 2 cards */}
                      <div className="flex items-center gap-0.5 text-[7px] text-slate-500">
                        {/* IMPORTANT: Not tracking yellow cards for now */}
                        {/* <CardInput color="#facc15" label="Yellow Cards" value={state.yellow2} field="yellow2" matchId={id} onScoreChange={onScoreChange} disabled={isLocked} />
                        <CardInput color="#f97316" label="2nd Yellow → Red" value={state.secondYellow2} field="secondYellow2" matchId={id} onScoreChange={onScoreChange} disabled={isLocked} /> */}
                        <CardInput color="#ef4444" label="Direct Red Card" value={state.red2} field="red2" matchId={id} onScoreChange={onScoreChange} disabled={isLocked} />
                        <span className="text-[8px] ml-0.5 opacity-60">{TEAMS[t2Code]?.emoji}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Card legend */}
          <div className="flex items-center justify-center gap-3 pt-1 border-t border-slate-900/50 mt-2">
            <div className="flex items-center gap-1">
              <span className="w-2 h-3 rounded-[2px] bg-yellow-400 inline-block" />
              <span className="text-[7px] text-slate-500">Yellow (−1)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-3 rounded-[2px] bg-orange-400 inline-block" />
              <span className="text-[7px] text-slate-500">2nd Yellow (−3)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-3 rounded-[2px] bg-red-500 inline-block" />
              <span className="text-[7px] text-slate-500">Red (−4)</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
