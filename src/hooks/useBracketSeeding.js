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

export function useBracketSeeding(qualificationState, allocatedThirds, koMatches) {
  // Symmetrical Seeding based on official matches
  const r32MatchesSeeding = useMemo(() => {
    const { auto } = qualificationState;

    // Official pairings mapping to matches 73 to 88 with unique allocation integrated
    return {
      73: { t1: auto["A"]?.[1] || "2A", t2: auto["B"]?.[1] || "2B" },
      74: { t1: auto["E"]?.[0] || "1E", t2: allocatedThirds[74] || "3ABCDF" },

      75: { t1: auto["F"]?.[0] || "1F", t2: auto["C"]?.[1] || "2C" },
      76: { t1: auto["C"]?.[0] || "1C", t2: auto["F"]?.[1] || "2F" },
      77: { t1: auto["I"]?.[0] || "1I", t2: allocatedThirds[77] || "3CDFGH" },

      78: { t1: auto["E"]?.[1] || "2E", t2: auto["I"]?.[1] || "2I" },
      79: { t1: auto["A"]?.[0] || "1A", t2: allocatedThirds[79] || "3CEHFI" },
      80: { t1: auto["L"]?.[0] || "1L", t2: allocatedThirds[80] || "3EHIJK" },

      81: { t1: auto["D"]?.[0] || "1D", t2: allocatedThirds[81] || "3BEFIJ" },
      82: { t1: auto["G"]?.[0] || "1G", t2: allocatedThirds[82] || "3AEHIJ" },

      83: { t1: auto["K"]?.[1] || "2K", t2: auto["L"]?.[1] || "2L" },
      84: { t1: auto["H"]?.[0] || "1H", t2: auto["J"]?.[1] || "2J" },
      85: { t1: auto["B"]?.[0] || "1B", t2: allocatedThirds[85] || "3EFGIJ" },
      86: { t1: auto["J"]?.[0] || "1J", t2: auto["H"]?.[1] || "2H" },

      87: { t1: auto["K"]?.[0] || "1K", t2: allocatedThirds[87] || "3DEIJL" },
      88: { t1: auto["D"]?.[1] || "2D", t2: auto["G"]?.[1] || "2G" },
    };
  }, [qualificationState, allocatedThirds]);

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
