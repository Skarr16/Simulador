const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldParent = '<div className="w-full h-full lg:h-auto lg:flex-1 flex flex-col relative shrink-0 lg:shrink sm:p-4 lg:p-0">';
const newParent = '<div className="w-full h-[100dvh] sm:h-auto lg:flex-1 flex flex-col relative shrink-0 lg:shrink sm:p-4 lg:p-0">';
code = code.replace(oldParent, newParent);

fs.writeFileSync('src/App.tsx', code);
