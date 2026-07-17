const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

// Change page 0 header background color back to blue
code = code.replace(
  '<div className="bg-[#7C3AED] w-full pt-16 sm:pt-20 pb-6 px-6 sm:px-8 border-b-4 border-slate-900 flex-shrink-0">',
  '<div className="bg-[#0055FF] w-full pt-16 sm:pt-20 pb-6 px-6 sm:px-8 border-b-4 border-slate-900 flex-shrink-0">'
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated guide page 0 color to blue");
