import React, { useState, useEffect } from 'react';
import { Play, Square, RotateCcw, Activity, Settings2, LineChart as ChartIcon, Zap } from 'lucide-react';
import { SimulationCanvas } from './components/SimulationCanvas';
import { ChartsArea } from './components/ChartsArea';
import { EnergyDisplay } from './components/EnergyDisplay';
import { HistoryComparison } from './components/HistoryComparison';
import { useEngine } from './hooks/useEngine';
import { SimulationConfig, SimulationResult } from './types';
import { calculateFallTime } from './lib/utils';

export default function App() {
  const [config, setConfig] = useState<SimulationConfig>({
    height: 50,
    massA: 2,
    massB: 10,
  });

  const [toggles, setToggles] = useState({
    vectors: true,
    graphs: true,
    energies: true,
  });

  const [history, setHistory] = useState<SimulationResult[]>([]);

  const engine = useEngine(config);

  // Save to history when finished
  useEffect(() => {
    if (engine.isFinished) {
      const newRun: SimulationResult = {
        id: Math.random().toString(36).substring(7),
        config: { ...config },
        timeToFall: calculateFallTime(config.height),
        maxK_A: Math.max(...engine.dataPoints.map(d => d.k_A), 0),
        maxK_B: Math.max(...engine.dataPoints.map(d => d.k_B), 0),
        maxU_A: Math.max(...engine.dataPoints.map(d => d.u_A), 0),
        maxU_B: Math.max(...engine.dataPoints.map(d => d.u_B), 0),
      };
      setHistory(prev => [...prev, newRun]);
    }
  }, [engine.isFinished, config]);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f3f4f6] font-sans selection:bg-purple-500/30 pb-12 relative overflow-hidden">
      
      {/* Abstract Background Decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="bg-[#110e1b]/80 backdrop-blur-md border-b border-[#2d2844] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/20 p-2 rounded-xl border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
               <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="font-bold text-xl tracking-wider text-purple-50 uppercase drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">Física Lab</h1>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-purple-300/60">
             <span className="bg-[#161423] px-3 py-1.5 rounded-full border border-[#2d2844] tracking-widest uppercase shadow-inner">Simulador de Queda Livre</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Canvas & Direct Controls */}
        <div className="lg:col-span-5 space-y-6">
          <SimulationCanvas 
            y={engine.y} 
            height={config.height} 
            massA={config.massA} 
            massB={config.massB} 
            v={engine.v}
            showVectors={toggles.vectors}
          />
          
          {/* Playback Controls */}
          <div className="bg-[#13111c] p-4 rounded-2xl border border-[#2d2844] shadow-lg flex items-center justify-center gap-4">
            <button 
              onClick={engine.start}
              disabled={engine.isRunning}
              className="flex items-center gap-2 px-6 py-2.5 bg-purple-600/20 hover:bg-purple-600/30 disabled:bg-[#1a1829] disabled:text-[#474066] disabled:border-[#2d2844] text-purple-300 font-bold rounded-xl border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)] disabled:shadow-none transition-all"
            >
              <Play className="w-4 h-4 fill-current" /> INICIAR
            </button>
            <button 
              onClick={engine.pause}
              disabled={!engine.isRunning}
              className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 disabled:bg-[#1a1829] disabled:text-[#474066] disabled:border-[#2d2844] text-cyan-400 font-bold rounded-xl border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)] disabled:shadow-none transition-all"
            >
              <Square className="w-4 h-4 fill-current" /> PAUSAR
            </button>
            <button 
              onClick={engine.reset}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1a1829] hover:bg-[#201d36] text-purple-300/80 font-bold rounded-xl border border-[#2d2844] transition-all"
            >
              <RotateCcw className="w-4 h-4" /> RESET
            </button>
          </div>
        </div>

        {/* Right Column: Configuration & Data Panels */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Configuration Panel */}
          <div className="bg-[#13111c] p-6 rounded-2xl border border-[#2d2844] shadow-lg relative">
            <div className="flex items-start gap-4 mb-6 border-b border-[#2d2844] pb-4">
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                <Settings2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-purple-50 uppercase tracking-wide">Configurações</h2>
                <p className="text-purple-300/60 mt-1 text-sm">Ajuste os parâmetros iniciais para realizar seus testes.</p>
              </div>
              <div className="ml-auto text-sm font-mono font-bold bg-[#1a1829] px-4 py-2 border border-[#2d2844] rounded-lg text-purple-300 shadow-inner">
                Tempo: {engine.time.toFixed(2)}s
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#0c0a13] p-5 rounded-xl border border-[#2d2844]">
              <div>
                <label className="block text-xs font-bold text-purple-300/80 mb-2 uppercase tracking-wider">Altura (m)</label>
                <input type="range" min="10" max="100" step="5" value={config.height} onChange={e => setConfig({...config, height: Number(e.target.value)})} className="w-full accent-purple-500" disabled={engine.time > 0} />
                <div className="text-right text-sm font-mono font-bold text-purple-400 mt-1">{config.height} m</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-cyan-300/80 mb-2 uppercase tracking-wider">Massa A (Cyan)</label>
                <input type="range" min="1" max="50" value={config.massA} onChange={e => setConfig({...config, massA: Number(e.target.value)})} className="w-full accent-cyan-400" disabled={engine.time > 0} />
                <div className="text-right text-sm font-mono font-bold text-cyan-400 mt-1">{config.massA} kg</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-fuchsia-300/80 mb-2 uppercase tracking-wider">Massa B (Fuchsia)</label>
                <input type="range" min="1" max="50" value={config.massB} onChange={e => setConfig({...config, massB: Number(e.target.value)})} className="w-full accent-fuchsia-500" disabled={engine.time > 0} />
                <div className="text-right text-sm font-mono font-bold text-fuchsia-400 mt-1">{config.massB} kg</div>
              </div>
            </div>

            {/* Visual Toggles */}
            <div className="flex flex-wrap gap-6 pt-6 mt-6 border-t border-[#2d2844]">
              <label className="flex items-center gap-3 text-xs font-bold text-purple-300/80 uppercase tracking-wider cursor-pointer">
                <div className={`w-12 h-6 flex items-center bg-[#1a1829] border border-[#2d2844] rounded-full p-1 cursor-pointer transition-colors ${toggles.vectors ? 'bg-purple-600/40 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : ''}`} onClick={() => setToggles(t => ({...t, vectors: !t.vectors}))}>
                  <div className={`bg-purple-300/50 w-4 h-4 rounded-full transform transition-transform ${toggles.vectors ? 'translate-x-6 bg-purple-300' : ''}`} />
                </div>
                Vetores
              </label>
              <label className="flex items-center gap-3 text-xs font-bold text-purple-300/80 uppercase tracking-wider cursor-pointer">
                <div className={`w-12 h-6 flex items-center bg-[#1a1829] border border-[#2d2844] rounded-full p-1 cursor-pointer transition-colors ${toggles.graphs ? 'bg-purple-600/40 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : ''}`} onClick={() => setToggles(t => ({...t, graphs: !t.graphs}))}>
                  <div className={`bg-purple-300/50 w-4 h-4 rounded-full transform transition-transform ${toggles.graphs ? 'translate-x-6 bg-purple-300' : ''}`} />
                </div>
                Gráficos
              </label>
              <label className="flex items-center gap-3 text-xs font-bold text-purple-300/80 uppercase tracking-wider cursor-pointer">
                <div className={`w-12 h-6 flex items-center bg-[#1a1829] border border-[#2d2844] rounded-full p-1 cursor-pointer transition-colors ${toggles.energies ? 'bg-purple-600/40 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : ''}`} onClick={() => setToggles(t => ({...t, energies: !t.energies}))}>
                  <div className={`bg-purple-300/50 w-4 h-4 rounded-full transform transition-transform ${toggles.energies ? 'translate-x-6 bg-purple-300' : ''}`} />
                </div>
                Energia
              </label>
            </div>
          </div>

          {/* Dynamic Data Visualizations based on toggles */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {(toggles.energies) && (
              <div className="xl:col-span-1 animate-in fade-in duration-300">
                <EnergyDisplay kA={engine.kA} uA={engine.uA} kB={engine.kB} uB={engine.uB} />
              </div>
            )}
            
            {(toggles.graphs) && (
              <div className="xl:col-span-1 animate-in fade-in duration-300">
                <ChartsArea data={engine.dataPoints} />
              </div>
            )}
          </div>

          {/* History / Comparison */}
          {(history.length > 0) && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <HistoryComparison history={history} />
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

