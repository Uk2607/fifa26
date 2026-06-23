const fs = require('fs');

const csv = fs.readFileSync('combinations.csv', 'utf-8');
const lines = csv.trim().split('\n');
const headers = lines[0].split(',').map(s => s.trim());

const headerToMatchId = {
  '1E': 74,
  '1I': 77,
  '1A': 79,
  '1L': 80,
  '1D': 81,
  '1G': 82,
  '1B': 85,
  '1K': 87
};

const map = {};

for (let i = 1; i < lines.length; i++) {
  const row = lines[i].split(',').map(s => s.trim());
  if (row.length !== 9) continue;

  const groups = [];
  const allocation = {};

  for (let j = 1; j < 9; j++) {
    const groupStr = row[j]; // e.g. "3E"
    const groupLetter = groupStr.replace('3', '').trim();
    groups.push(groupLetter);

    const header = headers[j]; // e.g. "1A"
    const matchId = headerToMatchId[header];
    allocation[matchId] = groupLetter;
  }

  const key = groups.sort().join('');
  map[key] = allocation;
}

const output = `// Auto-generated from FIFA FWC26 regulations (Annexe C)
export const THIRD_PLACE_COMBINATIONS = ${JSON.stringify(map, null, 2)};
`;

fs.writeFileSync('src/constants/combinations.js', output);
console.log(`Generated src/constants/combinations.js with ${Object.keys(map).length} combinations`);
