const fs = require('fs');
let code = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const oldGround = '<div className={`absolute bottom-0 left-0 right-0 h-[10%] border-t-[3px] border-slate-900 z-30 flex items-center justify-center ${env.id === \'moon\' ? \'bg-[#64748b]\' : env.id === \'custom\' ? \'bg-[#95290f]\' : \'bg-[#00C48C]\'}`}>';
const newGround = '<div className={`absolute bottom-0 left-0 right-0 h-[10%] border-t-[3px] border-b-[4px] sm:border-b-0 border-slate-900 z-30 flex items-center justify-center ${env.id === \'moon\' ? \'bg-[#64748b]\' : env.id === \'custom\' ? \'bg-[#95290f]\' : \'bg-[#00C48C]\'}`}>';
code = code.replace(oldGround, newGround);

fs.writeFileSync('src/components/SimulationCanvas.tsx', code);
