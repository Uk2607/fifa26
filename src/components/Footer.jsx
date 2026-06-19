import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 space-y-2 mt-8">
      <div className="flex items-center justify-center gap-4 text-[9px] font-extrabold tracking-widest text-slate-400 uppercase">
        <span>🇺🇸 Atlanta / Dallas / LA / NY / Miami</span>
        <span>·</span>
        <span>🇨🇦 Vancouver / Toronto</span>
        <span>·</span>
        <span>🇲🇽 CDMX / Monterrey</span>
      </div>
      <p className="text-slate-600 font-medium max-w-xl mx-auto px-4">
        Visual simulator representing official match schedules dynamically calculated in real-time according to tournament parameters.
      </p>
    </footer>
  );
}
