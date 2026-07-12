import React, { useState, useEffect } from 'react';
import { Play, Square, RotateCcw, Activity, Settings2, LineChart as ChartIcon, Zap, ShieldAlert, Wind, QrCode, FastForward } from 'lucide-react';
import { SimulationCanvas } from './components/SimulationCanvas';
import { ChartsArea } from './components/ChartsArea';
import { EnergyDisplay } from './components/EnergyDisplay';
import { DataTable } from './components/DataTable';
import { SettingsDrawer } from './components/SettingsDrawer';
import { AdminModal } from './components/AdminModal';
import { QrCodeModal } from './components/QrCodeModal';
import { useEngine } from './hooks/useEngine';
import { SimulationConfig } from './types';
import { OBJECTS, ENVIRONMENTS } from './lib/constants';

export default function App() {
  const [simulationMode, setSimulationMode] = useState<'livre' | 'paraquedas'>('livre');
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const [configLivre, setConfigLivre] = useState<SimulationConfig>({
    simulationMode: 'livre',
    height: 56,
    structureId: 'pisa',
    objectAId: 'bowling',
    objectBId: 'feather',
    environmentId: 'earth',
    enableAirResistance: true,
  });

  const [configParaquedas, setConfigParaquedas] = useState<SimulationConfig>({
    simulationMode: 'paraquedas',
    height: 4000,
    structureId: 'custom',
    objectAId: 'skydiver',
    objectBId: 'skydiver',
    environmentId: 'earth',
    enableAirResistance: true,
  });

  const config = simulationMode === 'livre' ? configLivre : configParaquedas;
  const setConfig = simulationMode === 'livre' ? setConfigLivre : setConfigParaquedas;

  const [toggles, setToggles] = useState({
    vectors: true,
    graphs: false,
    table: false,
    devMode: false,
    showHeights: true,
    showGravity: false,
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);
  
  const [customObjects, setCustomObjects] = useState(OBJECTS);
  const [customEnvs, setCustomEnvs] = useState(ENVIRONMENTS);

  const engineLivre = useEngine(configLivre, customObjects, customEnvs, speedMultiplier);
  const engineParaquedas = useEngine(configParaquedas, customObjects, customEnvs, speedMultiplier);
  const engine = simulationMode === 'livre' ? engineLivre : engineParaquedas;

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [tooltipTimer, setTooltipTimer] = useState<any>(null);

  const showTooltip = (text: string, isTouch: boolean = false) => {
    setActiveTooltip(text);
    if (tooltipTimer) {
      window.clearTimeout(tooltipTimer);
    }
    if (isTouch) {
      const timer = window.setTimeout(() => {
        setActiveTooltip(null);
      }, 2000);
      setTooltipTimer(timer);
    }
  };

  const hideTooltip = () => {
    if (tooltipTimer) {
      window.clearTimeout(tooltipTimer);
      setTooltipTimer(null);
    }
    setActiveTooltip(null);
  };

  useEffect(() => {
    return () => {
      if (tooltipTimer) window.clearTimeout(tooltipTimer);
    };
  }, [tooltipTimer]);

  return (
    <div className="h-screen flex flex-col bg-[#F4F1EB] text-slate-900 font-sans selection:bg-blue-200 relative overflow-hidden">
      
      {/* Header */}
      <header className="bg-white border-b-[3px] border-slate-900 shadow-sm z-50 flex-shrink-0 overflow-visible">
        <div className="px-4 py-2.5 flex items-center justify-center min-h-16 h-auto overflow-visible">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 max-w-full overflow-visible">
            
            {/* Button 6: QR Code */}
            <button 
              onClick={() => setIsQrCodeOpen(true)}
              className="flex shrink-0 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#A855F7] text-white rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all"
            >
              <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider">QR Code</span>
            </button>

            {/* Button 1: Queda Livre */}
            <button
              onClick={() => {
                engineParaquedas.pause();
                setSimulationMode('livre');
              }}
              className={`flex shrink-0 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 ${simulationMode === 'livre' ? 'bg-[#00C48C] text-white' : 'bg-white text-slate-900'} rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all`}
            >
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider">Queda Livre</span>
            </button>

            {/* Button 2: Paraquedas */}
            <button 
              onClick={() => {
                engineLivre.pause();
                setSimulationMode('paraquedas');
              }}
              className={`flex shrink-0 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 ${simulationMode === 'paraquedas' ? 'bg-[#00C48C] text-white' : 'bg-white text-slate-900'} rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all`}
            >
              <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider">Paraquedas</span>
            </button>

            {/* Botão de Alternar Personagem (Só no Paraquedas) */}
            {config.simulationMode === 'paraquedas' && (
              <button 
                onClick={() => {
                  if (config.objectAId === 'astronaut') {
                    setConfig({ ...config, objectAId: 'skydiver', objectBId: 'skydiver' });
                  } else {
                    if (config.environmentId !== 'moon') {
                      alert("O astronauta só pode ser usado na Lua! Mude o local primeiro.");
                    } else {
                      setConfig({ ...config, objectAId: 'astronaut', objectBId: 'astronaut' });
                    }
                  }
                }}
                className={`flex shrink-0 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white text-slate-900 rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all`}
              >
                <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
                <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider">
                  {config.objectAId === 'astronaut' ? 'Usar Paraquedista' : 'Usar Astronauta'}
                </span>
              </button>
            )}

            {/* Button 4: Avançado (Antigo Admin) */}
            {toggles.devMode && (
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="flex shrink-0 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#FF3366] text-white rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all"
              >
                <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
                <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider">Avançado</span>
              </button>
            )}

            {/* Button 5: Configurar */}
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="flex shrink-0 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#FFB800] text-slate-900 rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all"
            >
              <Settings2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider">Configurar</span>
            </button>

          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-y-auto lg:overflow-hidden">
        
        {/* Canvas Area (Takes max space) */}
        <div className="w-full h-[580px] sm:h-[620px] lg:h-auto lg:flex-1 flex flex-col relative shrink-0 lg:shrink">
          <div className="absolute inset-4 flex flex-col pointer-events-none">
            {/* We make SimulationCanvas accept full width/height of this wrapper */}
            <div className="flex-1 pointer-events-auto flex rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 overflow-hidden bg-white">
              <SimulationCanvas 
                height={config.height} 
                structureId={config.structureId}
                resetCount={engine.resetCount}
                yA={engine.currentState.yA}
                yB={engine.currentState.yB}
                vA={engine.currentState.vA}
                vB={engine.currentState.vB}
                FdA={engine.currentState.FdA}
                FdB={engine.currentState.FdB}
                objectA={engine.objectA}
                objectB={engine.objectB}
                env={engine.env}
                showVectors={toggles.vectors}
                showHeights={toggles.showHeights}
                showGravity={toggles.showGravity}
                devMode={toggles.devMode}
                parachuteDeployedA={engine.currentState.parachuteDeployedA}
                parachuteDeployedB={engine.currentState.parachuteDeployedB}
                simulationMode={config.simulationMode}
                speedMultiplier={speedMultiplier}
                onSpeedChange={setSpeedMultiplier}
                onToggleEnv={() => {
                  const keys = Object.keys(customEnvs);
                  const currentIndex = keys.indexOf(config.environmentId);
                  const nextIndex = (currentIndex + 1) % keys.length;
                  const nextEnvId = keys[nextIndex];
                  
                  let nextObjectA = config.objectAId;
                  let nextObjectB = config.objectBId;

                  if (nextEnvId !== 'moon') {
                    if (nextObjectA === 'astronaut') nextObjectA = config.simulationMode === 'paraquedas' ? 'skydiver' : 'bowling';
                    if (nextObjectB === 'astronaut') nextObjectB = config.simulationMode === 'paraquedas' ? 'skydiver' : 'bowling';
                  }

                  let nextEnableAirResistance = config.enableAirResistance;
                  if (nextEnvId === 'moon') nextEnableAirResistance = false;

                  setConfig({ 
                    ...config, 
                    environmentId: nextEnvId,
                    objectAId: nextObjectA,
                    objectBId: nextObjectB,
                    enableAirResistance: nextEnableAirResistance
                  });
                }}
              />
            </div>

            {/* Playback Controls (Floating) */}
            <div className="mt-4 pointer-events-auto bg-white p-3 sm:p-4 rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 shrink-0">
              <button 
                onClick={engine.start}
                disabled={engine.isRunning}
                className="flex items-center justify-center gap-1 sm:gap-2 px-2 py-2 sm:px-6 sm:py-2 bg-[#00C48C] hover:bg-[#00a877] disabled:bg-slate-200 disabled:text-slate-400 text-slate-900 font-black rounded-xl border-[2px] sm:border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] sm:shadow-[4px_4px_0px_0px_#0f172a] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_#0f172a] disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_#0f172a] sm:disabled:hover:shadow-[4px_4px_0px_0px_#0f172a] disabled:cursor-not-allowed transition-all flex-1 sm:flex-none text-[10px] sm:text-base"
              >
                <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-current" /> <span>INICIAR</span>
              </button>
              <button 
                onClick={engine.pause}
                disabled={!engine.isRunning}
                className="flex items-center justify-center gap-1 sm:gap-2 px-2 py-2 sm:px-6 sm:py-2 bg-[#FFB800] hover:bg-[#e6a600] disabled:bg-slate-200 disabled:text-slate-400 text-slate-900 font-black rounded-xl border-[2px] sm:border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] sm:shadow-[4px_4px_0px_0px_#0f172a] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_#0f172a] disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_#0f172a] sm:disabled:hover:shadow-[4px_4px_0px_0px_#0f172a] disabled:cursor-not-allowed transition-all flex-1 sm:flex-none text-[10px] sm:text-base"
              >
                <Square className="w-3 h-3 sm:w-4 sm:h-4 fill-current" /> <span>PAUSAR</span>
              </button>
              <button 
                onClick={engine.reset}
                className="flex items-center justify-center gap-1 sm:gap-2 px-2 py-2 sm:px-6 sm:py-2 bg-white hover:bg-slate-50 disabled:bg-slate-200 disabled:text-slate-400 text-slate-900 font-black rounded-xl border-[2px] sm:border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] sm:shadow-[4px_4px_0px_0px_#0f172a] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_#0f172a] disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_#0f172a] sm:disabled:hover:shadow-[4px_4px_0px_0px_#0f172a] disabled:cursor-not-allowed transition-all flex-1 sm:flex-none text-[10px] sm:text-base"
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" /> <span>RESET</span>
              </button>
              
              <div className="w-full sm:w-auto sm:ml-auto flex items-center justify-center bg-[#F4F1EB] px-4 py-2 border-[3px] border-slate-900 rounded-lg shadow-[2px_2px_0px_0px_#0f172a] text-slate-900 font-mono font-black text-sm">
                Tempo: {engine.time.toFixed(2)}s
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Data Panels (Optional Sidebar) */}
        {(toggles.graphs || toggles.table) && (
          <div className="w-full lg:w-[450px] p-4 flex flex-col gap-6 overflow-visible lg:overflow-y-auto shrink-0 border-t-[3px] lg:border-t-0 lg:border-l-[3px] border-slate-900 bg-[#F4F1EB] z-20">
                        {toggles.graphs && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex-1 min-h-[300px]">
                <ChartsArea data={engine.dataPoints} />
              </div>
            )}

            {toggles.table && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <DataTable 
                  dataPoints={engine.dataPoints} 
                  initialHeight={config.height} 
                  objectA={engine.objectA} 
                  objectB={engine.objectB}
                  simulationMode={config.simulationMode}
                />
              </div>
            )}
          </div>
        )}
      </main>

      <SettingsDrawer 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        config={config} 
        setConfig={setConfig} 
        toggles={toggles} 
        setToggles={setToggles} 
        disabled={engine.isRunning} 
        customObjects={customObjects}
        customEnvs={customEnvs}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        customObjects={customObjects}
        setCustomObjects={setCustomObjects}
        customEnvs={customEnvs}
        setCustomEnvs={setCustomEnvs}
        devMode={toggles.devMode}
        setDevMode={(val) => setToggles(prev => ({ ...prev, devMode: val }))}
      />

      <QrCodeModal 
        isOpen={isQrCodeOpen}
        onClose={() => setIsQrCodeOpen(false)}
      />
    </div>
  );
}

