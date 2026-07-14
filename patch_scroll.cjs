const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const insertionPoint = `  const maxVA = engine.dataPoints.length > 0 ? Math.max(0, ...engine.dataPoints.map(dp => Math.abs(dp.vA))) : 0;
  const maxVB = engine.dataPoints.length > 0 ? Math.max(0, ...engine.dataPoints.map(dp => Math.abs(dp.vB))) : 0;`;

const newCode = `  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const currentScrollY = e.currentTarget.scrollTop;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setIsHeaderVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsHeaderVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  const maxVA = engine.dataPoints.length > 0 ? Math.max(0, ...engine.dataPoints.map(dp => Math.abs(dp.vA))) : 0;
  const maxVB = engine.dataPoints.length > 0 ? Math.max(0, ...engine.dataPoints.map(dp => Math.abs(dp.vB))) : 0;`;

code = code.replace(insertionPoint, newCode);

const oldHeader = `<header className="bg-white border-b-[3px] border-slate-900 shadow-sm z-50 flex-shrink-0 overflow-visible">`;
const newHeader = `<header className={\`bg-white border-b-[3px] border-slate-900 shadow-sm z-50 flex-shrink-0 overflow-visible transition-transform duration-300 \${isHeaderVisible ? 'translate-y-0' : '-translate-y-full absolute w-full'}\`}>`;
code = code.replace(oldHeader, newHeader);

const oldMain = `<main className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-y-auto lg:overflow-hidden">`;
const newMain = `<main className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-y-auto lg:overflow-hidden" onScroll={handleScroll}>`;
code = code.replace(oldMain, newMain);

fs.writeFileSync('src/App.tsx', code);
