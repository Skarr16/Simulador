import React, { useState, useRef, useEffect } from 'react';
import { X, Play, LineChart as ChartIcon, Activity, ChevronRight, Grid, Download, ChevronLeft, RotateCcw, Square, Settings2, Wind, ArrowDownToLine, Zap, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  simulationMode?: 'livre' | 'paraquedas';
}

export function TutorialModal({ isOpen, onClose, simulationMode }: TutorialModalProps) {
  const [page, setPage] = useState(0);
  
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setPage(0);
      setDirection(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  const paginate = (dir: number) => {
    setDirection(dir);
    setPage(prev => prev + dir);
  };

  
  const pages = [
    // Page 0: Welcome
    (
      <div className="flex flex-col h-full -mx-6 sm:-mx-8 -mt-16 sm:-mt-20">
        <div className="bg-[#0055FF] w-full pt-16 sm:pt-20 pb-6 px-6 sm:px-8 border-b-4 border-slate-900 flex-shrink-0">
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 text-center tracking-tight leading-none">
            GUIA DO<br/>
            SIMULADOR
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center px-8 pb-8 pt-6 scrollbar-thin">
          <p className="text-sm sm:text-base font-bold text-slate-600 text-center leading-relaxed">
            Bem-vindo ao Guia Completo! Este simulador permite analisar a física da queda livre e o comportamento de saltos de paraquedas.
          </p>
          <p className="text-sm sm:text-base font-bold text-slate-600 text-center mt-3 sm:mt-4">
            Dependendo do modo (<strong>Queda Simultânea</strong> ou <strong>Queda Livre</strong>), as funções e objetos mudam.
          </p>
        </div>
      </div>
    ),
    // Page 1: Queda Livre
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#0055FF]"></span>
          Queda Livre
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-4">
            Você joga com um único corpo e precisa interagir com a simulação. 
            Além dos três personagens principais, é possível escolher qualquer outro objeto ou utilizar o <strong>Objeto Personalizado</strong>.
          </p>
          <div className="flex flex-col items-center gap-4 mt-6">
             <div className="flex justify-around items-center w-full mb-2">
               <img src="/objetos/astronauta/astronalta caindo.png" className="w-16 h-16 object-contain"/>
               <img src="/objetos/et/et_caindo.png" className="w-16 h-16 object-contain"/>
               <img src="/objetos/paraquedas/boneco caindo (1).png" className="w-16 h-16 object-contain"/>
             </div>

             <div className="bg-white p-3 rounded-xl border border-slate-200 text-center w-full shadow-sm text-[11px] font-bold text-slate-500">
               Com o <strong>Objeto Personalizado</strong>, você pode modificar características como <em>massa</em>, <em>área</em> e <em>coeficiente de arrasto</em> através do painel de Configurações.
             </div>

             <div className="bg-[#FF3366]/10 p-4 rounded-xl border-2 border-[#FF3366] text-center w-full">
                <Wind className="w-6 h-6 text-[#FF3366] mx-auto mb-2" />
                <p className="text-xs text-[#FF3366]"><strong>Atenção:</strong> O paraquedas do paraquedista tem que ser aberto antes de cair no chão para um pouso seguro!</p>
             </div>
          </div>
        </div>
      </div>
    ),
    
    // Page 2: Queda Simultânea
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#00C48C]"></span>
          Queda Simultânea
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-2 text-[12px]">
            Neste modo, você seleciona dois objetos diferentes para compará-los caindo juntos e analisar como a massa, área e o coeficiente de arrasto afetam a queda. 
            Você também pode selecionar os personagens principais como objetos.
          </p>

          <div className="bg-[#FAF9F6] p-3 rounded-xl border-2 border-slate-900 mt-4 mb-4 flex flex-col gap-2 shadow-[4px_4px_0px_0px_#0f172a]">
             <div className="flex flex-col gap-1">
               <span className="text-[10px] font-black uppercase text-[#FF3366]">Objeto em Queda</span>
               <div className="bg-[#F4F1EB] border-[2px] border-[#FF3366] rounded-lg p-1.5 text-xs font-bold flex justify-between items-center">
                  <span className="text-slate-900">Personalizado A (1kg, 1m²)</span>
                  <ChevronDown className="w-4 h-4 text-slate-900"/>
               </div>
             </div>
             <div className="bg-[#f8fafc] p-3 rounded-xl border border-[#e2e8f0] mt-1 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase text-slate-700">Massa</span>
                    <div className="flex items-center gap-2">
                       <div className="flex-1 border border-[#cbd5e1] rounded-md px-2 py-1.5 text-[11px] bg-white text-slate-900">1</div>
                       <span className="text-[10px] font-black text-slate-700 w-4">kg</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase text-slate-700">Área</span>
                    <div className="flex items-center gap-2">
                       <div className="flex-1 border border-[#cbd5e1] rounded-md px-2 py-1.5 text-[11px] bg-white text-slate-900">1</div>
                       <span className="text-[10px] font-black text-slate-700 w-4">m²</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase text-slate-700">Coef. Arrasto (Cd)</span>
                    <div className="flex items-center gap-2">
                       <div className="flex-1 border border-[#cbd5e1] rounded-md px-2 py-1.5 text-[11px] bg-white text-slate-900">1,05</div>
                    </div>
                </div>
             </div>
             <p className="text-[11px] text-slate-500 mt-1 leading-tight text-center">
               Com os <strong>Objetos Personalizados</strong>, você pode modificar a massa, área e o coeficiente de arrasto através do painel de Configurações.
             </p>
          </div>
                    
          <h4 className="text-[11px] uppercase text-slate-500 mb-3 font-black text-center mt-4">Outros Objetos Disponíveis</h4>
          <div className="grid grid-cols-2 gap-3">
             {[
               { name: 'Bola de Boliche', img: '/objetos/bola de boliche.png' },
               { name: 'Bola de Futebol', img: '/objetos/bola de futebol.png' },
               { name: 'Bola de Golfe', img: '/objetos/bola de golf.png' },
               { name: 'Ping-Pong', img: '/objetos/bola de ping-pong.png' },
               { name: 'Papel Amassado', img: '/objetos/papel amassado.png' },
               { name: 'Folha de Papel', img: '/objetos/papel.png' },
               { name: 'Livro', img: '/objetos/livro.png' },
               { name: 'Pena', img: '/objetos/pena.png' },
               { name: 'Personalizado', img: '/objetos/caixa (1).png' }
             ].map((obj, i) => (
               <div key={i} className="flex flex-col items-center justify-center bg-white p-2 rounded-xl border border-slate-200">
                  <img src={obj.img} className="w-8 h-8 object-contain mb-1" />
                  <span className="text-[10px] text-center font-black leading-tight">{obj.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    ),
    // Page 3: Controles de Execução
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FF3366]"></span>
          Controles
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-4">
            Utilize os botões na tela para comandar a simulação:
          </p>
          
          <div className="flex flex-col gap-3 mb-6 w-full">
             {/* Simulated toolbar (no parachutist / initial) */}
             <div className="bg-white p-2 border-2 border-slate-900 rounded-xl flex items-center gap-2 w-full">
                  <div className="flex-[3] flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-2 bg-[#00C48C] text-slate-900 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <Play className="w-3 h-3 fill-current" /> Iniciar
                  </div>
                  <div className="flex-[4] flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-2 bg-white text-slate-900 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <RotateCcw className="w-3 h-3" /> Reset
                  </div>
             </div>

             {/* Simulated toolbar (parachutist & playing) */}
             <div className="bg-white p-2 border-2 border-slate-900 rounded-xl flex items-center gap-2 w-full">
                  <div className="flex-[3] flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-2 bg-[#FFB800] text-slate-900 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <Square className="w-3 h-3 fill-current" /> Pausar
                  </div>
                  <div className="flex-[4] flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-2 bg-white text-slate-900 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <RotateCcw className="w-3 h-3" /> Reset
                  </div>
             </div>
          </div>

          <ul className="list-disc ml-4 mb-6 space-y-2 text-[12px]">
            <li><strong>Iniciar / Pausar:</strong> O mesmo botão alterna entre iniciar (verde) e pausar (amarelo) a simulação.</li>
            <li><strong>Resetar:</strong> Retorna os objetos para o topo, no tempo zero.</li>
          </ul>
          
          <div className="bg-slate-100 p-3 rounded-xl border-2 border-slate-200">
             <h4 className="text-xs uppercase text-slate-500 mb-2 font-black flex items-center gap-1"><Wind className="w-3 h-3"/> Botão "Abrir"</h4>
             <p className="text-[11px] mb-2">
               Aparece <strong>apenas quando o Paraquedista é selecionado</strong> no Modo Queda Livre.
             </p>
             <div className="flex justify-center mb-2">
                <div className="flex items-center gap-1.5 px-4 py-2 bg-[#FF3366] border-2 border-slate-900 rounded-lg text-white font-black text-sm uppercase shadow-[2px_2px_0px_0px_#0f172a]"><Wind className="w-4 h-4"/> ABRIR</div>
             </div>
             <p className="text-[11px]">
               Aciona o paraquedas. Você deve usá-lo antes que ele colida com o chão em alta velocidade, para aumentar o arrasto do ar e realizar um pouso seguro.
             </p>
          </div>
        </div>
      </div>
    ),
    // Page 3: Local e Configurações
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FFB800]"></span>
          Local
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-4 text-[12px]">
            No painel de Configurações, você pode alterar o <strong>Local</strong> para mudar as regras do universo (como a gravidade e a atmosfera).
          </p>
          
          <div className="flex justify-around mb-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] mx-auto mb-1 overflow-hidden relative bg-[#87CEEB]">
                <div className="absolute bottom-0 w-full h-[30%] bg-[#00C48C] border-t-2 border-slate-900"></div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-[#FFD700] rounded-full"></div>
              </div>
              <span className="text-[10px] font-black uppercase">Terra (Ar)</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] mx-auto mb-1 overflow-hidden relative bg-[#1a1a2e]">
                <div className="absolute bottom-0 w-full h-[30%] bg-[#64748b] border-t-2 border-slate-900"></div>
                <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full opacity-80"></div>
              </div>
              <span className="text-[10px] font-black uppercase">Lua (Vácuo)</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] mx-auto mb-1 overflow-hidden relative bg-[#fad47c]">
                <div className="absolute bottom-0 w-full h-[30%] bg-[#95290f] border-t-2 border-slate-900"></div>
                <div className="absolute top-4 right-3 w-4 h-1 bg-[#bd4821] rounded-full"></div>
              </div>
              <span className="text-[10px] font-black uppercase">Person.</span>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-xl border-2 border-slate-200 shadow-sm flex flex-col gap-2">
             <div className="flex flex-col gap-1">
               <span className="text-[10px] font-black uppercase text-slate-500">Locais</span>
               <div className="bg-[#F4F1EB] border-2 border-[#0055FF] rounded-lg p-1.5 text-xs font-bold flex justify-between items-center shadow-[2px_2px_0px_0px_#0055FF]">
                  <span className="text-slate-900">Personalizado (g=3.71 m/s²)</span>
                  <ChevronDown className="w-4 h-4 text-slate-900"/>
               </div>
             </div>
             <div className="bg-[#f8fafc] p-3 rounded-xl border border-slate-200 mt-1 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-slate-500">Gravidade (m/s²)</span>
                        <div className="border-2 border-slate-900 rounded-md px-3 py-0.5 text-[11px] font-bold bg-white text-slate-900">3,71</div>
                    </div>
                    <div className="flex items-center py-1">
                        <div className="w-full h-1.5 bg-[#e2e8f0] rounded-full relative">
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 h-1.5 bg-black rounded-l-full w-[25%]"></div>
                            <div className="absolute top-1/2 -translate-y-1/2 left-[25%] -translate-x-1/2 w-4 h-4 bg-black rounded-full shadow-sm"></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-slate-500">Dens. do Ar (kg/m³)</span>
                        <div className="border-2 border-slate-900 rounded-md px-3 py-0.5 text-[11px] font-bold bg-white text-slate-900">0,02</div>
                    </div>
                    <div className="flex items-center py-1">
                        <div className="w-full h-1.5 bg-[#e2e8f0] rounded-full relative">
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 h-1.5 bg-black rounded-l-full w-[10%]"></div>
                            <div className="absolute top-1/2 -translate-y-1/2 left-[10%] -translate-x-1/2 w-4 h-4 bg-[#0f172a] rounded-full shadow-sm"></div>
                        </div>
                    </div>
                </div>
             </div>
             <p className="text-[11px] text-slate-500 mt-1 leading-tight text-center">
               A caixa de seleção permite escolher entre Terra, Lua e Personalizado. No modo Personalizado você pode mudar a gravidade e a densidade do ar.
             </p>
          </div>
        </div>
      </div>
    ),
    
    // Page 4: Alturas / Estruturas
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0055FF]"></span>
          Alturas / Estruturas
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          
          <div className="bg-[#FAF9F6] p-3 rounded-xl border-2 border-slate-900 mt-2 mb-4 flex flex-col gap-3 shadow-[4px_4px_0px_0px_#0f172a]">
             <div className="flex flex-col gap-1">
               <span className="text-[10px] font-black uppercase text-slate-500">Alturas / Estruturas</span>
               <div className="bg-[#F4F1EB] border-2 border-slate-900 rounded-lg p-1.5 text-xs font-bold flex justify-between items-center">
                  <span className="text-slate-900">Personalizado</span>
                  <ChevronDown className="w-4 h-4 text-slate-900"/>
               </div>
             </div>
             
             <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between items-center">
                   <span className="text-[11px] font-black uppercase text-slate-900">Altura Inicial Manual</span>
                   <div className="flex items-center gap-1">
                       <div className="border-2 border-slate-900 rounded-md px-3 py-1 text-[11px] font-bold bg-[#F4F1EB] text-slate-900">4000</div>
                       <span className="text-[11px] font-black text-slate-900">m</span>
                   </div>
                </div>
                <div className="flex items-center py-1">
                   <div className="w-full h-2 bg-[#e2e8f0] rounded-full relative border border-slate-300">
                       <div className="absolute top-1/2 -translate-y-1/2 left-0 h-2 bg-slate-900 rounded-l-full w-[30%]"></div>
                       <div className="absolute top-1/2 -translate-y-1/2 left-[30%] -translate-x-1/2 w-4 h-4 bg-[#0f172a] rounded-full shadow-sm"></div>
                   </div>
                </div>
                <div className="text-right text-[10px] font-mono text-slate-500">
                   Valor atual: 4000 m
                </div>
             </div>

             <div className="border-t border-slate-300 my-1"></div>

             <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2">
                     <Wind className="w-4 h-4 text-slate-500" />
                     <span className="text-[11px] font-black uppercase text-slate-900">Resistência do Ar</span>
                 </div>
                 <div className="w-10 h-5 bg-[#00C48C] rounded-full border-2 border-slate-900 relative">
                     <div className="absolute top-1/2 -translate-y-1/2 right-0.5 w-3 h-3 bg-white rounded-full border-2 border-slate-900"></div>
                 </div>
             </div>
          </div>

          <p className="text-[11px] mb-3 text-slate-600 text-center leading-tight">
            Você pode definir uma <strong>Altura Personalizada</strong> usando o slider, ligar/desligar a <strong>Resistência do Ar</strong> no simulador, ou escolher entre as estruturas famosas disponíveis.
          </p>

          <h4 className="text-[11px] uppercase text-slate-500 mb-3 font-black text-center mt-4">Estruturas Disponíveis</h4>
          <div className="grid grid-cols-2 gap-3">
             {[
               { name: 'Cristo Redentor', img: '/estruturas/cristo redentor.png', height: '38m' },
               { name: 'Torre de Pisa', img: '/estruturas/torre de pisa.png', height: '56m' },
               { name: 'Torre Eiffel', img: '/estruturas/torre effel.png', height: '93m' },
               { name: 'Pirâmide de Gizé', img: '/estruturas/piramide de gize.png', height: '138m' },
             ].map((obj, i) => (
               <div key={i} className="flex flex-col items-center justify-center bg-white p-2 rounded-xl border border-slate-200">
                  <img src={obj.img} className="w-8 h-8 object-contain mb-1" />
                  <span className="text-[10px] text-center font-black leading-tight text-slate-700">{obj.name}</span>
                  <span className="text-[9px] text-center font-bold text-slate-400">{obj.height}</span>
               </div>
             ))}
          </div>
          
        </div>
      </div>
    ),
    
    // Page 5: Interface & Exibição
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
          
          <div className="flex flex-col gap-4">
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
          </div>
        </div>
      </div>
    ),
    
    // Page 6: Conceitos Físicos (Queda Livre)
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0055FF]"></span>
          Conceitos Físicos
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-[12px] font-bold text-slate-600 leading-relaxed mb-4">
            Em um cenário ideal (<strong>Queda Livre</strong>) no vácuo, não há resistência do ar. A única força atuando é o Peso (Gravidade).
          </p>
          
          <div className="bg-[#FAF9F6] p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] mb-4">
            <h4 className="text-[10px] font-black text-[#FF3366] uppercase tracking-widest mb-3">Cinemática</h4>
            
            <div className="flex flex-col gap-3">
               <div className="bg-white border-2 border-slate-200 rounded p-3">
                  <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Velocidade</div>
                  <div className="font-serif text-[15px] font-bold text-slate-900 text-center">
                     v = v<sub className="text-[10px]">0</sub> + gt
                  </div>
               </div>
               
               <div className="bg-white border-2 border-slate-200 rounded p-3">
                  <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Posição (Altura)</div>
                  <div className="font-serif text-[15px] font-bold text-slate-900 text-center flex items-center justify-center gap-1">
                     <span>h = v<sub className="text-[10px]">0</sub>t + </span>
                     <div className="flex flex-col items-center justify-center text-[11px] leading-[0.8]">
                        <span className="border-b-[1.5px] border-slate-900 pb-[1px] w-full text-center">1</span>
                        <span className="pt-[2px]">2</span>
                     </div>
                     <span>gt²</span>
                  </div>
               </div>
               
               <div className="bg-white border-2 border-slate-200 rounded p-3">
                  <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Equação de Torricelli</div>
                  <div className="font-serif text-[15px] font-bold text-slate-900 text-center">
                     v² = v<sub className="text-[10px]">0</sub>² + 2gh
                  </div>
               </div>
               
               <div className="bg-white border-2 border-slate-200 rounded p-3 mt-1">
                  <div className="text-[10px] text-slate-500 uppercase font-black mb-2">Variáveis</div>
                  <ul className="text-[11px] font-medium text-slate-700 flex flex-col gap-1.5">
                     <li><strong className="font-serif text-[12px]">v</strong> = Velocidade final</li>
                     <li><strong className="font-serif text-[12px]">v<sub className="text-[9px]">0</sub></strong> = Velocidade inicial</li>
                     <li><strong className="font-serif text-[12px]">g</strong> = Aceleração da gravidade</li>
                     <li><strong className="font-serif text-[12px]">t</strong> = Tempo</li>
                     <li><strong className="font-serif text-[12px]">h</strong> = Altura / Deslocamento</li>
                  </ul>
               </div>
            </div>
          </div>
          
          <p className="text-[11px] text-slate-600 font-medium text-center">
            Nessas condições, todos os objetos caem com a mesma aceleração (<strong>g</strong>), independentemente de suas massas.
          </p>
        </div>
      </div>
    ),
    
    // Page 7: Conceitos Físicos (Arrasto)
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#00C48C]"></span>
          Conceitos Físicos
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-[12px] font-bold text-slate-600 leading-relaxed mb-4">
            Com a atmosfera (Terra), o ar gera uma força oposta ao movimento, chamada <strong>Força de Arrasto</strong>.
          </p>
          
          <div className="bg-[#FAF9F6] p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Parâmetros</h4>
            
            <div className="bg-[#1e293b] text-[#00C48C] font-black p-4 rounded-xl text-center mb-4 text-base tracking-wide flex justify-center items-center">
              F<sub className="text-[10px] lowercase -mt-1 ml-0.5 mr-2">a</sub> = <span className="mx-1">½</span> · <span className="mx-1">ρ</span> · <span className="mx-1">v²</span> · C<sub className="text-[10px] lowercase -mt-1 ml-0.5">d</sub> · A
            </div>
            
            <div className="flex flex-col gap-3">
               <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-bold text-slate-600"><strong className="text-slate-900 text-[12px]">ρ</strong> (Densidade do ar)</span>
                  <span className="text-[11px] font-medium text-slate-800">0.02 kg/m³</span>
               </div>
               
               <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-bold text-slate-600"><strong className="text-slate-900 text-[12px]">v</strong> (velocidade)</span>
                  <span className="text-[11px] font-medium text-slate-800">0,00 m/s²</span>
               </div>
               
               <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-bold text-slate-600"><strong className="text-slate-900 text-[12px]">C<sub className="text-[8px] ml-px">d</sub></strong> (Coef. de arrasto)</span>
                  <span className="text-[11px] font-medium text-slate-800">1</span>
               </div>
               
               <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-bold text-slate-600"><strong className="text-slate-900 text-[12px]">A</strong> (Área de seção)</span>
                  <span className="text-[11px] font-medium text-slate-800">0.5 m²</span>
               </div>
               
               <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-600"><strong className="text-slate-900 text-[12px]">m</strong> (Massa)</span>
                  <span className="text-[11px] font-medium text-slate-800">45 kg</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    )
  ];


  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[300] flex items-center justify-center p-4" onClick={onClose}>
      {/* Book Container */}
      <div className="bg-[#F4F1EB] border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] rounded-2xl w-full max-w-lg aspect-[3/4] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 relative" onClick={(e) => e.stopPropagation()}>
        
        
        
        {/* Header/Close */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-[100]">
          <button type="button" onClick={(e) => { e.stopPropagation(); onClose(); }} className="relative z-[999] pointer-events-auto w-10 h-10 bg-white hover:bg-slate-100 rounded-xl border-2 border-slate-900 flex items-center justify-center transition-colors shadow-[2px_2px_0px_0px_#0f172a]"
          >
            <X className="w-5 h-5 text-slate-900" />
          </button>
        </div>

        {/* Page Number */}
        <div className="absolute top-5 left-6 sm:left-8 z-20 font-mono text-xs font-bold text-slate-400">
          Pág. {page + 1}/{pages.length}
        </div>

        {/* Page Content */}
        <div className="flex-1 px-6 sm:px-8 pt-16 sm:pt-20 pb-20 relative z-10 overflow-hidden w-full h-full">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute inset-0 px-6 sm:px-8 pt-16 sm:pt-20 pb-20 h-full w-full bg-[#F4F1EB]"
            >
              {pages[page]}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex justify-between bg-[#F4F1EB] border-t-2 border-slate-900/10 z-[100] px-6 sm:px-8">
          <button type="button" onClick={(e) => { e.stopPropagation(); paginate(-1); }}
            disabled={page === 0}
            className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-white disabled:bg-slate-200 disabled:text-slate-400 text-slate-900 font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#0f172a] disabled:shadow-none disabled:translate-y-[2px] transition-all text-[10px] sm:text-xs uppercase"
          >
            <ChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">Anterior</span>
          </button>
          
          <button type="button" onClick={(e) => { e.stopPropagation(); if (page === pages.length - 1) { onClose(); } else { paginate(1); } }}
            className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#00C48C] text-slate-900 font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#0f172a] transition-all text-[10px] sm:text-xs uppercase"
          >
            {page === pages.length - 1 ? 'Concluir' : <span className="hidden sm:inline">Próxima</span>} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
