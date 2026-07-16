const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const newPages = `
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
            Dependendo do modo (<strong>Queda Simultânea</strong> ou <strong>Queda Livre</strong>), as funções e objetos mudam.
          </p>
        </div>
      </div>
    ),
    
    // Page 1: Modo e Controles
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#00C48C]"></span>
          Modos
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-3">
            O modo de simulação define quais configurações e regras estão ativas:
          </p>
          <div className="bg-white p-3 rounded-xl border-2 border-slate-200 mb-4">
             <h4 className="text-xs uppercase text-slate-500 mb-2 font-black text-center">Modo Queda Simultânea</h4>
             <p className="text-[11px] mb-2 text-center">Você seleciona <strong>dois objetos</strong> para compará-los caindo juntos.</p>
             <div className="flex gap-2 mb-2 items-center justify-center text-xs">
               <img src="/objetos/bola de boliche.png" className="w-6 h-6 object-contain"/> <span className="font-black text-slate-800 text-[10px]">VS</span> <img src="/objetos/pena.png" className="w-6 h-6 object-contain"/>
             </div>
          </div>
          <div className="bg-white p-3 rounded-xl border-2 border-slate-200">
             <h4 className="text-xs uppercase text-slate-500 mb-2 font-black text-center">Modo Queda Livre</h4>
             <p className="text-[11px] mb-2 text-center">Você joga com um único corpo e precisa ativar o paraquedas antes que ele caia no chão.</p>
             <div className="flex justify-around items-center h-12">
               <img src="/objetos/astronauta/astronalta caindo.png" className="w-10 h-10 object-contain"/>
               <img src="/objetos/et/et_caindo.png" className="w-10 h-10 object-contain"/>
               <img src="/objetos/paraquedas/boneco caindo (1).png" className="w-10 h-10 object-contain"/>
             </div>
          </div>
        </div>
      </div>
    ),
    
    // Page 2: Controles de Execução
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF3366]"></span>
          Controles
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-4">
            Utilize os botões na tela para comandar a simulação:
          </p>
          <div className="flex justify-center gap-3 mb-6">
             <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white"><Play className="w-5 h-5 fill-current"/></div>
             <div className="w-10 h-10 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center text-slate-900"><Square className="w-4 h-4 fill-current"/></div>
             <div className="w-10 h-10 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center text-slate-900"><RotateCcw className="w-5 h-5"/></div>
          </div>
          <ul className="list-disc ml-4 mb-6 space-y-2 text-[12px]">
            <li><strong>Iniciar (Play):</strong> Dá o play na gravidade e os objetos começam a cair.</li>
            <li><strong>Pausar (Stop):</strong> Pausa o tempo imediatamente.</li>
            <li><strong>Resetar:</strong> Retorna os objetos para o topo, no tempo zero.</li>
          </ul>
          
          <div className="bg-slate-100 p-3 rounded-xl border-2 border-slate-200">
             <h4 className="text-xs uppercase text-slate-500 mb-2 font-black flex items-center gap-1"><ArrowDownToLine className="w-3 h-3"/> Botão "Abrir"</h4>
             <div className="flex justify-center mb-2">
                <div className="px-4 py-2 bg-gradient-to-b from-[#00C48C] to-[#009B6F] border-2 border-slate-900 rounded-lg text-white font-black text-sm uppercase shadow-[0_4px_0_0_#0f172a]">ABRIR</div>
             </div>
             <p className="text-[11px]">
               Disponível apenas no <strong>Modo Queda Livre</strong>! Este botão aciona o paraquedas. Você deve usá-lo antes que o personagem colida com o chão em alta velocidade, aumentando o arrasto do ar.
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
             <div className="bg-[#F4F1EB] border-2 border-slate-900 rounded p-1 text-xs font-bold flex justify-between items-center">
                <span>Terra (g=9.8 m/s²)</span>
                <ChevronDown className="w-3 h-3"/>
             </div>
             <p className="text-[11px] text-slate-500">
               A caixa de seleção permite trocar instantaneamente de ambiente. 
             </p>
             <div className="bg-slate-100 p-2 rounded-lg border border-slate-200 mt-1">
                <h4 className="text-[10px] uppercase text-slate-700 font-black"><Zap className="w-3 h-3 inline"/> Personalizado</h4>
                <p className="text-[10px] mt-1 text-slate-500">Use os sliders que aparecerão para ajustar <em>g</em> e densidade do ar manualmente.</p>
             </div>
          </div>
        </div>
      </div>
    ),
    
    // Page 4: Alturas e Objetos
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0055FF]"></span>
          Alturas & Objetos
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <div className="bg-white p-3 rounded-xl border-2 border-slate-200 mb-4">
             <h4 className="text-xs uppercase text-slate-500 mb-2 font-black">Estruturas (Altura)</h4>
             <div className="flex items-center gap-2 mb-2">
                <img src="/estruturas/torre de pisa.png" className="w-6 h-6 object-contain"/>
                <div className="bg-[#F4F1EB] flex-1 border-2 border-slate-900 rounded p-1 text-xs font-bold">Torre de Pisa (57m)</div>
             </div>
             <p className="text-[11px] mb-2">Selecione uma estrutura famosa para definir a altura de queda, ou use <strong>Personalizado</strong> para definir os metros exatos da plataforma!</p>
             <div className="bg-slate-50 p-2 rounded border border-slate-200 flex items-center justify-between">
                <span className="text-[10px] uppercase font-black">Personalizado</span>
                <span className="text-xs font-mono bg-white border border-slate-300 px-2 rounded">500 m</span>
             </div>
          </div>
          
          <div className="bg-white p-3 rounded-xl border-2 border-slate-200">
             <h4 className="text-xs uppercase text-slate-500 mb-2 font-black">Objetos</h4>
             <p className="text-[11px] mb-2">No Modo Queda Simultânea, escolha os objetos e modifique suas propriedades (Massa, Área) livremente quando suportado!</p>
             <div className="flex gap-2">
                <div className="bg-[#F4F1EB] flex-1 border-2 border-slate-900 rounded p-1 text-[10px] font-bold text-center">Bola de Futebol</div>
                <div className="bg-[#F4F1EB] flex-1 border-2 border-slate-900 rounded p-1 text-[10px] font-bold text-center">Bola de Boliche</div>
             </div>
          </div>
        </div>
      </div>
    ),
    
    // Page 5: Interface, Tabela e Gráficos
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-900"></span>
          Exibição & Dados
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-3 text-[12px]">
            No painel, você pode ligar/desligar exibições visuais importantes:
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
             <div className="bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1">Vetores <div className="w-2 h-2 bg-green-400 rounded-full"></div></div>
             <div className="bg-slate-200 text-slate-600 text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1">Tabela <div className="w-2 h-2 bg-slate-400 rounded-full"></div></div>
             <div className="bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1">Gráficos <div className="w-2 h-2 bg-green-400 rounded-full"></div></div>
          </div>
          
          <ul className="list-disc ml-4 space-y-3 mb-4 text-[11px]">
            <li>
              <strong>Vetores de Força:</strong> Desenha as setas de Peso e Arrasto nos objetos.
            </li>
            <li>
              <strong>Gráficos (<ChartIcon className="w-3 h-3 inline" />):</strong> Mostra linhas da Velocidade e Altura ao longo do tempo.
            </li>
            <li>
              <strong>Tabela de Dados (<Activity className="w-3 h-3 inline" />):</strong> Histórico exato. Você pode baixar em <strong>Excel</strong>!
            </li>
          </ul>
        </div>
      </div>
    ),
    
    // Page 6: Teoria Atmosfera / Arrasto
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0055FF]"></span>
          Física: Arrasto
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-sm font-bold text-slate-600 leading-relaxed mb-2">
            Com a atmosfera (Terra), o ar gera uma força oposta chamada <strong>Arrasto</strong>.
          </p>
          
          <div className="bg-slate-100 p-3 rounded-xl border-2 border-slate-200 mb-3">
            <h4 className="text-xs font-black text-slate-500 uppercase mb-2">Força de Arrasto (F_d)</h4>
            <div className="font-mono text-sm font-bold text-slate-900 bg-white p-2 rounded border border-slate-300 text-center mb-1">
              F_d = ½ · ρ · v² · C_d · A
            </div>
            <ul className="text-[10px] text-slate-500 mt-2 space-y-1 font-bold">
              <li><strong>ρ:</strong> Densidade do Ar (kg/m³)</li>
              <li><strong>v:</strong> Velocidade do corpo</li>
              <li><strong>A:</strong> Área frontal (m²)</li>
            </ul>
          </div>
          
          <div className="bg-slate-100 p-3 rounded-xl border-2 border-slate-200">
            <h4 className="text-xs font-black text-slate-500 uppercase mb-2">Velocidade Terminal</h4>
            <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
              Ocorre quando o Arrasto (para cima) se iguala à Força Peso (para baixo). A aceleração zera e o corpo atinge sua velocidade máxima constante!
            </p>
          </div>
        </div>
      </div>
    )
  ];
`;

code = code.replace(/const pages = \[\s*\/\/ Page 0: Welcome[\s\S]*?(?=return \()/g, newPages + '\n\n  ');

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated TutorialModal");
