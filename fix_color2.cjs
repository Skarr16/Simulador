const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

code = code.replace(/#4169E1/g, '#7C3AED');

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated color in TutorialModal");
