import { useState, useEffect } from 'react';
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
  const [koMatches, setKoMatches] = useState(() => {
    try {
      const saved = localStorage.getItem('fifa2026_koMatches');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load knockout matches from local storage', e);
    }
    return initKoMatches();
  });

  useEffect(() => {
    localStorage.setItem('fifa2026_koMatches', JSON.stringify(koMatches));
  }, [koMatches]);

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

  return { koMatches, handleKoScoreChange, resetKoMatches };
}
