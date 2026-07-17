const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex = /<\/AnimatePresence>\n        <\/div>\n    <\/div>\n  \);\n\}/;

const replacement = `</AnimatePresence>
        </div>
        
        {/* Navigation Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex justify-between bg-[#F4F1EB] border-t-2 border-slate-900/10 z-20 px-6 sm:px-8">
          <button
            onClick={() => paginate(-1)}
            disabled={page === 0}
            className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-white disabled:bg-slate-200 disabled:text-slate-400 text-slate-900 font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#0f172a] disabled:shadow-none disabled:translate-y-[2px] transition-all text-[10px] sm:text-xs uppercase"
          >
            <ChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">Anterior</span>
          </button>
          
          <button
            onClick={() => {
              if (page === pages.length - 1) {
                onClose();
              } else {
                paginate(1);
              }
            }}
            className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#00C48C] text-slate-900 font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#0f172a] transition-all text-[10px] sm:text-xs uppercase"
          >
            {page === pages.length - 1 ? 'Concluir' : <span className="hidden sm:inline">Próxima</span>} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Restored footer");
