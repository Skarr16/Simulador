const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

code = code.replace(
  'Projeto desenvolvido durante a disciplina de <span className="not-italic font-bold tracking-wide">Tópicos Especiais em Ferramentas Computacionais para o Ensino de Física - T01</span> do período 2026.1 da Universidade Federal de Sergipe.',
  'Projeto desenvolvido durante a disciplina de <span className="not-italic font-bold tracking-wide">TÓPICOS ESPECIAIS EM FERRAMENTAS COMPUTACIONAIS PARA O ENSINO DE FÍSICA - T01</span> do período 2026.1 da Universidade Federal de Sergipe.'
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated text to uppercase");
