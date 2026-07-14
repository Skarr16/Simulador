const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldScrollLogic = `  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const currentScrollY = e.currentTarget.scrollTop;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setIsHeaderVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsHeaderVisible(true);
    }
    setLastScrollY(currentScrollY);
  };`;

const newScrollLogic = `  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const diff = touchStartY.current - currentY;
    
    // threshold
    if (diff > 30) {
      // Swiped up (scrolled down) - hide UI
      setIsHeaderVisible(false);
      touchStartY.current = currentY; // reset to avoid continuous triggers
    } else if (diff < -30) {
      // Swiped down (scrolled up) - show UI
      setIsHeaderVisible(true);
      touchStartY.current = currentY;
    }
  };
  
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 20) {
      setIsHeaderVisible(false);
    } else if (e.deltaY < -20) {
      setIsHeaderVisible(true);
    }
  };`;

code = code.replace(oldScrollLogic, newScrollLogic);

// Apply these to the main container
const oldMain = `<main className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-y-auto lg:overflow-hidden" onScroll={handleScroll}>`;
const newMain = `<main className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onWheel={handleWheel}>`;
code = code.replace(oldMain, newMain);

// Let's make the canvas Area take 100% of the space
const oldCanvasArea = `<div className="w-full h-[85dvh] sm:h-[550px] lg:h-auto lg:flex-1 pointer-events-auto flex rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 overflow-hidden bg-white">`;
const newCanvasArea = `<div className="w-full h-[100dvh] sm:h-[550px] lg:h-auto lg:flex-1 pointer-events-auto flex lg:rounded-2xl lg:shadow-[6px_6px_0px_0px_#0f172a] lg:border-[3px] lg:border-slate-900 overflow-hidden bg-white">`;
code = code.replace(oldCanvasArea, newCanvasArea);

// Remove the padding around canvas on mobile
const oldCanvasWrapper = `<div className="lg:absolute lg:inset-4 flex flex-col pointer-events-none p-4 lg:p-0 gap-4 lg:gap-0">`;
const newCanvasWrapper = `<div className="lg:absolute lg:inset-4 flex flex-col pointer-events-none h-full w-full lg:h-auto lg:w-auto">`;
code = code.replace(oldCanvasWrapper, newCanvasWrapper);

// Playback controls wrapper: make it fixed at bottom on mobile
const oldControls = `{/* Playback Controls (Floating) */}
            <div className="lg:mt-4 pointer-events-auto bg-white p-3 sm:p-4 rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0">`;

const newControls = `{/* Playback Controls (Floating) */}
            <div className={\`absolute bottom-4 left-4 right-4 lg:static lg:mt-4 pointer-events-auto bg-white p-3 sm:p-4 rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0 transition-transform duration-300 \${isHeaderVisible ? 'translate-y-0' : 'translate-y-[150%] lg:translate-y-0'}\`}>`;

code = code.replace(oldControls, newControls);

// Change absolute for header to fixed
const oldHeader = `<header className={\`bg-white border-b-[3px] border-slate-900 shadow-sm z-50 flex-shrink-0 overflow-visible transition-transform duration-300 \${isHeaderVisible ? 'translate-y-0' : '-translate-y-full absolute w-full'}\`}>`;
const newHeader = `<header className={\`bg-white border-b-[3px] border-slate-900 shadow-sm z-[100] flex-shrink-0 overflow-visible transition-transform duration-300 absolute top-0 left-0 right-0 lg:relative \${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}\`}>`;
code = code.replace(oldHeader, newHeader);

// Adjust canvas area for absolute header so it can be under the header
const oldMainWrapper = `<div className="w-full lg:h-auto lg:flex-1 flex flex-col relative shrink-0 lg:shrink">`;
const newMainWrapper = `<div className="w-full h-full lg:h-auto lg:flex-1 flex flex-col relative shrink-0 lg:shrink pt-[76px] lg:pt-0">`; // Adds padding for the header on mobile when visible?
// Actually if the header is absolute over the canvas, the canvas doesn't need padding, but then the header covers the top of the canvas. The user might want this to maximize space! Let's just give it a little padding or leave it full screen. Let's not add pt-[76px] and see.
code = code.replace(oldMainWrapper, `<div className="w-full h-full lg:h-auto lg:flex-1 flex flex-col relative shrink-0 lg:shrink">`);


fs.writeFileSync('src/App.tsx', code);
