const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

const oldMain = '<main className="flex-1 flex flex-col md:flex-row relative z-10 overflow-hidden">';
const newMain = '<main className="flex-1 flex flex-col md:flex-row relative z-10 overflow-y-auto overflow-x-hidden md:overflow-hidden">';
codeApp = codeApp.replace(oldMain, newMain);

const oldCanvasWrapperRegex = /<div className=\{`w-full flex flex-col relative md:shrink md:p-0 transition-all duration-300 \$\{\(toggles\.graphs \|\| toggles\.table\) \? "h-\[45vh\] shrink-0 md:h-auto md:flex-1" : "flex-1"}`\}>/;
const newCanvasWrapper = '<div className="w-full flex-1 shrink-0 md:shrink md:p-0 flex flex-col relative min-h-[75vh] md:min-h-0">';
codeApp = codeApp.replace(oldCanvasWrapperRegex, newCanvasWrapper);

const oldDataPanel = '<div className="w-full md:w-[350px] lg:w-[450px] flex-1 md:flex-none p-4 flex flex-col gap-6 overflow-y-auto shrink-0 border-t-[3px] md:border-t-0 md:border-l-[3px] border-slate-900 bg-[#F4F1EB] z-20">';
const newDataPanel = '<div className="w-full md:w-[350px] lg:w-[450px] shrink-0 md:flex-none p-4 flex flex-col gap-6 overflow-visible md:overflow-y-auto border-t-[3px] md:border-t-0 md:border-l-[3px] border-slate-900 bg-[#F4F1EB] z-20">';
codeApp = codeApp.replace(oldDataPanel, newDataPanel);

fs.writeFileSync('src/App.tsx', codeApp);
