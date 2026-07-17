const fs = require('fs');
let code = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

code = code.replace(
  /<span className="text-\[10px\] font-black bg-white\/80 px-1 rounded mb-1 shadow-sm border border-slate-200 text-center whitespace-nowrap">Fa: \{FdA\.toFixed\(3\)\} N<\/span>/,
  '<span className="text-[10px] font-black bg-white/80 px-1 rounded mb-3 shadow-sm border border-slate-200 text-center whitespace-nowrap">Fa: {FdA.toFixed(3)} N</span>'
);

code = code.replace(
  /<span className="text-\[10px\] font-black bg-white\/80 px-1 rounded mb-1 shadow-sm border border-slate-200 text-center whitespace-nowrap">Fa: \{FdB\.toFixed\(3\)\} N<\/span>/,
  '<span className="text-[10px] font-black bg-white/80 px-1 rounded mb-3 shadow-sm border border-slate-200 text-center whitespace-nowrap">Fa: {FdB.toFixed(3)} N</span>'
);

fs.writeFileSync('src/components/SimulationCanvas.tsx', code);
console.log("Fixed overlapping vectors");
