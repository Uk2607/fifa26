import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Info, ZoomIn, ZoomOut, ChevronUp, ChevronDown } from 'lucide-react';
import { GROUPS_CONFIG } from './constants/groups';
import { TEAMS } from './constants/teams';
import { PRESET_SCORES } from './constants/presetScores';
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
import UpdateModal from './components/UpdateModal';

export default function App() {
  const [modalGroup, setModalGroup] = useState(null);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);
  const [showTiebreaker, setShowTiebreaker] = useState(false);
  const [gridColumns, setGridColumns] = useState(2);
  const [isZooming, setIsZooming] = useState(false);

  const handleZoom = (newColumns) => {
    if (newColumns === gridColumns) return;
    setIsZooming(true);
    setTimeout(() => {
      setGridColumns(newColumns);
      setIsZooming(false);
    }, 150); // Fast fade out, then swap layout, then fade in
  };

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
  const { groupMatches, handleGroupScoreChange, resetGroupMatches, overwrittenGroupMatches } = useGroupMatches();
  const { koMatches, handleKoScoreChange, resetKoMatches, overwrittenKoMatches } = useKnockoutMatches();
  const [bracketMode, setBracketMode] = useState('standings');
  const [viewMode, setViewMode] = useState(() => {
    try {
      const saved = localStorage.getItem('fifa2026_viewMode');
      if (saved) return saved;
    } catch (e) {}
    // Default to readable on mobile, compact otherwise
    return window.innerWidth < 768 ? 'readable' : 'compact';
  });

  useEffect(() => {
    try {
      localStorage.setItem('fifa2026_viewMode', viewMode);
    } catch (e) {}
  }, [viewMode]);
  
  const allOverwrittenMatches = React.useMemo(() => [...overwrittenGroupMatches, ...overwrittenKoMatches], [overwrittenGroupMatches, overwrittenKoMatches]);
  const [showUpdateModal, setShowUpdateModal] = useState(allOverwrittenMatches.length > 0);

  // Derived data hooks
  const { groupStandings, qualificationState, allocatedThirds, confirmedPositions, allGroupsComplete } = useStandings(groupMatches);
  const {
    r32MatchesSeeding, roundOf16Seeding, quarterFinalsSeeding,
    semiFinalsSeeding, finalsSeeding, tournamentChampion
  } = useBracketSeeding(qualificationState, allocatedThirds, koMatches, bracketMode, confirmedPositions);

  const [isResetting, setIsResetting] = useState(false);
  
  // To avoid any local storage interference, we strictly calculate if the group stage 
  // is fully locked by checking the hardcoded PRESET_SCORES from the codebase.
  // There are 72 total group matches. If fewer than 72 are locked, we remain expanded.
  const lockedGroupMatchesInCodebase = Object.keys(PRESET_SCORES)
    .filter(key => key.startsWith('G-'))
    .filter(key => PRESET_SCORES[key].status === 'locked').length;
    
  const isGroupStageFullyLocked = lockedGroupMatchesInCodebase === 72;
  const [isGroupStageExpanded, setIsGroupStageExpanded] = useState(!isGroupStageFullyLocked);

  // Combined handlers
  const handleResetAll = () => {
    setIsResetting(true);
    setTimeout(() => {
      resetGroupMatches();
      resetKoMatches();
      setBracketMode('standings');
      setIsResetting(false);
    }, 400); // Wait for fade out
  };

  // Confetti effect when champion is crowned
  useEffect(() => {
    if (tournamentChampion && tournamentChampion.length === 3) {
      const duration = 3000;
      const end = Date.now() + duration;
      const team = TEAMS[tournamentChampion];
      
      // Base tournament colors (Emerald, Amber, Slate)
      let colors = ['#34d399', '#fbbf24', '#f8fafc'];
      
      // If team exists, heavily bias the confetti towards the team's colors
      if (team) {
        colors = [
          '#34d399', '#fbbf24', // Lower proportion of tournament colors
          team.color, team.color, team.color, team.color, // High proportion of primary team color
          team.textColor, team.textColor // Secondary team color
        ];
      }

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [tournamentChampion]);

  return (
    <div className="min-h-screen bg-app-bg text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Content wrapper with transition */}
      <div className={`flex-1 flex flex-col transition-all duration-500 origin-top ${isResetting ? 'opacity-50 blur-sm scale-[0.98]' : ''}`}>
        
        <Header onReset={handleResetAll} viewMode={viewMode} onViewModeChange={setViewMode} />

        <ChampionBanner tournamentChampion={tournamentChampion} />

        {/* MAIN CONTAINER */}
      <main className="flex-grow px-4 py-6 max-w-[1920px] mx-auto w-full flex flex-col gap-8">

        {/* SECTION 1: GROUP STAGES */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-theme-border pb-3 gap-2">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsGroupStageExpanded(!isGroupStageExpanded)}
                className="w-6 h-6 shrink-0 flex items-center justify-center rounded-md bg-slate-800/80 hover:bg-slate-700 border border-theme-border/60 hover:border-slate-500 transition-colors text-slate-400"
                title={isGroupStageExpanded ? "Collapse Group Stage" : "Expand Group Stage"}
              >
                {isGroupStageExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <h2 className="text-lg font-black tracking-wider uppercase text-emerald-400 flex items-center gap-2">
                2026 World Cup Group Stages
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 max-w-full">
              <div className="hidden md:flex items-center bg-card-bg border border-theme-border rounded-lg overflow-hidden mr-2 shrink-0">
                <button 
                  onClick={() => handleZoom(Math.max(1, gridColumns - 1))}
                  disabled={gridColumns === 1}
                  className="px-2.5 py-1 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 disabled:opacity-30 disabled:hover:text-slate-400 disabled:hover:bg-transparent transition-colors"
                  title="Zoom In (Fewer Columns)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-theme-border"></div>
                <button 
                  onClick={() => handleZoom(Math.min(3, gridColumns + 1))}
                  disabled={gridColumns === 3}
                  className="px-2.5 py-1 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 disabled:opacity-30 disabled:hover:text-slate-400 disabled:hover:bg-transparent transition-colors"
                  title="Zoom Out (More Columns)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[10px] bg-card-bg border border-theme-border px-3 py-1 rounded-lg text-slate-400 font-semibold uppercase shrink-0">
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
                    className="absolute right-0 sm:-right-4 top-8 z-50 w-64 max-w-[90vw] bg-card-bg border border-theme-border rounded-lg shadow-xl shadow-black/50 p-3 text-left"
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

          {isGroupStageExpanded && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Groups Grid */}
              <div 
                className={`lg:col-span-3 grid gap-4 ${getGridClasses()} transition-all duration-200 ease-in-out ${isZooming ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}
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
                    onToggle={setModalGroup}
                    bestThirdsQualified={qualificationState.thirds}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {/* Right Sidebar: Best 3rd-Place Panel + Open Matches */}
              <div className="lg:col-span-1 space-y-6">
                <BestThirdsPanel 
                  bestThirdsRanking={qualificationState.bestThirdsRanking} 
                  gridColumns={gridColumns}
                  viewMode={viewMode}
                />
                <OpenMatchesPanel
                  groupMatches={groupMatches}
                  onScoreChange={handleGroupScoreChange}
                  gridColumns={gridColumns}
                  viewMode={viewMode}
                />
              </div>
            </div>
          )}
        </section>

        {/* KNOCKOUT BRACKET SECTION */}
        <KnockoutBracket
          r32MatchesSeeding={r32MatchesSeeding}
          roundOf16Seeding={roundOf16Seeding}
          quarterFinalsSeeding={quarterFinalsSeeding}
          semiFinalsSeeding={semiFinalsSeeding}
          finalsSeeding={finalsSeeding}
          koMatches={koMatches}
          onScoreChange={handleKoScoreChange}
          tournamentChampion={tournamentChampion}
          bracketMode={bracketMode}
          onBracketModeChange={setBracketMode}
          allGroupsComplete={allGroupsComplete}
          viewMode={viewMode}
        />

      </main>

      <Footer />
      </div>

      {/* MODALS (Placed outside the transformed div so position: fixed works relative to viewport) */}
      <DeveloperGuide show={showDeveloperGuide} onClose={() => setShowDeveloperGuide(false)} />

      {/* GROUP MATCH MODAL (popup) */}
      {modalGroup && (
        <div className="relative z-50">
          <GroupMatchModal
            groupName={modalGroup}
            matches={groupMatches}
            standings={groupStandings[modalGroup]}
            bestThirdsQualified={qualificationState.thirds}
            onScoreChange={handleGroupScoreChange}
            onClose={() => setModalGroup(null)}
            viewMode={viewMode}
          />
        </div>
      )}

      {showUpdateModal && (
        <UpdateModal 
          overwrittenMatches={allOverwrittenMatches} 
          koSeedings={{
            ...r32MatchesSeeding, 
            ...roundOf16Seeding, 
            ...quarterFinalsSeeding, 
            ...semiFinalsSeeding, 
            ...finalsSeeding
          }}
          onClose={() => setShowUpdateModal(false)} 
        />
      )}
    </div>
  );
}