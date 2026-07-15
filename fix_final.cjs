const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add state
const stateLine = '  const [isTutorialOpen, setIsTutorialOpen] = useState(false);';
const newStateLine = stateLine + '\n  const [isHeaderVisible, setIsHeaderVisible] = useState(true);';
if (!codeApp.includes('const [isHeaderVisible, setIsHeaderVisible]')) {
  codeApp = codeApp.replace(stateLine, newStateLine);
}

// 2. Modify header classes
const oldHeader = '<header className="bg-white border-b-[3px] border-slate-900 shadow-sm z-[100] flex-shrink-0 overflow-visible relative">';
const newHeader = '<header className={`bg-white shadow-sm z-[100] shrink-0 overflow-hidden relative transition-all duration-300 ease-in-out ${isHeaderVisible ? "border-b-[3px] border-slate-900 max-h-[500px] opacity-100" : "max-h-0 opacity-0 border-b-0 md:max-h-[500px] md:opacity-100 md:border-b-[3px]"}`}>';
codeApp = codeApp.replace(oldHeader, newHeader);

// 3. Re-add onClick to Canvas Wrapper
const oldWrapper = '<div className="w-full flex-1 pointer-events-auto flex relative md:rounded-2xl md:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 md:border-[3px] overflow-hidden bg-white" >';
const newWrapper = '<div className="w-full flex-1 pointer-events-auto flex relative md:rounded-2xl md:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 md:border-[3px] overflow-hidden bg-white" onClick={(e) => { if (window.innerWidth < 768 && (e.target as HTMLElement).tagName !== "BUTTON") setIsHeaderVisible(!isHeaderVisible); }}>';
codeApp = codeApp.replace(oldWrapper, newWrapper);

fs.writeFileSync('src/App.tsx', codeApp);
