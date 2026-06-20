import React from 'react';
import { Zap } from 'lucide-react';
import { TEAMS } from '../../constants/teams';
import { GROUPS_CONFIG, GROUP_MATCH_PAIRINGS, GROUP_MATCH_NUMBERS } from '../../constants/groups';

// ── Tiny card input ──────────────────────────────────────────────────────────
function CardInput({ color, label, value, field, matchId, onScoreChange, disabled, reversed }) {
  const square = (
    <span
      className="w-2 h-3 rounded-[2px] inline-block flex-shrink-0 border"
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
      className={`w-4 h-4 rounded text-center text-[7px] font-bold outline-none transition-all ${disabled
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
// ⚡ OPEN MATCHES QUICK ACCESS PANEL
// Shows all matches with status "open" for quick predictions
// ================================================================================
export default function OpenMatchesPanel({ groupMatches, onScoreChange }) {
  // Collect all open matches across all groups
  const openMatches = [];

  Object.keys(GROUPS_CONFIG).forEach(gName => {
    const teamsList = GROUPS_CONFIG[gName];
    GROUP_MATCH_PAIRINGS.forEach((pairing, idx) => {
      const id = `G-${gName}-${idx}`;
      const state = groupMatches[id];
      if (state && state.status === 'open') {
        const matchNum = GROUP_MATCH_NUMBERS[id] || 0;
        openMatches.push({
          id,
          groupName: gName,
          matchNum,
          t1Code: teamsList[pairing.t1],
          t2Code: teamsList[pairing.t2],
          state,
        });
      }
    });
  });

  // Sort by match number
  openMatches.sort((a, b) => a.matchNum - b.matchNum);

  if (openMatches.length === 0) {
    return (
      <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-3">
        <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 mb-2">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <div>
            <h3 className="text-[10px] font-black uppercase text-slate-200 tracking-wider">Open Matches</h3>
            <p className="text-[8px] text-slate-500">Quick access predictions</p>
          </div>
        </div>
        <p className="text-[9px] text-slate-500 text-center py-3">No open matches available right now.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-3">
      <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 mb-2">
        <div className="relative">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        </div>
        <div>
          <h3 className="text-[10px] font-black uppercase text-slate-200 tracking-wider">Open Matches</h3>
          <p className="text-[8px] text-slate-500">Quick access — {openMatches.length} match{openMatches.length !== 1 ? 'es' : ''} available</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {openMatches.map(({ id, groupName, matchNum, t1Code, t2Code, state }) => (
          <div key={id} className="relative">
            {/* Match number + group badge — floated above the row */}
            <div className="absolute -top-1 left-1.5 z-10 flex items-center gap-1">
              <span className="text-[6px] font-bold uppercase px-0.5 py-px rounded bg-emerald-500/20 text-emerald-400">
                {matchNum > 0 ? `M${matchNum}` : '—'}
              </span>
              <span className="text-[6px] px-0.5 py-px rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black">
                {groupName}
              </span>
            </div>

            {/* Score row */}
            <div className="flex items-center justify-center px-2 pt-2.5 pb-1.5 rounded-t border border-b-0 bg-emerald-950/10 border-emerald-500/20">
              {/* Team 1 — right aligned, fixed width */}
              <div className="flex items-center gap-0.5 justify-end flex-1 min-w-0">
                <span className="text-[8px] truncate text-slate-300 text-right font-medium">{TEAMS[t1Code]?.name}</span>
                <span className="text-[9px] flex-shrink-0">{TEAMS[t1Code]?.emoji}</span>
              </div>

              {/* Score inputs — centered */}
              <div className="flex items-center gap-0.5 mx-2 flex-shrink-0">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="-"
                  value={state.score1}
                  onChange={(e) => onScoreChange(id, 'score1', e.target.value)}
                  className="w-5 h-5 rounded text-center text-[10px] font-black outline-none transition-all bg-slate-800 text-white border border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
                <span className="text-slate-600 font-black text-[8px]">:</span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="-"
                  value={state.score2}
                  onChange={(e) => onScoreChange(id, 'score2', e.target.value)}
                  className="w-5 h-5 rounded text-center text-[10px] font-black outline-none transition-all bg-slate-800 text-white border border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              {/* Team 2 — left aligned, fixed width */}
              <div className="flex items-center gap-0.5 justify-start flex-1 min-w-0">
                <span className="text-[9px] flex-shrink-0">{TEAMS[t2Code]?.emoji}</span>
                <span className="text-[8px] truncate text-slate-300 font-medium">{TEAMS[t2Code]?.name}</span>
              </div>
            </div>

            {/* Card inputs row */}
            <div className="flex items-center justify-center gap-2 px-1.5 py-1 rounded-b border border-t-0 bg-emerald-950/5 border-emerald-500/20">
              <div className="flex items-center gap-1 text-[7px] text-slate-500">
                <CardInput color="#eab308" label="Yellow Card" value={state.yellow1} field="yellow1" matchId={id} onScoreChange={onScoreChange} disabled={false} />
                <CardInput color="#f59e0b" label="Second Yellow" value={state.secondYellow1} field="secondYellow1" matchId={id} onScoreChange={onScoreChange} disabled={false} />
                <CardInput color="#ef4444" label="Direct Red Card" value={state.red1} field="red1" matchId={id} onScoreChange={onScoreChange} disabled={false} />
              </div>
              <span className="text-slate-800 text-[7px] mx-1">│</span>
              <div className="flex items-center gap-1 text-[7px] text-slate-500">
                <CardInput color="#ef4444" label="Direct Red Card" value={state.red2} field="red2" matchId={id} onScoreChange={onScoreChange} disabled={false} reversed />
                <CardInput color="#f59e0b" label="Second Yellow" value={state.secondYellow2} field="secondYellow2" matchId={id} onScoreChange={onScoreChange} disabled={false} reversed />
                <CardInput color="#eab308" label="Yellow Card" value={state.yellow2} field="yellow2" matchId={id} onScoreChange={onScoreChange} disabled={false} reversed />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-3 pt-2 border-t border-slate-900/50 mt-2 flex-wrap">
        <div className="flex items-center gap-1">
          <span className="w-2 h-3 rounded-[2px] bg-yellow-500 inline-block" />
          <span className="text-[7px] text-slate-500">Yellow (−1)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-3 rounded-[2px] bg-amber-500 inline-block" />
          <span className="text-[7px] text-slate-500">2nd Y (−3)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-3 rounded-[2px] bg-red-500 inline-block" />
          <span className="text-[7px] text-slate-500">Red (−4)</span>
        </div>
      </div>
    </div>
  );
}
