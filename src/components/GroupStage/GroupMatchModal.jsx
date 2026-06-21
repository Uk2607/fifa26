import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TEAMS } from '../../constants/teams';
import { GROUPS_CONFIG, GROUP_MATCH_PAIRINGS, GROUP_MATCH_NUMBERS } from '../../constants/groups';
import { PRESET_SCORES } from '../../constants/presetScores';

// ── Tiny card input ──────────────────────────────────────────────────────────
function CardInput({ color, label, value, field, matchId, onScoreChange, disabled, reversed }) {
  const square = (
    <span
      className="w-2.5 h-3.5 rounded-[2px] inline-block flex-shrink-0 border"
      style={{
        backgroundColor: color,
        borderColor: color,
        opacity: disabled ? 0.4 : 0.9,
      }}
    />
  );
  const input = (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      placeholder="0"
      value={value === 0 ? '' : value}
      disabled={disabled}
      onChange={(e) => onScoreChange(matchId, field, e.target.value)}
      className={`w-5 h-5 rounded text-center text-[8px] font-bold outline-none transition-all ${disabled
        ? 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
        : 'bg-slate-800/60 text-slate-300 border border-slate-700/60 focus:border-slate-500 focus:ring-1 focus:ring-slate-500'
        }`}
    />
  );
  return (
    <label className="flex items-center gap-0.5 cursor-pointer" title={label}>
      {reversed ? <>{input}{square}</> : <>{square}{input}</>}
    </label>
  );
}

// ================================================================================
// 🏟️ GROUP MATCH MODAL — compact popup with all fixtures for a group
// ================================================================================
export default function GroupMatchModal({ groupName, matches, standings, bestThirdsQualified, onScoreChange, onClose }) {
  const [isFlipped, setIsFlipped] = useState(false);
  if (!groupName) return null;

  const teamsList = GROUPS_CONFIG[groupName];

  // Get table data for this group
  const groupStandings = standings || [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Scene */}
        <div
          className="w-full max-w-[480px] md:max-w-[900px] h-full md:h-auto max-h-[95vh] flex flex-col [perspective:1000px]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Card */}
          <div
            className="relative w-full h-full md:h-auto flex flex-col md:flex-row md:items-center justify-center gap-4"
          >
            {/* ── FRONT FACE: FIXTURES (Left on Desktop) ── */}
            <div className={`w-full md:w-[480px] flex-1 min-h-0 md:flex-none md:h-auto max-h-[95vh] flex-col p-[1px] bg-gradient-to-br from-emerald-500/40 via-slate-800/40 to-slate-700/40 rounded-2xl shadow-2xl ${isFlipped ? 'hidden md:flex' : 'flex'}`}>
              <div className="flex-1 flex flex-col min-h-0 bg-slate-900/95 backdrop-blur-xl rounded-[15px] overflow-hidden">
                {/* Header */}
                <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-800/60 bg-slate-950/40">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-sm font-black text-emerald-400 border border-emerald-500/20">
                      {groupName}
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase text-slate-200 tracking-wider">Group {groupName}</h3>
                      <p className="text-[9px] text-slate-500 mt-0.5">Match Predictor</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onClose}
                      className="ml-1 w-7 h-7 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 flex items-center justify-center transition-all hover:border-slate-600"
                    >
                      <X className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Mobile Tabs */}
                <div className="md:hidden flex border-b border-slate-800/60 flex-shrink-0">
                  <button className="flex-1 py-2 text-xs font-bold text-emerald-400 bg-emerald-950/20 border-b-2 border-emerald-500">Fixtures</button>
                  <button className="flex-1 py-2 text-xs font-bold text-slate-400 hover:text-slate-300 transition-colors" onClick={() => setIsFlipped(true)}>Live Table</button>
                </div>

                {/* Fixtures List */}
                <div className="flex-1 p-3 space-y-2 overflow-y-auto overscroll-contain min-h-0">
                  {GROUP_MATCH_PAIRINGS
                    .map((match, idx) => ({ match, idx, matchNum: GROUP_MATCH_NUMBERS[`G-${groupName}-${idx}`] || 0 }))
                    .sort((a, b) => a.matchNum - b.matchNum)
                    .map(({ match, idx, matchNum }) => {
                      const id = `G-${groupName}-${idx}`;
                      const state = matches[id] || {
                        score1: '', score2: '', status: 'upcoming',
                        yellow1: 0, yellow2: 0,
                        secondYellow1: 0, secondYellow2: 0,
                        red1: 0, red2: 0,
                      };
                      const t1Code = teamsList[match.t1];
                      const t2Code = teamsList[match.t2];
                      const isLocked = state.status === 'locked';
                      const isOpen = state.status === 'open';

                      const s1 = state.score1 !== '' ? parseInt(state.score1, 10) : NaN;
                      const s2 = state.score2 !== '' ? parseInt(state.score2, 10) : NaN;
                      const hasScores = !isNaN(s1) && !isNaN(s2);
                      const isT1Winner = isLocked && hasScores && s1 > s2;
                      const isT2Winner = isLocked && hasScores && s2 > s1;

                      // Border/bg color coding
                      const borderColor = isLocked
                        ? 'border-amber-500/30'
                        : isOpen
                          ? 'border-emerald-500/30'
                          : 'border-slate-800/60';
                      const bgColor = isLocked
                        ? 'bg-amber-950/10'
                        : isOpen
                          ? 'bg-emerald-950/10'
                          : 'bg-slate-950';

                      return (
                        <div key={id} className="relative">
                          {/* Match number label */}
                          <div className="absolute -top-1 left-2 z-10">
                            <span className={`text-[7px] font-bold uppercase px-1 py-px rounded ${isLocked ? 'bg-amber-500/20 text-amber-400' : isOpen ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                              }`}>
                              {matchNum > 0 ? `M${matchNum}` : '—'}
                            </span>
                          </div>

                          {/* Score row */}
                          <div className={`flex items-center justify-center px-3 pt-2 pb-1 rounded-t-lg border border-b-0 ${borderColor} ${bgColor}`}>
                            {/* Team 1 */}
                            <div className="flex items-center gap-1.5 justify-end w-[140px]">
                              <span className={`text-[10px] truncate text-right font-medium transition-colors ${isT1Winner ? 'text-white font-bold' : isT2Winner ? 'text-slate-500' : 'text-slate-300'}`}>{TEAMS[t1Code]?.name}</span>
                              <span className={`text-sm flex-shrink-0 transition-opacity ${isT2Winner ? 'opacity-40 grayscale' : ''}`}>{TEAMS[t1Code]?.emoji}</span>
                            </div>

                            {/* Score inputs */}
                            <div className="flex items-center gap-1.5 mx-3 flex-shrink-0">
                              <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="-"
                                value={state.score1}
                                disabled={isLocked}
                                onChange={(e) => onScoreChange(id, 'score1', e.target.value)}
                                className={`w-7 h-7 rounded-md text-center text-xs font-black outline-none transition-all ${isLocked
                                  ? `cursor-not-allowed border ${isT1Winner ? 'text-amber-400 bg-amber-950/30 border-amber-500/30' : isT2Winner ? 'text-slate-600 bg-slate-850 border-slate-800' : 'text-slate-400 bg-slate-850 border-slate-800'}`
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
                                className={`w-7 h-7 rounded-md text-center text-xs font-black outline-none transition-all ${isLocked
                                  ? `cursor-not-allowed border ${isT2Winner ? 'text-amber-400 bg-amber-950/30 border-amber-500/30' : isT1Winner ? 'text-slate-600 bg-slate-850 border-slate-800' : 'text-slate-400 bg-slate-850 border-slate-800'}`
                                  : 'bg-slate-800 text-white border border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                                  }`}
                              />
                            </div>

                            {/* Team 2 */}
                            <div className="flex items-center gap-1.5 justify-start w-[140px]">
                              <span className={`text-sm flex-shrink-0 transition-opacity ${isT1Winner ? 'opacity-40 grayscale' : ''}`}>{TEAMS[t2Code]?.emoji}</span>
                              <span className={`text-[10px] truncate font-medium transition-colors ${isT2Winner ? 'text-white font-bold' : isT1Winner ? 'text-slate-500' : 'text-slate-300'}`}>{TEAMS[t2Code]?.name}</span>
                            </div>
                          </div>

                          {/* Status Toggle Row */}
                          <div className={`flex items-center justify-center border-x ${borderColor} ${bgColor} pb-1`}>
                            <div className="flex items-center bg-slate-900/80 rounded-full border border-slate-800/80 p-0.5">
                              {['upcoming', 'open', 'locked'].map(s => {
                                const isSelected = state.status === s;
                                const isPresetLocked = PRESET_SCORES[id]?.status === 'locked';
                                const isDisabled = isPresetLocked && s !== 'locked';
                                return (
                                  <button
                                    key={s}
                                    disabled={isDisabled}
                                    onClick={() => onScoreChange(id, 'status', s)}
                                    className={`px-2.5 py-0.5 text-[8px] font-bold rounded-full uppercase transition-all flex items-center justify-center gap-1.5 ${
                                      isSelected
                                        ? (s === 'locked' ? 'bg-amber-500/20 text-amber-400' : s === 'open' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300')
                                        : 'text-slate-500 hover:text-slate-400'
                                    } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                  >
                                    {s === 'open' && isSelected && (
                                      <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                      </span>
                                    )}
                                    {s}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Card inputs row */}
                          <div className={`flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-b-lg border border-t-0 ${borderColor} ${isLocked ? 'bg-amber-950/5' : isOpen ? 'bg-emerald-950/5' : 'bg-slate-950/80'}`}>
                            <div className="flex items-center justify-between w-full">
                              {/* Team 1 Cards */}
                              <div className="flex items-center gap-2">
                                <CardInput color="#eab308" label="Yellow Card" value={state.yellow1} field="yellow1" matchId={id} onScoreChange={onScoreChange} disabled={isLocked} />
                                <CardInput color="#f59e0b" label="Second Yellow" value={state.secondYellow1} field="secondYellow1" matchId={id} onScoreChange={onScoreChange} disabled={isLocked} />
                                <CardInput color="#ef4444" label="Direct Red" value={state.red1} field="red1" matchId={id} onScoreChange={onScoreChange} disabled={isLocked} />
                              </div>

                              <span className="text-slate-800 text-[8px]">│</span>

                              {/* Team 2 Cards */}
                              <div className="flex items-center gap-2">
                                <CardInput color="#ef4444" label="Direct Red" value={state.red2} field="red2" matchId={id} onScoreChange={onScoreChange} disabled={isLocked} reversed />
                                <CardInput color="#f59e0b" label="Second Yellow" value={state.secondYellow2} field="secondYellow2" matchId={id} onScoreChange={onScoreChange} disabled={isLocked} reversed />
                                <CardInput color="#eab308" label="Yellow Card" value={state.yellow2} field="yellow2" matchId={id} onScoreChange={onScoreChange} disabled={isLocked} reversed />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Footer legend */}
                <div className="flex-shrink-0 flex items-center justify-center gap-4 py-2.5 border-t border-slate-800/60 bg-slate-950/40 flex-wrap">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-3.5 rounded-[2px] bg-yellow-500 inline-block" />
                    <span className="text-[8px] text-slate-500">Yellow (−1)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-3.5 rounded-[2px] bg-amber-500 inline-block" />
                    <span className="text-[8px] text-slate-500">2nd Yellow (−3)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-3.5 rounded-[2px] bg-red-500 inline-block" />
                    <span className="text-[8px] text-slate-500">Red (−4)</span>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <span className="w-3 h-2 rounded-sm border border-amber-500/40 bg-amber-950/20 inline-block" />
                    <span className="text-[8px] text-slate-500">Locked</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-2 rounded-sm border border-emerald-500/40 bg-emerald-950/20 inline-block" />
                    <span className="text-[8px] text-slate-500">Open</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── BACK FACE: TABLE (Right on Desktop) ── */}
            <div className={`w-full md:w-[400px] flex-1 min-h-0 md:flex-none md:h-auto max-h-[95vh] flex-col p-[1px] bg-gradient-to-br from-slate-700/40 via-slate-800/40 to-slate-900/40 rounded-2xl shadow-2xl ${!isFlipped ? 'hidden md:flex' : 'flex'}`}>
              <div className="flex-1 flex flex-col min-h-0 bg-slate-900/95 backdrop-blur-xl rounded-[15px] overflow-hidden">
                {/* Header */}
                <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-800/60 bg-slate-950/40">
                  <h3 className="text-sm font-black uppercase text-slate-200 tracking-wider">Live Table</h3>
                  <button onClick={onClose} className="md:hidden ml-1 w-7 h-7 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 flex items-center justify-center transition-all hover:border-slate-600">
                    <X className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>

              {/* Mobile Tabs */}
              <div className="md:hidden flex border-b border-slate-800/60 flex-shrink-0">
                <button className="flex-1 py-2 text-xs font-bold text-slate-400 hover:text-slate-300 transition-colors" onClick={() => setIsFlipped(false)}>Fixtures</button>
                <button className="flex-1 py-2 text-xs font-bold text-emerald-400 bg-emerald-950/20 border-b-2 border-emerald-500">Live Table</button>
              </div>

              {/* Table List */}
              <div className="flex-1 p-4 overflow-y-auto overscroll-contain min-h-0">
                <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/40">
                  <table className="w-full text-xs text-left min-w-[320px]">
                    <thead>
                      <tr className="bg-slate-900/60 text-slate-400 border-b border-slate-800">
                        <th className="py-2 pl-3 font-semibold uppercase text-[10px]">Team</th>
                        <th className="py-2 text-center font-semibold text-[10px]" title="Played">P</th>
                        <th className="py-2 text-center font-semibold text-[10px]" title="Won">W</th>
                        <th className="py-2 text-center font-semibold text-[10px]" title="Drawn">D</th>
                        <th className="py-2 text-center font-semibold text-[10px]" title="Lost">L</th>
                        <th className="py-2 text-center font-semibold text-[10px]" title="Goals For">GF</th>
                        <th className="py-2 text-center font-semibold text-[10px]" title="Goals Against">GA</th>
                        <th className="py-2 text-center font-semibold text-[10px]" title="Goal Difference">GD</th>
                        <th className="py-2 text-center font-semibold text-[10px]" title="Fair Play Points">FP</th>
                        <th className="py-2 pr-2 text-center font-bold text-emerald-400">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupStandings.map((team, index) => {
                        const isFirstOrSecond = index < 2;
                        const isBestThird = index === 2 && bestThirdsQualified?.includes(team.code);
                        const highlightClass = isFirstOrSecond ? 'text-emerald-400' : isBestThird ? 'text-blue-400' : 'text-slate-500';

                        return (
                          <tr
                            key={team.code}
                            className={`border-b border-slate-800/60 last:border-0 transition-all ${isFirstOrSecond ? 'bg-emerald-900/20 hover:bg-emerald-900/30' : isBestThird ? 'bg-blue-900/20 hover:bg-blue-900/30' : 'hover:bg-slate-800/30'}`}
                          >
                            <td className="py-2.5 flex items-center gap-2 font-medium pl-3">
                              <span
                                className={`w-1.5 h-3 rounded-full flex-shrink-0 ${isFirstOrSecond ? "bg-emerald-500" : isBestThird ? "bg-blue-400" : "bg-slate-700"}`}
                              />
                              <span className={`text-sm ${isFirstOrSecond ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : isBestThird ? 'drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]' : ''}`}>
                                {TEAMS[team.code]?.emoji}
                              </span>
                              <span className={`font-bold truncate max-w-[100px] text-[11px] ${isFirstOrSecond ? 'text-emerald-400' : isBestThird ? 'text-blue-400' : 'text-slate-300'}`}>
                                {TEAMS[team.code]?.name}
                              </span>
                            </td>
                            <td className="py-2.5 text-center font-bold text-slate-400">
                              {team.played}
                            </td>
                            <td className="py-2.5 text-center font-bold text-slate-400">
                              {team.won}
                            </td>
                            <td className="py-2.5 text-center font-bold text-slate-400">
                              {team.drawn}
                            </td>
                            <td className="py-2.5 text-center font-bold text-slate-400">
                              {team.lost}
                            </td>
                            <td className="py-2.5 text-center font-bold text-slate-300">
                              {team.gf}
                            </td>
                            <td className="py-2.5 text-center font-bold text-slate-300">
                              {team.ga}
                            </td>
                            <td
                              className={`py-2.5 text-center font-bold ${team.gd >= 0 ? "text-slate-300" : "text-red-400"}`}
                            >
                              {team.gd >= 0 ? `+${team.gd}` : team.gd}
                            </td>
                            <td
                              className={`py-2.5 text-center font-bold text-[10px] ${team.fairPlay < 0 ? "text-amber-400" : "text-slate-500"}`}
                            >
                              {team.fairPlay || 0}
                            </td>
                            <td
                              className={`py-2.5 text-center font-black pr-2 cursor-help ${highlightClass}`}
                              title={team.tiebreakerReason}
                            >
                              {team.pts}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Qualification Legend */}
                <div className="mt-4 flex flex-wrap gap-3 items-center justify-center text-[10px] font-medium text-slate-400 bg-slate-900/40 p-2 rounded-lg border border-slate-800/60">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-3 bg-emerald-500 rounded-full" />
                    <span>Top 2 Advance</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-3 bg-blue-400 rounded-full" />
                    <span>Best 8 Thirds Advance</span>
                  </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
