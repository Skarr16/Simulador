import React, { useState, useRef, useEffect } from 'react';
import { X, Play, LineChart as ChartIcon, Activity, ChevronRight, ChevronLeft, RotateCcw, Square, Settings2, Wind, ArrowDownToLine, Zap } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  simulationMode?: 'livre' | 'paraquedas';
}

export function TutorialModal({ isOpen, onClose, simulationMode }: TutorialModalProps) {
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
          GUIA DO<br/>
          <span className="text-[#0055FF]">SIMULADOR</span>
        </h2>
        <div className="flex-1 flex flex-col justify-center items-center px-4">
          <div className="w-24 h-24 bg-white rounded-2xl border-4 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center mb-6">
            <Settings2 className="w-12 h-12 text-[#0055FF]" />
          </div>
          <p className="text-sm font-bold text-slate-600 text-center leading-relaxed">
            Bem-vindo ao Guia Completo! Este simulador permite analisar a física da queda livre e o comportamento de saltos de paraquedas.
          </p>
          <p className="text-sm font-bold text-slate-600 text-center mt-4">
            Dependendo do modo (<strong>Queda Livre</strong> ou <strong>Paraquedas</strong>), as funções e objetos mudam.
          </p>
        </div>
      </div>
    ),
    
    // Page 1: Modo e Controles
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#00C48C]"></span>
          Modos & Controles
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-3">
            O modo de simulação define quais configurações e regras estão ativas:
          </p>
          <ul className="list-disc ml-4 mb-4 space-y-2">
            <li><strong>Queda Livre:</strong> Simula dois objetos sendo abandonados. Sem paraquedas.</li>
            <li><strong>Paraquedas:</strong> Você controla quando acionar o paraquedas para não cair no chão rápido demais.</li>
          </ul>
          <div className="bg-white p-3 rounded-xl border-2 border-slate-200 mb-4">
            <h4 className="text-xs uppercase text-slate-500 mb-2 font-black">Botões Principais</h4>
            <div className="flex gap-2 mb-2 items-center">
               <div className="bg-[#00C48C] text-slate-900 p-1.5 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]"><Play className="w-4 h-4"/></div>
               <span>Iniciar / Retomar</span>
            </div>
            <div className="flex gap-2 mb-2 items-center">
               <div className="bg-[#FF3366] text-white p-1.5 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]"><Square className="w-4 h-4"/></div>
               <span>Pausar a simulação</span>
            </div>
            <div className="flex gap-2 items-center">
               <div className="bg-white text-slate-900 p-1.5 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]"><RotateCcw className="w-4 h-4"/></div>
               <span>Reiniciar (Zerar posições)</span>
            </div>
          </div>
          <p className="text-xs">
            * Se estiver no celular, há um joystick e botões para acionar o paraquedas! Você também pode arrastar e fazer "pinça" na tela para controlar a câmera.
          </p>
        </div>
      </div>
    ),

    // Page 2: Ambientes e Local Personalizado
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#00C48C]"></span>
          Planetas & Locais
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-4">
            No painel de Configurações, você pode escolher o <strong>Local</strong>.
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
          <div className="bg-slate-100 p-3 rounded-xl border-2 border-slate-200">
            <h4 className="text-xs uppercase text-slate-500 mb-1 font-black flex items-center gap-1"><Zap className="w-3 h-3"/> Local Personalizado</h4>
            <p className="text-xs">
              Quando você escolhe o ambiente <strong>"Personalizado"</strong>, um card extra surge nas configurações. Nele, você pode usar os <em>sliders</em> para ajustar a gravidade (g) e a densidade do ar manualmente, criando as regras do seu próprio mundo!
            </p>
          </div>
        </div>
      </div>
    ),

    // Page 3: Objetos e Estruturas
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0055FF]"></span>
          Estruturas & Corpos
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-3">
            Escolha de onde você quer jogar os objetos (ex: Torre Eiffel, Pisa, Cristo Redentor). A altura inicial (em metros) mudará automaticamente.
          </p>
          <div className="bg-white p-3 rounded-xl border-2 border-slate-200 mb-4">
             <h4 className="text-xs uppercase text-slate-500 mb-2 font-black">Modo Queda Livre</h4>
             <p className="text-xs mb-2">Você seleciona <strong>dois objetos</strong> para compará-los caindo juntos.</p>
             <div className="flex gap-2 mb-2 items-center text-xs">
               <img src="/objetos/bola de boliche.png" className="w-6 h-6 object-contain"/> Bola de Boliche vs Pena
             </div>
          </div>
          <div className="bg-white p-3 rounded-xl border-2 border-slate-200">
             <h4 className="text-xs uppercase text-slate-500 mb-2 font-black">Modo Paraquedas</h4>
             <p className="text-xs mb-2">Você joga com um único corpo (ex: Astronauta ou ET) e precisa ativar o paraquedas antes que ele caia no chão.</p>
             <div className="flex justify-around">
               <img src="/objetos/astronauta/astronalta caindo.png" className="w-10 h-10 object-contain"/>
               <img src="/objetos/et/et_caindo.png" className="w-10 h-10 object-contain"/>
             </div>
          </div>
        </div>
      </div>
    ),

    // Page 4: Painéis e Gráficos
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#00C48C]"></span>
          Análise de Dados
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-4">
            Acompanhe o que acontece através dos painéis e gráficos do simulador.
          </p>
          <ul className="list-disc ml-4 mb-4 space-y-3">
            <li>
              <strong>Painel de Informações (HUD):</strong> Mostra a velocidade atual (m/s), a altura, o tempo percorrido e a energia cinética (J) em tempo real.
            </li>
            <li>
              <strong>Gráficos (<ChartIcon className="w-4 h-4 inline" />):</strong> Veja a evolução da Velocidade x Tempo e Altura x Tempo em um gráfico interativo.
            </li>
            <li>
              <strong>Tabela de Dados (<Activity className="w-4 h-4 inline" />):</strong> Registra o histórico da queda. Você pode ajustar o intervalo de registro, alternar entre os objetos e baixar uma <strong>planilha Excel</strong> com os dados exatos!
            </li>
          </ul>
        </div>
      </div>
    ),

    // Page 5: Física - O Vácuo
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-900"></span>
          Teoria: O Vácuo
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-sm font-bold text-slate-600 leading-relaxed mb-4">
            No vácuo (como na Lua), não há resistência do ar. A massa (kg) dos objetos não importa. Todos caem juntos.
          </p>
          <div className="space-y-4">
            <div className="bg-slate-100 p-3 rounded-xl border-2 border-slate-200">
              <h4 className="text-xs font-black text-slate-500 uppercase mb-2">Velocidade (v)</h4>
              <div className="font-mono text-sm font-bold text-slate-900 bg-white p-2 rounded border border-slate-300 text-center mb-1">
                v = v₀ + g · t
              </div>
              <ul className="text-[10px] text-slate-500 space-y-1 font-bold">
                <li><strong>v₀:</strong> Velocidade inicial (zero na queda)</li>
                <li><strong>g:</strong> Aceleração da gravidade (m/s²)</li>
                <li><strong>t:</strong> Tempo percorrido (s)</li>
              </ul>
            </div>
            
            <div className="bg-slate-100 p-3 rounded-xl border-2 border-slate-200">
              <h4 className="text-xs font-black text-slate-500 uppercase mb-2">Altura (y)</h4>
              <div className="font-mono text-sm font-bold text-slate-900 bg-white p-2 rounded border border-slate-300 text-center mb-1">
                y = y₀ - (½ · g · t²)
              </div>
              <ul className="text-[10px] text-slate-500 space-y-1 font-bold">
                <li><strong>y₀:</strong> Altura inicial (m)</li>
                <li>A equação é subtraída porque ele cai em direção ao chão (y=0).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),

    // Page 6: Física - Resistência do Ar
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0055FF]"></span>
          Teoria: Atmosfera
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-sm font-bold text-slate-600 leading-relaxed mb-2">
            Com a atmosfera (Terra, Júpiter), o ar gera uma força oposta chamada de <strong>Arrasto</strong> (Força de atrito com o ar).
          </p>
          
          <div className="bg-slate-100 p-3 rounded-xl border-2 border-slate-200 mb-3">
            <h4 className="text-xs font-black text-slate-500 uppercase mb-2">Força de Arrasto (F_d)</h4>
            <div className="font-mono text-sm font-bold text-slate-900 bg-white p-2 rounded border border-slate-300 text-center mb-1">
              F_d = ½ · ρ · v² · C_d · A
            </div>
            <ul className="text-[10px] text-slate-500 mt-2 space-y-1 font-bold">
              <li><strong>ρ (rho):</strong> Densidade do Ar (kg/m³)</li>
              <li><strong>v:</strong> Velocidade atual do corpo</li>
              <li><strong>C_d:</strong> Coef. de arrasto (depende do formato)</li>
              <li><strong>A:</strong> Área frontal (m²) que bate no ar</li>
            </ul>
          </div>
          
          <div className="bg-slate-100 p-3 rounded-xl border-2 border-slate-200">
            <h4 className="text-xs font-black text-slate-500 uppercase mb-2">Velocidade Terminal</h4>
            <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
              Ocorre quando a Força de Arrasto (para cima) se iguala à Força Peso (P = m·g) (para baixo). Nesse momento, a aceleração zera e o corpo atinge sua velocidade máxima constante! <strong>Quando o paraquedas abre</strong>, a Área (A) e o C_d aumentam enormemente, freando a queda.
            </p>
          </div>
        </div>
      </div>
    )
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
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
