const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

// Replace Unsplash images in Page 2 with CSS planets
code = code.replace(
  /<div className="text-center">\s*<img src="https:\/\/images\.unsplash\.com.*?Terra \(Ar\)<\/span>\s*<\/div>\s*<div className="text-center">\s*<img src="https:\/\/images\.unsplash\.com.*?Lua \(Vácuo\)<\/span>\s*<\/div>/s,
  `<div className="text-center">
              <div className="w-12 h-12 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] mx-auto mb-1 overflow-hidden relative bg-[#87CEEB]">
                <div className="absolute bottom-0 w-full h-[30%] bg-[#00C48C] border-t-2 border-slate-900"></div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-[#FFD700] rounded-full"></div>
              </div>
              <span className="text-[10px] font-black uppercase">Terra (Ar)</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] mx-auto mb-1 overflow-hidden relative bg-[#1a1a2e]">
                <div className="absolute bottom-0 w-full h-[30%] bg-[#64748b] border-t-2 border-slate-900"></div>
                <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full opacity-80"></div>
              </div>
              <span className="text-[10px] font-black uppercase">Lua (Vácuo)</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] mx-auto mb-1 overflow-hidden relative bg-[#fad47c]">
                <div className="absolute bottom-0 w-full h-[30%] bg-[#95290f] border-t-2 border-slate-900"></div>
                <div className="absolute top-4 right-3 w-4 h-1 bg-[#bd4821] rounded-full"></div>
              </div>
              <span className="text-[10px] font-black uppercase">Person.</span>
            </div>`
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Fixed Tutorial planets");
