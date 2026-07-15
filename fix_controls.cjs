const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

// Remove isHeaderVisible state
codeApp = codeApp.replace(/const \[isHeaderVisible, setIsHeaderVisible\] = useState\(true\);\n/g, '');

// Remove onClick that toggles it
codeApp = codeApp.replace(/onClick=\{\(e\) => \{ if \(window.innerWidth < 768 && \(e.target as HTMLElement\).tagName !== "BUTTON"\) setIsHeaderVisible\(!isHeaderVisible\); \}\}/g, '');

// Remove header translate classes
const oldHeader = /className=\{`bg-white border-b-\[3px\] border-slate-900 shadow-sm z-\[100\] flex-shrink-0 overflow-visible transition-transform duration-300 absolute top-0 left-0 right-0 md:relative \$\{isHeaderVisible \? 'translate-y-0' : '-translate-y-full md:translate-y-0'\}`\}/g;
const newHeader = 'className="bg-white border-b-[3px] border-slate-900 shadow-sm z-[100] flex-shrink-0 overflow-visible relative"';
codeApp = codeApp.replace(oldHeader, newHeader);

// Fix Playback controls classes
const oldControls = /className=\{`mt-2 mb-4 mx-2 sm:mx-4 z-50 md:m-0 md:static md:mt-4 pointer-events-auto bg-white p-2 sm:p-3 rounded-2xl shadow-\[4px_4px_0px_0px_#0f172a\] md:shadow-\[6px_6px_0px_0px_#0f172a\] border-\[3px\] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0 transition-all duration-300 origin-top \$\{\!isHeaderVisible \? "scale-y-0 h-0 opacity-0 overflow-hidden \!mt-0 \!mb-0 \!border-0 md:scale-y-100 md:h-auto md:opacity-100 md:overflow-visible md:\!mt-4 md:\!border-\[3px\]" : "scale-y-100 opacity-100"\}`\}/g;
const newControls = 'className="mt-2 mb-4 mx-2 sm:mx-4 z-50 md:m-0 md:static md:mt-4 pointer-events-auto bg-white p-2 sm:p-3 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] md:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0"';
codeApp = codeApp.replace(oldControls, newControls);

fs.writeFileSync('src/App.tsx', codeApp);
