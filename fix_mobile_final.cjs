const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

// Reduce container padding and gap slightly on mobile
const searchContainer = 'className="mt-2 sm:mt-4 mb-4 sm:mb-0 mx-2 sm:mx-0 w-auto self-stretch sm:self-auto z-50 pointer-events-auto bg-white p-2 sm:p-3 rounded-2xl sm:rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] sm:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] sm:border-[3px] border-slate-900 flex flex-wrap items-center justify-center gap-2 sm:gap-4 shrink-0"';
const replaceContainer = 'className="mt-2 sm:mt-4 mb-4 sm:mb-0 mx-2 sm:mx-0 w-auto self-stretch sm:self-auto z-50 pointer-events-auto bg-white p-1.5 sm:p-3 rounded-2xl sm:rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] sm:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] sm:border-[3px] border-slate-900 flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 shrink-0"';
codeApp = codeApp.replace(searchContainer, replaceContainer);

// Make time box w-full on mobile, mt-1 for a little spacing if wrapped, and slightly smaller padding
const regexTime = /className=\{\`w-auto flex-1 sm:flex-none sm:w-auto sm:ml-auto flex items-center justify-center bg-\[\#F4F1EB\] px-2 sm:px-4 py-1\.5 sm:py-2 border-\[2px\] sm:border-\[3px\] border-slate-900 rounded-lg shadow-\[2px_2px_0px_0px_\#0f172a\] text-slate-900 font-mono font-black text-xs sm:text-sm\`\}/;
const replaceTime = 'className={`w-full sm:w-auto sm:ml-auto mt-0.5 sm:mt-0 flex items-center justify-center bg-[#F4F1EB] px-2 sm:px-4 py-1.5 sm:py-2 border-[2px] sm:border-[3px] border-slate-900 rounded-lg shadow-[2px_2px_0px_0px_#0f172a] text-slate-900 font-mono font-black text-xs sm:text-sm`}';
codeApp = codeApp.replace(regexTime, replaceTime);

// Also make the buttons slightly smaller on mobile to save vertical space
codeApp = codeApp.replace(/px-2 py-2 sm:px-2 md:px-4 sm:py-2/g, 'px-1.5 py-1.5 sm:px-2 md:px-4 sm:py-2');

fs.writeFileSync('src/App.tsx', codeApp);
