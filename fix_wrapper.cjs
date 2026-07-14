const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldWrapper = '<div className="md:absolute md:inset-4 flex flex-col pointer-events-none h-full w-full">';
const newWrapper = '<div className="flex-1 flex flex-col pointer-events-none md:p-4">';
code = code.replace(oldWrapper, newWrapper);

fs.writeFileSync('src/App.tsx', code);
