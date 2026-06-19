import React from 'react';
import { Sparkles } from 'lucide-react';

export default function DeveloperGuide({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="max-w-[1920px] mx-auto w-full px-4 pt-4">
      <div className="bg-slate-900 border border-emerald-500/30 p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
          <h3 className="text-md font-extrabold text-emerald-400 uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Bracket Integration Manual
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xs font-bold">Close ✕</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div>
            <p className="mb-2 leading-relaxed">
              🔒 <strong className="text-white">Presetting official matches:</strong> Input completed results directly in the top-level <code className="text-emerald-400 font-mono">PRESET_SCORES</code> constant. When <code className="text-emerald-400 font-mono">status: 'logged'</code> is provided, users cannot modify results on the web interface.
            </p>
            <pre className="bg-slate-950 p-2.5 rounded font-mono text-[10px] text-slate-400 overflow-x-auto">
              {`"G-A-0": { score1: 2, score2: 0, status: 'logged' }, // Mexico vs South Africa Logged
"KO-75": { score1: 3, score2: 1, status: 'logged' },  // R32 Match 75 (1E vs 3ABCDF) Logged`}
            </pre>
          </div>
          <div>
            <p className="mb-2 leading-relaxed">
              📐 <strong className="text-white">Slide Navigation:</strong> The bracket at the bottom can be swiped using touch on phones/tablets or clicked using the Prev/Next button links on laptops. 100% of bracket logic updates automatically on state changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
