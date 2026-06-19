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
  'G-A-2': 28,   // CZE vs RSA
  'G-A-3': 25,   // MEX vs KOR
  'G-A-4': 52,    // MEX vs CZE
  'G-A-5': 51,    // RSA vs KOR 

  // Group B — CAN, SUI, QAT, BIH
  'G-B-0': 3,    // CAN vs BIH
  'G-B-1': 8,    // SUI vs QAT
  'G-B-2': 53,    // QAT vs BIH 
  'G-B-3': 54,    // CAN vs SUI 
  'G-B-4': 27,   // CAN vs QAT
  'G-B-5': 26,   // BIH vs SUI

  // Group C — BRA, MAR, SCO, HAI
  'G-C-0': 29,    // BRA vs HAI
  'G-C-1': 30,    // MAR vs SCO
  'G-C-2': 5,   // SCO vs HAI
  'G-C-3': 7,   // BRA vs MAR
  'G-C-4': 49,    // BRA vs SCO 
  'G-C-5': 50,    // HAI vs MAR 

  // Group D — USA, AUS, TUR, PAR
  'G-D-0': 4,    // USA vs PAR
  'G-D-1': 6,    // AUS vs TUR
  'G-D-2': 32,   // TUR vs PAR
  'G-D-3': 31,   // USA vs AUS
  'G-D-4': 56,    // USA vs TUR 
  'G-D-5': 55,    // PAR vs AUS 

  // Group E — GER, CIV, ECU, CUW
  'G-E-0': 10,    // GER vs CUW
  'G-E-1': 9,   // CIV vs ECU
  'G-E-2': 34,    // ECU vs CUW 
  'G-E-3': 33,    // GER vs CIV 
  'G-E-4': 58,    // GER vs ECU 
  'G-E-5': 57,    // CUW vs CIV 

  // Group F — NED, JPN, TUN, SWE
  'G-F-0': 35,    // NED vs SWE 
  'G-F-1': 36,    // JPN vs TUN 
  'G-F-2': 12,   // TUN vs SWE
  'G-F-3': 11,   // NED vs JPN
  'G-F-4': 60,    // NED vs TUN 
  'G-F-5': 59,    // SWE vs JPN 

  // Group G — BEL, EGY, IRN, NZL
  'G-G-0': 62,    // BEL vs NZL 
  'G-G-1': 61,    // EGY vs IRN 
  'G-G-2': 13,   // IRN vs NZL
  'G-G-3': 15,   // BEL vs EGY
  'G-G-4': 37,    // BEL vs IRN 
  'G-G-5': 38,    // NZL vs EGY 

  // Group H — ESP, KSA, URU, CPV
  'G-H-0': 14,   // ESP vs CPV
  'G-H-1': 16,   // KSA vs URU
  'G-H-2': 40,    // URU vs CPV 
  'G-H-3': 39,    // ESP vs KSA 
  'G-H-4': 64,    // ESP vs URU 
  'G-H-5': 63,    // CPV vs KSA 

  // Group I — FRA, IRQ, NOR, SEN
  'G-I-0': 17,   // FRA vs SEN
  'G-I-1': 18,   // IRQ vs NOR
  'G-I-2': 42,    // NOR vs SEN 
  'G-I-3': 41,    // FRA vs IRQ 
  'G-I-4': 65,    // FRA vs NOR 
  'G-I-5': 66,    // SEN vs IRQ 

  // Group J — ARG, AUT, JOR, ALG
  'G-J-0': 19,   // ARG vs ALG
  'G-J-1': 20,   // AUT vs JOR
  'G-J-2': 44,    // JOR vs ALG 
  'G-J-3': 43,    // ARG vs AUT 
  'G-J-4': 70,    // ARG vs JOR 
  'G-J-5': 69,    // ALG vs AUT 

  // Group K — POR, UZB, COL, COD
  'G-K-0': 21,   // POR vs COD
  'G-K-1': 23,   // UZB vs COL
  'G-K-2': 48,    // COL vs COD 
  'G-K-3': 45,    // POR vs UZB 
  'G-K-4': 71,    // POR vs COL 
  'G-K-5': 72,    // COD vs UZB 

  // Group L — ENG, GHA, PAN, CRO
  'G-L-0': 22,   // ENG vs CRO
  'G-L-1': 34,   // GHA vs PAN
  'G-L-2': 46,    // PAN vs CRO 
  'G-L-3': 45,    // ENG vs GHA 
  'G-L-4': 67,    // ENG vs PAN 
  'G-L-5': 68,    // CRO vs GHA 
};
