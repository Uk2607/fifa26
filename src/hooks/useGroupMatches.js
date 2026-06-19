import { useState } from 'react';
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
        initial[id] = {
          score1: preset.score1,
          score2: preset.score2,
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
  const [groupMatches, setGroupMatches] = useState(initGroupMatches);

  // Generic handler — works for score fields AND card fields
  const handleGroupScoreChange = (matchId, field, val) => {
    if (PRESET_SCORES[matchId]?.status === 'locked') return;
    setGroupMatches(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [field]: val === '' ? '' : parseInt(val, 10) || 0
      }
    }));
  };

  const resetGroupMatches = () => {
    setGroupMatches(initGroupMatches());
  };

  const randomizeGroupMatches = () => {
    setGroupMatches(prev => {
      const copy = { ...prev };
      Object.keys(copy).forEach(id => {
        if (PRESET_SCORES[id]?.status !== 'locked') {
          copy[id] = {
            score1: Math.floor(Math.random() * 4),
            score2: Math.floor(Math.random() * 3),
            status: copy[id].status,
            yellow1: Math.floor(Math.random() * 4),
            yellow2: Math.floor(Math.random() * 4),
            secondYellow1: Math.random() < 0.2 ? 1 : 0,
            secondYellow2: Math.random() < 0.2 ? 1 : 0,
            red1: Math.random() < 0.1 ? 1 : 0,
            red2: Math.random() < 0.1 ? 1 : 0,
          };
        }
      });
      return copy;
    });
  };

  return { groupMatches, handleGroupScoreChange, resetGroupMatches, randomizeGroupMatches };
}
