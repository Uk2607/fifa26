import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { TEAMS } from '../../constants/teams';
import KnockoutMatchCard from './KnockoutMatchCard';

// ================================================================================
// 🏆 TOURNAMENT BRACKET LAYOUT CONFIGURATION
// ================================================================================
const MATCH_COL_WIDTH = 160;
const CONNECTOR_WIDTH = 32;
const FINALS_WIDTH = 200;
const LINE_COLOR = '#475569';         // slate-600
const LINE_HIGHLIGHT = '#10b981';     // emerald-500

// Left half of the bracket (flows left → right toward finals)
const LEFT_R32 = [74, 77, 73, 75, 83, 84, 81, 82];
const LEFT_R16 = [89, 90, 93, 94];
const LEFT_QF = [97, 98];
const LEFT_SF = [101];

// Right half of the bracket (flows right → left toward finals)
const RIGHT_R32 = [76, 78, 79, 80, 86, 88, 85, 87];
const RIGHT_R16 = [91, 92, 95, 96];
const RIGHT_QF = [99, 100];
const RIGHT_SF = [102];

// ================================================================================
// ================================================================================
// MATCH COLUMN — renders N matches evenly distributed vertically
// ================================================================================
function MatchColumn({ matches, getSeeding, koMatches, onScoreChange, hoveredTeamCode, onTeamHover, highlightedPath, viewMode }) {
  return (
    <div style={{ width: MATCH_COL_WIDTH, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      {matches.map(matchId => {
        const seeding = getSeeding(matchId);
        return (
          <div
            key={matchId}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3px 0' }}
          >
            <KnockoutMatchCard
              matchId={matchId}
              team1={seeding?.t1}
              team2={seeding?.t2}
              matchState={koMatches[`KO-${matchId}`]}
              onScoreChange={onScoreChange}
              hoveredTeamCode={hoveredTeamCode}
              onTeamHover={onTeamHover}
              isPathHighlighted={highlightedPath ? highlightedPath.has(matchId) : false}
              viewMode={viewMode}
            />
          </div>
        );
      })}
    </div>
  );
}

// ================================================================================
// PAIR CONNECTOR — bracket lines connecting N pairs of matches to N/2 next-round
// Each segment connects 2 inputs (at 25%/75%) to 1 output (at 50%).
// ================================================================================
function PairConnector({ pairCount, side }) {
  const isLeft = side === 'left';

  return (
    <div style={{ width: CONNECTOR_WIDTH, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      {Array.from({ length: pairCount }).map((_, idx) => (
        <div key={idx} style={{ flex: 1, position: 'relative' }}>
          {/* Input line from first match (25% height) */}
          <div style={{
            position: 'absolute',
            top: 'calc(25% - 1px)',
            [isLeft ? 'left' : 'right']: 0,
            width: '50%',
            height: 2,
            backgroundColor: LINE_COLOR,
          }} />

          {/* Input line from second match (75% height) */}
          <div style={{
            position: 'absolute',
            top: 'calc(75% - 1px)',
            [isLeft ? 'left' : 'right']: 0,
            width: '50%',
            height: 2,
            backgroundColor: LINE_COLOR,
          }} />

          {/* Vertical line connecting the two inputs */}
          <div style={{
            position: 'absolute',
            top: '25%',
            [isLeft ? 'left' : 'right']: 'calc(50% - 1px)',
            width: 2,
            height: '50%',
            backgroundColor: LINE_COLOR,
          }} />

          {/* Output line to next round match (50% height) */}
          <div style={{
            position: 'absolute',
            top: 'calc(50% - 1px)',
            [isLeft ? 'left' : 'right']: '50%',
            width: '50%',
            height: 2,
            backgroundColor: LINE_COLOR,
          }} />
        </div>
      ))}
    </div>
  );
}

// ================================================================================
// STRAIGHT CONNECTOR — simple horizontal line (SF → Finals)
// ================================================================================
function StraightConnector() {
  return (
    <div style={{
      width: CONNECTOR_WIDTH,
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
    }}>
      <div style={{ width: '100%', height: 2, backgroundColor: LINE_COLOR }} />
    </div>
  );
}

// ================================================================================
// ROUND HEADER LABEL
// ================================================================================
function RoundLabel({ label, width }) {
  if (!label) return <div style={{ width, flexShrink: 0 }} />;
  return (
    <div style={{ width, flexShrink: 0, textAlign: 'center', padding: '0 2px' }}>
      <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider bg-card-bg/80 px-2 py-1 rounded-full border border-theme-border whitespace-nowrap inline-block">
        {label}
      </span>
    </div>
  );
}

// ================================================================================
// 🏆 MAIN KNOCKOUT BRACKET COMPONENT
// ================================================================================
export default function KnockoutBracket({
  r32MatchesSeeding,
  roundOf16Seeding,
  quarterFinalsSeeding,
  semiFinalsSeeding,
  finalsSeeding,
  koMatches,
  onScoreChange,
  tournamentChampion,
  bracketMode,
  onBracketModeChange,
  allGroupsComplete,
  viewMode
}) {
  const [hoveredTeamCode, setHoveredTeamCode] = useState(null);
  const scrollContainerRef = useRef(null);

  // Auto-scroll to the middle on initial mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    }
  }, []);

  // Unified seeding lookup across all rounds
  const getSeeding = (matchId) => {
    const id = Number(matchId);
    if (id >= 73 && id <= 88) return r32MatchesSeeding[id];
    if (id >= 89 && id <= 96) return roundOf16Seeding[id];
    if (id >= 97 && id <= 100) return quarterFinalsSeeding[id];
    if (id >= 101 && id <= 102) return semiFinalsSeeding[id];
    if (id >= 103 && id <= 104) return finalsSeeding[id];
    return null;
  };

  // Calculate projected path for hovered team
  const highlightedPath = useMemo(() => {
    const path = new Set();
    if (!hoveredTeamCode) return path;

    const getMatchSeeding = (matchId) => {
      const id = Number(matchId);
      if (id >= 73 && id <= 88) return r32MatchesSeeding[id];
      if (id >= 89 && id <= 96) return roundOf16Seeding[id];
      if (id >= 97 && id <= 100) return quarterFinalsSeeding[id];
      if (id >= 101 && id <= 102) return semiFinalsSeeding[id];
      if (id >= 103 && id <= 104) return finalsSeeding[id];
      return null;
    };

    let currentMatchId = null;
    for (let id = 73; id <= 88; id++) {
      const seeding = r32MatchesSeeding[id];
      if (seeding?.t1 === hoveredTeamCode || seeding?.t2 === hoveredTeamCode) {
        currentMatchId = id;
        break;
      }
    }

    if (!currentMatchId) return path;

    while (currentMatchId) {
      path.add(currentMatchId);

      const matchState = koMatches[`KO-${currentMatchId}`];
      if (matchState && matchState.score1 !== '' && matchState.score2 !== '') {
        const s1 = Number(matchState.score1);
        const s2 = Number(matchState.score2);
        const p1 = matchState.penalty1 !== undefined && matchState.penalty1 !== '' ? Number(matchState.penalty1) : null;
        const p2 = matchState.penalty2 !== undefined && matchState.penalty2 !== '' ? Number(matchState.penalty2) : null;

        const seeding = getMatchSeeding(currentMatchId);
        const isT1 = seeding?.t1 === hoveredTeamCode;
        const isT2 = seeding?.t2 === hoveredTeamCode;

        let won = false;
        if (isT1) {
          if (s1 > s2) won = true;
          else if (s1 === s2 && p1 !== null && p2 !== null && p1 > p2) won = true;
        } else if (isT2) {
          if (s2 > s1) won = true;
          else if (s1 === s2 && p1 !== null && p2 !== null && p2 > p1) won = true;
        }

        if (!won) {
          if (currentMatchId === 101 || currentMatchId === 102) {
            path.add(103);
          }
          break;
        }
      }

      const NEXT_MATCH_MAP = {
        74: 89, 77: 89,
        73: 90, 75: 90,
        76: 91, 78: 91,
        79: 92, 80: 92,
        83: 93, 84: 93,
        81: 94, 82: 94,
        86: 95, 88: 95,
        85: 96, 87: 96,
        89: 97, 90: 97,
        93: 98, 94: 98,
        91: 99, 92: 99,
        95: 100, 96: 100,
        97: 101, 98: 101,
        99: 102, 100: 102,
        101: 104, 102: 104
      };

      currentMatchId = NEXT_MATCH_MAP[currentMatchId] || null;
    }

    return path;
  }, [hoveredTeamCode, r32MatchesSeeding, roundOf16Seeding, quarterFinalsSeeding, semiFinalsSeeding, finalsSeeding, koMatches]);

  return (
    <section className="bg-card-bg/25 rounded-3xl border border-theme-border/80 p-4 md:p-6 shadow-2xl relative overflow-hidden">

      {/* Section Header */}
      <div className="border-b border-theme-border pb-4 mb-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-black uppercase text-amber-400 flex items-center gap-2">
              Interactive Knockout Bracket
            </h2>
            <p className="text-[10px] text-slate-500 mt-1">Scroll horizontally to explore the full bracket · Winners auto-advance through each round</p>
          </div>

          {/* Bracket Mode Toggle */}
          {allGroupsComplete ? (
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              ✓ Fixtures
            </span>
          ) : (
            <div className="flex items-center bg-slate-800/80 rounded-full p-0.5 border border-theme-border/60">
              <button
                onClick={() => onBracketModeChange('standings')}
                className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-all duration-300 ${
                  bracketMode === 'standings'
                    ? 'bg-amber-500/20 text-amber-400 shadow-sm border border-amber-500/30'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                As of Standings
              </button>
              <button
                onClick={() => onBracketModeChange('fixtures')}
                className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-all duration-300 ${
                  bracketMode === 'fixtures'
                    ? 'bg-emerald-500/20 text-emerald-400 shadow-sm border border-emerald-500/30'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                Fixtures
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Bracket Area */}
      <div 
        ref={scrollContainerRef}
        style={{ overflowX: 'auto', overflowY: 'hidden', paddingBottom: 16 }} 
        className="bracket-scroll"
      >

        {/* Round Headers Row */}
        <div style={{ display: 'flex', minWidth: 'fit-content', marginBottom: 10, gap: 0 }}>
          <RoundLabel label="Round of 32" width={MATCH_COL_WIDTH} />
          <RoundLabel label="" width={CONNECTOR_WIDTH} />
          <RoundLabel label="Round of 16" width={MATCH_COL_WIDTH} />
          <RoundLabel label="" width={CONNECTOR_WIDTH} />
          <RoundLabel label="Quarter-Finals" width={MATCH_COL_WIDTH} />
          <RoundLabel label="" width={CONNECTOR_WIDTH} />
          <RoundLabel label="Semi-Finals" width={MATCH_COL_WIDTH} />
          <RoundLabel label="" width={CONNECTOR_WIDTH} />
          <RoundLabel label="Finals" width={FINALS_WIDTH} />
          <RoundLabel label="" width={CONNECTOR_WIDTH} />
          <RoundLabel label="Semi-Finals" width={MATCH_COL_WIDTH} />
          <RoundLabel label="" width={CONNECTOR_WIDTH} />
          <RoundLabel label="Quarter-Finals" width={MATCH_COL_WIDTH} />
          <RoundLabel label="" width={CONNECTOR_WIDTH} />
          <RoundLabel label="Round of 16" width={MATCH_COL_WIDTH} />
          <RoundLabel label="" width={CONNECTOR_WIDTH} />
          <RoundLabel label="Round of 32" width={MATCH_COL_WIDTH} />
        </div>

        {/* ============================================================ */}
        {/* BRACKET GRID — All columns stretch to the same height        */}
        {/* ============================================================ */}
        <div style={{
          display: 'flex',
          alignItems: 'stretch',
          minHeight: 720,
          minWidth: 'fit-content',
        }}>

          {/* ── LEFT HALF ── R32 → R16 → QF → SF */}
          <MatchColumn matches={LEFT_R32} getSeeding={getSeeding} koMatches={koMatches} onScoreChange={onScoreChange} hoveredTeamCode={hoveredTeamCode} onTeamHover={setHoveredTeamCode} highlightedPath={highlightedPath} viewMode={viewMode} />
          <PairConnector pairCount={4} side="left" />

          <MatchColumn matches={LEFT_R16} getSeeding={getSeeding} koMatches={koMatches} onScoreChange={onScoreChange} hoveredTeamCode={hoveredTeamCode} onTeamHover={setHoveredTeamCode} highlightedPath={highlightedPath} viewMode={viewMode} />
          <PairConnector pairCount={2} side="left" />

          <MatchColumn matches={LEFT_QF} getSeeding={getSeeding} koMatches={koMatches} onScoreChange={onScoreChange} hoveredTeamCode={hoveredTeamCode} onTeamHover={setHoveredTeamCode} highlightedPath={highlightedPath} viewMode={viewMode} />
          <PairConnector pairCount={1} side="left" />

          <MatchColumn matches={LEFT_SF} getSeeding={getSeeding} koMatches={koMatches} onScoreChange={onScoreChange} hoveredTeamCode={hoveredTeamCode} onTeamHover={setHoveredTeamCode} highlightedPath={highlightedPath} viewMode={viewMode} />
          <StraightConnector />

          {/* ── CENTER: FINALS + TROPHY ── */}
          <div style={{
            width: FINALS_WIDTH,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
            flexShrink: 0,
            padding: '0 4px',
          }}>
            {/* Trophy Display */}
            <div className="p-3 bg-gradient-to-b from-amber-500/20 to-transparent rounded-2xl border border-amber-500/30 text-center w-full">
              <Trophy className="w-10 h-10 text-amber-400 fill-amber-500/10 mx-auto animate-pulse mb-1" />
              <p className="text-[8px] font-black tracking-widest text-amber-400 uppercase">Champion</p>
              <h4 className="text-xs font-black text-white mt-0.5">
                {tournamentChampion ? (
                  <span className="inline-flex items-center gap-1 bg-card-bg px-2 py-0.5 rounded border border-emerald-500/20">
                    <img src={`https://flagcdn.com/${TEAMS[tournamentChampion]?.iso2}.svg`} alt="flag" className="inline-block w-4 h-[11px] object-cover rounded-[2px]" /> {TEAMS[tournamentChampion]?.name}
                  </span>
                ) : (
                  <span className="text-slate-500 italic text-[10px]">-</span>
                )}
              </h4>
            </div>

            {/* Grand Final — Match 104 */}
            <div className="w-full space-y-1">
              <span className="text-[8px] font-black uppercase text-amber-400 block text-center bg-amber-400/10 py-0.5 rounded border border-amber-400/20">
                MATCH 104 • GRAND FINAL
              </span>
              <KnockoutMatchCard
                matchId={104}
                team1={getSeeding(104)?.t1}
                team2={getSeeding(104)?.t2}
                matchState={koMatches['KO-104']}
                onScoreChange={onScoreChange}
                hoveredTeamCode={hoveredTeamCode}
                onTeamHover={setHoveredTeamCode}
                isPathHighlighted={highlightedPath ? highlightedPath.has(104) : false}
                viewMode={viewMode}
              />
            </div>

            {/* 3rd Place Playoff — Match 103 */}
            <div className="w-full space-y-1">
              <span className="text-[8px] font-black uppercase text-slate-400 block text-center bg-slate-800/20 py-0.5 rounded border border-theme-border">
                MATCH 103 • 3RD PLACE
              </span>
              <KnockoutMatchCard
                matchId={103}
                team1={getSeeding(103)?.t1}
                team2={getSeeding(103)?.t2}
                matchState={koMatches['KO-103']}
                onScoreChange={onScoreChange}
                hoveredTeamCode={hoveredTeamCode}
                onTeamHover={setHoveredTeamCode}
                isPathHighlighted={highlightedPath ? highlightedPath.has(103) : false}
                viewMode={viewMode}
              />
            </div>
          </div>

          <StraightConnector />

          {/* ── RIGHT HALF ── SF → QF → R16 → R32 */}
          <MatchColumn matches={RIGHT_SF} getSeeding={getSeeding} koMatches={koMatches} onScoreChange={onScoreChange} hoveredTeamCode={hoveredTeamCode} onTeamHover={setHoveredTeamCode} highlightedPath={highlightedPath} viewMode={viewMode} />
          <PairConnector pairCount={1} side="right" />

          <MatchColumn matches={RIGHT_QF} getSeeding={getSeeding} koMatches={koMatches} onScoreChange={onScoreChange} hoveredTeamCode={hoveredTeamCode} onTeamHover={setHoveredTeamCode} highlightedPath={highlightedPath} viewMode={viewMode} />
          <PairConnector pairCount={2} side="right" />

          <MatchColumn matches={RIGHT_R16} getSeeding={getSeeding} koMatches={koMatches} onScoreChange={onScoreChange} hoveredTeamCode={hoveredTeamCode} onTeamHover={setHoveredTeamCode} highlightedPath={highlightedPath} viewMode={viewMode} />
          <PairConnector pairCount={4} side="right" />

          <MatchColumn matches={RIGHT_R32} getSeeding={getSeeding} koMatches={koMatches} onScoreChange={onScoreChange} hoveredTeamCode={hoveredTeamCode} onTeamHover={setHoveredTeamCode} highlightedPath={highlightedPath} viewMode={viewMode} />

        </div>
      </div>
    </section>
  );
}
