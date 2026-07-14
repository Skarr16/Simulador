const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldHeader = 'className={`bg-white border-b-[3px] border-slate-900 shadow-sm z-[100] flex-shrink-0 overflow-visible transition-transform duration-300 absolute top-0 left-0 right-0 sm:relative ${isHeaderVisible ? \'translate-y-0\' : \'-translate-y-full sm:translate-y-0\'}`}';
const newHeader = 'className={`bg-white border-b-[3px] border-slate-900 shadow-sm z-[100] flex-shrink-0 overflow-visible transition-transform duration-300 absolute top-0 left-0 right-0 md:relative ${isHeaderVisible ? \'translate-y-0\' : \'-translate-y-full md:translate-y-0\'}`}';
code = code.replace(oldHeader, newHeader);

const oldParent = '<div className="w-full h-[85dvh] min-h-[500px] sm:min-h-[100dvh] md:min-h-0 md:h-auto sm:flex-1 flex flex-col relative shrink-0 sm:shrink sm:p-4 sm:pt-[90px] md:p-0">';
const newParent = '<div className="w-full h-[85dvh] min-h-[500px] md:min-h-0 md:h-auto md:flex-1 flex flex-col relative shrink-0 md:shrink md:p-0">';
code = code.replace(oldParent, newParent);

const oldCanvasWrapper = '<div className="w-full flex-1 sm:h-auto sm:flex-1 pointer-events-auto flex relative sm:rounded-2xl sm:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 sm:border-[3px] overflow-hidden bg-white">';
const newCanvasWrapper = '<div className="w-full flex-1 md:h-auto md:flex-1 pointer-events-auto flex relative md:rounded-2xl md:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 md:border-[3px] overflow-hidden bg-white">';
code = code.replace(oldCanvasWrapper, newCanvasWrapper);

fs.writeFileSync('src/App.tsx', code);
