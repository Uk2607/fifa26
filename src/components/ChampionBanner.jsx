import React from 'react';
import { Trophy } from 'lucide-react';
import { TEAMS } from '../constants/teams';

export default function ChampionBanner({ tournamentChampion }) {
  if (!tournamentChampion) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-600/20 via-amber-600/15 to-emerald-600/20 border-b border-emerald-500/30 py-3 text-center">
      <div className="flex items-center justify-center gap-2 animate-pulse">
        <Trophy className="w-5 h-5 text-amber-400 fill-amber-400" />
        <span className="text-amber-200 text-xs md:text-sm font-bold uppercase tracking-wider">
          2026 Champion: <span className="text-white bg-app-bg px-3 py-1 rounded-lg border border-amber-500/40 ml-1.5 font-black"><img src={`https://flagcdn.com/${TEAMS[tournamentChampion]?.iso2}.svg`} alt="flag" className="inline-block w-4 h-[11px] object-cover rounded-[2px]" /> {TEAMS[tournamentChampion]?.name} ({tournamentChampion})</span>
        </span>
      </div>
    </div>
  );
}
