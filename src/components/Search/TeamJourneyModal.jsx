import React, { useEffect } from 'react';
import { X, Trophy } from 'lucide-react';
import { TEAMS } from '../../constants/teams';
import { GROUPS_CONFIG, GROUP_MATCH_PAIRINGS } from '../../constants/groups';
import { PRESET_SCORES } from '../../constants/presetScores';
import { FIFA_RANKINGS } from '../../constants/fifaRankings';

export default function TeamJourneyModal({ 
  teamCode, 
  onClose, 
  groupStandings, 
  groupMatches, 
  getSeeding, 
  koMatches 
}) {
  const team = TEAMS[teamCode];
  
  if (!team) return null;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 1. Find group
  let groupName = null;
  for (const [gName, teams] of Object.entries(GROUPS_CONFIG)) {
    if (teams.includes(teamCode)) {
      groupName = gName;
      break;
    }
  }

  // 2. Group Stats
  let groupRank = null;
  let groupStats = null;
  if (groupName && groupStandings[groupName]) {
    const sortedStandings = groupStandings[groupName];
    const index = sortedStandings.findIndex(s => s.code === teamCode);
    if (index !== -1) {
      groupRank = index + 1;
      groupStats = sortedStandings[index];
    }
  }

  // 3. Group Matches Played
  const teamGroupMatches = [];
  if (groupName) {
    const pairings = GROUP_MATCH_PAIRINGS;
    pairings.forEach((p, idx) => {
      const t1Code = GROUPS_CONFIG[groupName][p.t1];
      const t2Code = GROUPS_CONFIG[groupName][p.t2];
      
      if (t1Code === teamCode || t2Code === teamCode) {
        const matchId = `G-${groupName}-${idx}`;
        const matchState = groupMatches[matchId];
        const isTeam1 = t1Code === teamCode;
        const opponent = isTeam1 ? t2Code : t1Code;
        
        teamGroupMatches.push({
          matchId,
          opponent,
          teamScore: isTeam1 ? matchState?.score1 : matchState?.score2,
          oppScore: isTeam1 ? matchState?.score2 : matchState?.score1,
          status: matchState?.score1 !== undefined && matchState?.score1 !== '' ? 'completed' : 'upcoming',
          matchNum: p.matchNum
        });
      }
    });
  }

  // 4. Knockout Matches
  const teamKoMatches = [];
  for (let i = 73; i <= 104; i++) {
    const seeding = getSeeding(i);
    if (seeding?.t1 === teamCode || seeding?.t2 === teamCode) {
      const matchState = koMatches[`KO-${i}`];
      const preset = PRESET_SCORES[`KO-${i}`] || {};
      const isTeam1 = seeding.t1 === teamCode;
      
      const opponent = isTeam1 ? seeding.t2 : seeding.t1;
      const teamScore = isTeam1 ? matchState?.score1 : matchState?.score2;
      const oppScore = isTeam1 ? matchState?.score2 : matchState?.score1;
      
      // Calculate red cards for this specific team in this specific match
      const baseRed = isTeam1 ? (preset.red1 || 0) : (preset.red2 || 0);
      const secondYellow = isTeam1 ? (preset.secondYellow1 || 0) : (preset.secondYellow2 || 0);
      const redCards = baseRed + secondYellow;
      
      teamKoMatches.push({
        matchId: i,
        opponent,
        teamScore,
        oppScore,
        redCards,
        status: teamScore !== undefined && teamScore !== '' ? 'completed' : 'upcoming'
      });
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 md:p-4">
      <div className="bg-card-bg border border-theme-border rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div 
          className="relative px-4 py-5 flex flex-col items-center justify-center border-b border-theme-border"
          style={{ backgroundColor: `${team.color}15` }}
        >
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <img src={`https://flagcdn.com/${team.iso2}.svg`} alt="flag" className="w-16 h-10 object-cover rounded shadow-lg mb-2 border border-white/10" />
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider mb-0.5 drop-shadow-sm">{team.name}</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] md:text-xs font-bold text-slate-300 uppercase tracking-widest">{team.confederation || 'FIFA'}</span>
            <span className="text-slate-500 text-[10px]">•</span>
            <span className="text-[10px] md:text-xs font-bold text-amber-400 uppercase tracking-widest">
              #{FIFA_RANKINGS[teamCode]?.ranking || '-'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 overflow-y-auto flex-1 space-y-6">
          
          {/* GROUP STAGE SECTION */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm md:text-base font-black uppercase tracking-widest" style={{ color: team.color }}>Group Stage</h3>
              <div className="h-px bg-theme-border flex-1 ml-2"></div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3">
              <div className="bg-slate-800/50 rounded-lg p-2 border border-theme-border/50 flex flex-col items-center justify-center">
                <span className="text-[9px] md:text-[10px] uppercase text-slate-400 font-bold mb-0.5">Group</span>
                <span className="text-lg md:text-xl font-black text-white">{groupName || '-'}</span>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-2 border border-theme-border/50 flex flex-col items-center justify-center">
                <span className="text-[9px] md:text-[10px] uppercase text-slate-400 font-bold mb-0.5">Rank</span>
                <span className="text-lg md:text-xl font-black text-white">{groupRank ? `#${groupRank}` : '-'}</span>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-2 border border-theme-border/50 flex flex-col items-center justify-center">
                <span className="text-[9px] md:text-[10px] uppercase text-slate-400 font-bold mb-0.5">Points</span>
                <span className="text-lg md:text-xl font-black text-white">{groupStats ? groupStats.pts : '-'}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              {teamGroupMatches.map(m => (
                <div key={m.matchId} className="flex items-center justify-between bg-slate-800/30 rounded-md p-2 border border-theme-border/30">
                  <div className="flex items-center gap-3 w-1/3">
                    <img src={`https://flagcdn.com/${team.iso2}.svg`} alt="flag" className="w-5 h-[14px] object-cover rounded-[2px]" />
                    <span className="font-bold text-white text-sm">{teamCode}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-1 justify-center">
                    {m.status === 'completed' ? (
                      <div className="flex items-center gap-2 bg-slate-900 rounded border border-theme-border px-3 py-1 text-sm font-black text-white shadow-inner">
                        <span>{m.teamScore}</span>
                        <span className="text-slate-500 font-normal">-</span>
                        <span>{m.oppScore}</span>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-slate-500 uppercase">vs</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 w-1/3 justify-end">
                    <span className="font-bold text-white text-sm">{m.opponent}</span>
                    <img src={`https://flagcdn.com/${TEAMS[m.opponent]?.iso2}.svg`} alt="flag" className="w-5 h-[14px] object-cover rounded-[2px]" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* KNOCKOUT STAGE SECTION */}
          {teamKoMatches.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm md:text-base font-black uppercase tracking-widest" style={{ color: team.color }}>Knockout Stage</h3>
                <div className="h-px bg-theme-border flex-1 ml-2"></div>
              </div>

              <div className="space-y-1.5">
                {teamKoMatches.map(m => (
                  <div key={m.matchId} className="flex items-center justify-between bg-slate-800/30 rounded-md p-2 border border-theme-border/30 relative overflow-hidden">
                    
                    <div className="flex items-center gap-3 w-1/3">
                      <img src={`https://flagcdn.com/${team.iso2}.svg`} alt="flag" className="w-5 h-[14px] object-cover rounded-[2px]" />
                      <span className="font-bold text-white text-sm">{teamCode}</span>
                      {m.redCards > 0 && (
                        <div className="w-3 h-4 bg-red-600 rounded-[2px] border border-red-800 flex items-center justify-center shadow-sm ml-1" title={`${m.redCards} Red Cards`}>
                          {m.redCards > 1 && <span className="text-[8px] font-bold text-white leading-none">{m.redCards}</span>}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-center gap-1 flex-1 justify-center z-10">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Match {m.matchId}</span>
                      {m.status === 'completed' ? (
                        <div className="flex items-center gap-2 bg-slate-900 rounded border border-theme-border px-3 py-1 text-sm font-black text-white shadow-inner">
                          <span>{m.teamScore}</span>
                          <span className="text-slate-500 font-normal">-</span>
                          <span>{m.oppScore}</span>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-slate-500 uppercase mt-1">vs</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 w-1/3 justify-end">
                      {m.opponent ? (
                        <>
                          <span className="font-bold text-white text-sm">{m.opponent}</span>
                          <img src={`https://flagcdn.com/${TEAMS[m.opponent]?.iso2}.svg`} alt="flag" className="w-5 h-[14px] object-cover rounded-[2px]" />
                        </>
                      ) : (
                        <span className="text-xs italic text-slate-500 font-bold">TBD</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
