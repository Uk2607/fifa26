import React, { useState } from 'react';
import { GROUPS_CONFIG } from './constants/groups';
import { useGroupMatches } from './hooks/useGroupMatches';
import { useKnockoutMatches } from './hooks/useKnockoutMatches';
import { useStandings } from './hooks/useStandings';
import { useBracketSeeding } from './hooks/useBracketSeeding';
import Header from './components/Header';
import ChampionBanner from './components/ChampionBanner';
import DeveloperGuide from './components/DeveloperGuide';
import GroupWidget from './components/GroupStage/GroupWidget';
import BestThirdsPanel from './components/GroupStage/BestThirdsPanel';
import KnockoutBracket from './components/Knockout/KnockoutBracket';
import Footer from './components/Footer';

export default function App() {
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  // State hooks
  const { groupMatches, handleGroupScoreChange, resetGroupMatches, randomizeGroupMatches } = useGroupMatches();
  const { koMatches, handleKoScoreChange, resetKoMatches, randomizeKoMatches } = useKnockoutMatches();

  // Derived data hooks
  const { groupStandings, qualificationState, allocatedThirds } = useStandings(groupMatches);
  const {
    r32MatchesSeeding, roundOf16Seeding, quarterFinalsSeeding,
    semiFinalsSeeding, finalsSeeding, tournamentChampion
  } = useBracketSeeding(qualificationState, allocatedThirds, koMatches);

  // Combined handlers
  const handleResetAll = () => {
    resetGroupMatches();
    resetKoMatches();
  };

  const handleRandomizeAll = () => {
    randomizeGroupMatches();
    randomizeKoMatches();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">

      <Header onRandomize={handleRandomizeAll} onReset={handleResetAll} />

      <ChampionBanner tournamentChampion={tournamentChampion} />

      <DeveloperGuide show={showDeveloperGuide} onClose={() => setShowDeveloperGuide(false)} />

      {/* MAIN CONTAINER */}
      <main className="flex-grow px-4 py-6 max-w-[1920px] mx-auto w-full flex flex-col gap-8">

        {/* SECTION 1: GROUP STAGES */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-3 gap-2">
            <div>
              <h2 className="text-lg font-black tracking-wider uppercase text-emerald-400 flex items-center gap-2">
                2026 World Cup Group Stages
              </h2>
            </div>
            <div className="text-[10px] bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg text-slate-400 font-semibold uppercase">
              Top 2 Advance + Best 8 Thirds
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Groups Grid */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {Object.keys(GROUPS_CONFIG).map(gName => (
                <GroupWidget
                  key={gName}
                  groupName={gName}
                  teamsList={GROUPS_CONFIG[gName]}
                  standings={groupStandings[gName]}
                  matches={groupMatches}
                  onScoreChange={handleGroupScoreChange}
                  isExpanded={expandedGroup === gName}
                  onToggle={() => setExpandedGroup(expandedGroup === gName ? null : gName)}
                  bestThirdsQualified={qualificationState.thirds}
                />
              ))}
            </div>

            {/* Best 3rd-Place Panel */}
            <BestThirdsPanel bestThirdsRanking={qualificationState.bestThirdsRanking} />
          </div>
        </section>

        {/* SECTION 2: KNOCKOUT BRACKET */}
        <KnockoutBracket
          r32MatchesSeeding={r32MatchesSeeding}
          roundOf16Seeding={roundOf16Seeding}
          quarterFinalsSeeding={quarterFinalsSeeding}
          semiFinalsSeeding={semiFinalsSeeding}
          finalsSeeding={finalsSeeding}
          koMatches={koMatches}
          onScoreChange={handleKoScoreChange}
          tournamentChampion={tournamentChampion}
        />

      </main>

      <Footer />
    </div>
  );
}