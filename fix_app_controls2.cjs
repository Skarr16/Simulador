const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

const search = 'className="mt-2 mb-4 mx-2 sm:mx-4 z-50 pointer-events-auto bg-white p-2 sm:p-3 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] sm:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 flex flex-wrap items-center justify-center gap-2 sm:gap-4 shrink-0"';
const replace = 'className="mt-2 sm:mt-4 mb-2 sm:mb-0 w-full z-50 pointer-events-auto bg-white p-2 sm:p-3 rounded-none sm:rounded-2xl shadow-[0px_-4px_0px_0px_#0f172a] sm:shadow-[6px_6px_0px_0px_#0f172a] border-y-[4px] sm:border-[3px] border-slate-900 flex flex-wrap items-center justify-center gap-2 sm:gap-4 shrink-0"';

codeApp = codeApp.replace(search, replace);
fs.writeFileSync('src/App.tsx', codeApp);
