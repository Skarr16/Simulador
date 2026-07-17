const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex = /\/\/ Page 5: Interface, Tabela e Gráficos[\s\S]*?\/\/ Page 6: Teoria Atmosfera \/ Arrasto/;

const replacement = `// Page 5: Interface & Exibição
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-slate-900"></span>
          Interface & Exibição
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-4 text-[12px]">
            No painel de configurações, você pode ligar/desligar exibições visuais e funcionalidades importantes:
          </p>

          <div className="bg-[#FAF9F6] p-4 rounded-xl border-2 border-slate-900 mb-6 flex flex-col gap-4 shadow-[4px_4px_0px_0px_#0f172a] mx-2">
             <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase text-slate-900">Alerta de Paraquedista</span>
                 <div className="w-9 h-5 bg-[#00C48C] rounded-full border-2 border-slate-900 relative">
                     <div className="absolute top-1/2 -translate-y-1/2 right-0.5 w-3 h-3 bg-white rounded-full border-2 border-slate-900"></div>
                 </div>
             </div>
             
             <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase text-slate-900">Vetores de Força</span>
                 <div className="w-9 h-5 bg-[#00C48C] rounded-full border-2 border-slate-900 relative">
                     <div className="absolute top-1/2 -translate-y-1/2 right-0.5 w-3 h-3 bg-white rounded-full border-2 border-slate-900"></div>
                 </div>
             </div>

             <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase text-slate-900">Gráficos de Queda</span>
                 <div className="w-9 h-5 bg-[#e2e8f0] rounded-full border-2 border-slate-900 relative">
                     <div className="absolute top-1/2 -translate-y-1/2 left-0.5 w-3 h-3 bg-slate-500 rounded-full border-2 border-slate-900"></div>
                 </div>
             </div>

             <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase text-slate-900">Tabela de Dados</span>
                 <div className="w-9 h-5 bg-[#e2e8f0] rounded-full border-2 border-slate-900 relative">
                     <div className="absolute top-1/2 -translate-y-1/2 left-0.5 w-3 h-3 bg-slate-500 rounded-full border-2 border-slate-900"></div>
                 </div>
             </div>

             <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase text-slate-900">Mostrar Alturas</span>
                 <div className="w-9 h-5 bg-[#00C48C] rounded-full border-2 border-slate-900 relative">
                     <div className="absolute top-1/2 -translate-y-1/2 right-0.5 w-3 h-3 bg-white rounded-full border-2 border-slate-900"></div>
                 </div>
             </div>

             <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase text-slate-900">Mostrar Gravidade</span>
                 <div className="w-9 h-5 bg-[#e2e8f0] rounded-full border-2 border-slate-900 relative">
                     <div className="absolute top-1/2 -translate-y-1/2 left-0.5 w-3 h-3 bg-slate-500 rounded-full border-2 border-slate-900"></div>
                 </div>
             </div>
          </div>
          
          <ul className="list-disc ml-5 space-y-3 mb-4 text-[11px] marker:text-slate-400">
            <li>
              <strong>Alerta de Paraquedista:</strong> Avisa quando é o momento seguro para abrir o paraquedas (pisca em vermelho na tela).
            </li>
            <li>
              <strong>Vetores de Força:</strong> Desenha as setas (peso e arrasto) diretamente nos objetos durante a simulação.
            </li>
            <li>
              <strong>Gráficos de Queda:</strong> Exibe ou oculta o painel inferior com os gráficos de Altura e Velocidade em tempo real.
            </li>
            <li>
              <strong>Tabela de Dados:</strong> Exibe a aba da tabela de dados ao lado dos gráficos, que pode ser exportada para Excel.
            </li>
            <li>
              <strong>Mostrar Alturas:</strong> Mostra réguas de altura (linhas pontilhadas) no fundo da tela enquanto o objeto cai.
            </li>
            <li>
              <strong>Mostrar Gravidade:</strong> Exibe os valores da gravidade e densidade do ar atuais no canto do simulador.
            </li>
          </ul>
        </div>
      </div>
    ),
    
    // Page 6: Teoria Atmosfera / Arrasto`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated page 5 of tutorial");
