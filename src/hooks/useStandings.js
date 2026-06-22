import { useMemo } from 'react';
import { GROUPS_CONFIG, GROUP_MATCH_PAIRINGS } from '../constants/groups';
import { FIFA_RANKINGS } from '../constants/fifaRankings';

// ================================================================================
// 🧮 STANDINGS ENGINE — with FIFA official tiebreakers
// ================================================================================

// ── Fair Play score from card counts ─────────────────────────────────────────
// Yellow card: −1 | Second-yellow red: −3 | Direct red: −4
function calcFairPlay(yellow, secondYellow, red) {
  return (yellow * -1) + (secondYellow * -3) + (red * -4);
}

// ── Head-to-Head stats among a subset of tied teams ──────────────────────────
function computeH2H(tiedCodes, groupName, teamsList, groupMatches) {
  const tiedSet = new Set(tiedCodes);
  const h2h = {};
  tiedCodes.forEach(code => {
    h2h[code] = { pts: 0, gd: 0, gf: 0 };
  });

  GROUP_MATCH_PAIRINGS.forEach((pairing, idx) => {
    const id = `G-${groupName}-${idx}`;
    const match = groupMatches[id];
    const t1Code = teamsList[pairing.t1];
    const t2Code = teamsList[pairing.t2];

    // Only include matches where BOTH teams are in the tied subset
    if (match && match.status !== 'upcoming' && match.score1 !== '' && match.score2 !== '' &&
        tiedSet.has(t1Code) && tiedSet.has(t2Code)) {
      const s1 = Number(match.score1);
      const s2 = Number(match.score2);

      h2h[t1Code].gf += s1;
      h2h[t1Code].gd += (s1 - s2);
      h2h[t2Code].gf += s2;
      h2h[t2Code].gd += (s2 - s1);

      if (s1 > s2) {
        h2h[t1Code].pts += 3;
      } else if (s2 > s1) {
        h2h[t2Code].pts += 3;
      } else {
        h2h[t1Code].pts += 1;
        h2h[t2Code].pts += 1;
      }
    }
  });

  return h2h;
}

// ── Sort with FIFA Head-to-Head tiebreakers ──────────────────────────────────
// When teams are tied on points, FIFA applies (in order):
//   1. H2H points  2. H2H GD  3. H2H GF
//   4. Overall GD  5. Overall GF  6. Fair Play  7. Alphabetical
function sortWithH2H(standings, groupName, teamsList, groupMatches) {
  // Rough sort by overall points first
  standings.sort((a, b) => b.pts - a.pts);

  const result = [];
  let i = 0;

  while (i < standings.length) {
    // Find the run of teams with the same point total
    let j = i + 1;
    while (j < standings.length && standings[j].pts === standings[i].pts) {
      j++;
    }

    if (j - i === 1) {
      // Single team — no tie to break
      result.push(standings[i]);
    } else {
      // Multiple teams tied on points — apply H2H tiebreakers
      const tied = standings.slice(i, j);
      const tiedCodes = tied.map(t => t.code);
      const h2h = computeH2H(tiedCodes, groupName, teamsList, groupMatches);

      tied.sort((a, b) => {
        const ha = h2h[a.code];
        const hb = h2h[b.code];
        // Step 1–3: Head-to-head criteria
        if (hb.pts !== ha.pts) return hb.pts - ha.pts;
        if (hb.gd !== ha.gd) return hb.gd - ha.gd;
        if (hb.gf !== ha.gf) return hb.gf - ha.gf;
        // Step 4–5: Overall stats
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
        // Step 6: Fair Play (higher = better, i.e. less negative)
        if (b.fairPlay !== a.fairPlay) return b.fairPlay - a.fairPlay;
        // Step 7: FIFA World Ranking (lower is better)
        const rankA = FIFA_RANKINGS[a.code]?.ranking || 999;
        const rankB = FIFA_RANKINGS[b.code]?.ranking || 999;
        if (rankA !== rankB) return rankA - rankB;
        // Step 8: Alphabetical fallback
        return a.code.localeCompare(b.code);
      });

      // Assign tiebreaker reasons
      for (let k = 0; k < tied.length; k++) {
        const t = tied[k];
        if (k === 0) {
          const b = tied[1];
          const ha = h2h[t.code], hb = h2h[b.code];
          if (ha.pts !== hb.pts) t.tiebreakerReason = `Won tie via H2H Points`;
          else if (ha.gd !== hb.gd) t.tiebreakerReason = `Won tie via H2H GD`;
          else if (ha.gf !== hb.gf) t.tiebreakerReason = `Won tie via H2H Goals`;
          else if (t.gd !== b.gd) t.tiebreakerReason = `Won tie via Overall GD`;
          else if (t.gf !== b.gf) t.tiebreakerReason = `Won tie via Overall Goals`;
          else if (t.fairPlay !== b.fairPlay) t.tiebreakerReason = `Won tie via Fair Play`;
          else if ((FIFA_RANKINGS[t.code]?.ranking || 999) !== (FIFA_RANKINGS[b.code]?.ranking || 999)) t.tiebreakerReason = `Won tie via FIFA Ranking`;
          else t.tiebreakerReason = `Won tie via Alphabetical`;
        } else {
          const a = tied[k-1];
          const ha = h2h[a.code], ht = h2h[t.code];
          if (ha.pts !== ht.pts) t.tiebreakerReason = `Lost tie via H2H Points`;
          else if (ha.gd !== ht.gd) t.tiebreakerReason = `Lost tie via H2H GD`;
          else if (ha.gf !== ht.gf) t.tiebreakerReason = `Lost tie via H2H Goals`;
          else if (a.gd !== t.gd) t.tiebreakerReason = `Lost tie via Overall GD`;
          else if (a.gf !== t.gf) t.tiebreakerReason = `Lost tie via Overall Goals`;
          else if (a.fairPlay !== t.fairPlay) t.tiebreakerReason = `Lost tie via Fair Play`;
          else if ((FIFA_RANKINGS[a.code]?.ranking || 999) !== (FIFA_RANKINGS[t.code]?.ranking || 999)) t.tiebreakerReason = `Lost tie via FIFA Ranking`;
          else t.tiebreakerReason = `Lost tie via Alphabetical`;
        }
      }

      result.push(...tied);
    }

    i = j;
  }

  return result;
}

// ================================================================================
// MAIN HOOK
// ================================================================================
export function useStandings(groupMatches) {

  // ── Build group standings ──────────────────────────────────────────────────
  const groupStandings = useMemo(() => {
    const standings = {};

    // Initialise blank stats for every team
    Object.entries(GROUPS_CONFIG).forEach(([gName, teamsList]) => {
      standings[gName] = teamsList.map(teamCode => ({
        code: teamCode,
        played: 0, won: 0, drawn: 0, lost: 0,
        gf: 0, ga: 0, gd: 0,
        fairPlay: 0,
        pts: 0,
      }));
    });

    // Accumulate match results
    Object.keys(GROUPS_CONFIG).forEach(gName => {
      const teamsList = GROUPS_CONFIG[gName];

      GROUP_MATCH_PAIRINGS.forEach((pairing, idx) => {
        const id = `G-${gName}-${idx}`;
        const match = groupMatches[id];

        if (match && match.status !== 'upcoming' && match.score1 !== '' && match.score2 !== '') {
          const s1 = Number(match.score1);
          const s2 = Number(match.score2);
          const stats1 = standings[gName].find(t => t.code === teamsList[pairing.t1]);
          const stats2 = standings[gName].find(t => t.code === teamsList[pairing.t2]);

          if (stats1 && stats2) {
            // Basic match stats
            stats1.played += 1;
            stats2.played += 1;
            stats1.gf += s1; stats1.ga += s2;
            stats2.gf += s2; stats2.ga += s1;

            if (s1 > s2) {
              stats1.won += 1; stats1.pts += 3; stats2.lost += 1;
            } else if (s2 > s1) {
              stats2.won += 1; stats2.pts += 3; stats1.lost += 1;
            } else {
              stats1.drawn += 1; stats1.pts += 1;
              stats2.drawn += 1; stats2.pts += 1;
            }

            stats1.gd = stats1.gf - stats1.ga;
            stats2.gd = stats2.gf - stats2.ga;

            // Fair Play from disciplinary cards
            stats1.fairPlay += calcFairPlay(
              Number(match.yellow1) || 0,
              Number(match.secondYellow1) || 0,
              Number(match.red1) || 0
            );
            stats2.fairPlay += calcFairPlay(
              Number(match.yellow2) || 0,
              Number(match.secondYellow2) || 0,
              Number(match.red2) || 0
            );
          }
        }
      });

      // Sort with official FIFA head-to-head tiebreakers
      standings[gName] = sortWithH2H(
        standings[gName], gName, GROUPS_CONFIG[gName], groupMatches
      );

      // ====================================================================================
      // 🔮 MATHEMATICAL QUALIFICATION / ELIMINATION SIMULATOR (Q / E tags)
      // ====================================================================================
      // This algorithm brute-forces all remaining matches in the group to mathematically
      // guarantee if a team is locked into the Top 2 (Q) or mathematically eliminated (E).
      // It perfectly accounts for FIFA tiebreakers: Points -> H2H Points -> H2H GD/GF.
      
      const teams = standings[gName];
      const unplayed = [];
      GROUP_MATCH_PAIRINGS.forEach((pairing, idx) => {
        const id = `G-${gName}-${idx}`;
        const match = groupMatches[id];
        if (!match || match.status === 'upcoming' || match.score1 === '' || match.score2 === '') {
          unplayed.push(pairing);
        }
      });

      if (unplayed.length === 0) {
        // All matches played, exact positions are completely locked
        teams[0].isQ = true;
        teams[1].isQ = true;
        teams[3].isE = true;
      } else {
        const qeStatus = {};
        teams.forEach(t => { qeStatus[t.code] = { canFailQ: false, canFailE: false }; });

        // Total future scenarios = 3 ^ (number of unplayed matches)
        // (Because each match has 3 outcomes: W, D, L)
        const totalScenarios = Math.pow(3, unplayed.length);
        
        for (let s = 0; s < totalScenarios; s++) {
          // --- STEP 1: Calculate total points for this specific scenario ---
          const simPts = {};
          teams.forEach(t => { simPts[t.code] = 0; });

          let temp = s;
          const simMatchResults = [];
          
          GROUP_MATCH_PAIRINGS.forEach((pairing, idx) => {
            const id = `G-${gName}-${idx}`;
            const match = groupMatches[id];
            const t1Code = teamsList[pairing.t1];
            const t2Code = teamsList[pairing.t2];

            let outcome; // 0: t1 wins, 1: t2 wins, 2: draw
            if (!match || match.status === 'upcoming' || match.score1 === '' || match.score2 === '') {
              outcome = temp % 3;
              temp = Math.floor(temp / 3);
            } else {
              const s1 = Number(match.score1);
              const s2 = Number(match.score2);
              if (s1 > s2) outcome = 0;
              else if (s2 > s1) outcome = 1;
              else outcome = 2;
            }
            
            simMatchResults.push({ t1: t1Code, t2: t2Code, outcome });

            if (outcome === 0) simPts[t1Code] += 3;
            else if (outcome === 1) simPts[t2Code] += 3;
            else { simPts[t1Code] += 1; simPts[t2Code] += 1; }
          });

          // --- STEP 2: Group teams by their total points and sort them ---
          const pointsMap = {};
          teams.forEach(t => {
            const p = simPts[t.code];
            if (!pointsMap[p]) pointsMap[p] = [];
            pointsMap[p].push(t.code);
          });

          const sortedPoints = Object.keys(pointsMap).map(Number).sort((a, b) => b - a);
          let currentRank = 1;

          // --- STEP 3: Assign ranks and determine Q/E status ---
          sortedPoints.forEach(p => {
            const tiedTeams = pointsMap[p];
            if (tiedTeams.length === 1) {
              // CASE A: No tie on total points.
              // The team's rank is absolutely fixed for this specific scenario.
              // We check their rank: if it's > 2, they failed to get Top 2 in this scenario.
              // If it's < 4, they avoided 4th place in this scenario.
              const tCode = tiedTeams[0];
              if (currentRank > 2) qeStatus[tCode].canFailQ = true;
              if (currentRank < 4) qeStatus[tCode].canFailE = true;
              currentRank++;
            } else {
              // CASE B: Multiple teams tied on total points!
              // FIFA Tiebreaker 1: Head-to-Head (H2H) Points among the tied teams.
              // We calculate H2H points based on both real and simulated W/D/L outcomes.
              const h2hPts = {};
              tiedTeams.forEach(t => { h2hPts[t] = 0; });
              const tiedSet = new Set(tiedTeams);

              simMatchResults.forEach(m => {
                if (tiedSet.has(m.t1) && tiedSet.has(m.t2)) {
                  if (m.outcome === 0) h2hPts[m.t1] += 3;
                  else if (m.outcome === 1) h2hPts[m.t2] += 3;
                  else { h2hPts[m.t1] += 1; h2hPts[m.t2] += 1; }
                }
              });

              const h2hMap = {};
              tiedTeams.forEach(t => {
                const h = h2hPts[t];
                if (!h2hMap[h]) h2hMap[h] = [];
                h2hMap[h].push(t);
              });
              
              const sortedH2H = Object.keys(h2hMap).map(Number).sort((a, b) => b - a);
              let tieRank = currentRank;
              
              sortedH2H.forEach(h => {
                const subTied = h2hMap[h];
                
                if (subTied.length === 1) {
                  // CASE B1: H2H Points successfully broke the tie for this team.
                  // Their rank is strictly defined.
                  const tCode = subTied[0];
                  if (tieRank > 2) qeStatus[tCode].canFailQ = true;
                  if (tieRank < 4) qeStatus[tCode].canFailE = true;
                  tieRank++;
                } else {
                  // CASE B2: Teams are STILL TIED on H2H Points!
                  // We must now check if all internal matches between these specific tied teams 
                  // have already been played in real life.
                  let allInternalPlayed = true;
                  const internalStats = {};
                  subTied.forEach(t => internalStats[t] = { gd: 0, gf: 0 });

                  GROUP_MATCH_PAIRINGS.forEach((pairing, idx) => {
                    const id = `G-${gName}-${idx}`;
                    const t1Code = teamsList[pairing.t1];
                    const t2Code = teamsList[pairing.t2];
                    
                    if (subTied.includes(t1Code) && subTied.includes(t2Code)) {
                      const m = groupMatches[id];
                      if (!m || m.status === 'upcoming' || m.score1 === '' || m.score2 === '') {
                        allInternalPlayed = false;
                      } else {
                        const s1 = Number(m.score1);
                        const s2 = Number(m.score2);
                        internalStats[t1Code].gf += s1;
                        internalStats[t1Code].gd += (s1 - s2);
                        internalStats[t2Code].gf += s2;
                        internalStats[t2Code].gd += (s2 - s1);
                      }
                    }
                  });

                  if (allInternalPlayed) {
                    // CASE B3: All internal matches are completed!
                    // This means their H2H GD and H2H GF are PERMANENTLY LOCKED.
                    // We can safely sort them by these exact locked stats.
                    subTied.sort((a, b) => {
                      if (internalStats[b].gd !== internalStats[a].gd) return internalStats[b].gd - internalStats[a].gd;
                      return internalStats[b].gf - internalStats[a].gf;
                    });

                    const identicalGroups = [];
                    let currGroup = [subTied[0]];
                    for (let k = 1; k < subTied.length; k++) {
                      const prev = subTied[k-1];
                      const curr = subTied[k];
                      if (internalStats[curr].gd === internalStats[prev].gd && internalStats[curr].gf === internalStats[prev].gf) {
                        currGroup.push(curr);
                      } else {
                        identicalGroups.push(currGroup);
                        currGroup = [curr];
                      }
                    }
                    identicalGroups.push(currGroup);

                    // For any teams that are completely identical across all H2H stats (Points, GD, GF),
                    // they must share a "Rank Range" (e.g. they both share 2nd and 3rd).
                    // This perfectly handles unpredictable future metrics like Fair Play or Overall GD.
                    identicalGroups.forEach(ig => {
                      const bestRank = tieRank;
                      const worstRank = tieRank + ig.length - 1;
                      ig.forEach(tCode => {
                        if (worstRank > 2) qeStatus[tCode].canFailQ = true;
                        if (bestRank < 4) qeStatus[tCode].canFailE = true;
                      });
                      tieRank += ig.length;
                    });
                  } else {
                    // CASE B4: Internal matches are NOT fully completed!
                    // This means H2H GD can swing infinitely based on unknown scorelines.
                    // To be safe, we assume any team could win the GD tiebreaker, 
                    // so they share the Best/Worst Rank Range.
                    const bestRank = tieRank;
                    const worstRank = tieRank + subTied.length - 1;
                    subTied.forEach(tCode => {
                      if (worstRank > 2) qeStatus[tCode].canFailQ = true;
                      if (bestRank < 4) qeStatus[tCode].canFailE = true;
                    });
                    tieRank += subTied.length;
                  }
                }
              });

              currentRank += tiedTeams.length;
            }
          });
        }

        teams.forEach(t => {
          if (!qeStatus[t.code].canFailQ) t.isQ = true;
          if (!qeStatus[t.code].canFailE) t.isE = true;
        });
      }
    });

    return standings;
  }, [groupMatches]);

  // ── Top qualifiers + 8 best thirds ─────────────────────────────────────────
  const qualificationState = useMemo(() => {
    const auto = {};
    const thirdPlacedTeams = [];

    Object.entries(groupStandings).forEach(([gName, table]) => {
      auto[gName] = [table[0].code, table[1].code];
      const third = table[2];
      thirdPlacedTeams.push({
        code: third.code,
        groupName: gName,
        pts: third.pts,
        gd: third.gd,
        gf: third.gf,
        fairPlay: third.fairPlay,
      });
    });

    // Rank 3rd-placed teams with FIFA tiebreakers (no H2H — different groups)
    thirdPlacedTeams.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      if (b.gf !== a.gf) return b.gf - a.gf;
      // Fair Play as 4th criterion
      if (b.fairPlay !== a.fairPlay) return b.fairPlay - a.fairPlay;
      // 5th criterion: FIFA World Ranking (lower is better)
      const rankA = FIFA_RANKINGS[a.code]?.ranking || 999;
      const rankB = FIFA_RANKINGS[b.code]?.ranking || 999;
      if (rankA !== rankB) return rankA - rankB;
      // Alphabetical fallback
      return a.code.localeCompare(b.code);
    });

    const best8Thirds = thirdPlacedTeams.slice(0, 8).map(t => t.code);
    return { auto, thirds: best8Thirds, bestThirdsRanking: thirdPlacedTeams };
  }, [groupStandings]);

  // ── Bipartite matching for third-place bracket slots (unchanged) ───────────
  const allocatedThirds = useMemo(() => {
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

    const qualifiedThirds = thirds.map(code => {
      const rankInfo = bestThirdsRanking.find(r => r.code === code);
      return { code, groupName: rankInfo ? rankInfo.groupName : null };
    }).filter(t => t.groupName !== null);

    const assignment = {};
    const used = new Set();

    const backtrack = (slotIndex) => {
      if (slotIndex === slots.length) return true;
      const slot = slots[slotIndex];
      for (let i = 0; i < qualifiedThirds.length; i++) {
        const team = qualifiedThirds[i];
        if (!used.has(team.code) && slot.allowedGroups.includes(team.groupName)) {
          used.add(team.code);
          assignment[slot.matchId] = team.code;
          if (backtrack(slotIndex + 1)) return true;
          used.delete(team.code);
          delete assignment[slot.matchId];
        }
      }
      return false;
    };

    if (!backtrack(0)) {
      // Greedy fallback for partial simulations
      const fb = {};
      const fbUsed = new Set();
      slots.forEach(slot => {
        const match = qualifiedThirds.find(t => !fbUsed.has(t.code) && slot.allowedGroups.includes(t.groupName));
        if (match) {
          fb[slot.matchId] = match.code;
          fbUsed.add(match.code);
        } else {
          fb[slot.matchId] = slot.label;
        }
      });
      return fb;
    }

    return assignment;
  }, [qualificationState]);

  return { groupStandings, qualificationState, allocatedThirds };
}
