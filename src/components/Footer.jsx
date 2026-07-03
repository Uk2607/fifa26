import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-theme-border bg-app-bg py-6 text-center text-xs text-slate-500 space-y-2 mt-8">
      <div className="flex items-center justify-center gap-4 text-[9px] font-extrabold tracking-widest text-slate-400 uppercase">
        <span><img src={`https://flagcdn.com/us.svg`} alt="flag" className="inline-block w-4 h-[11px] object-cover rounded-[2px]" /> Atlanta / Dallas / LA / NY / Miami</span>
        <span>·</span>
        <span><img src={`https://flagcdn.com/ca.svg`} alt="flag" className="inline-block w-4 h-[11px] object-cover rounded-[2px]" /> Vancouver / Toronto</span>
        <span>·</span>
        <span><img src={`https://flagcdn.com/mx.svg`} alt="flag" className="inline-block w-4 h-[11px] object-cover rounded-[2px]" /> CDMX / Monterrey</span>
      </div>
      <p className="text-slate-600 font-medium max-w-xl mx-auto px-4">
        Visual simulator representing official match schedules dynamically calculated in real-time according to tournament parameters.
      </p>
      <p className="text-slate-500 font-bold max-w-xl mx-auto px-4 pt-1 text-[10px]">
        * All match countdowns and times are displayed in your local timezone.
      </p>
    </footer>
  );
}
