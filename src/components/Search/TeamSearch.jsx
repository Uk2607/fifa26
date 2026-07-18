import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { TEAMS } from '../../constants/teams';

export default function TeamSearch({ onSelectTeam }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null);

  // Convert TEAMS to an array of { code, name, iso2, etc }
  const teamArray = React.useMemo(() => {
    return Object.entries(TEAMS).map(([code, data]) => ({
      code,
      ...data
    }));
  }, []);

  // Handle fuzzy search
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const matches = teamArray.filter(team =>
      team.name.toLowerCase().includes(lowerQuery) ||
      team.code.toLowerCase().includes(lowerQuery)
    );

    setSuggestions(matches);
  }, [query, teamArray]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    onSelectTeam(code);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={wrapperRef} className="relative z-50">
      <div className="relative flex items-center">
        <div className="absolute left-2.5 text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search team..."
          className="bg-slate-800/80 border border-theme-border/60 rounded-lg pl-8 pr-8 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800 w-[170px] sm:w-[150px] md:w-48 transition-all shadow-inner"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="absolute right-2 text-slate-400 hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && query && (
        <div className="absolute top-full mt-1.5 w-full bg-card-bg border border-theme-border rounded-lg shadow-xl shadow-black/50 overflow-hidden max-h-64 overflow-y-auto">
          {suggestions.length > 0 ? (
            suggestions.map(team => (
              <button
                key={team.code}
                onClick={() => handleSelect(team.code)}
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-800 border-b border-theme-border/50 last:border-0 transition-colors"
              >
                <img src={`https://flagcdn.com/${team.iso2}.svg`} alt={team.code} className="w-4 h-3 object-cover rounded-sm" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-200 leading-tight">{team.name}</span>
                  <span className="text-[9px] font-black text-slate-500">{team.code}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="px-3 py-4 text-center text-xs text-slate-500 italic">
              No teams found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
