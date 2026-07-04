import React, { useEffect } from 'react';
import { Lock, Clock } from 'lucide-react';
import { TEAMS } from '../../constants/teams';
import { PRESET_SCORES } from '../../constants/presetScores';
import { useCountdown } from '../../hooks/useCountdown';

// ================================================================================
// KNOCKOUT BRACKET MATCH CARD SUB-COMPONENT
// ================================================================================
function TeamRow({ code, placeholderText, isWinner, side, scoreVal, penaltyVal, isDraw, isLocked, matchId, onScoreChange, hoveredTeamCode, onTeamHover, viewMode }) {
  const isResolved = typeof code === 'string' && code.length === 3;
  const country = TEAMS[code];

  return (
    <div
      className={`flex items-center justify-between px-2 py-1.5 transition-all duration-200 cursor-default border-l-[4px] border-transparent ${isWinner && isResolved ? 'shadow-sm' : ''}`}
      style={{
        borderLeftColor: isResolved ? country?.color : 'transparent',
        backgroundColor: isWinner && isResolved ? `${country?.color}40` : (hoveredTeamCode === code && isResolved ? `${country?.color}30` : 'transparent'),
        boxShadow: isWinner && isResolved ? `inset 0 0 12px ${country?.color}20, 0 0 6px ${country?.color}15` : 'none'
      }}
      onMouseEnter={() => isResolved && onTeamHover(code)}
      onMouseLeave={() => onTeamHover(null)}
    >
      <div className="flex items-center gap-1.5 truncate flex-grow">
        {isResolved ? (
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-xs leading-none"><img src={`https://flagcdn.com/${country?.iso2}.svg`} alt="flag" className="inline-block w-4 h-[11px] object-cover rounded-[2px]" /></span>
            <span
              className={`truncate max-w-[85px] transition-all ${isWinner ? 'text-white font-extrabold drop-shadow-sm' : 'text-slate-300 font-medium'} ${viewMode === 'readable' ? 'text-xs' : 'text-[10px]'}`}
              style={{ color: isWinner ? (country?.textColor === '#000000' ? '#ffffff' : country?.color) : undefined }}
              title={viewMode === 'readable' ? country?.name : undefined}
            >
              {viewMode === 'readable' ? code : country?.name}
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
            className="w-4 h-4 rounded text-center text-[8px] font-black bg-app-bg border border-theme-border text-amber-400 outline-none"
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
          className={`rounded text-center font-black outline-none transition-all ${viewMode === 'readable' ? 'w-7 h-7 text-xs' : 'w-5 h-5 text-[10px]'} ${isLocked
            ? 'bg-slate-850 text-slate-500 cursor-not-allowed border border-theme-border'
            : 'bg-slate-800 text-white border border-theme-border focus:border-emerald-400'
            }`}
        />
      </div>
    </div>
  );
}

export default function KnockoutMatchCard({ matchId, team1, team2, matchState, onScoreChange, hoveredTeamCode, onTeamHover, isPathHighlighted, viewMode }) {
  const bothTeamsResolved = typeof team1 === 'string' && team1.length === 3
    && typeof team2 === 'string' && team2.length === 3;

  const savedTeam1 = matchState?.team1Code;
  const savedTeam2 = matchState?.team2Code;

  const currentT1Code = typeof team1 === 'string' && team1.length === 3 ? team1 : null;
  const currentT2Code = typeof team2 === 'string' && team2.length === 3 ? team2 : null;

  // If the teams playing have changed (or become unresolved) since the user made a prediction, we hide the stale prediction.
  const teamsChanged = savedTeam1 && savedTeam2 &&
    (savedTeam1 !== currentT1Code || savedTeam2 !== currentT2Code);

  useEffect(() => {
    if (teamsChanged && (matchState?.score1 !== '' || matchState?.score2 !== '')) {
      onScoreChange(matchId, 'clear');
    }
  }, [teamsChanged, matchState?.score1, matchState?.score2, matchId, onScoreChange]);

  const score1 = teamsChanged ? '' : (matchState?.score1 ?? '');
  const score2 = teamsChanged ? '' : (matchState?.score2 ?? '');
  const penalty1 = teamsChanged ? '' : (matchState?.penalty1 ?? '');
  const penalty2 = teamsChanged ? '' : (matchState?.penalty2 ?? '');

  const handleScoreChangeWithTeams = (mId, field, val) => {
    onScoreChange(mId, field, val, bothTeamsResolved ? team1 : null, bothTeamsResolved ? team2 : null);
  };

  const isGloballyLocked = PRESET_SCORES[`KO-${matchId}`]?.status === 'locked';
  const matchStatus = matchState?.status || 'upcoming';
  const isLocked = isGloballyLocked || matchStatus === 'locked' || !bothTeamsResolved;

  const matchTimestamp = PRESET_SCORES[`KO-${matchId}`]?.timestamp;
  const { days, hours, minutes, seconds, hasStarted, within24h, isConfigured } = useCountdown(matchTimestamp);
  const isDraw = score1 !== '' && score2 !== '' && score1 === score2;

  const formattedDate = React.useMemo(() => {
    if (!matchTimestamp) return '';
    return new Date(matchTimestamp).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [matchTimestamp]);

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
      ? 'border-amber-500/30 bg-app-bg/70 shadow-sm'
      : 'border-theme-border/80 bg-card-bg/50 hover:border-theme-border shadow-md'
      } ${isHighlighted ? 'ring-2 ring-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] z-10 scale-105' : ''
      } ${isDimmed ? 'opacity-30' : ''
      } overflow-hidden w-full max-w-[155px] mx-auto`}>

      {/* Top micro match tracker indicator */}
      <div className="bg-app-bg px-2 py-0.5 flex items-center justify-between text-[7px] font-extrabold text-slate-500 tracking-wider uppercase border-b border-theme-border">
        <span className="text-[9px] font-black">#{matchId}</span>
        {isGloballyLocked ? (
          <span className="flex items-center gap-0.5 text-amber-500 font-bold scale-90">
            <Lock className="w-2.5 h-2.5" /> Locked
          </span>
        ) : isConfigured ? (
          hasStarted ? (
            <span className="flex items-center gap-1 text-[7px] text-emerald-400 font-bold uppercase" title="Match has started!">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Open
            </span>
          ) : within24h ? (
            <span className="text-[9px] font-bold uppercase flex items-center gap-1 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]" title="Starts in">
              <Clock className="w-2.5 h-2.5 opacity-80" />
              <span>{hours}h {minutes}m {seconds}s</span>
            </span>
          ) : (
            <span className="text-[9px] font-bold uppercase flex items-center gap-1 text-slate-400" title="Starts">
              <Clock className="w-2.5 h-2.5 opacity-80" />
              <span className="tracking-tighter whitespace-nowrap">{formattedDate}</span>
            </span>
          )
        ) : (
          <span className="text-[10px] text-slate-500 font-black">-</span>
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
        onScoreChange={handleScoreChangeWithTeams}
        hoveredTeamCode={hoveredTeamCode}
        onTeamHover={onTeamHover}
        viewMode={viewMode}
      />

      <div className="h-px bg-card-bg"></div>

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
        onScoreChange={handleScoreChangeWithTeams}
        hoveredTeamCode={hoveredTeamCode}
        onTeamHover={onTeamHover}
        viewMode={viewMode}
      />
    </div>
  );
}
