const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldParent = '<div className="w-full h-[85dvh] min-h-[500px] sm:h-auto sm:flex-1 flex flex-col relative shrink-0 sm:shrink sm:p-4 md:p-0">';
const newParent = '<div className="w-full h-[85dvh] min-h-[500px] md:h-auto md:flex-1 flex flex-col relative shrink-0 md:shrink md:p-0">';
code = code.replace(oldParent, newParent);

fs.writeFileSync('src/App.tsx', code);
