import { useMemo } from 'react';

// ================================================================================
// 🏆 BRACKET SEEDING CHAIN: R32 → R16 → QF → SF → Finals → Champion
// ================================================================================

function getWinner(t1, t2, mId, koMatches) {
  const match = koMatches[`KO-${mId}`];
  if (!match) return null;
  const { score1, score2, penalty1, penalty2 } = match;
  if (score1 === '' || score2 === '') return null;
  if (score1 > score2) return t1;
  if (score2 > score1) return t2;
  if (penalty1 !== '' && penalty2 !== '') {
    return penalty1 > penalty2 ? t1 : t2;
  }
  return null;
}

function getLoser(t1, t2, mId, koMatches) {
  const w = getWinner(t1, t2, mId, koMatches);
  if (!w) return null;
  return w === t1 ? t2 : t1;
}

export function useBracketSeeding(qualificationState, allocatedThirds, koMatches, bracketMode, confirmedPositions) {
  // Symmetrical Seeding based on official matches
  const r32MatchesSeeding = useMemo(() => {
    const { auto } = qualificationState;

    // In 'fixtures' mode, only use teams whose position is confirmed
    // confirmedPositions[group] = [1st|null, 2nd|null, 3rd|null, 4th|null]
    const cp = confirmedPositions || {};
    const get1st = (g) => bracketMode === 'fixtures' ? (cp[g]?.[0] || `1${g}`) : (auto[g]?.[0] || `1${g}`);
    const get2nd = (g) => bracketMode === 'fixtures' ? (cp[g]?.[1] || `2${g}`) : (auto[g]?.[1] || `2${g}`);

    // Third-place allocation: in fixtures mode, only valid if all groups are complete
    // (since 8-best-thirds requires all 12 groups finalized)
    const getThird = (matchId, label) => {
      if (bracketMode === 'fixtures') {
        // Check if allocatedThirds resolved to a real team code
        const code = allocatedThirds[matchId];
        if (code && code.length === 3) return code;
        return label; // Show placeholder like "3ABCDF"
      }
      return allocatedThirds[matchId] || label;
    };

    // Official pairings mapping to matches 73 to 88 with unique allocation integrated
    return {
      73: { t1: get2nd("A"), t2: get2nd("B") },
      74: { t1: get1st("E"), t2: getThird(74, "3ABCDF") },

      75: { t1: get1st("F"), t2: get2nd("C") },
      76: { t1: get1st("C"), t2: get2nd("F") },
      77: { t1: get1st("I"), t2: getThird(77, "3CDFGH") },

      78: { t1: get2nd("E"), t2: get2nd("I") },
      79: { t1: get1st("A"), t2: getThird(79, "3CEHFI") },
      80: { t1: get1st("L"), t2: getThird(80, "3EHIJK") },

      81: { t1: get1st("D"), t2: getThird(81, "3BEFIJ") },
      82: { t1: get1st("G"), t2: getThird(82, "3AEHIJ") },

      83: { t1: get2nd("K"), t2: get2nd("L") },
      84: { t1: get1st("H"), t2: get2nd("J") },
      85: { t1: get1st("B"), t2: getThird(85, "3EFGIJ") },
      86: { t1: get1st("J"), t2: get2nd("H") },

      87: { t1: get1st("K"), t2: getThird(87, "3DEIJL") },
      88: { t1: get2nd("D"), t2: get2nd("G") },
    };
  }, [qualificationState, allocatedThirds, bracketMode, confirmedPositions]);

  const roundOf16Seeding = useMemo(() => {
    const m = r32MatchesSeeding;
    return {
      89: { t1: getWinner(m[74].t1, m[74].t2, 74, koMatches) || "Winner Match 74", t2: getWinner(m[77].t1, m[77].t2, 77, koMatches) || "Winner Match 77" },
      90: { t1: getWinner(m[73].t1, m[73].t2, 73, koMatches) || "Winner Match 73", t2: getWinner(m[75].t1, m[75].t2, 75, koMatches) || "Winner Match 75" },
      91: { t1: getWinner(m[76].t1, m[76].t2, 76, koMatches) || "Winner Match 76", t2: getWinner(m[78].t1, m[78].t2, 78, koMatches) || "Winner Match 78" },
      92: { t1: getWinner(m[79].t1, m[79].t2, 79, koMatches) || "Winner Match 79", t2: getWinner(m[80].t1, m[80].t2, 80, koMatches) || "Winner Match 80" },

      93: { t1: getWinner(m[83].t1, m[83].t2, 83, koMatches) || "Winner Match 83", t2: getWinner(m[84].t1, m[84].t2, 84, koMatches) || "Winner Match 84" },
      94: { t1: getWinner(m[81].t1, m[81].t2, 81, koMatches) || "Winner Match 81", t2: getWinner(m[82].t1, m[82].t2, 82, koMatches) || "Winner Match 82" },
      95: { t1: getWinner(m[86].t1, m[86].t2, 86, koMatches) || "Winner Match 86", t2: getWinner(m[88].t1, m[88].t2, 88, koMatches) || "Winner Match 88" },
      96: { t1: getWinner(m[85].t1, m[85].t2, 85, koMatches) || "Winner Match 85", t2: getWinner(m[87].t1, m[87].t2, 87, koMatches) || "Winner Match 87" },
    };
  }, [r32MatchesSeeding, koMatches]);

  const quarterFinalsSeeding = useMemo(() => {
    const r = roundOf16Seeding;
    return {
      97: { t1: getWinner(r[89].t1, r[89].t2, 89, koMatches) || "Winner Match 89", t2: getWinner(r[90].t1, r[90].t2, 90, koMatches) || "Winner Match 90" },
      98: { t1: getWinner(r[93].t1, r[93].t2, 93, koMatches) || "Winner Match 93", t2: getWinner(r[94].t1, r[94].t2, 94, koMatches) || "Winner Match 94" },

      99: { t1: getWinner(r[91].t1, r[91].t2, 91, koMatches) || "Winner Match 91", t2: getWinner(r[92].t1, r[92].t2, 92, koMatches) || "Winner Match 92" },
      100: { t1: getWinner(r[95].t1, r[95].t2, 95, koMatches) || "Winner Match 95", t2: getWinner(r[96].t1, r[96].t2, 96, koMatches) || "Winner Match 96" },
    };
  }, [roundOf16Seeding, koMatches]);

  const semiFinalsSeeding = useMemo(() => {
    const q = quarterFinalsSeeding;
    return {
      101: { t1: getWinner(q[97].t1, q[97].t2, 97, koMatches) || "Winner Match 97", t2: getWinner(q[98].t1, q[98].t2, 98, koMatches) || "Winner Match 98" },
      102: { t1: getWinner(q[99].t1, q[99].t2, 99, koMatches) || "Winner Match 99", t2: getWinner(q[100].t1, q[100].t2, 100, koMatches) || "Winner Match 100" },
    };
  }, [quarterFinalsSeeding, koMatches]);

  const finalsSeeding = useMemo(() => {
    const s = semiFinalsSeeding;
    const w1 = getWinner(s[101].t1, s[101].t2, 101, koMatches);
    const w2 = getWinner(s[102].t1, s[102].t2, 102, koMatches);
    const l1 = getLoser(s[101].t1, s[101].t2, 101, koMatches);
    const l2 = getLoser(s[102].t1, s[102].t2, 102, koMatches);

    return {
      103: { t1: l1 || "Loser Match 101", t2: l2 || "Loser Match 102" },
      104: { t1: w1 || "Winner Match 101", t2: w2 || "Winner Match 102" },
    };
  }, [semiFinalsSeeding, koMatches]);

  const tournamentChampion = useMemo(() => {
    const f = finalsSeeding[104];
    return getWinner(f.t1, f.t2, 104, koMatches);
  }, [finalsSeeding, koMatches]);

  return {
    r32MatchesSeeding,
    roundOf16Seeding,
    quarterFinalsSeeding,
    semiFinalsSeeding,
    finalsSeeding,
    tournamentChampion
  };
}
