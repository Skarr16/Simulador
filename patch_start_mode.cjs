const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Change initial state
content = content.replace(
    /const \[simulationMode, setSimulationMode\] = useState<'livre' \| 'paraquedas'>\('livre'\);/,
    "const [simulationMode, setSimulationMode] = useState<'livre' | 'paraquedas'>('paraquedas');"
);

// Swap buttons
const btnLivre = `            {/* Button 1: Queda Livre */}
            <button
              onClick={() => {
                engineParaquedas.pause();
                setSimulationMode('livre');
              }}
              className={\`flex shrink-0 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 \${simulationMode === 'livre' ? 'bg-[#00C48C] text-white' : 'bg-white text-slate-900'} rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all\`}
            >
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider">Queda Simultânea</span>
            </button>`;

const btnParaquedas = `            {/* Button 2: Paraquedas */}
            <button 
              onClick={() => {
                engineLivre.pause();
                setSimulationMode('paraquedas');
              }}
              className={\`flex shrink-0 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 \${simulationMode === 'paraquedas' ? 'bg-[#00C48C] text-white' : 'bg-white text-slate-900'} rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all\`}
            >
              <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider">Queda Livre</span>
            </button>`;

if (content.includes(btnLivre) && content.includes(btnParaquedas)) {
    content = content.replace(btnLivre, "REPLACE_ME_BTN_LIVRE");
    content = content.replace(btnParaquedas, btnLivre);
    content = content.replace("REPLACE_ME_BTN_LIVRE", btnParaquedas);
    console.log("Buttons swapped successfully");
} else {
    console.log("Could not find buttons exact string");
}

fs.writeFileSync('src/App.tsx', content);
