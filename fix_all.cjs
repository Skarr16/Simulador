const fs = require('fs');

// Fix golf ball cd
let constants = fs.readFileSync('src/lib/constants.ts', 'utf8');
constants = constants.replace(
  "golf: { id: 'golf', name: 'Bola de Golfe', diameterInfo: 'Ø 4.2cm', mass: 0.046, area: 0.0014, cd: 0.3,",
  "golf: { id: 'golf', name: 'Bola de Golfe', diameterInfo: 'Ø 4.2cm', mass: 0.046, area: 0.0014, cd: 0.39,"
);
fs.writeFileSync('src/lib/constants.ts', constants);

// Fix guide text color
let tutorial = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');
tutorial = tutorial.replace(
  '<h2 className="text-2xl sm:text-3xl font-black uppercase text-white text-center tracking-tight leading-none">',
  '<h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 text-center tracking-tight leading-none">'
);
fs.writeFileSync('src/components/TutorialModal.tsx', tutorial);

console.log("Updated cd and text color");
