import React from 'react';
import { Lock } from 'lucide-react';
import { TEAMS } from '../../constants/teams';
import { PRESET_SCORES } from '../../constants/presetScores';

// ================================================================================
// KNOCKOUT BRACKET MATCH CARD SUB-COMPONENT
// ================================================================================
function TeamRow({ code, placeholderText, isWinner, side, scoreVal, penaltyVal, isDraw, isLocked, matchId, onScoreChange, hoveredTeamCode, onTeamHover }) {
  const isResolved = typeof code === 'string' && code.length === 3;
  const country = TEAMS[code];

  return (
    <div 
      className="flex items-center justify-between px-2 py-1 transition-colors cursor-default border-l-[3px] border-transparent"
      style={{
        borderLeftColor: isResolved ? country?.color : 'transparent',
        backgroundColor: isWinner && isResolved ? `${country?.color}26` : (hoveredTeamCode === code && isResolved ? `${country?.color}4D` : 'transparent')
      }}
      onMouseEnter={() => isResolved && onTeamHover(code)}
      onMouseLeave={() => onTeamHover(null)}
    >
      <div className="flex items-center gap-1.5 truncate flex-grow">
        {isResolved ? (
          <div className="flex items-center gap-1 truncate">
            <span className="text-xs leading-none">{country?.emoji}</span>
            <span className={`text-[10px] truncate max-w-[85px] ${isWinner ? 'text-white font-extrabold' : 'text-slate-300 font-medium'}`}>
              {country?.name}
            </span>
          </div>
        ) : (
          <span className="text-[8px] text-slate-500 italic truncate font-bold">{placeholderText}</span>
        )}
      </div>

      {/* Dynamic score block */}
      <div className="flex items-center gap-0.5 flex-shrink-0 ml-1">
        {isDraw && (
          <input
            type="text"
            pattern="[0-9]*"
            placeholder="P"
            value={penaltyVal}
            disabled={isLocked}
            onChange={(e) => onScoreChange(matchId, side === 't1' ? 'penalty1' : 'penalty2', e.target.value)}
            className="w-4 h-4 rounded text-center text-[8px] font-black bg-slate-950 border border-slate-800 text-amber-400 outline-none"
            title="Penalty shootouts score"
          />
        )}

        <input
          type="text"
          pattern="[0-9]*"
          placeholder="-"
          value={scoreVal}
          disabled={isLocked}
          onChange={(e) => onScoreChange(matchId, side === 't1' ? 'score1' : 'score2', e.target.value)}
          className={`w-5 h-5 rounded text-center text-[10px] font-black outline-none transition-all ${isLocked
            ? 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-800'
            : 'bg-slate-800 text-white border border-slate-700 focus:border-emerald-400'
            }`}
        />
      </div>
    </div>
  );
}

export default function KnockoutMatchCard({ matchId, team1, team2, matchState, onScoreChange, hoveredTeamCode, onTeamHover, isPathHighlighted }) {
  const score1 = matchState?.score1 ?? '';
  const score2 = matchState?.score2 ?? '';
  const penalty1 = matchState?.penalty1 ?? '';
  const penalty2 = matchState?.penalty2 ?? '';

  const isLocked = PRESET_SCORES[`KO-${matchId}`]?.status === 'locked';
  const isDraw = score1 !== '' && score2 !== '' && score1 === score2;

  let winner = null;
  if (score1 !== '' && score2 !== '') {
    if (score1 > score2) winner = 't1';
    else if (score2 > score1) winner = 't2';
    else if (penalty1 !== '' && penalty2 !== '') {
      winner = penalty1 > penalty2 ? 't1' : 't2';
    }
  }

  const isHighlighted = isPathHighlighted;
  const isDimmed = hoveredTeamCode && !isHighlighted;

  return (
    <div className={`rounded-xl border transition-all duration-300 relative ${isLocked
      ? 'border-amber-500/30 bg-slate-950/70 shadow-sm'
      : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700 shadow-md'
      } ${isHighlighted ? 'ring-2 ring-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] z-10 scale-105' : ''
      } ${isDimmed ? 'opacity-30' : ''
      } overflow-hidden w-full max-w-[155px] mx-auto`}>

      {/* Top micro match tracker indicator */}
      <div className="bg-slate-950 px-2 py-0.5 flex items-center justify-between text-[7px] font-extrabold text-slate-500 tracking-wider uppercase border-b border-slate-900">
        <span>MATCH {matchId}</span>
        {isLocked ? (
          <span className="flex items-center gap-0.5 text-amber-500 font-bold scale-90">
            <Lock className="w-2.5 h-2.5" /> Locked
          </span>
        ) : (
          <span className="text-emerald-500/80">Open</span>
        )}
      </div>

      <TeamRow
        code={team1}
        placeholderText={team1}
        isWinner={winner === 't1'}
        side="t1"
        scoreVal={score1}
        penaltyVal={penalty1}
        isDraw={isDraw}
        isLocked={isLocked}
        matchId={matchId}
        onScoreChange={onScoreChange}
        hoveredTeamCode={hoveredTeamCode}
        onTeamHover={onTeamHover}
      />

      <div className="h-px bg-slate-900"></div>

      <TeamRow
        code={team2}
        placeholderText={team2}
        isWinner={winner === 't2'}
        side="t2"
        scoreVal={score2}
        penaltyVal={penalty2}
        isDraw={isDraw}
        isLocked={isLocked}
        matchId={matchId}
        onScoreChange={onScoreChange}
        hoveredTeamCode={hoveredTeamCode}
        onTeamHover={onTeamHover}
      />
    </div>
  );
}
