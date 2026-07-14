const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldMain = 'className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-y-auto overflow-x-hidden sm:overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onWheel={handleWheel}>';
const newMain = 'className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-y-auto overflow-x-hidden lg:overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onWheel={handleWheel}>';
code = code.replace(oldMain, newMain);

fs.writeFileSync('src/App.tsx', code);
