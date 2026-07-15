const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

const oldCanvasWrapper = '<div className="w-full flex-1 shrink-0 md:shrink md:p-0 flex flex-col relative min-h-full md:min-h-0">';
const newCanvasWrapper = '<div className="w-full flex-1 shrink-0 md:shrink md:p-0 flex flex-col relative min-h-[calc(100dvh-75px)] md:min-h-0">';
codeApp = codeApp.replace(oldCanvasWrapper, newCanvasWrapper);

fs.writeFileSync('src/App.tsx', codeApp);
