const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Container: remove grid, just use flex wrap
const oldContainer = "grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-4 shrink-0";
const newContainer = "flex flex-wrap items-center justify-center gap-2 sm:gap-4 w-full shrink-0";
codeApp = codeApp.replace(oldContainer, newContainer);

// 2. Button padding: make them smaller on sm, so they fit
// Replace `sm:px-3 md:px-5` with `sm:px-2 md:px-4`
// Replace `sm:text-base` with `sm:text-sm md:text-base`
codeApp = codeApp.replace(/sm:px-3 md:px-5/g, 'sm:px-2 md:px-4');
codeApp = codeApp.replace(/sm:text-base/g, 'sm:text-sm md:text-base');

fs.writeFileSync('src/App.tsx', codeApp);
