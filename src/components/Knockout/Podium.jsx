import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { TEAMS } from '../../constants/teams';

export default function Podium({ firstPlace, secondPlace, thirdPlace }) {
  if (!firstPlace && !secondPlace && !thirdPlace) return null;

  const places = [
    { rank: 2, team: secondPlace, height: 'h-16 md:h-20', color: 'bg-slate-300', text: 'text-slate-700', label: '2ND', delay: 'delay-100' },
    { rank: 1, team: firstPlace, height: 'h-24 md:h-28', color: 'bg-amber-400', text: 'text-amber-900', label: '1ST', delay: 'delay-200' },
    { rank: 3, team: thirdPlace, height: 'h-12 md:h-16', color: 'bg-amber-700', text: 'text-amber-100', label: '3RD', delay: 'delay-300' }
  ];

  return (
    <div className="w-full mt-4 flex items-end justify-center gap-1">
      {places.map(p => {
        const teamInfo = p.team ? TEAMS[p.team] : null;
        return (
          <div key={p.rank} className="flex flex-col items-center justify-end w-[70px] md:w-[85px]">
            {/* Team Info */}
            <div className={`flex flex-col items-center mb-2 transition-all duration-700 ${teamInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              {teamInfo && (
                <>
                  <img src={`https://flagcdn.com/${teamInfo.iso2}.svg`} alt="flag" className="w-6 md:w-8 h-4 md:h-5 object-cover rounded shadow-md mb-1 border border-white/10" />
                  <span className="font-black text-white text-[9px] md:text-[11px] tracking-wider">{p.team}</span>
                </>
              )}
            </div>
            {/* Podium Block */}
            <div className={`w-full ${p.height} ${p.color} rounded-t-md flex flex-col items-center justify-start pt-2 md:pt-3 shadow-[0_0_15px_rgba(0,0,0,0.5)] border-x border-t border-white/20 relative overflow-hidden transition-all duration-500`}>
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-50"></div>
              <div className="relative z-10 flex flex-col items-center">
                {p.rank === 1 ? (
                  <Trophy className={`w-4 h-4 md:w-5 md:h-5 ${p.text} mb-0.5 md:mb-1 drop-shadow-sm`} />
                ) : (
                  <Medal className={`w-3 h-3 md:w-4 md:h-4 ${p.text} mb-0.5 md:mb-1 drop-shadow-sm`} />
                )}
                <span className={`font-black ${p.text} text-xs md:text-sm drop-shadow-sm`}>{p.label}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
