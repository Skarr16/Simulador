const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex = /\/\/ Page 0: Welcome[\s\S]*?\/\/ Page 1: Modo e Controles/;
const replacement = `// Page 0: Welcome
    (
      <div className="flex flex-col h-full">
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 mb-2 mt-4 text-center tracking-tight leading-none shrink-0">
          GUIA DO<br/>
          <span className="text-[#0055FF]">SIMULADOR</span>
        </h2>
        <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center px-2 sm:px-4 pb-8 scrollbar-thin">
          <p className="text-sm sm:text-base font-bold text-slate-600 text-center leading-relaxed">
            Bem-vindo ao Guia Completo! Este simulador permite analisar a física da queda livre e o comportamento de saltos de paraquedas.
          </p>
          <p className="text-sm sm:text-base font-bold text-slate-600 text-center mt-3 sm:mt-4">
            Dependendo do modo (<strong>Queda Simultânea</strong> ou <strong>Queda Livre</strong>), as funções e objetos mudam.
          </p>
        </div>
      </div>
    ),
    
    // Page 1: Modo e Controles`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Fixed page 0 layout");
