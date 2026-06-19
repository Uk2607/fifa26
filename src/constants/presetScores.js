/* ================================================================================
DEVELOPER CONFIGURATION: PRESET & LOCKED SCORES
================================================================================ */
export const PRESET_SCORES = {
  // Group A
  "G-A-0": { // Mexico vs South Africa
    score1: 2, score2: 0,
    yellow1: 1, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 1, red2: 2, status: "logged"
  },
  "G-A-1": { // South Korea vs Czechia
    score1: 2, score2: 1,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  "G-A-2": { // Czechia vs South Africa
    score1: 1, score2: 1,
    yellow1: 1, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  "G-A-3": { // Mexico vs South Korea
    score1: 1, score2: 0,
    yellow1: 0, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  // "G-A-4": { // Mexico vs Czechia
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-A-5": { // South Africa vs South Korea
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },

  // Group B
  "G-B-0": { // Canada vs Bosnia & Herzegovina
    score1: 1, score2: 1,
    yellow1: 2, yellow2: 3, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  "G-B-1": { // Switzerland vs Qatar
    score1: 1, score2: 1,
    yellow1: 1, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  // "G-B-2": { // Qatar vs Bosnia & Herzegovina
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-B-3": { // Canada vs Switzerland
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  "G-B-4": { // Canada vs Qatar
    score1: 6, score2: 0,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 2, status: "logged"
  },
  "G-B-5": { // Bosnia & Herzegovina vs Switzerland
    score1: 1, score2: 4,
    yellow1: 2, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 1, red2: 0, status: "logged"
  },

  // Group C
  "G-C-0": { // Brazil vs Haiti
    score1: 0, score2: 0,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "open"
  },
  "G-C-1": { // Morocco vs Scotland
    score1: 0, score2: 0,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "open"
  },
  "G-C-2": { // Scotland vs Haiti
    score1: 0, score2: 0,
    yellow1: 3, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  "G-C-3": { // Brazil vs Morocco
    score1: 1, score2: 1,
    yellow1: 2, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  // "G-C-4": { // Brazil vs Scotland
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-C-5": { // Haiti vs Morocco
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },

  // Group D
  "G-D-0": { // USA vs Paraguay
    score1: 4, score2: 1,
    yellow1: 1, yellow2: 5, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  "G-D-1": { // Australia vs Türkiye
    score1: 2, score2: 0,
    yellow1: 0, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  "G-D-2": { // Türkiye vs Paraguay
    score1: 0, score2: 0,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "open"
  },
  "G-D-3": { // USA vs Australia
    score1: 2, score2: 0,
    yellow1: 3, yellow2: 4, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  // "G-D-4": { // USA vs Türkiye
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-D-5": { // Paraguay vs Australia
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },

  // Group E
  "G-E-0": { // Germany vs Curaçao
    score1: 7, score2: 1,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  "G-E-1": { // Ivory Coast vs Ecuador
    score1: 1, score2: 0,
    yellow1: 3, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  // "G-E-2": { // Ecuador vs Curaçao
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-E-3": { // Germany vs Ivory Coast
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-E-4": { // Germany vs Ecuador
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-E-5": { // Curaçao vs Ivory Coast
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },

  // Group F
  // "G-F-0": { // Netherlands vs Sweden
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-F-1": { // Japan vs Tunisia
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  "G-F-2": { // Tunisia vs Sweden
    score1: 1, score2: 5,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  "G-F-3": { // Netherlands vs Japan
    score1: 2, score2: 2,
    yellow1: 3, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  // "G-F-4": { // Netherlands vs Tunisia
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-F-5": { // Sweden vs Japan
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },

  // Group G
  // "G-G-0": { // Belgium vs New Zealand
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-G-1": { // Egypt vs Iran
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  "G-G-2": { // Iran vs New Zealand
    score1: 2, score2: 2,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  "G-G-3": { // Belgium vs Egypt
    score1: 1, score2: 1,
    yellow1: 2, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  // "G-G-4": { // Belgium vs Iran
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-G-5": { // New Zealand vs Egypt
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },

  // Group H
  "G-H-0": { // Spain vs Cape Verde
    score1: 0, score2: 0,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  "G-H-1": { // Saudi Arabia vs Uruguay
    score1: 1, score2: 1,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  // "G-H-2": { // Uruguay vs Cape Verde
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-H-3": { // Spain vs Saudi Arabia
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-H-4": { // Spain vs Uruguay
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-H-5": { // Cape Verde vs Saudi Arabia
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },

  // Group I
  "G-I-0": { // France vs Senegal
    score1: 3, score2: 0,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  "G-I-1": { // Iraq vs Norway
    score1: 1, score2: 4,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  // "G-I-2": { // Norway vs Senegal
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-I-3": { // France vs Iraq
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-I-4": { // France vs Norway
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-I-5": { // Senegal vs Iraq
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },

  // Group J
  "G-J-0": { // Argentina vs Algeria
    score1: 3, score2: 0,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  "G-J-1": { // Austria vs Jordan
    score1: 3, score2: 1,
    yellow1: 1, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  // "G-J-2": { // Jordan vs Algeria
  //   score1: 2, score2: 1,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-J-3": { // Argentina vs Austria
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-J-4": { // Argentina vs Jordan
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-J-5": { // Algeria vs Austria
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },

  // Group K
  "G-K-0": { // Portugal vs DR Congo
    score1: 1, score2: 1,
    yellow1: 3, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  "G-K-1": { // Uzbekistan vs Colombia
    score1: 1, score2: 3,
    yellow1: 1, yellow2: 1, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  // "G-K-2": { // Colombia vs DR Congo
  //   score1: 2, score2: 1,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-K-3": { // Portugal vs Uzbekistan
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-K-4": { // Portugal vs Colombia
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-K-5": { // DR Congo vs Uzbekistan
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },

  // Group L
  "G-L-0": { // England vs Croatia
    score1: 4, score2: 2,
    yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  "G-L-1": { // Ghana vs Panama
    score1: 1, score2: 0,
    yellow1: 1, yellow2: 2, secondYellow1: 0, secondYellow2: 0,
    red1: 0, red2: 0, status: "logged"
  },
  // "G-L-2": { // Panama vs Croatia
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-L-3": { // England vs Ghana
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-L-4": { // England vs Panama
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },
  // "G-L-5": { // Croatia vs Ghana
  //   score1: 0, score2: 0,
  //   yellow1: 0, yellow2: 0, secondYellow1: 0, secondYellow2: 0,
  //   red1: 0, red2: 0, status: "logged"
  // },

  // Knockouts Matchday 1 Presets
  // "KO-73": { score1: 2, score2: 1, status: "logged" }, // Match 73 predictive score
};
