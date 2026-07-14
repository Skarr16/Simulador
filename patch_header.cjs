const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Change header container
code = code.replace(
  'className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 max-w-full overflow-visible"',
  'className="grid grid-cols-3 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-4 w-full"'
);

// Change Tutorial button color
code = code.replace(
  'className="flex shrink-0 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#FFB800] text-slate-900 rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all"',
  'className="flex shrink-0 items-center justify-center gap-1.5 sm:gap-2 px-1 sm:px-4 py-1.5 sm:py-2 bg-[#3b82f6] text-white rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all"'
);

// Make all buttons justify-center on mobile
code = code.replace(/className="flex shrink-0 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4/g, 'className="flex shrink-0 items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4');

// Change Canvas Area height for mobile
code = code.replace(
  '<div className="w-full h-[75vh] min-h-[500px] sm:h-[620px] lg:h-auto lg:flex-1 flex flex-col relative shrink-0 lg:shrink">',
  '<div className="w-full h-[100dvh] sm:h-[620px] lg:h-auto lg:flex-1 flex flex-col relative shrink-0 lg:shrink">'
);

fs.writeFileSync('src/App.tsx', code);
