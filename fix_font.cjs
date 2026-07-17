const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

code = code.replace(
  '<p className="text-white text-[15px] sm:text-base font-serif italic text-center leading-relaxed drop-shadow-sm opacity-95">',
  '<p className="text-white text-[14px] sm:text-sm font-sans font-medium text-center leading-relaxed drop-shadow-sm">'
);

code = code.replace(
  '<span className="not-italic font-bold tracking-wide">',
  '<span className="font-black tracking-wide">'
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated font and style");
