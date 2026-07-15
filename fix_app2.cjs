const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

// Add onClick to canvas wrapper
const oldCanvasWrapper = '<div className="w-full flex-1 pointer-events-auto flex relative md:rounded-2xl md:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 md:border-[3px] overflow-hidden bg-white">';
const newCanvasWrapper = '<div className="w-full flex-1 pointer-events-auto flex relative md:rounded-2xl md:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 md:border-[3px] overflow-hidden bg-white" onClick={(e) => { if (window.innerWidth < 768) setIsHeaderVisible(!isHeaderVisible); }}>';
codeApp = codeApp.replace(oldCanvasWrapper, newCanvasWrapper);

// Make playback controls hide/show on mobile
const oldControls = 'className={`mt-2 mb-4 mx-2 sm:mx-4 z-50 md:m-0 md:static md:mt-4 pointer-events-auto bg-white p-2 sm:p-3 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] md:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0`}';
const newControls = 'className={`mt-2 mb-4 mx-2 sm:mx-4 z-50 md:m-0 md:static md:mt-4 pointer-events-auto bg-white p-2 sm:p-3 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] md:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0 transition-all duration-300 origin-top ${!isHeaderVisible ? "scale-y-0 h-0 opacity-0 overflow-hidden !mt-0 !mb-0 !border-0 md:scale-y-100 md:h-auto md:opacity-100 md:overflow-visible md:!mt-4 md:!border-[3px]" : "scale-y-100 opacity-100"}`}';
codeApp = codeApp.replace(oldControls, newControls);

fs.writeFileSync('src/App.tsx', codeApp);
