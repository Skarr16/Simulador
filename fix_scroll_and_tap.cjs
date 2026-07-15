const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove touchStartY, handleTouchStart, handleTouchMove, handleWheel
codeApp = codeApp.replace(/const touchStartY = useRef.*?;\s*const handleTouchStart =.*?;\s*const handleTouchMove =.*?\};.*?const handleWheel =.*?\};\s*/s, '');

// 2. Remove them from main
codeApp = codeApp.replace(/<main className="(.*?)" onTouchStart=\{handleTouchStart\} onTouchMove=\{handleTouchMove\} onWheel=\{handleWheel\}>/, '<main className="$1">');

// 3. Make Canvas Wrapper toggle isHeaderVisible on tap
const oldCanvasWrapper = 'onClick={(e) => { if (window.innerWidth < 768) setIsHeaderVisible(!isHeaderVisible); }}';
const newCanvasWrapper = 'onClick={(e) => { if (window.innerWidth < 768 && (e.target as HTMLElement).tagName !== "BUTTON") setIsHeaderVisible(!isHeaderVisible); }}';
codeApp = codeApp.replace(oldCanvasWrapper, newCanvasWrapper);

fs.writeFileSync('src/App.tsx', codeApp);
