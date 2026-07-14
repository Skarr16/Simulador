const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldParent = '<div className="w-full h-[85dvh] min-h-[500px] md:h-auto md:flex-1 flex flex-col relative shrink-0 md:shrink md:p-0">';
const newParent = '<div className="w-full flex-1 min-h-[500px] md:min-h-0 flex flex-col relative md:shrink md:p-0">';
code = code.replace(oldParent, newParent);

const oldAbs = '<div className="md:absolute md:inset-4 flex flex-col pointer-events-none h-full w-full md:h-auto md:w-auto">';
const newAbs = '<div className="md:absolute md:inset-4 flex flex-col pointer-events-none h-full w-full">';
code = code.replace(oldAbs, newAbs);

const oldCanvasWrapper = '<div className="w-full flex-1 md:h-auto md:flex-1 pointer-events-auto flex relative md:rounded-2xl md:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 md:border-[3px] overflow-hidden bg-white">';
const newCanvasWrapper = '<div className="w-full flex-1 pointer-events-auto flex relative md:rounded-2xl md:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 md:border-[3px] overflow-hidden bg-white">';
code = code.replace(oldCanvasWrapper, newCanvasWrapper);

fs.writeFileSync('src/App.tsx', code);
