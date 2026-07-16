const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

const searchContainer = 'className="mt-2 sm:mt-4 mb-4 sm:mb-0 w-full z-50 pointer-events-auto bg-white p-2 sm:p-3 rounded-none sm:rounded-2xl shadow-[0px_-4px_0px_0px_#0f172a] sm:shadow-[6px_6px_0px_0px_#0f172a] border-y-[4px] sm:border-[3px] border-slate-900 flex flex-wrap items-center justify-center gap-2 sm:gap-4 shrink-0"';
const replaceContainer = 'className="mt-2 sm:mt-4 mb-4 sm:mb-0 mx-2 sm:mx-0 w-auto self-stretch sm:self-auto z-50 pointer-events-auto bg-white p-2 sm:p-3 rounded-2xl sm:rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] sm:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] sm:border-[3px] border-slate-900 flex flex-wrap items-center justify-center gap-2 sm:gap-4 shrink-0"';

codeApp = codeApp.replace(searchContainer, replaceContainer);

const regexTime = /className=\{\`w-full sm:w-auto sm:ml-auto flex items-center justify-center bg-\[\#F4F1EB\] px-4 py-2 border-\[3px\] border-slate-900 rounded-lg shadow-\[2px_2px_0px_0px_\#0f172a\] text-slate-900 font-mono font-black text-sm \$\{\(config\.simulationMode === 'paraquedas' && config\.objectAId === 'skydiver'\) \? 'col-span-2 sm:col-span-1' : ''\}\`\}/;

const replaceTime = 'className={`w-auto flex-1 sm:flex-none sm:w-auto sm:ml-auto flex items-center justify-center bg-[#F4F1EB] px-2 sm:px-4 py-1.5 sm:py-2 border-[2px] sm:border-[3px] border-slate-900 rounded-lg shadow-[2px_2px_0px_0px_#0f172a] text-slate-900 font-mono font-black text-xs sm:text-sm`}';

codeApp = codeApp.replace(regexTime, replaceTime);

fs.writeFileSync('src/App.tsx', codeApp);
