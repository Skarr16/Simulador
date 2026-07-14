const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Mobile main overflow
const oldMain = 'className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onWheel={handleWheel}';
const newMain = 'className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-y-auto overflow-x-hidden lg:overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onWheel={handleWheel}';
code = code.replace(oldMain, newMain);

// 2. Canvas border-b on mobile
const oldCanvas = '<div className="w-full flex-1 sm:h-[550px] lg:h-auto lg:flex-1 pointer-events-auto flex relative lg:rounded-2xl lg:shadow-[6px_6px_0px_0px_#0f172a] lg:border-[3px] lg:border-slate-900 overflow-hidden bg-white">';
const newCanvas = '<div className="w-full flex-1 sm:h-[550px] lg:h-auto lg:flex-1 pointer-events-auto flex relative lg:rounded-2xl lg:shadow-[6px_6px_0px_0px_#0f172a] border-b-[3px] border-slate-900 lg:border-[3px] overflow-hidden bg-white">';
code = code.replace(oldCanvas, newCanvas);

// 3. Playback Controls padding/margin
const oldControls = 'className={`mt-auto m-3 z-50 lg:m-0 lg:static lg:mt-4 pointer-events-auto bg-white p-3 sm:p-4 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] lg:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0`}';
const newControls = 'className={`mt-auto m-2 z-50 lg:m-0 lg:static lg:mt-4 pointer-events-auto bg-white p-2 sm:p-3 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] lg:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0`}';
code = code.replace(oldControls, newControls);

fs.writeFileSync('src/App.tsx', code);
