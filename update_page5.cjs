const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex = /<ul className="list-disc ml-5 space-y-3 mb-4 text-\[11px\] marker:text-slate-400">[\s\S]*?<\/ul>/;

const replacement = `<div className="flex flex-col gap-4">
            <p className="text-[11px] text-slate-600">
              <strong>Alerta de Paraquedista:</strong> Avisa quando é o momento seguro para abrir o paraquedas.<br/>
              <strong>Vetores de Força:</strong> Desenha as setas (peso e arrasto) diretamente nos objetos.<br/>
              <strong>Mostrar Alturas:</strong> Mostra réguas de altura (linhas pontilhadas) no fundo da tela.<br/>
              <strong>Mostrar Gravidade:</strong> Exibe os valores da gravidade e densidade do ar atuais no canto.
            </p>

            <div className="flex flex-col gap-3 mt-2">
               <div className="bg-[#FAF9F6] p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                 <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Posição (M) VS Tempo (S)</span>
                    <div className="flex items-center gap-2">
                       <div className="border-2 border-slate-900 rounded p-1.5 bg-[#FAF9F6]">
                          <Download className="w-3 h-3 text-slate-900" />
                       </div>
                       <div className="flex bg-[#F4F1EB] rounded border-2 border-slate-900 overflow-hidden">
                           <div className="bg-[#00C48C] text-slate-900 text-[9px] font-black px-3 py-1.5 uppercase border-r-2 border-slate-900">Posição</div>
                           <div className="text-slate-500 text-[9px] font-black px-3 py-1.5 uppercase">Velocidade</div>
                       </div>
                    </div>
                    
                    <div className="mt-3 relative h-32 border-l border-b border-slate-400 ml-6 mb-4">
                       <div className="absolute -left-6 top-0 text-[9px] font-mono text-slate-500">4000</div>
                       <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-500">2000</div>
                       <div className="absolute -left-3 bottom-0 translate-y-1/2 text-[9px] font-mono text-slate-500">0</div>
                       
                       <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-500">0.0s</div>
                       
                       <div className="absolute -left-5 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] font-bold text-slate-500 whitespace-nowrap">Posição (m)</div>
                       <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-500">Tempo (s)</div>
                       
                       <div className="absolute top-2 left-1/2 w-2 h-2 rounded-full border-2 border-[#FF3366] bg-transparent"></div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-1">
                       <div className="w-2 h-0.5 bg-[#FF3366] relative"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full border border-[#FF3366] bg-white"></div></div>
                       <span className="text-[9px] font-black text-[#FF3366]">Posição</span>
                    </div>
                 </div>
                 <p className="text-[10px] text-slate-600 mt-3 font-medium">
                   <strong>Gráficos de Queda:</strong> Exibe o painel com os gráficos de Altura e Velocidade em tempo real.
                 </p>
               </div>

               <div className="bg-[#FAF9F6] p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                 <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-1.5">
                       <Grid className="w-4 h-4 text-[#0055FF]" />
                       <span className="text-[11px] font-black uppercase text-slate-900 tracking-wider">Tabela de Dados</span>
                    </div>
                    
                    <div className="bg-[#88e3c8] text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg border-2 border-slate-400 self-start flex items-center gap-1 shadow-sm">
                       <Download className="w-3 h-3" />
                       Baixar Excel
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex justify-between items-center mt-1">
                        <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest invisible">.</span>
                        <div className="flex items-center gap-2">
                           <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Intervalo:</span>
                           <div className="bg-white border border-slate-300 rounded px-2 py-1 text-[9px] font-black text-slate-900 flex items-center gap-1 shadow-sm">
                              1.0s (Padrão) <ChevronDown className="w-3 h-3"/>
                           </div>
                        </div>
                    </div>
                    
                    <div className="border-2 border-slate-900 rounded-lg overflow-hidden flex flex-col">
                       <div className="bg-[#0f172a] flex justify-between px-2 py-2">
                           <div className="text-[8px] text-center font-black text-white uppercase leading-tight w-1/3">Tempo<br/>(s)</div>
                           <div className="text-[8px] text-center font-black text-white uppercase leading-tight w-1/3">Distância<br/>(m)</div>
                           <div className="text-[8px] text-center font-black text-white uppercase leading-tight w-1/3">Velocidade<br/>(m/s)</div>
                       </div>
                       <div className="bg-[#FAF9F6] h-16 flex items-center justify-center p-2">
                           <span className="text-[9px] text-slate-400 font-medium">Inicie a simulação para gerar dados...</span>
                       </div>
                    </div>
                 </div>
                 
                 <p className="text-[10px] text-slate-600 mt-3 font-medium">
                   <strong>Tabela de Dados:</strong> Exibe a aba da tabela de dados ao lado dos gráficos, que pode ser exportada para Excel.
                 </p>
               </div>
            </div>
          </div>`;

code = code.replace(regex, replacement);
code = code.replace("Activity, ChevronRight,", "Activity, ChevronRight, Grid, Download,");

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated page 5 with charts and table UI");
