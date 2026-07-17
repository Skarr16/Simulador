const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<button type="button" \n                onClick=\{\(\) => \{ soundEngine\.init\(\); engine\.start\(\); \}\}[\s\S]*?<Square className="w-3 h-3 sm:w-4 sm:h-4 fill-current" \/> <span>PAUSAR<\/span>\n              <\/button>/;

const replacement = `<button type="button" 
                onClick={() => {
                  if (engine.isRunning) {
                    engine.pause();
                  } else {
                    soundEngine.init(); 
                    engine.start();
                  }
                }}
                className={\`flex items-center justify-center gap-1 sm:gap-2 px-1.5 py-1.5 sm:px-2 md:px-4 sm:py-2 \${engine.isRunning ? 'bg-[#FFB800] hover:bg-[#e6a600]' : 'bg-[#00C48C] hover:bg-[#00a877]'} disabled:bg-slate-200 disabled:text-slate-400 text-slate-900 font-black rounded-xl border-[2px] sm:border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] sm:shadow-[4px_4px_0px_0px_#0f172a] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_#0f172a] disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_#0f172a] sm:disabled:hover:shadow-[4px_4px_0px_0px_#0f172a] disabled:cursor-not-allowed transition-all text-[10px] sm:text-sm md:text-base\`}
              >
                {engine.isRunning ? (
                  <><Square className="w-3 h-3 sm:w-4 sm:h-4 fill-current" /> <span>PAUSAR</span></>
                ) : (
                  <><Play className="w-3 h-3 sm:w-4 sm:h-4 fill-current" /> <span>INICIAR</span></>
                )}
              </button>`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Replaced play/pause buttons successfully.");
} else {
  console.log("Could not find button block.");
}
