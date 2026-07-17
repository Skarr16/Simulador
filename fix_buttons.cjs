const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Line 270
code = code.replace(
  "toggles.sound ? 'bg-[#FF3366] text-white' : 'bg-white text-slate-900'",
  "toggles.sound ? 'bg-[#FF3366] text-slate-900' : 'bg-white text-slate-900'"
);

// Line 279
code = code.replace(
  "bg-[#3b82f6] text-white rounded-xl",
  "bg-[#3b82f6] text-slate-900 rounded-xl"
);

// Line 288
code = code.replace(
  "bg-[#A855F7] text-white rounded-xl",
  "bg-[#A855F7] text-slate-900 rounded-xl"
);

// Line 300
code = code.replace(
  "simulationMode === 'paraquedas' ? 'bg-[#00C48C] text-white' : 'bg-white text-slate-900'",
  "simulationMode === 'paraquedas' ? 'bg-[#00C48C] text-slate-900' : 'bg-white text-slate-900'"
);

// Line 312
code = code.replace(
  "simulationMode === 'livre' ? 'bg-[#00C48C] text-white' : 'bg-white text-slate-900'",
  "simulationMode === 'livre' ? 'bg-[#00C48C] text-slate-900' : 'bg-white text-slate-900'"
);

// Line 439
code = code.replace(
  "disabled:text-slate-400 text-white font-black",
  "disabled:text-slate-400 text-slate-900 font-black"
);

fs.writeFileSync('src/App.tsx', code);
console.log("Updated button text colors in App.tsx");
