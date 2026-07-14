const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldControls = 'className={`mt-auto m-2 z-50 lg:m-0 lg:static lg:mt-4 pointer-events-auto bg-white p-2 sm:p-3 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] lg:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0`}';
const newControls = 'className={`mt-2 mb-6 mx-4 z-50 lg:m-0 lg:static lg:mt-4 pointer-events-auto bg-white p-2.5 sm:p-3 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] lg:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0`}';
code = code.replace(oldControls, newControls);

const oldCanvas = '<div className="w-full flex-1 sm:h-[550px] lg:h-auto lg:flex-1 pointer-events-auto flex relative sm:rounded-2xl sm:shadow-[6px_6px_0px_0px_#0f172a] border-b-[3px] border-slate-900 sm:border-[3px] overflow-hidden bg-white">';
const newCanvas = '<div className="w-full flex-1 sm:h-[550px] lg:h-auto lg:flex-1 pointer-events-auto flex relative sm:rounded-2xl sm:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 sm:border-[3px] overflow-hidden bg-white">';
code = code.replace(oldCanvas, newCanvas);

const oldParent = '<div className="w-full h-[100dvh] sm:h-auto lg:flex-1 flex flex-col relative shrink-0 lg:shrink sm:p-4 lg:p-0">';
const newParent = '<div className="w-full h-[85dvh] min-h-[500px] sm:h-auto lg:h-auto lg:flex-1 flex flex-col relative shrink-0 lg:shrink sm:p-4 lg:p-0">';
code = code.replace(oldParent, newParent);

fs.writeFileSync('src/App.tsx', code);
