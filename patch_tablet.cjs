const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Parent of canvas
const oldCanvasParent = '<div className="w-full h-full lg:h-auto lg:flex-1 flex flex-col relative shrink-0 lg:shrink">';
const newCanvasParent = '<div className="w-full h-full lg:h-auto lg:flex-1 flex flex-col relative shrink-0 lg:shrink sm:p-4 lg:p-0">';
code = code.replace(oldCanvasParent, newCanvasParent);

// 2. Canvas
const oldCanvas = '<div className="w-full flex-1 sm:h-[550px] lg:h-auto lg:flex-1 pointer-events-auto flex relative lg:rounded-2xl lg:shadow-[6px_6px_0px_0px_#0f172a] border-b-[3px] border-slate-900 lg:border-[3px] overflow-hidden bg-white">';
const newCanvas = '<div className="w-full flex-1 sm:h-[550px] lg:h-auto lg:flex-1 pointer-events-auto flex relative sm:rounded-2xl sm:shadow-[6px_6px_0px_0px_#0f172a] border-b-[3px] border-slate-900 sm:border-[3px] overflow-hidden bg-white">';
code = code.replace(oldCanvas, newCanvas);

fs.writeFileSync('src/App.tsx', code);
