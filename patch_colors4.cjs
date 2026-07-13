const fs = require('fs');
let content = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

content = content.replace(
    "${env.id === 'moon' ? 'bg-[#1a1a2e] border-white' : 'bg-[#F4F1EB] border-slate-900'}",
    "${env.id === 'moon' ? 'bg-[#1a1a2e] border-white' : env.id === 'custom' ? 'bg-[#f4ba66] border-[#451004] text-[#451004]' : 'bg-[#F4F1EB] border-slate-900'}"
);

content = content.replace(
    /className=\{\`absolute left-0 top-0 bottom-0 w-24 z-40 \$\{env.id === 'moon' \? 'text-white' : 'text-slate-900'\}\`\}/,
    "className={`absolute left-0 top-0 bottom-0 w-24 z-40 ${env.id === 'moon' ? 'text-white' : env.id === 'custom' ? 'text-[#451004]' : 'text-slate-900'}`}"
);

content = content.replace(
    /className=\{\`absolute left-4 sm:left-6 top-\[10%\] bottom-\[10%\] border-l-\[3px\] \$\{env.id === 'moon' \? 'border-white' : 'border-slate-900'\}\`\}/,
    "className={`absolute left-4 sm:left-6 top-[10%] bottom-[10%] border-l-[3px] ${env.id === 'moon' ? 'border-white' : env.id === 'custom' ? 'border-[#451004]' : 'border-slate-900'}`}"
);

content = content.replace(
    /className=\{\`h-\[3px\] \$\{env.id === 'moon' \? 'bg-white' : 'bg-slate-900'\} \$\{isMajor \? 'w-4 sm:w-6' : 'w-2 sm:w-3'\}\`\}/,
    "className={`h-[3px] ${env.id === 'moon' ? 'bg-white' : env.id === 'custom' ? 'bg-[#451004]' : 'bg-slate-900'} ${isMajor ? 'w-4 sm:w-6' : 'w-2 sm:w-3'}`}"
);

fs.writeFileSync('src/components/SimulationCanvas.tsx', content);
console.log('Done 4!');
