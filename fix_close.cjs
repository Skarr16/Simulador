const fs = require('fs');

let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

code = code.replace(
  /<div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-\[100\]">[\s\S]*?<\/button>\n        <\/div>/,
  `<div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-[999]">
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-10 h-10 bg-white hover:bg-slate-100 rounded-xl border-2 border-slate-900 flex items-center justify-center transition-colors shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer pointer-events-auto"
          >
            <X className="w-5 h-5 text-slate-900 pointer-events-none" />
          </button>
        </div>`
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Fixed close button");
