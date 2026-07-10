/* ================================================================================
DEVELOPER CONFIGURATION: PRESET & LOCKED SCORES (upcoming, open, locked)
================================================================================ */

// Export the preset scores
export const PRESET_SCORES = {
  // Group A
  "G-A-0": { // Mexico vs South Africa
    score1: 2, score2: 0,
    yellow1: 1, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 1, red2: 2, status: "locked"
  },
  "G-A-1": { // South Korea vs Czechia
    score1: 2, score2: 1,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-A-2": { // Czechia vs South Africa
    score1: 1, score2: 1,
    yellow1: 1, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-A-3": { // Mexico vs South Korea
    score1: 1, score2: 0,
    yellow1: 0, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-A-4": { // Mexico vs Czechia
    score1: 3, score2: 0,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-A-5": { // South Africa vs South Korea
    score1: 1, score2: 0,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },

  // Group B
  "G-B-0": { // Canada vs Bosnia & Herzegovina
    score1: 1, score2: 1,
    yellow1: 2, yellow2: 3, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-B-1": { // Switzerland vs Qatar
    score1: 1, score2: 1,
    yellow1: 1, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-B-2": { // Qatar vs Bosnia & Herzegovina
    score1: 1, score2: 3,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-B-3": { // Canada vs Switzerland
    score1: 1, score2: 2,
    yellow1: 2, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-B-4": { // Canada vs Qatar
    score1: 6, score2: 0,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 2, status: "locked"
  },
  "G-B-5": { // Bosnia & Herzegovina vs Switzerland
    score1: 1, score2: 4,
    yellow1: 2, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 1, red2: 0, status: "locked"
  },

  // Group C
  "G-C-0": { // Brazil vs Haiti
    score1: 3, score2: 0,
    yellow1: 1, yellow2: 3, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-C-1": { // Morocco vs Scotland
    score1: 1, score2: 0,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-C-2": { // Scotland vs Haiti
    score1: 1, score2: 0,
    yellow1: 3, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-C-3": { // Brazil vs Morocco
    score1: 1, score2: 1,
    yellow1: 2, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-C-4": { // Brazil vs Scotland
    score1: 3, score2: 0,
    yellow1: 2, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-C-5": { // Haiti vs Morocco
    score1: 2, score2: 4,
    yellow1: 3, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },

  // Group D
  "G-D-0": { // USA vs Paraguay
    score1: 4, score2: 1,
    yellow1: 1, yellow2: 5, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-D-1": { // Australia vs Türkiye
    score1: 2, score2: 0,
    yellow1: 0, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-D-2": { // Türkiye vs Paraguay
    score1: 0, score2: 1,
    yellow1: 2, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 1, status: "locked"
  },
  "G-D-3": { // USA vs Australia
    score1: 2, score2: 0,
    yellow1: 3, yellow2: 4, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-D-4": { // USA vs Türkiye
    score1: 2, score2: 3,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-D-5": { // Paraguay vs Australia
    score1: 0, score2: 0,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },

  // Group E
  "G-E-0": { // Germany vs Curaçao
    score1: 7, score2: 1,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-E-1": { // Ivory Coast vs Ecuador
    score1: 1, score2: 0,
    yellow1: 3, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-E-2": { // Ecuador vs Curaçao
    score1: 0, score2: 0,
    yellow1: 1, yellow2: 5, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-E-3": { // Germany vs Ivory Coast
    score1: 2, score2: 1,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-E-4": { // Germany vs Ecuador
    score1: 1, score2: 2,
    yellow1: 1, yellow2: 3, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-E-5": { // Curaçao vs Ivory Coast
    score1: 0, score2: 2,
    yellow1: 2, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },

  // Group F
  "G-F-0": { // Netherlands vs Sweden
    score1: 5, score2: 1,
    yellow1: 0, yellow2: 3, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-F-1": { // Japan vs Tunisia
    score1: 4, score2: 0,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-F-2": { // Tunisia vs Sweden
    score1: 1, score2: 5,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-F-3": { // Netherlands vs Japan
    score1: 2, score2: 2,
    yellow1: 3, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-F-4": { // Netherlands vs Tunisia
    score1: 3, score2: 1,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-F-5": { // Sweden vs Japan
    score1: 1, score2: 1,
    yellow1: 2, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },

  // Group G
  "G-G-0": { // Belgium vs New Zealand
    score1: 5, score2: 1,
    yellow1: 0, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-G-1": { // Egypt vs Iran
    score1: 1, score2: 1,
    yellow1: 3, yellow2: 4, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-G-2": { // Iran vs New Zealand
    score1: 2, score2: 2,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-G-3": { // Belgium vs Egypt
    score1: 1, score2: 1,
    yellow1: 2, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-G-4": { // Belgium vs Iran
    score1: 0, score2: 0,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 1, red2: 0, status: "locked"
  },
  "G-G-5": { // New Zealand vs Egypt
    score1: 1, score2: 3,
    yellow1: 2, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },

  // Group H
  "G-H-0": { // Spain vs Cape Verde
    score1: 0, score2: 0,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-H-1": { // Saudi Arabia vs Uruguay
    score1: 1, score2: 1,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-H-2": { // Uruguay vs Cape Verde
    score1: 2, score2: 2,
    yellow1: 2, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-H-3": { // Spain vs Saudi Arabia
    score1: 4, score2: 0,
    yellow1: 0, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-H-4": { // Spain vs Uruguay
    score1: 1, score2: 0,
    yellow1: 1, yellow2: 3, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 1, status: "locked"
  },
  "G-H-5": { // Cape Verde vs Saudi Arabia
    score1: 0, score2: 0,
    yellow1: 1, yellow2: 3, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },

  // Group I
  "G-I-0": { // France vs Senegal
    score1: 3, score2: 1,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-I-1": { // Iraq vs Norway
    score1: 1, score2: 4,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-I-2": { // Norway vs Senegal
    score1: 3, score2: 2,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-I-3": { // France vs Iraq
    score1: 3, score2: 0,
    yellow1: 0, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-I-4": { // France vs Norway
    score1: 4, score2: 1,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-I-5": { // Senegal vs Iraq
    score1: 5, score2: 0,
    yellow1: 2, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 1, status: "locked"
  },

  // Group J
  "G-J-0": { // Argentina vs Algeria
    score1: 3, score2: 0,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-J-1": { // Austria vs Jordan
    score1: 3, score2: 1,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-J-2": { // Jordan vs Algeria
    score1: 1, score2: 2,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-J-3": { // Argentina vs Austria
    score1: 2, score2: 0,
    yellow1: 2, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-J-4": { // Argentina vs Jordan
    score1: 3, score2: 1,
    yellow1: 0, yellow2: 3, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-J-5": { // Algeria vs Austria
    score1: 3, score2: 3,
    yellow1: 0, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },

  // Group K
  "G-K-0": { // Portugal vs DR Congo
    score1: 1, score2: 1,
    yellow1: 3, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-K-1": { // Uzbekistan vs Colombia
    score1: 1, score2: 3,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-K-2": { // Colombia vs DR Congo
    score1: 1, score2: 0,
    yellow1: 2, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-K-3": { // Portugal vs Uzbekistan
    score1: 5, score2: 0,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-K-4": { // Portugal vs Colombia
    score1: 0, score2: 0,
    yellow1: 0, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-K-5": { // DR Congo vs Uzbekistan
    score1: 3, score2: 1,
    yellow1: 3, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },

  // Group L
  "G-L-0": { // England vs Croatia
    score1: 4, score2: 2,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-L-1": { // Ghana vs Panama
    score1: 1, score2: 0,
    yellow1: 1, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-L-2": { // Panama vs Croatia
    score1: 0, score2: 1,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-L-3": { // England vs Ghana
    score1: 0, score2: 0,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-L-4": { // England vs Panama
    score1: 2, score2: 0,
    yellow1: 1, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },
  "G-L-5": { // Croatia vs Ghana
    score1: 2, score2: 1,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "locked"
  },

  // ==================================================================================================================

  // Knockouts Matchday Presets (open, locked)
  // NOTE: Add timestamp in IST format, e.g. "2026-06-28T20:30:00+05:30"
  "KO-73": { // South Africa vs Canada
    score1: 0, score2: 1,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-06-29T00:30:00+05:30", status: "locked"
  },
  "KO-74": { // Germany vs Paraguay
    score1: 1, score2: 1,
    penalty1: 3, penalty2: 4,
    yellow1: 3, yellow2: 3, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-06-30T02:00:00+05:30", status: "locked"
  },
  "KO-75": { // Netherlands vs Morocco
    score1: 1, score2: 1,
    penalty1: 2, penalty2: 3,
    yellow1: 0, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-06-30T06:30:00+05:30", status: "locked"
  },
  "KO-76": { // Brazil vs Japan
    score1: 2, score2: 1,
    penalty1: null, penalty2: null,
    yellow1: 2, yellow2: 3, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-06-29T22:30:00+05:30", status: "locked"
  },
  "KO-77": { // France vs Sweden
    score1: 3, score2: 0,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-01T02:30:00+05:30", status: "locked"
  },
  "KO-78": { // Ivory Coast vs Norway
    score1: 1, score2: 2,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-06-30T22:30:00+05:30", status: "locked"
  },
  "KO-79": { // Mexico vs Ecuador
    score1: 2, score2: 0,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 3, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 1,
    timestamp: "2026-07-01T07:30:00+05:30", status: "locked"
  },
  "KO-80": { // England vs DR Congo
    score1: 2, score2: 1,
    penalty1: null, penalty2: null,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-01T21:30:00+05:30", status: "locked"
  },
  "KO-81": { // USA vs Bosnia & Herzegovina
    score1: 2, score2: 0,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 1, red2: 0,
    timestamp: "2026-07-02T05:30:00+05:30", status: "locked"
  },
  "KO-82": { // Belgium vs Senegal
    score1: 3, score2: 2,
    penalty1: null, penalty2: null,
    yellow1: 2, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-02T01:30:00+05:30", status: "locked"
  },
  "KO-83": { // Portugal vs Croatia
    score1: 2, score2: 1,
    penalty1: null, penalty2: null,
    yellow1: 1, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-03T04:30:00+05:30", status: "locked"
  },
  "KO-84": { // Spain vs Austria
    score1: 3, score2: 0,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-03T00:30:00+05:30", status: "locked"
  },
  "KO-85": { // Switzerland vs Algeria
    score1: 2, score2: 0,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-03T08:30:00+05:30", status: "locked"
  },
  "KO-86": { // Argentina vs Cape Verde
    score1: 3, score2: 2,
    penalty1: null, penalty2: null,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-04T03:30:00+05:30", status: "locked"
  },
  "KO-87": { // Colombia vs Ghana
    score1: 1, score2: 0,
    penalty1: null, penalty2: null,
    yellow1: 2, yellow2: 3, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-04T07:00:00+05:30", status: "locked"
  },
  "KO-88": { // Australia vs Egypt
    score1: 1, score2: 1,
    penalty1: 2, penalty2: 4,
    yellow1: 0, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-03T23:30:00+05:30", status: "locked"
  },
  "KO-89": { // Paraguay vs France
    score1: 0, score2: 1,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 3, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-05T02:30:00+05:30", status: "locked"
  },
  "KO-90": { // Canada vs Morocco
    score1: 0, score2: 3,
    penalty1: null, penalty2: null,
    yellow1: 4, yellow2: 4, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-04T22:30:00+05:30", status: "locked"
  },
  "KO-91": { // Brazil vs Norway
    score1: 1, score2: 2,
    penalty1: null, penalty2: null,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-06T01:30:00+05:30", status: "locked"
  },
  "KO-92": { // Mexico vs England
    score1: 2, score2: 3,
    penalty1: null, penalty2: null,
    yellow1: 2, yellow2: 4, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 1,
    timestamp: "2026-07-06T05:30:00+05:30", status: "locked"
  },
  "KO-93": { // Portugal vs Spain
    score1: 0, score2: 1,
    penalty1: null, penalty2: null,
    yellow1: 2, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-07T00:30:00+05:30", status: "locked"
  },
  "KO-94": { // USA vs Belgium
    score1: 1, score2: 4,
    penalty1: null, penalty2: null,
    yellow1: 2, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-07T05:30:00+05:30", status: "locked"
  },
  "KO-95": { // Argentina vs Egypt
    score1: 3, score2: 2,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 5, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-07T21:30:00+05:30", status: "locked"
  },
  "KO-96": { // Switzerland vs Colombia
    score1: 0, score2: 0,
    penalty1: 4, penalty2: 3,
    yellow1: 3, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-08T01:30:00+05:30", status: "locked"
  },
  "KO-97": { // France vs Morocco
    score1: 2, score2: 0,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-10T01:30:00+05:30", status: "locked"
  },
  "KO-98": { // Spain vs Belgium
    score1: 2, score2: 1,
    penalty1: null, penalty2: null,
    yellow1: 2, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-11T00:30:00+05:30", status: "locked"
  },
  "KO-99": { // Norway vs England
    score1: null, score2: null,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-12T02:30:00+05:30", status: "open"
  },
  "KO-100": { // Argentina vs Switzerland
    score1: null, score2: null,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-12T06:30:00+05:30", status: "open"
  },
  "KO-101": { // France vs Spain/Belgium
    score1: null, score2: null,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-15T00:30:00+05:30", status: "open"
  },
  "KO-102": { // Norway/England vs Argentina/Switzerland
    score1: null, score2: null,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-16T00:30:00+05:30", status: "open"
  },
  "KO-103": { // France/Spain/Belgium vs Norway/England/Argentina/Switzerland
    score1: null, score2: null,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-19T02:30:00+05:30", status: "open"
  },
  "KO-104": { // France/Spain/Belgium vs Norway/England/Argentina/Switzerland
    score1: null, score2: null,
    penalty1: null, penalty2: null,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0,
    timestamp: "2026-07-20T00:30:00+05:30", status: "open"
  }
};
