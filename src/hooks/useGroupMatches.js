import { useState, useEffect } from 'react';
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
    try {
      const saved = localStorage.getItem('fifa2026_groupMatches');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load group matches from local storage', e);
    }
    return initGroupMatches();
  });

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

  return { groupMatches, handleGroupScoreChange, resetGroupMatches };
}
