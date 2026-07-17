const fs = require('fs');

let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

code = code.replace(
  /<div className="fixed inset-0 bg-slate-900\/50 backdrop-blur-sm z-\[300\] flex items-center justify-center p-4">/,
  `<div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[300] flex items-center justify-center p-4" onClick={onClose}>`
);

code = code.replace(
  /<div className="bg-\[#F4F1EB\] border-4 border-slate-900 shadow-\[8px_8px_0px_0px_#0f172a\] rounded-2xl w-full max-w-lg aspect-\[3\/4\] max-h-\[85vh\] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 relative">/,
  `<div className="bg-[#F4F1EB] border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] rounded-2xl w-full max-w-lg aspect-[3/4] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 relative" onClick={(e) => e.stopPropagation()}>`
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Fixed backdrop click");
