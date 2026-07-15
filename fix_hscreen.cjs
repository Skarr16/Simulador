const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

codeApp = codeApp.replace('<div className="h-screen flex flex-col bg-[#F4F1EB] text-slate-900 font-sans selection:bg-blue-200 relative overflow-hidden">', '<div className="h-[100dvh] flex flex-col bg-[#F4F1EB] text-slate-900 font-sans selection:bg-blue-200 relative overflow-hidden">');

fs.writeFileSync('src/App.tsx', codeApp);
