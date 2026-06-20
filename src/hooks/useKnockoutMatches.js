import { useState } from 'react';
import { PRESET_SCORES } from '../constants/presetScores';

function initKoMatches() {
  const initial = {};
  for (let mId = 73; mId <= 104; mId++) {
    const id = `KO-${mId}`;
    if (PRESET_SCORES[id]) {
      const preset = PRESET_SCORES[id];
      const isNotLocked = preset.status === 'upcoming' || preset.status === 'open';
      initial[id] = {
        score1: (isNotLocked && preset.score1 === 0) ? '' : preset.score1,
        score2: (isNotLocked && preset.score2 === 0) ? '' : preset.score2,
        penalty1: preset.penalty1 || '',
        penalty2: preset.penalty2 || '',
        status: preset.status || 'upcoming'
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
    if (PRESET_SCORES[koId]?.status === 'locked') return;
    setKoMatches(prev => ({
      ...prev,
      [koId]: {
        ...prev[koId],
        [field]: field === 'status' ? val : (val === '' ? '' : parseInt(val, 10) || 0)
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
        if (PRESET_SCORES[id]?.status !== 'locked') {
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
