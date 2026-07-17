const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex = /\/\/ Page 8: Créditos[\s\S]*?\];/;

const replacement = `// Page 8: Créditos
    (
      <div className="absolute inset-0 bg-[#4169E1] flex flex-col items-center justify-center p-8 z-50">
        <div className="max-w-sm flex flex-col items-center">
          <img src="/ufs_logo.png" className="w-56 h-auto mb-10 object-contain drop-shadow-md" alt="Logo UFS" />
          <p className="text-white text-[15px] sm:text-base font-serif italic text-center leading-relaxed drop-shadow-sm opacity-95">
            Projeto desenvolvido durante a turma de <span className="not-italic font-bold tracking-wide">Tópicos Especiais em Ferramentas Computacionais para o Ensino de Física - T01</span> do período 2026.1 da Universidade Federal de Sergipe.
          </p>
        </div>
      </div>
    )
  ];`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated page 8 font, color, and logo");
