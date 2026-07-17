const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

code = code.replace(
  '<div className="max-w-sm flex flex-col items-center">',
  '<div className="max-w-sm flex flex-col items-center -mt-12 sm:-mt-20">'
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated centering");
