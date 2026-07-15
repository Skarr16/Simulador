const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Header click to hide everywhere (or <1024)
codeApp = codeApp.replace(
  /onClick=\{\(e\) => \{ if \(window\.innerWidth < 768 && \(e\.target as HTMLElement\)\.tagName !== "BUTTON"\) setIsHeaderVisible\(!isHeaderVisible\); \}\}/g,
  'onClick={(e) => { if (window.innerWidth < 1024 && (e.target as HTMLElement).tagName !== "BUTTON") setIsHeaderVisible(!isHeaderVisible); }}'
);

// 2. Change canvas border/padding breakpoints from md: to sm: to support smaller tablets
// Change inner padding
codeApp = codeApp.replace(
  '<div className="flex-1 flex flex-col pointer-events-none md:p-4">',
  '<div className="flex-1 flex flex-col pointer-events-none sm:p-4">'
);

// Change border classes
codeApp = codeApp.replace(
  '<div className="w-full flex-1 pointer-events-auto flex relative md:rounded-2xl md:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 md:border-[3px] overflow-hidden bg-white"',
  '<div className="w-full flex-1 pointer-events-auto flex relative sm:rounded-2xl sm:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 sm:border-[3px] overflow-hidden bg-white"'
);

// Allow header to hide on tablet too
codeApp = codeApp.replace(
  'md:max-h-[500px] md:opacity-100 md:border-b-[3px]',
  'lg:max-h-[500px] lg:opacity-100 lg:border-b-[3px]'
);

// Playback controls breakpoint updates
// From md:m-0 md:static md:mt-4 to sm:m-0 sm:static sm:mt-4
codeApp = codeApp.replace(
  '<div className="mt-2 mb-4 mx-2 sm:mx-4 z-50 md:m-0 md:static md:mt-4 pointer-events-auto bg-white p-2 sm:p-3 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] md:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0">',
  '<div className="mt-2 mb-4 mx-2 sm:mx-4 z-50 sm:m-0 sm:static sm:mt-4 pointer-events-auto bg-white p-2 sm:p-3 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] sm:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0">'
);

// Ensure canvas wrapper has min-w-0 to prevent overflow in flex row!
if (!codeApp.includes('min-w-0')) {
  codeApp = codeApp.replace(
    'lg:min-h-0">',
    'lg:min-h-0 min-w-0">'
  );
}

fs.writeFileSync('src/App.tsx', codeApp);
