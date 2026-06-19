// ================================================================================
// 🏟️ GROUP STAGE CONFIGURATION
// ================================================================================
export const GROUPS_CONFIG = {
  A: ["MEX", "KOR", "CZE", "RSA"],
  B: ["CAN", "SUI", "QAT", "BIH"],
  C: ["BRA", "MAR", "SCO", "HAI"],
  D: ["USA", "AUS", "TUR", "PAR"],
  E: ["GER", "CIV", "ECU", "CUW"],
  F: ["NED", "JPN", "TUN", "SWE"],
  G: ["BEL", "EGY", "IRN", "NZL"],
  H: ["ESP", "KSA", "URU", "CPV"],
  I: ["FRA", "IRQ", "NOR", "SEN"],
  J: ["ARG", "AUT", "JOR", "ALG"],
  K: ["POR", "UZB", "COL", "COD"],
  L: ["ENG", "GHA", "PAN", "CRO"],
};

// Pairing template — t1/t2 are indices into the group's team array
export const GROUP_MATCH_PAIRINGS = [
  { t1: 0, t2: 3 },  // pairing index 0: team[0] vs team[3]
  { t1: 1, t2: 2 },  // pairing index 1: team[1] vs team[2]
  { t1: 2, t2: 3 },  // pairing index 2: team[2] vs team[3]
  { t1: 0, t2: 1 },  // pairing index 3: team[0] vs team[1]
  { t1: 0, t2: 2 },  // pairing index 4: team[0] vs team[2]
  { t1: 3, t2: 1 },  // pairing index 5: team[3] vs team[1]
];

// ================================================================================
// 🔢 MATCH NUMBERS (1–72) — Fill in the official FIFA match number for each game.
//    Key format: "G-{GroupLetter}-{PairingIndex}"
//    The UI will display these and sort fixtures by match number.
// ================================================================================
export const GROUP_MATCH_NUMBERS = {
  // Group A — MEX, KOR, CZE, RSA
  'G-A-0': 1,    // MEX vs RSA
  'G-A-1': 2,    // KOR vs CZE
  'G-A-2': 14,   // CZE vs RSA
  'G-A-3': 13,   // MEX vs KOR
  'G-A-4': 0,    // MEX vs CZE       ← fill in match number
  'G-A-5': 0,    // RSA vs KOR        ← fill in match number

  // Group B — CAN, SUI, QAT, BIH
  'G-B-0': 3,    // CAN vs BIH
  'G-B-1': 8,    // SUI vs QAT
  'G-B-2': 0,    // QAT vs BIH        ← fill in match number
  'G-B-3': 0,    // CAN vs SUI        ← fill in match number
  'G-B-4': 39,   // CAN vs QAT
  'G-B-5': 40,   // BIH vs SUI

  // Group C — BRA, MAR, SCO, HAI
  'G-C-0': 7,    // BRA vs HAI
  'G-C-1': 5,    // MAR vs SCO
  'G-C-2': 15,   // SCO vs HAI
  'G-C-3': 16,   // BRA vs MAR
  'G-C-4': 0,    // BRA vs SCO        ← fill in match number
  'G-C-5': 0,    // HAI vs MAR        ← fill in match number

  // Group D — USA, AUS, TUR, PAR
  'G-D-0': 4,    // USA vs PAR
  'G-D-1': 6,    // AUS vs TUR
  'G-D-2': 17,   // TUR vs PAR
  'G-D-3': 18,   // USA vs AUS
  'G-D-4': 0,    // USA vs TUR        ← fill in match number
  'G-D-5': 0,    // PAR vs AUS        ← fill in match number

  // Group E — GER, CIV, ECU, CUW
  'G-E-0': 9,    // GER vs CUW
  'G-E-1': 10,   // CIV vs ECU
  'G-E-2': 0,    // ECU vs CUW        ← fill in match number
  'G-E-3': 0,    // GER vs CIV        ← fill in match number
  'G-E-4': 0,    // GER vs ECU        ← fill in match number
  'G-E-5': 0,    // CUW vs CIV        ← fill in match number

  // Group F — NED, JPN, TUN, SWE
  'G-F-0': 0,    // NED vs SWE        ← fill in match number
  'G-F-1': 0,    // JPN vs TUN        ← fill in match number
  'G-F-2': 20,   // TUN vs SWE
  'G-F-3': 19,   // NED vs JPN
  'G-F-4': 0,    // NED vs TUN        ← fill in match number
  'G-F-5': 0,    // SWE vs JPN        ← fill in match number

  // Group G — BEL, EGY, IRN, NZL
  'G-G-0': 0,    // BEL vs NZL        ← fill in match number
  'G-G-1': 0,    // EGY vs IRN        ← fill in match number
  'G-G-2': 22,   // IRN vs NZL
  'G-G-3': 21,   // BEL vs EGY
  'G-G-4': 0,    // BEL vs IRN        ← fill in match number
  'G-G-5': 0,    // NZL vs EGY        ← fill in match number

  // Group H — ESP, KSA, URU, CPV
  'G-H-0': 11,   // ESP vs CPV
  'G-H-1': 12,   // KSA vs URU
  'G-H-2': 0,    // URU vs CPV        ← fill in match number
  'G-H-3': 0,    // ESP vs KSA        ← fill in match number
  'G-H-4': 0,    // ESP vs URU        ← fill in match number
  'G-H-5': 0,    // CPV vs KSA        ← fill in match number

  // Group I — FRA, IRQ, NOR, SEN
  'G-I-0': 23,   // FRA vs SEN
  'G-I-1': 24,   // IRQ vs NOR
  'G-I-2': 0,    // NOR vs SEN        ← fill in match number
  'G-I-3': 0,    // FRA vs IRQ        ← fill in match number
  'G-I-4': 0,    // FRA vs NOR        ← fill in match number
  'G-I-5': 0,    // SEN vs IRQ        ← fill in match number

  // Group J — ARG, AUT, JOR, ALG
  'G-J-0': 25,   // ARG vs ALG
  'G-J-1': 26,   // AUT vs JOR
  'G-J-2': 0,    // JOR vs ALG        ← fill in match number
  'G-J-3': 0,    // ARG vs AUT        ← fill in match number
  'G-J-4': 0,    // ARG vs JOR        ← fill in match number
  'G-J-5': 0,    // ALG vs AUT        ← fill in match number

  // Group K — POR, UZB, COL, COD
  'G-K-0': 27,   // POR vs COD
  'G-K-1': 28,   // UZB vs COL
  'G-K-2': 0,    // COL vs COD        ← fill in match number
  'G-K-3': 0,    // POR vs UZB        ← fill in match number
  'G-K-4': 0,    // POR vs COL        ← fill in match number
  'G-K-5': 0,    // COD vs UZB        ← fill in match number

  // Group L — ENG, GHA, PAN, CRO
  'G-L-0': 29,   // ENG vs CRO
  'G-L-1': 30,   // GHA vs PAN
  'G-L-2': 0,    // PAN vs CRO        ← fill in match number
  'G-L-3': 0,    // ENG vs GHA        ← fill in match number
  'G-L-4': 0,    // ENG vs PAN        ← fill in match number
  'G-L-5': 0,    // CRO vs GHA        ← fill in match number
};
