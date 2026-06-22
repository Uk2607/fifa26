import React, { useState } from 'react';
import { Info, ZoomIn, ZoomOut } from 'lucide-react';
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
  const [gridColumns, setGridColumns] = useState(3);

  const getGridClasses = () => {
    switch(gridColumns) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-1 md:grid-cols-2";
      case 3:
      default: return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
    }
  };

  const getZoomScale = () => {
    switch(gridColumns) {
      case 1: return 1.5;
      case 2: return 1.25;
      case 3:
      default: return 1.0;
    }
  };

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
    <div className="min-h-screen bg-app-bg text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">

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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-theme-border pb-3 gap-2">
            <div>
              <h2 className="text-lg font-black tracking-wider uppercase text-emerald-400 flex items-center gap-2">
                2026 World Cup Group Stages
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-card-bg border border-theme-border rounded-lg overflow-hidden mr-2">
                <button 
                  onClick={() => setGridColumns(prev => Math.max(1, prev - 1))}
                  disabled={gridColumns === 1}
                  className="px-2.5 py-1 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 disabled:opacity-30 disabled:hover:text-slate-400 disabled:hover:bg-transparent transition-colors"
                  title="Zoom In (Fewer Columns)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-theme-border"></div>
                <button 
                  onClick={() => setGridColumns(prev => Math.min(3, prev + 1))}
                  disabled={gridColumns === 3}
                  className="px-2.5 py-1 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 disabled:opacity-30 disabled:hover:text-slate-400 disabled:hover:bg-transparent transition-colors"
                  title="Zoom Out (More Columns)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[10px] bg-card-bg border border-theme-border px-3 py-1 rounded-lg text-slate-400 font-semibold uppercase hidden sm:block">
                Top 2 Advance + Best 8 Thirds
              </div>

              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowTiebreaker(prev => !prev); }}
                  onMouseEnter={() => setShowTiebreaker(true)}
                  onMouseLeave={() => setShowTiebreaker(false)}
                  className="w-5 h-5 rounded-full flex items-center justify-center bg-slate-800/80 hover:bg-slate-700 border border-theme-border/60 hover:border-slate-500 transition-all cursor-help"
                  title="Ranking criteria"
                >
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                </button>
                {showTiebreaker && (
                  <div
                    className="absolute right-0 top-8 z-50 w-64 bg-card-bg border border-theme-border rounded-lg shadow-xl shadow-black/50 p-3 text-left"
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
            <div 
              className={`lg:col-span-3 grid ${getGridClasses()} gap-4 transition-all duration-500`}
              style={{ '--zoom-scale': getZoomScale() }}
            >
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