import { useState } from 'react';
import { PRESET_SCORES } from '../constants/presetScores';

function initKoMatches() {
  const initial = {};
  for (let mId = 73; mId <= 104; mId++) {
    const id = `KO-${mId}`;
    if (PRESET_SCORES[id]) {
      initial[id] = {
        score1: PRESET_SCORES[id].score1,
        score2: PRESET_SCORES[id].score2,
        penalty1: PRESET_SCORES[id].penalty1 || '',
        penalty2: PRESET_SCORES[id].penalty2 || '',
        status: PRESET_SCORES[id].status || 'upcoming'
      };
    } else {
      initial[id] = { score1: '', score2: '', penalty1: '', penalty2: '', status: 'upcoming' };
    }
  }
  return initial;
}

export function useKnockoutMatches() {
  const [koMatches, setKoMatches] = useState(initKoMatches);

  const handleKoScoreChange = (matchId, field, val) => {
    const koId = `KO-${matchId}`;
    if (PRESET_SCORES[koId]?.status === 'logged') return;
    setKoMatches(prev => ({
      ...prev,
      [koId]: {
        ...prev[koId],
        [field]: val === '' ? '' : parseInt(val, 10) || 0
      }
    }));
  };

  const resetKoMatches = () => {
    setKoMatches(initKoMatches());
  };

  const randomizeKoMatches = () => {
    setKoMatches(prev => {
      const copy = { ...prev };
      for (let mId = 73; mId <= 104; mId++) {
        const id = `KO-${mId}`;
        if (PRESET_SCORES[id]?.status !== 'logged') {
          const s1 = Math.floor(Math.random() * 4);
          let s2 = Math.floor(Math.random() * 4);
          let p1 = '';
          let p2 = '';
          if (s1 === s2) {
            p1 = Math.floor(Math.random() * 3) + 3;
            p2 = p1 + (Math.random() > 0.5 ? 1 : -1);
            if (p2 < 0) p2 = 0;
          }
          copy[id] = {
            score1: s1,
            score2: s2,
            penalty1: p1,
            penalty2: p2,
            status: copy[id].status
          };
        }
      }
      return copy;
    });
  };

  return { koMatches, handleKoScoreChange, resetKoMatches, randomizeKoMatches };
}
