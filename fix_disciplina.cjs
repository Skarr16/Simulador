const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

code = code.replace(
  'Projeto desenvolvido durante a turma de <span className="not-italic font-bold tracking-wide">',
  'Projeto desenvolvido durante a disciplina de <span className="not-italic font-bold tracking-wide">'
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated text to disciplina");
