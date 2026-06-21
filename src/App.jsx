import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { GROUPS_CONFIG } from './constants/groups';
import { useGroupMatches } from './hooks/useGroupMatches';
import { useKnockoutMatches } from './hooks/useKnockoutMatches';
import { useStandings } from './hooks/useStandings';
import { useBracketSeeding } from './hooks/useBracketSeeding';
import Header from './components/Header';
import ChampionBanner from './components/ChampionBanner';
import DeveloperGuide from './components/DeveloperGuide';
import GroupWidget from './components/GroupStage/GroupWidget';
import GroupMatchModal from './components/GroupStage/GroupMatchModal';
import BestThirdsPanel from './components/GroupStage/BestThirdsPanel';
import OpenMatchesPanel from './components/GroupStage/OpenMatchesPanel';
import KnockoutBracket from './components/Knockout/KnockoutBracket';
import Footer from './components/Footer';

export default function App() {
  const [modalGroup, setModalGroup] = useState(null);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);
  const [showTiebreaker, setShowTiebreaker] = useState(false);

  // State hooks
  const { groupMatches, handleGroupScoreChange, resetGroupMatches } = useGroupMatches();
  const { koMatches, handleKoScoreChange, resetKoMatches } = useKnockoutMatches();

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">

      <Header onReset={handleResetAll} />

      <ChampionBanner tournamentChampion={tournamentChampion} />

      <DeveloperGuide show={showDeveloperGuide} onClose={() => setShowDeveloperGuide(false)} />

      {/* GROUP MATCH MODAL (popup) */}
      {modalGroup && (
        <GroupMatchModal
          groupName={modalGroup}
          matches={groupMatches}
          standings={groupStandings[modalGroup]}
          bestThirdsQualified={qualificationState.thirds}
          onScoreChange={handleGroupScoreChange}
          onClose={() => setModalGroup(null)}
        />
      )}

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
            <div className="flex items-center gap-2">
              <div className="text-[10px] bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg text-slate-400 font-semibold uppercase">
                Top 2 Advance + Best 8 Thirds
              </div>

              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowTiebreaker(prev => !prev); }}
                  onMouseEnter={() => setShowTiebreaker(true)}
                  onMouseLeave={() => setShowTiebreaker(false)}
                  className="w-5 h-5 rounded-full flex items-center justify-center bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:border-slate-500 transition-all cursor-help"
                  title="Ranking criteria"
                >
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                </button>
                {showTiebreaker && (
                  <div
                    className="absolute right-0 top-8 z-50 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-xl shadow-black/50 p-3 text-left"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="text-[9px] font-black text-emerald-400 uppercase tracking-wider mb-2">Ranking Criteria (in order)</p>
                    <ol className="text-[9px] text-slate-300 space-y-1 list-decimal list-inside">
                      <li>Points <span className="text-slate-500">(3W, 1D, 0L)</span></li>
                      <li>Head-to-head points</li>
                      <li>Head-to-head goal difference</li>
                      <li>Head-to-head goals scored</li>
                      <li>Overall goal difference</li>
                      <li>Overall goals scored</li>
                      <li>Fair Play score <span className="text-slate-500">(YC −1, 2Y −3, RC −4)</span></li>
                      <li>FIFA ranking</li>
                    </ol>
                  </div>
                )}
              </div>
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
                  onToggle={() => setModalGroup(gName)}
                  bestThirdsQualified={qualificationState.thirds}
                />
              ))}
            </div>

            {/* Right Sidebar: Best 3rd-Place Panel + Open Matches */}
            <div className="lg:col-span-1 space-y-6">
              <BestThirdsPanel bestThirdsRanking={qualificationState.bestThirdsRanking} />
              <OpenMatchesPanel
                groupMatches={groupMatches}
                onScoreChange={handleGroupScoreChange}
              />
            </div>
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