import { useState, useEffect, useMemo } from 'react';
import { GROUPS_CONFIG, GROUP_MATCH_PAIRINGS } from '../constants/groups';
import { PRESET_SCORES } from '../constants/presetScores';

// ================================================================================
// 🎮 GROUP MATCHES STATE — scores + disciplinary card tracking
// ================================================================================
function initGroupMatches() {
  const initial = {};
  Object.keys(GROUPS_CONFIG).forEach(gName => {
    GROUP_MATCH_PAIRINGS.forEach((m, idx) => {
      const id = `G-${gName}-${idx}`;
      const preset = PRESET_SCORES[id];
      if (preset) {
        const isNotLocked = preset.status === 'upcoming' || preset.status === 'open';
        initial[id] = {
          score1: (isNotLocked && preset.score1 === null) ? '' : preset.score1,
          score2: (isNotLocked && preset.score2 === null) ? '' : preset.score2,
          status: preset.status || 'upcoming',
          yellow1: preset.yellow1 || 0,
          yellow2: preset.yellow2 || 0,
          secondYellow1: preset.secondYellow1 || 0,
          secondYellow2: preset.secondYellow2 || 0,
          red1: preset.red1 || 0,
          red2: preset.red2 || 0,
        };
      } else {
        initial[id] = {
          score1: '', score2: '', status: 'upcoming',
          yellow1: 0, yellow2: 0,
          secondYellow1: 0, secondYellow2: 0,
          red1: 0, red2: 0,
        };
      }
    });
  });
  return initial;
}

export function useGroupMatches() {
  const [groupMatches, setGroupMatches] = useState(() => {
    let savedMatches = null;
    try {
      const saved = localStorage.getItem('fifa2026_groupMatches');
      if (saved) savedMatches = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load group matches from local storage', e);
    }
    
    const initial = initGroupMatches();
    
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

  const overwrittenGroupMatches = useMemo(() => {
    let savedMatches = null;
    try {
      const saved = localStorage.getItem('fifa2026_groupMatches');
      if (saved) savedMatches = JSON.parse(saved);
    } catch (e) {}

    if (!savedMatches) return [];

    const initial = initGroupMatches();
    const overwritten = [];

    for (const id in savedMatches) {
      if (PRESET_SCORES[id] && PRESET_SCORES[id].status === 'locked') {
        const oldM = savedMatches[id];
        const newM = initial[id];
        // User had a prediction?
        if (oldM.score1 !== '' && oldM.score2 !== '') {
           // Was it different from the official locked score?
           if (oldM.score1 !== newM.score1 || oldM.score2 !== newM.score2) {
              const [, gName, idx] = id.split('-');
              const pairing = GROUP_MATCH_PAIRINGS[parseInt(idx, 10)];
              const t1Code = GROUPS_CONFIG[gName][pairing.t1];
              const t2Code = GROUPS_CONFIG[gName][pairing.t2];
              
              overwritten.push({
                 id,
                 type: 'group',
                 t1Code,
                 t2Code,
                 oldScore1: oldM.score1,
                 oldScore2: oldM.score2,
                 newScore1: newM.score1,
                 newScore2: newM.score2
              });
           }
        }
      }
    }
    return overwritten;
  }, []);

  useEffect(() => {
    localStorage.setItem('fifa2026_groupMatches', JSON.stringify(groupMatches));
  }, [groupMatches]);

  // Generic handler — works for score fields AND card fields
  const handleGroupScoreChange = (matchId, field, val) => {
    if (PRESET_SCORES[matchId]?.status === 'locked') return;
    setGroupMatches(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [field]: field === 'status' ? val : (val === '' ? '' : parseInt(val, 10) || 0)
      }
    }));
  };

  const resetGroupMatches = () => {
    setGroupMatches(initGroupMatches());
  };

  return { groupMatches, handleGroupScoreChange, resetGroupMatches, overwrittenGroupMatches };
}
