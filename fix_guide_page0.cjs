const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex = /\/\/ Page 0: Welcome[\s\S]*?\),\s*\/\/ Page 1: Queda Livre/;

const replacement = `// Page 0: Welcome
    (
      <div className="flex flex-col h-full -mx-6 sm:-mx-8 -mt-16 sm:-mt-20">
        <div className="bg-[#7C3AED] w-full pt-16 sm:pt-20 pb-6 px-6 sm:px-8 border-b-4 border-slate-900 flex-shrink-0">
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white text-center tracking-tight leading-none">
            GUIA DO<br/>
            SIMULADOR
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center px-8 pb-8 pt-6 scrollbar-thin">
          <p className="text-sm sm:text-base font-bold text-slate-600 text-center leading-relaxed">
            Bem-vindo ao Guia Completo! Este simulador permite analisar a física da queda livre e o comportamento de saltos de paraquedas.
          </p>
          <p className="text-sm sm:text-base font-bold text-slate-600 text-center mt-3 sm:mt-4">
            Dependendo do modo (<strong>Queda Simultânea</strong> ou <strong>Queda Livre</strong>), as funções e objetos mudam.
          </p>
        </div>
      </div>
    ),
    // Page 1: Queda Livre`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated guide page 0");
