const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

// Add min-h and shrink-0 to canvas area so it doesn't disappear when graphs are added
const oldCanvasArea = '<div className="w-full flex-1 flex flex-col relative md:shrink md:p-0">';
const newCanvasArea = '<div className="w-full min-h-[65vh] shrink-0 md:min-h-0 flex-1 flex flex-col relative md:shrink md:p-0">';
codeApp = codeApp.replace(oldCanvasArea, newCanvasArea);

fs.writeFileSync('src/App.tsx', codeApp);
