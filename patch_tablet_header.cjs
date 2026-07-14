const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldHeader = 'className={`bg-white border-b-[3px] border-slate-900 shadow-sm z-[100] flex-shrink-0 overflow-visible transition-transform duration-300 absolute top-0 left-0 right-0 lg:relative ${isHeaderVisible ? \'translate-y-0\' : \'-translate-y-full lg:translate-y-0\'}`}';
const newHeader = 'className={`bg-white border-b-[3px] border-slate-900 shadow-sm z-[100] flex-shrink-0 overflow-visible transition-transform duration-300 absolute top-0 left-0 right-0 sm:relative ${isHeaderVisible ? \'translate-y-0\' : \'-translate-y-full sm:translate-y-0\'}`}';
code = code.replace(oldHeader, newHeader);

const oldParent = '<div className="w-full h-[85dvh] min-h-[500px] sm:min-h-[100dvh] lg:min-h-0 lg:h-auto sm:flex-1 flex flex-col relative shrink-0 sm:shrink sm:p-4 sm:pt-[90px] lg:p-0">';
const newParent = '<div className="w-full h-[85dvh] min-h-[500px] sm:h-auto sm:flex-1 flex flex-col relative shrink-0 sm:shrink sm:p-4 lg:p-0">';
code = code.replace(oldParent, newParent);

fs.writeFileSync('src/App.tsx', code);
