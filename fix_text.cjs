const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

code = code.replace(
  '<p className="text-white text-[14px] sm:text-sm font-sans font-medium text-center leading-relaxed drop-shadow-sm">\n            Projeto desenvolvido durante a disciplina de <span className="font-black tracking-wide">TÓPICOS ESPECIAIS EM FERRAMENTAS COMPUTACIONAIS PARA O ENSINO DE FÍSICA - T01</span> do período 2026.1 da Universidade Federal de Sergipe.\n          </p>',
  '<p className="text-white text-[14px] sm:text-sm font-sans font-medium text-center leading-relaxed drop-shadow-sm">\n            projeto desenvolvido durante a diciplina de <span className="font-black tracking-wide">TÓPICOS ESPECIAIS EM FERRAMENTAS COMPUTACIONAIS PARA O ENSINO DE FÍSICA - T01</span> do periodo 2026.1 da universidade Federal de Sergipe\n          </p>'
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated text");
