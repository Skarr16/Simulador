import React, { useState } from 'react';
import { X, Play, LineChart as ChartIcon, Activity, ChevronRight, ChevronLeft, RotateCcw, Square, Settings2, Wind, ArrowDownToLine, Zap } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';
import { useRef, useEffect } from 'react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  simulationMode?: 'livre' | 'paraquedas';
}

export function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const [page, setPage] = useState(0);
  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isOpen]);

  if (!isOpen) return null;

  const paginate = (dir: number) => {
    if (bookRef.current) {
      if (dir === 1) {
        bookRef.current.pageFlip().flipNext();
      } else {
        bookRef.current.pageFlip().flipPrev();
      }
    }
  };

  const pages = [
    // Page 0: Welcome
    (
      <div className="flex flex-col h-full">
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 mb-2 mt-4 text-center tracking-tight leading-none">
          Simulador de<br/>
          <span className="text-[#0055FF]">Queda Livre</span> & <br/>
          <span className="text-[#FF3366]">Paraquedas</span>
        </h2>
        <div className="flex-1 flex flex-col justify-center items-center px-4">
          <div className="w-24 h-24 bg-white rounded-2xl border-4 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center mb-6 transform -rotate-6">
            <ArrowDownToLine className="w-12 h-12 text-[#0055FF]" />
          </div>
          <p className="text-sm font-bold text-slate-600 text-center leading-relaxed">
            Bem-vindo ao laboratório virtual! Aqui você pode testar como diferentes objetos caem em vários ambientes e entender como a física funciona, tanto em queda livre quanto saltando de paraquedas.
          </p>
          <p className="text-sm font-bold text-slate-600 text-center mt-4">
            Deslize ou use os botões para aprender como usar.
          </p>
        </div>
      </div>
    ),
    // Page 1: Queda Livre - Ambiente & Local
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg sm:text-xl font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#00C48C]"></span>
          Queda Livre - Ambiente
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-sm font-bold text-slate-600 leading-relaxed mb-4">
            O botão <strong><Settings2 className="w-4 h-4 inline" /> Configurar</strong> abre as opções. Aqui você define onde a queda ocorre:
          </p>
          
          <div className="flex justify-around mb-4">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mx-auto border-[3px] border-slate-900 mb-1 shadow-[2px_2px_0px_0px_#0f172a]">
                <img src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=150" alt="Earth" className="w-full h-full object-cover" />
              </div>
              <span className="text-[9px] sm:text-[11px] font-black uppercase text-slate-700">Terra: g=9.81<br/>(Paraquedista)</span>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mx-auto border-[3px] border-slate-900 mb-1 shadow-[2px_2px_0px_0px_#0f172a]">
                <img src="https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&q=80&w=150" alt="Moon" className="w-full h-full object-cover" />
              </div>
              <span className="text-[9px] sm:text-[11px] font-black uppercase text-slate-700">Lua: g=1.62<br/>(Astronauta)</span>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mx-auto border-[3px] border-slate-900 mb-1 shadow-[2px_2px_0px_0px_#0f172a] bg-[#fad47c] flex items-center justify-center">
                <span className="text-2xl">👽</span>
              </div>
              <span className="text-[9px] sm:text-[11px] font-black uppercase text-slate-700">Person.: g=3.71<br/>(ET)</span>
            </div>
          </div>
          
          <div className="bg-[#F4F1EB] p-4 rounded-xl border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] mb-4 space-y-3 mx-4 mt-2">
            <div>
              <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase">Locais</label>
              <div className="w-full bg-[#F4F1EB] border-2 border-slate-900 rounded-lg p-2 font-bold text-xs flex justify-between items-center text-slate-900">
                Terra (g=9.81 m/s²) <span className="text-slate-400">▼</span>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase">Alturas / Estruturas</label>
              <div className="w-full bg-[#F4F1EB] border-2 border-slate-900 rounded-lg p-2 font-bold text-xs flex justify-between items-center text-slate-900">
                Torre de Pisa (56m) <span className="text-slate-400">▼</span>
              </div>
            </div>
          </div>
          <p className="text-xs font-bold text-slate-600 bg-white p-3 rounded-lg border-2 border-slate-200">
            Você também pode selecionar o local <strong>Personalizado</strong> para criar seu próprio planeta, onde uma caixa aparecerá para você ajustar a gravidade e a densidade do ar manualmente!
          </p>
        </div>
      </div>
    ),
    // Page 2: Queda Livre - Objetos em Queda
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg sm:text-xl font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FF3366]"></span>
          Queda Livre - Objetos
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-sm font-bold text-slate-600 leading-relaxed mb-4">
            Ainda em configurações, você escolhe quais objetos participarão da corrida e pode <strong>alterar suas informações livremente</strong>:
          </p>
          
          <div className="bg-slate-100 p-3 rounded-xl border-2 border-slate-200 mb-4 flex items-center justify-center">
            <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">Formato: Nome (Massa, Área)</span>
          </div>
          <div className="bg-[#F4F1EB] p-4 rounded-xl border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] mb-4 space-y-4 mx-4 mt-2">
            <div>
              <label className="block text-[10px] font-black text-[#00C48C] mb-1 uppercase">Objeto A (Esquerda)</label>
              <div className="w-full bg-[#F4F1EB] border-2 border-slate-900 rounded-lg p-2 font-bold text-xs flex justify-between items-center text-slate-900">
                Personalizado <span className="text-slate-400">▼</span>
              </div>
              <div className="flex gap-2 mt-2">
                  <div className="flex-1 bg-white border border-slate-300 rounded p-1.5 font-bold text-xs text-slate-900">Massa (kg)</div>
                  <div className="flex-1 bg-white border border-slate-300 rounded p-1.5 font-bold text-xs text-slate-900">Área (m²)</div>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-[#0055FF] mb-1 uppercase">Objeto B (Direita)</label>
              <div className="w-full bg-[#F4F1EB] border-2 border-slate-900 rounded-lg p-2 font-bold text-xs flex justify-between items-center text-slate-900">
                Pena <span className="text-slate-400">▼</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
             <p className="text-xs font-bold text-slate-600">
                Ao selecionar <strong>Personalizado</strong> (ou usar os campos em qualquer objeto), você pode alterar livremente a <strong>Massa</strong> e a <strong>Área</strong>, criando desde uma pena super pesada até uma bola de boliche super leve!
             </p>
          </div>
        </div>
      </div>
    ),
    // Page 3: Paraquedas - Ambiente & Local
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg sm:text-xl font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#00C48C]"></span>
          Paraquedas - Ambiente
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-sm font-bold text-slate-600 leading-relaxed mb-4">
            No modo <strong>Paraquedas</strong>, a altura inicial é livremente configurável:
          </p>
          
          <div className="bg-[#F4F1EB] p-4 rounded-xl border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] mb-4 space-y-4 mx-4 mt-2">
            <div>
              <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase">Locais</label>
              <div className="w-full bg-[#F4F1EB] border-2 border-slate-900 rounded-lg p-2 font-bold text-xs flex justify-between items-center text-slate-900">
                Terra (g=9.81 m/s²) <span className="text-slate-400">▼</span>
              </div>
            </div>
              
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-black text-slate-900 uppercase">Altura Inicial Manual</label>
                <div className="flex items-center gap-1">
                  <div className="bg-[#F4F1EB] border-2 border-slate-900 rounded-lg px-3 py-1 font-bold text-xs text-slate-900 w-16 text-center">
                    4000
                  </div>
                  <span className="text-xs font-bold text-slate-900">m</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-slate-300 rounded-full relative">
                  <div className="absolute left-0 top-0 bottom-0 bg-slate-800 rounded-full w-1/3"></div>
                  <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 rounded-full"></div>
                </div>
              </div>
              <div className="text-right text-[9px] font-mono font-bold text-slate-500">
                Valor atual: 4000 m
              </div>
            </div>

            <div className="pt-2 border-t-2 border-slate-900/10 flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-900 flex items-center"><Wind className="w-3 h-3 mr-1" /> Resistência do Ar</span>
              <div className="w-10 h-5 bg-[#00C48C] rounded-full border-2 border-slate-900 relative">
                <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full border-2 border-slate-900"></div>
              </div>
            </div>
          </div>
          <p className="text-xs font-bold text-slate-600 bg-white p-3 rounded-lg border-2 border-slate-200">
            O salto com paraquedas requer <strong className="text-slate-900">grandes alturas</strong> e que a <strong className="text-[#00C48C]">Resistência do Ar</strong> esteja obrigatoriamente ligada.
          </p>
        </div>
      </div>
    ),
    // Page 4: Paraquedas - O Paraquedista
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg sm:text-xl font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FF3366]"></span>
          O Paraquedista
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-sm font-bold text-slate-600 leading-relaxed mb-4">
            Aqui você também pode escolher outros objetos ou mudar as informações do salto detalhadamente:
          </p>
          
          <div className="bg-[#F4F1EB] p-3 rounded-xl border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] mb-4 space-y-3 mx-2">
            <div>
              <label className="block text-[10px] font-black text-[#FF3366] mb-1 uppercase">Objeto em Queda</label>
              <div className="w-full bg-[#F4F1EB] border-2 border-slate-900 rounded-lg p-2 font-bold text-xs flex justify-between items-center text-slate-900">
                Paraquedista (75kg, 0.7m²) <span className="text-slate-400">▼</span>
              </div>
            </div>
            
            <div className="p-3 bg-white border-2 border-slate-200 rounded-xl space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-[9px] font-bold text-slate-700 mb-1 uppercase">Massa da Pessoa</label>
                  <div className="flex items-center gap-1">
                    <div className="flex-1 bg-white border border-slate-300 rounded p-1.5 font-bold text-xs text-slate-900">65</div>
                    <span className="text-[10px] font-black text-slate-500">kg</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[9px] font-bold text-slate-700 mb-1 uppercase">Massa do Equip.</label>
                  <div className="flex items-center gap-1">
                    <div className="flex-1 bg-white border border-slate-300 rounded p-1.5 font-bold text-xs text-slate-900">10</div>
                    <span className="text-[10px] font-black text-slate-500">kg</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-[9px] font-bold text-slate-700 mb-1 uppercase">Área do Corpo (Queda Livre)</label>
                <div className="flex items-center gap-1">
                  <div className="flex-1 bg-white border border-slate-300 rounded p-1.5 font-bold text-xs text-slate-900">0,7</div>
                  <span className="text-[10px] font-black text-slate-500">m²</span>
                </div>
              </div>
              
              <div>
                <label className="block text-[9px] font-bold text-slate-700 mb-1 uppercase">Área do Paraquedas (Aberto)</label>
                <div className="flex items-center gap-1">
                  <div className="flex-1 bg-white border border-slate-300 rounded p-1.5 font-bold text-xs text-slate-900">5</div>
                  <span className="text-[10px] font-black text-slate-500">m²</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xs font-bold text-slate-600 leading-relaxed bg-white p-3 rounded-lg border-2 border-slate-200">
             No momento da abertura, a área transversal aumenta bruscamente (Área do Corpo → Área do Paraquedas), gerando um forte arrasto.
          </p>
        </div>
      </div>
    ),
    // Page 5: Controles (Combined)
    (

      <div className="flex flex-col h-full">
        <h3 className="text-lg sm:text-xl font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FFB800]"></span>
          Controles
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-sm font-bold text-slate-600 leading-relaxed mb-4">
            Após configurar o experimento, controle a simulação com os botões na parte inferior:
          </p>
          
          <div className="bg-slate-100 p-4 rounded-2xl mb-4 border-2 border-slate-200 flex items-center justify-center mx-auto shadow-inner">
             <div className="flex gap-2 w-full justify-center">
                <div className="flex items-center justify-center gap-1 px-3 py-2 bg-[#00C48C] text-slate-900 font-black rounded-xl border-[2px] border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-[10px] flex-1">
                   <Play className="w-3 h-3 fill-current" /> <span className="hidden sm:inline">INICIAR</span>
                </div>
                <div className="flex items-center justify-center gap-1 px-3 py-2 bg-[#FFB800] text-slate-900 font-black rounded-xl border-[2px] border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-[10px] flex-1">
                   <Square className="w-3 h-3 fill-current" /> <span className="hidden sm:inline">PAUSAR</span>
                </div>
                <div className="flex items-center justify-center gap-1 px-3 py-2 bg-white text-slate-900 font-black rounded-xl border-[2px] border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-[10px] flex-1">
                   <RotateCcw className="w-3 h-3" /> <span className="hidden sm:inline">RESET</span>
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-slate-900 mt-1.5 shrink-0"></div>
                <div>
                   <div className="text-sm font-black text-slate-900 uppercase">Tempo e Velocidade</div>
                   <div className="text-xs font-bold text-slate-600">No canto inferior direito você verá um display (ex: <strong className="text-slate-900 bg-white border border-slate-200 px-1 rounded shadow-sm">00:00.00</strong>) marcando o tempo da queda. Você também pode acelerar o tempo usando o botão <strong className="text-slate-900 bg-white border border-slate-200 px-1 rounded shadow-sm">{'>>'} 1x</strong>!</div>
                </div>
             </div>
             
             <div className="flex gap-3 bg-slate-50 p-3 rounded-lg border-2 border-slate-200 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#FF3366] mt-1.5 shrink-0"></div>
                <div>
                   <div className="text-sm font-black text-slate-900 uppercase text-[#FF3366]">Ação no Paraquedas</div>
                   <div className="text-xs font-bold text-slate-600">No modo Paraquedas, o botão <strong className="text-white bg-[#FF3366] border border-slate-900 px-1 rounded shadow-sm uppercase"><Zap className="w-3 h-3 inline" /> Abrir</strong> aparecerá. Clique antes de bater no chão! Você também pode clicar no botão de Informação (<strong>i</strong>) circular para ver os <strong>DADOS DA SIMULAÇÃO</strong> com as variáveis em tempo real.</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    ),
    
    // Page 6: Interface & Exibição
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg sm:text-xl font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#00C48C]"></span>
          Interface & Exibição
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-sm font-bold text-slate-600 leading-relaxed mb-4">
            A barra lateral de configurações permite ativar diversos recursos visuais e analíticos:
          </p>
          
          <div className="space-y-4">
             <div className="flex gap-3 bg-slate-50 p-3 rounded-lg border-2 border-slate-200 shadow-sm">
                <Settings2 className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                <div>
                   <div className="text-sm font-black text-slate-900 uppercase">Mostrar Gravidade</div>
                   <div className="text-xs font-bold text-slate-600">Ative o interruptor nas configurações para exibir um medidor com o valor atual da aceleração da gravidade (ex: 9.81 m/s²) direto no cenário.</div>
                </div>
             </div>
             
             <div className="flex gap-3 bg-slate-50 p-3 rounded-lg border-2 border-slate-200 shadow-sm">
                <ChartIcon className="w-5 h-5 text-[#FF3366] shrink-0 mt-0.5" />
                <div>
                   <div className="text-sm font-black text-slate-900 uppercase">Gráficos de Queda</div>
                   <div className="text-xs font-bold text-slate-600">Acompanhe em tempo real as curvas no painel lateral alternando as guias: <strong>Posição vs Tempo</strong> e <strong>Velocidade vs Tempo</strong> para ambos os objetos.</div>
                </div>
             </div>

             <div className="flex gap-3 bg-slate-50 p-3 rounded-lg border-2 border-slate-200 shadow-sm">
                <Activity className="w-5 h-5 text-[#0055FF] shrink-0 mt-0.5" />
                <div>
                   <div className="text-sm font-black text-slate-900 uppercase">Tabela de Dados</div>
                   <div className="text-xs font-bold text-slate-600">Acesse uma tabela detalhada onde você pode:
                     <ul className="list-disc ml-4 mt-1 space-y-1">
                        <li>Alternar entre os dados do <strong>Objeto A</strong> e do <strong>Objeto B</strong>.</li>
                        <li>Mudar o <strong>Intervalo</strong> de amostragem dos dados (ex: 0.67s, 1.0s, etc).</li>
                        <li>Baixar um arquivo Excel clicando no botão <strong className="text-slate-900 bg-[#00C48C] px-1 rounded border border-slate-900">Baixar Excel</strong> com todos os resultados.</li>
                     </ul>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    ),
    // Page 7: Formulas Vacuo
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg sm:text-xl font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-slate-900"></span>
          Matemática (Vácuo)
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-sm font-bold text-slate-600 leading-relaxed mb-4">
            Sem resistência do ar, a massa do objeto <strong>não importa</strong>. Todos os objetos caem com a mesma aceleração (g).
          </p>
          
          <div className="space-y-4">
            <div className="bg-slate-100 p-4 rounded-xl border-2 border-slate-200">
              <h4 className="text-xs font-black text-slate-500 uppercase mb-2">Velocidade (v)</h4>
              <div className="font-mono text-base font-bold text-slate-900 bg-white p-2 rounded border border-slate-300 text-center">
                v = g · t
              </div>
              <p className="text-[11px] text-slate-500 mt-2">A velocidade aumenta linearmente com o tempo.</p>
            </div>
            
            <div className="bg-slate-100 p-4 rounded-xl border-2 border-slate-200">
              <h4 className="text-xs font-black text-slate-500 uppercase mb-2">Posição (y)</h4>
              <div className="font-mono text-base font-bold text-slate-900 bg-white p-2 rounded border border-slate-300 text-center">
                y = y₀ - (½ · g · t²)
              </div>
              <p className="text-[11px] text-slate-500 mt-2">A altura diminui quadraticamente.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    // Page 8: Formulas Ar
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg sm:text-xl font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#00C48C]"></span>
          Matemática (Ar)
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-sm font-bold text-slate-600 leading-relaxed mb-4">
            Com atmosfera, o ar gera uma força de <strong>Arrasto (Drag)</strong> no sentido oposto à queda.
          </p>
          
          <div className="bg-slate-100 p-4 rounded-xl border-2 border-slate-200 mb-4">
            <h4 className="text-xs font-black text-slate-500 uppercase mb-2">Força de Arrasto (F_d)</h4>
            <div className="font-mono text-sm font-bold text-slate-900 bg-white p-2 rounded border border-slate-300 text-center">
              F_d = ½ · ρ · v² · C_d · A
            </div>
            <ul className="text-[10px] text-slate-500 mt-3 space-y-1 font-bold">
              <li>ρ (rho): Densidade do Ar</li>
              <li>v: Velocidade</li>
              <li>C_d: Coeficiente de arrasto (Formato)</li>
              <li>A: Área da seção transversal</li>
            </ul>
          </div>
          
          <div className="bg-slate-100 p-4 rounded-xl border-2 border-slate-200">
            <h4 className="text-xs font-black text-slate-500 uppercase mb-2">Velocidade Terminal</h4>
            <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
              Ocorre quando a Força de Arrasto se iguala ao Peso (m·g). A partir desse ponto, o objeto não acelera mais e cai com velocidade constante. No paraquedas, o aumento da área (A) faz a velocidade terminal diminuir drasticamente.
            </p>
          </div>
        </div>
      </div>
    )
  ];;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      {/* Book Container */}
      <div className="bg-[#F4F1EB] border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] rounded-2xl w-full max-w-lg aspect-[3/4] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 relative">
        
        {/* Binder accent (visual only) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 bg-slate-800/5 border-r-2 border-slate-900/10 z-0"></div>

        {/* Header/Close */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20">
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white hover:bg-slate-100 rounded-xl border-2 border-slate-900 flex items-center justify-center transition-colors shadow-[2px_2px_0px_0px_#0f172a]"
          >
            <X className="w-5 h-5 text-slate-900" />
          </button>
        </div>

        {/* Page Number */}
        <div className="absolute top-5 left-10 sm:left-14 z-20 font-mono text-xs font-bold text-slate-400">
          Pág. {page + 1}/{pages.length}
        </div>

        {/* Page Content */}
        <div ref={containerRef} className="flex-1 pl-12 pr-6 sm:pl-16 sm:pr-8 pt-16 sm:pt-20 pb-20 relative z-10 overflow-hidden w-full h-full">
          {dimensions.width > 0 && (
            <div key={`${dimensions.width}-${dimensions.height}`} style={{ width: dimensions.width, height: dimensions.height }}>
              <HTMLFlipBook
                width={dimensions.width}
                height={dimensions.height}
                size="fixed"
                maxShadowOpacity={0.5}
                showCover={false}
                mobileScrollSupport={true}
                usePortrait={true}
                className="tutorial-book"
                ref={bookRef}
                onFlip={(e: any) => setPage(e.data)}
                style={{ margin: '0 auto' }}
                startPage={page}
                drawShadow={true}
                flippingTime={1000}
                useMouseEvents={false}
              >
                {pages.map((p, i) => (
                  <div key={i} className="page bg-[#F4F1EB] h-full overflow-hidden flex flex-col">
                    {p}
                  </div>
                ))}
              </HTMLFlipBook>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex justify-between bg-[#F4F1EB] border-t-2 border-slate-900/10 z-20 pl-12 sm:pl-16">
          <button
            onClick={() => paginate(-1)}
            disabled={page === 0}
            className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-white disabled:bg-slate-200 disabled:text-slate-400 text-slate-900 font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#0f172a] disabled:shadow-none disabled:translate-y-[2px] transition-all text-[10px] sm:text-xs uppercase"
          >
            <ChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">Anterior</span>
          </button>
          
          <button
            onClick={() => {
              if (page === pages.length - 1) {
                onClose();
              } else {
                paginate(1);
              }
            }}
            className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#00C48C] text-slate-900 font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#0f172a] transition-all text-[10px] sm:text-xs uppercase"
          >
            {page === pages.length - 1 ? 'Concluir' : <span className="hidden sm:inline">Próxima</span>} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
