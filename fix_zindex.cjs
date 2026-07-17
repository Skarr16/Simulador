const fs = require('fs');

let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

code = code.replace(
  /<div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50">/,
  '<div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-[100]">'
);

code = code.replace(
  /<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex justify-between bg-\[#F4F1EB\] border-t-2 border-slate-900\/10 z-20 px-6 sm:px-8">/,
  '<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex justify-between bg-[#F4F1EB] border-t-2 border-slate-900/10 z-[100] px-6 sm:px-8">'
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Fixed z-index");
