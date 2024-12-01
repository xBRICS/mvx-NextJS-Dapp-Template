'use client';

import { useEffect, useState } from 'react';

const DebugBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<string | null>(null);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1280) setBreakpoint('xl');
      else if (width >= 1024) setBreakpoint('lg');
      else if (width >= 768) setBreakpoint('md');
      else if (width >= 640) setBreakpoint('sm');
      else setBreakpoint('xs');
    };

    updateBreakpoint(); // Initial detection
    window.addEventListener('resize', updateBreakpoint);

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, []);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-2 left-2 z-50 bg-slate-800 text-white px-3 py-1.5 
                    rounded-lg border border-slate-700 text-sm font-mono shadow-lg">
      Breakpoint: {breakpoint}
    </div>
  );
};

export default DebugBreakpoint; 