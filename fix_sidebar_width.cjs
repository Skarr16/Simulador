const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

codeApp = codeApp.replace(
  '<div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 lg:flex-none p-4 flex flex-col gap-6 overflow-visible lg:overflow-y-auto border-t-[3px] lg:border-t-0 lg:border-l-[3px] border-slate-900 bg-[#F4F1EB] z-20">',
  '<div className="w-full lg:w-[350px] xl:w-[400px] shrink-0 lg:flex-none p-4 flex flex-col gap-6 overflow-visible lg:overflow-y-auto border-t-[3px] lg:border-t-0 lg:border-l-[3px] border-slate-900 bg-[#F4F1EB] z-20">'
);
fs.writeFileSync('src/App.tsx', codeApp);
