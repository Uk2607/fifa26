import React from 'react';
import { Trophy } from 'lucide-react';
import { TEAMS } from '../../constants/teams';
import KnockoutMatchCard from './KnockoutMatchCard';

export default function FinalsSlide({ finalsSeeding, koMatches, onScoreChange, tournamentChampion }) {
  return (
    <div className="w-full flex-shrink-0 px-1">
      <div className="max-w-md mx-auto space-y-6">

        {/* TROPHY AWARD CARD */}
        <div className="p-4 bg-gradient-to-b from-amber-500/20 to-slate-950 rounded-2xl border border-amber-500/30 text-center relative overflow-hidden shadow-2xl">
          <Trophy className="w-12 h-12 text-amber-400 fill-amber-500/10 mx-auto animate-pulse mb-2" />
          <div>
            <p className="text-[9px] font-black tracking-widest text-amber-400 uppercase">🏆 Projected World Champion 🏆</p>
            <h4 className="text-md font-black text-white mt-1">
              {tournamentChampion ? (
                <span className="bg-card-bg px-3 py-1 rounded border border-emerald-500/20 inline-flex items-center gap-2">
                  <img src={`https://flagcdn.com/${TEAMS[tournamentChampion]?.iso2}.svg`} alt="flag" className="inline-block w-4 h-[11px] object-cover rounded-[2px]" /> {TEAMS[tournamentChampion]?.name}
                </span>
              ) : (
                <span className="text-slate-500 italic text-xs">Awaiting predicting outcomes</span>
              )}
            </h4>
          </div>
        </div>

        {/* GRAND FINAL COMPONENT */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-black uppercase text-amber-400 block text-center bg-amber-400/10 py-1 rounded border border-amber-400/20">MATCH 104 • GRAND FINAL</span>
          <KnockoutMatchCard
            matchId={104}
            team1={finalsSeeding[104].t1}
            team2={finalsSeeding[104].t2}
            matchState={koMatches[`KO-104`]}
            onScoreChange={onScoreChange}
          />
        </div>

        {/* THIRD PLACE PLAYOFF COMPONENT */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-black uppercase text-slate-400 block text-center bg-slate-800/20 py-1 rounded border border-theme-border">MATCH 103 • 3RD PLACE PLAYOFF</span>
          <KnockoutMatchCard
            matchId={103}
            team1={finalsSeeding[103].t1}
            team2={finalsSeeding[103].t2}
            matchState={koMatches[`KO-103`]}
            onScoreChange={onScoreChange}
          />
        </div>

      </div>
    </div>
  );
}
