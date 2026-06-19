import { useMemo } from 'react';
import { GROUPS_CONFIG, GROUP_MATCH_PAIRINGS } from '../constants/groups';

// ================================================================================
// 🧮 STANDINGS ENGINE
// ================================================================================
export function useStandings(groupMatches) {
  const groupStandings = useMemo(() => {
    const standings = {};
    Object.entries(GROUPS_CONFIG).forEach(([gName, teamsList]) => {
      standings[gName] = teamsList.map(teamCode => ({
        code: teamCode, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0
      }));
    });

    Object.keys(GROUPS_CONFIG).forEach(gName => {
      const teamsList = GROUPS_CONFIG[gName];
      GROUP_MATCH_PAIRINGS.forEach((pairing, idx) => {
        const id = `G-${gName}-${idx}`;
        const match = groupMatches[id];
        if (match && match.score1 !== '' && match.score2 !== '') {
          const s1 = match.score1;
          const s2 = match.score2;
          const stats1 = standings[gName].find(t => t.code === teamsList[pairing.t1]);
          const stats2 = standings[gName].find(t => t.code === teamsList[pairing.t2]);

          if (stats1 && stats2) {
            stats1.played += 1;
            stats2.played += 1;
            stats1.gf += s1; stats1.ga += s2;
            stats2.gf += s2; stats2.ga += s1;

            if (s1 > s2) {
              stats1.won += 1; stats1.pts += 3; stats2.lost += 1;
            } else if (s2 > s1) {
              stats2.won += 1; stats2.pts += 3; stats1.lost += 1;
            } else {
              stats1.drawn += 1; stats1.pts += 1; stats2.drawn += 1; stats2.pts += 1;
            }
            stats1.gd = stats1.gf - stats1.ga;
            stats2.gd = stats2.gf - stats2.ga;
          }
        }
      });

      // Sort standing matrix with official FIFA tiebreakers (points, goal-diff, goals-for)
      standings[gName].sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return a.code.localeCompare(b.code);
      });
    });
    return standings;
  }, [groupMatches]);

  // Find top qualifiers + 8 best thirds
  const qualificationState = useMemo(() => {
    const auto = {};
    const thirdPlacedTeams = [];

    Object.entries(groupStandings).forEach(([gName, table]) => {
      auto[gName] = [table[0].code, table[1].code];
      const third = table[2];
      thirdPlacedTeams.push({
        code: third.code, groupName: gName, pts: third.pts, gd: third.gd, gf: third.gf
      });
    });

    // Rank 3rd placed teams across all 12 groups
    thirdPlacedTeams.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return a.code.localeCompare(b.code);
    });

    const best8Thirds = thirdPlacedTeams.slice(0, 8).map(t => t.code);
    return { auto, thirds: best8Thirds, bestThirdsRanking: thirdPlacedTeams };
  }, [groupStandings]);

  // ================================================================================
  // 🔀 UNIQUE BIPARTITE MATCHING FOR THIRD-PLACE TEAMS (No Duplicates)
  // ================================================================================
  const allocatedThirds = useMemo(() => {
    // Define the official allowed pools for each third-place match slot
    const slots = [
      { matchId: 75, allowedGroups: ['A', 'B', 'C', 'D', 'F'], label: "3ABCDF" },
      { matchId: 78, allowedGroups: ['C', 'D', 'F', 'G', 'H'], label: "3CDFGH" },
      { matchId: 79, allowedGroups: ['C', 'E', 'F', 'H', 'I'], label: "3CEHFI" },
      { matchId: 80, allowedGroups: ['E', 'H', 'I', 'J', 'K'], label: "3EHIJK" },
      { matchId: 81, allowedGroups: ['A', 'E', 'H', 'I', 'J'], label: "3AEHIJ" },
      { matchId: 82, allowedGroups: ['B', 'E', 'F', 'I', 'J'], label: "3BEFIJ" },
      { matchId: 85, allowedGroups: ['E', 'F', 'G', 'I', 'J'], label: "3EFGIJ" },
      { matchId: 88, allowedGroups: ['D', 'E', 'I', 'J', 'L'], label: "3DEIJL" },
    ];

    const { thirds, bestThirdsRanking } = qualificationState;

    // Extract the group letters of the qualified third-place countries
    const qualifiedThirds = thirds.map(code => {
      const rankInfo = bestThirdsRanking.find(r => r.code === code);
      return {
        code: code,
        groupName: rankInfo ? rankInfo.groupName : null
      };
    }).filter(t => t.groupName !== null);

    const assignment = {};
    const used = new Set();

    // Backtracking matching algorithm to guarantee each team is allocated to exactly ONE valid slot
    const backtrack = (slotIndex) => {
      if (slotIndex === slots.length) return true;

      const slot = slots[slotIndex];
      for (let i = 0; i < qualifiedThirds.length; i++) {
        const team = qualifiedThirds[i];
        if (!used.has(team.code)) {
          if (slot.allowedGroups.includes(team.groupName)) {
            used.add(team.code);
            assignment[slot.matchId] = team.code;
            if (backtrack(slotIndex + 1)) {
              return true;
            }
            used.delete(team.code);
            delete assignment[slot.matchId];
          }
        }
      }
      return false;
    };

    const solved = backtrack(0);

    // Dynamic Greedy Fallback if simulation is in progress or odd team combinations occur
    if (!solved) {
      const fallbackAssignment = {};
      const fallbackUsed = new Set();
      slots.forEach(slot => {
        const matchedTeam = qualifiedThirds.find(t => !fallbackUsed.has(t.code) && slot.allowedGroups.includes(t.groupName));
        if (matchedTeam) {
          fallbackAssignment[slot.matchId] = matchedTeam.code;
          fallbackUsed.add(matchedTeam.code);
        } else {
          fallbackAssignment[slot.matchId] = slot.label;
        }
      });
      return fallbackAssignment;
    }

    return assignment;
  }, [qualificationState]);

  return { groupStandings, qualificationState, allocatedThirds };
}
