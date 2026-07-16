const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

const search = 'className="mt-2 mb-4 mx-2 sm:mx-4 z-50 sm:m-0 sm:static sm:mt-4 pointer-events-auto bg-white p-2 sm:p-3 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] sm:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 flex flex-wrap items-center justify-center gap-2 sm:gap-4 shrink-0 sm:self-center"';
const replace = 'className="mt-2 mb-4 mx-2 sm:mx-4 z-50 pointer-events-auto bg-white p-2 sm:p-3 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] sm:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 flex flex-wrap items-center justify-center gap-2 sm:gap-4 shrink-0"';

codeApp = codeApp.replace(search, replace);
fs.writeFileSync('src/App.tsx', codeApp);
