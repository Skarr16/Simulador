const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

// Update canvas wrapper width
codeApp = codeApp.replace(
  '<div className="w-full flex-1 shrink-0 lg:shrink lg:p-0 flex flex-col relative min-h-full lg:min-h-0">',
  '<div className="w-full lg:w-auto flex-1 shrink-0 lg:shrink md:p-0 flex flex-col relative min-h-full lg:min-h-0 min-w-0">'
);

fs.writeFileSync('src/App.tsx', codeApp);
