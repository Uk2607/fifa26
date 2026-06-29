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
        score1: (isNotLocked && preset.score1 === null) ? '' : preset.score1,
        score2: (isNotLocked && preset.score2 === null) ? '' : preset.score2,
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
    let savedMatches = null;
    try {
      const saved = localStorage.getItem('fifa2026_koMatches');
      if (saved) savedMatches = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load knockout matches from local storage', e);
    }
    
    const initial = initKoMatches();
    
    // SMART MERGE: Start with the pristine codebase data (which has all the correct 'locked' matches).
    // Then, overlay the user's saved predictions ONLY for matches that aren't locked by the codebase.
    if (savedMatches) {
      const merged = { ...initial };
      for (const id in savedMatches) {
        if (!PRESET_SCORES[id] || PRESET_SCORES[id].status !== 'locked') {
          merged[id] = savedMatches[id];
        }
      }
      return merged;
    }
    
    return initial;
  });

  useEffect(() => {
    localStorage.setItem('fifa2026_koMatches', JSON.stringify(koMatches));
  }, [koMatches]);

  const handleKoScoreChange = (matchId, field, val, team1Code, team2Code) => {
    const koId = `KO-${matchId}`;
    if (PRESET_SCORES[koId]?.status === 'locked') return;
    setKoMatches(prev => ({
      ...prev,
      [koId]: {
        ...prev[koId],
        [field]: field === 'status' ? val : (val === '' ? '' : parseInt(val, 10) || 0),
        ...(team1Code && team2Code ? { team1Code, team2Code } : {})
      }
    }));
  };

  const resetKoMatches = () => {
    setKoMatches(initKoMatches());
  };

  return { koMatches, handleKoScoreChange, resetKoMatches };
}
