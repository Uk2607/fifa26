import React from 'react';
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
export default function GroupMatchModal({ groupName, matches, onScoreChange, onClose }) {
  if (!groupName) return null;

  const teamsList = GROUPS_CONFIG[groupName];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/40 w-full max-w-[480px] max-h-[95vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-800/60 bg-slate-950/40">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-sm font-black text-emerald-400 border border-emerald-500/20">
                {groupName}
              </div>
              <div>
                <h3 className="text-sm font-black uppercase text-slate-200 tracking-wider">Group {groupName}</h3>
                <p className="text-[9px] text-slate-500 mt-0.5">Match Predictor — Scores & cards update standings live</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {teamsList.map(code => (
                  <span key={code} className="text-sm border border-slate-800 rounded-full" title={TEAMS[code]?.name}>
                    {TEAMS[code]?.emoji}
                  </span>
                ))}
              </div>
              <button
                onClick={onClose}
                className="ml-1 w-7 h-7 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 flex items-center justify-center transition-all hover:border-slate-600"
              >
                <X className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Fixtures */}
          <div className="p-3 space-y-2 overflow-y-auto min-h-0">
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

                // Border/bg color coding: amber for locked, emerald for open, default for upcoming
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
                    {/* Match number label — positioned top-left, outside flow */}
                    <div className="absolute -top-1 left-2 z-10">
                      <span className={`text-[7px] font-bold uppercase px-1 py-px rounded ${isLocked ? 'bg-amber-500/20 text-amber-400' : isOpen ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                        }`}>
                        {matchNum > 0 ? `M${matchNum}` : '—'}
                      </span>
                    </div>

                    {/* Score row */}
                    <div className={`flex items-center justify-center px-3 pt-2 pb-1 rounded-t-lg border border-b-0 ${borderColor} ${bgColor}`}>
                      {/* Team 1 — right aligned, fixed width */}
                      <div className="flex items-center gap-1.5 justify-end w-[140px]">
                        <span className={`text-[10px] truncate text-right font-medium transition-colors ${isT1Winner ? 'text-white font-bold' : isT2Winner ? 'text-slate-500' : 'text-slate-300'}`}>{TEAMS[t1Code]?.name}</span>
                        <span className={`text-sm flex-shrink-0 transition-opacity ${isT2Winner ? 'opacity-40 grayscale' : ''}`}>{TEAMS[t1Code]?.emoji}</span>
                      </div>

                      {/* Score inputs — centered */}
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

                      {/* Team 2 — left aligned, fixed width */}
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
                              className={`px-2.5 py-0.5 text-[8px] font-bold rounded-full uppercase transition-all ${
                                isSelected 
                                  ? (s === 'locked' ? 'bg-amber-500/20 text-amber-400' : s === 'open' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300')
                                  : 'text-slate-500 hover:text-slate-400'
                              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
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
          <div className="flex-shrink-0 flex items-center justify-center gap-4 px-4 py-2 border-t border-slate-800/60 bg-slate-950/40 flex-wrap">
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
    </>
  );
}
