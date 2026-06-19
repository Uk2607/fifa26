import { useState } from 'react';
import { GROUPS_CONFIG, GROUP_MATCH_PAIRINGS } from '../constants/groups';
import { PRESET_SCORES } from '../constants/presetScores';

function initGroupMatches() {
  const initial = {};
  Object.keys(GROUPS_CONFIG).forEach(gName => {
    GROUP_MATCH_PAIRINGS.forEach((m, idx) => {
      const id = `G-${gName}-${idx}`;
      if (PRESET_SCORES[id]) {
        initial[id] = {
          score1: PRESET_SCORES[id].score1,
          score2: PRESET_SCORES[id].score2,
          locked: PRESET_SCORES[id].locked
        };
      } else {
        initial[id] = { score1: '', score2: '', locked: false };
      }
    });
  });
  return initial;
}

export function useGroupMatches() {
  const [groupMatches, setGroupMatches] = useState(initGroupMatches);

  const handleGroupScoreChange = (matchId, side, val) => {
    if (PRESET_SCORES[matchId]?.locked) return;
    setGroupMatches(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [side]: val === '' ? '' : parseInt(val, 10) || 0
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
        if (!PRESET_SCORES[id]?.locked) {
          copy[id] = {
            score1: Math.floor(Math.random() * 4),
            score2: Math.floor(Math.random() * 3),
            locked: false
          };
        }
      });
      return copy;
    });
  };

  return { groupMatches, handleGroupScoreChange, resetGroupMatches, randomizeGroupMatches };
}
