const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

// Use md: instead of lg: for padding and borders
codeApp = codeApp.replace(
  '<div className="flex-1 flex flex-col pointer-events-none lg:p-4">',
  '<div className="flex-1 flex flex-col pointer-events-none md:p-4">'
);
codeApp = codeApp.replace(
  '<div className="w-full flex-1 pointer-events-auto flex relative lg:rounded-2xl lg:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 lg:border-[3px] overflow-hidden bg-white"',
  '<div className="w-full flex-1 pointer-events-auto flex relative md:rounded-2xl md:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 md:border-[3px] overflow-hidden bg-white"'
);

fs.writeFileSync('src/App.tsx', codeApp);
