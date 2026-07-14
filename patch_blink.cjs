const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /className="flex items-center justify-center gap-1 sm:gap-2 px-2 py-2 sm:px-6 sm:py-2 bg-\[#FF3366\] hover:bg-\[#e62e5c\] disabled:bg-slate-200 disabled:text-slate-400 text-white disabled:text-slate-400 font-black rounded-xl border-\[2px\] sm:border-\[3px\] border-slate-900 shadow-\[3px_3px_0px_0px_#0f172a\] sm:shadow-\[4px_4px_0px_0px_#0f172a\] hover:translate-y-1 hover:shadow-\[0px_0px_0px_0px_#0f172a\] disabled:hover:translate-y-0 disabled:hover:shadow-\[3px_3px_0px_0px_#0f172a\] sm:disabled:hover:shadow-\[4px_4px_0px_0px_#0f172a\] disabled:cursor-not-allowed transition-all flex-1 sm:flex-none text-\[10px\] sm:text-base"/g;

content = content.replace(regex, 
  "className={`flex items-center justify-center gap-1 sm:gap-2 px-2 py-2 sm:px-6 sm:py-2 hover:bg-[#e62e5c] disabled:bg-slate-200 disabled:text-slate-400 text-white font-black rounded-xl border-[2px] sm:border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] sm:shadow-[4px_4px_0px_0px_#0f172a] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_#0f172a] disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_#0f172a] sm:disabled:hover:shadow-[4px_4px_0px_0px_#0f172a] disabled:cursor-not-allowed transition-all flex-1 sm:flex-none text-[10px] sm:text-base ${(engine.currentState.yA <= 1200 && engine.currentState.yA > 600 && !engine.currentState.parachuteDeployedA && engine.isRunning) ? 'bg-red-600 animate-[pulse_0.5s_ease-in-out_infinite]' : 'bg-[#FF3366]'}`"
);

fs.writeFileSync('src/App.tsx', content);
console.log('App patched');
