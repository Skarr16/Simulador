const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

// Update main
codeApp = codeApp.replace(
  '<main className="flex-1 flex flex-col md:flex-row relative z-10 overflow-y-auto overflow-x-hidden md:overflow-hidden">',
  '<main className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-y-auto overflow-x-hidden lg:overflow-hidden">'
);

// Update canvas wrapper
codeApp = codeApp.replace(
  '<div className="w-full flex-1 shrink-0 md:shrink md:p-0 flex flex-col relative min-h-full md:min-h-0">',
  '<div className="w-full flex-1 shrink-0 lg:shrink lg:p-0 flex flex-col relative min-h-full lg:min-h-0">'
);

// Update inner canvas wrapper (md:p-4 -> lg:p-4)
codeApp = codeApp.replace(
  '<div className="flex-1 flex flex-col pointer-events-none md:p-4">',
  '<div className="flex-1 flex flex-col pointer-events-none lg:p-4">'
);

// Update inner canvas border/shadow
codeApp = codeApp.replace(
  '<div className="w-full flex-1 pointer-events-auto flex relative md:rounded-2xl md:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 md:border-[3px] overflow-hidden bg-white"',
  '<div className="w-full flex-1 pointer-events-auto flex relative lg:rounded-2xl lg:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 lg:border-[3px] overflow-hidden bg-white"'
);

// Update data panels wrapper
codeApp = codeApp.replace(
  '<div className="w-full md:w-[350px] lg:w-[450px] shrink-0 md:flex-none p-4 flex flex-col gap-6 overflow-visible md:overflow-y-auto border-t-[3px] md:border-t-0 md:border-l-[3px] border-slate-900 bg-[#F4F1EB] z-20">',
  '<div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 lg:flex-none p-4 flex flex-col gap-6 overflow-visible lg:overflow-y-auto border-t-[3px] lg:border-t-0 lg:border-l-[3px] border-slate-900 bg-[#F4F1EB] z-20">'
);

fs.writeFileSync('src/App.tsx', codeApp);
