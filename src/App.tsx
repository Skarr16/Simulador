import React, { useState, useEffect } from 'react';
import { Play, Square, RotateCcw, Activity, ArrowRight, Brain, Eye, BookOpen, Lightbulb } from 'lucide-react';
import { SimulationCanvas } from './components/SimulationCanvas';
import { ChartsArea } from './components/ChartsArea';
import { EnergyDisplay } from './components/EnergyDisplay';
import { HistoryComparison } from './components/HistoryComparison';
import { useEngine } from './hooks/useEngine';
import { PoeStage, SimulationConfig, SimulationResult } from './types';
import { calculateFallTime } from './lib/utils';

export default function App() {
  const [stage, setStage] = useState<PoeStage>('prever');
  const [prediction, setPrediction] = useState<string>('');
  
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

  // Auto-advance to explanation when simulation finishes in "observar" stage
  useEffect(() => {
    if (stage === 'observar' && engine.isFinished) {
      // Save to history
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
      
      // Delay before showing explanation so they can see final results
      setTimeout(() => {
        setStage('explicar');
      }, 1500);
    }
  }, [engine.isFinished, stage, config]);

  const handleStartObservation = () => {
    if (!prediction) {
      alert("Por favor, faça uma previsão antes de avançar!");
      return;
    }
    setStage('observar');
    engine.reset();
  };

  const resetMethodology = () => {
    setStage('prever');
    setPrediction('');
    engine.reset();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-blue-200">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-600" />
            <h1 className="font-bold text-lg tracking-tight">Física Lab: Queda Livre</h1>
          </div>
          
          {/* POE Progress Tracker */}
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-400">
            <div className={`flex items-center gap-1 ${stage === 'prever' ? 'text-blue-600' : 'text-slate-600'}`}>
              <Brain className="w-4 h-4" /> Prever
            </div>
            <ArrowRight className="w-4 h-4 opacity-30" />
            <div className={`flex items-center gap-1 ${stage === 'observar' ? 'text-blue-600' : ''}`}>
              <Eye className="w-4 h-4" /> Observar
            </div>
            <ArrowRight className="w-4 h-4 opacity-30" />
            <div className={`flex items-center gap-1 ${stage === 'explicar' ? 'text-blue-600' : ''}`}>
              <BookOpen className="w-4 h-4" /> Explicar
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Canvas & Direct Controls */}
        <div className="lg:col-span-5 space-y-4">
          <SimulationCanvas 
            y={engine.y} 
            height={config.height} 
            massA={config.massA} 
            massB={config.massB} 
            v={engine.v}
            showVectors={toggles.vectors}
          />
          
          {/* Playback Controls */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center justify-center gap-4">
            <button 
              onClick={engine.start}
              disabled={engine.isRunning || stage !== 'observar'}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-full transition-colors"
            >
              <Play className="w-4 h-4 fill-current" /> Iniciar
            </button>
            <button 
              onClick={engine.pause}
              disabled={!engine.isRunning}
              className="flex items-center gap-2 px-6 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-full transition-colors"
            >
              <Square className="w-4 h-4 fill-current" /> Pausar
            </button>
            <button 
              onClick={engine.reset}
              disabled={stage !== 'observar'}
              className="flex items-center gap-2 px-6 py-2 bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-slate-700 font-medium rounded-full transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Resetar
            </button>
          </div>
        </div>

        {/* Right Column: POE & Data Panels */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* POE Panel */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            {stage === 'prever' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Passo 1: Previsão</h2>
                    <p className="text-slate-500 mt-1">Configure os objetos e responda a pergunta antes de simular.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Altura Inicial (m)</label>
                    <input type="range" min="10" max="100" step="5" value={config.height} onChange={e => setConfig({...config, height: Number(e.target.value)})} className="w-full" />
                    <div className="text-right text-xs font-mono font-bold text-blue-600 mt-1">{config.height} m</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Massa A (kg) - Azul</label>
                    <input type="range" min="1" max="50" value={config.massA} onChange={e => setConfig({...config, massA: Number(e.target.value)})} className="w-full" />
                    <div className="text-right text-xs font-mono font-bold text-blue-600 mt-1">{config.massA} kg</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Massa B (kg) - Laranja</label>
                    <input type="range" min="1" max="50" value={config.massB} onChange={e => setConfig({...config, massB: Number(e.target.value)})} className="w-full" />
                    <div className="text-right text-xs font-mono font-bold text-orange-600 mt-1">{config.massB} kg</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-800">Se abandonarmos ambos simultaneamente, qual chegará ao solo primeiro?</h3>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <input type="radio" name="pred" value="A" onChange={e => setPrediction(e.target.value)} checked={prediction === 'A'} className="w-4 h-4 text-blue-600" />
                      O objeto A chegará primeiro
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <input type="radio" name="pred" value="B" onChange={e => setPrediction(e.target.value)} checked={prediction === 'B'} className="w-4 h-4 text-blue-600" />
                      O objeto B chegará primeiro
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <input type="radio" name="pred" value="Juntos" onChange={e => setPrediction(e.target.value)} checked={prediction === 'Juntos'} className="w-4 h-4 text-blue-600" />
                      Ambos chegarão juntos
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button onClick={handleStartObservation} className="flex items-center gap-2 px-6 py-2 bg-slate-900 hover:bg-black text-white font-medium rounded-full transition-colors">
                    Avançar para Observação <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {stage === 'observar' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-full">
                      <Eye className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Passo 2: Observação</h2>
                  </div>
                  <div className="text-sm font-mono bg-slate-100 px-3 py-1 rounded text-slate-600">
                    Tempo: {engine.time.toFixed(2)}s
                  </div>
                </div>
                <p className="text-slate-500 text-sm">Utilize os controles abaixo do simulador para iniciar. Analise os gráficos e energias ativando-os no painel.</p>
                
                {/* Visual Toggles */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
                  <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                    <div className={`w-10 h-6 flex items-center bg-slate-300 rounded-full p-1 cursor-pointer transition-colors ${toggles.vectors ? 'bg-blue-600' : ''}`} onClick={() => setToggles(t => ({...t, vectors: !t.vectors}))}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${toggles.vectors ? 'translate-x-4' : ''}`} />
                    </div>
                    Vetores (Força/Velocidade)
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                    <div className={`w-10 h-6 flex items-center bg-slate-300 rounded-full p-1 cursor-pointer transition-colors ${toggles.graphs ? 'bg-blue-600' : ''}`} onClick={() => setToggles(t => ({...t, graphs: !t.graphs}))}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${toggles.graphs ? 'translate-x-4' : ''}`} />
                    </div>
                    Gráficos de Posição
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                    <div className={`w-10 h-6 flex items-center bg-slate-300 rounded-full p-1 cursor-pointer transition-colors ${toggles.energies ? 'bg-blue-600' : ''}`} onClick={() => setToggles(t => ({...t, energies: !t.energies}))}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${toggles.energies ? 'translate-x-4' : ''}`} />
                    </div>
                    Monitor de Energia
                  </label>
                </div>
              </div>
            )}

            {stage === 'explicar' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Passo 3: Explicação</h2>
                    <p className="text-slate-500 mt-1">Confrontando suas previsões com a física.</p>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${prediction === 'Juntos' ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
                  <h3 className={`font-bold ${prediction === 'Juntos' ? 'text-emerald-800' : 'text-amber-800'}`}>
                    Sua previsão: {prediction === 'Juntos' ? 'Ambos chegam juntos.' : `Objeto ${prediction} chega primeiro.`}
                  </h3>
                  <p className="text-slate-700 text-sm mt-2">
                    {prediction === 'Juntos' 
                      ? 'Excelente! Como vimos na simulação, independentemente da diferença de massa, ambos caem ao mesmo tempo.' 
                      : 'A intuição muitas vezes nos engana! Na simulação, vimos que independentemente da massa, ambos caíram exatamente ao mesmo tempo.'}
                  </p>
                </div>

                <div className="prose prose-sm prose-slate">
                  <p>
                    <strong>Por que isso acontece?</strong> Pela Segunda Lei de Newton (F = m.a) e a Lei da Gravitação, a força peso é P = m.g. 
                    Igualando as duas (m.a = m.g), a massa (m) cancela dos dois lados. Portanto, a aceleração (a) de qualquer objeto em queda livre 
                    é igual à gravidade (g), <strong>independente da sua massa!</strong>
                  </p>
                  <p>
                    Embora a aceleração e velocidade sejam iguais, note na tabela abaixo que as <strong>Energias Cinética e Potencial</strong> são diferentes.
                    O objeto mais massivo acumula mais energia (J), mesmo caindo na mesma velocidade.
                  </p>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button onClick={resetMethodology} className="flex items-center gap-2 px-6 py-2 bg-slate-900 hover:bg-black text-white font-medium rounded-full transition-colors">
                    <RotateCcw className="w-4 h-4" /> Nova Simulação
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Data Visualizations based on toggles */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {(toggles.energies && stage !== 'prever') && (
              <div className="xl:col-span-1 animate-in fade-in duration-300">
                <EnergyDisplay kA={engine.kA} uA={engine.uA} kB={engine.kB} uB={engine.uB} />
              </div>
            )}
            
            {(toggles.graphs && stage !== 'prever') && (
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

