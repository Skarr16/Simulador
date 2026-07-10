import React, { useState, useEffect } from 'react';
import { Play, Square, RotateCcw, Activity, Settings2, LineChart as ChartIcon, Zap, ShieldAlert, Wind } from 'lucide-react';
import { SimulationCanvas } from './components/SimulationCanvas';
import { ChartsArea } from './components/ChartsArea';
import { EnergyDisplay } from './components/EnergyDisplay';
import { DataTable } from './components/DataTable';
import { SettingsDrawer } from './components/SettingsDrawer';
import { AdminModal } from './components/AdminModal';
import { useEngine } from './hooks/useEngine';
import { SimulationConfig } from './types';
import { OBJECTS, ENVIRONMENTS } from './lib/constants';

export default function App() {
  const [config, setConfig] = useState<SimulationConfig>({
    height: 56,
    structureId: 'pisa',
    objectAId: 'bowling',
    objectBId: 'feather',
    environmentId: 'earth',
    enableAirResistance: true,
  });

  const [toggles, setToggles] = useState({
    vectors: true,
    graphs: false,
    energies: false,
    table: false,
    devMode: false,
    showHeights: true,
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  const [customObjects, setCustomObjects] = useState(OBJECTS);
  const [customEnvs, setCustomEnvs] = useState(ENVIRONMENTS);

  const engine = useEngine(config, customObjects, customEnvs);

  return (
    <div className="h-screen flex flex-col bg-[#F4F1EB] text-slate-900 font-sans selection:bg-blue-200 relative overflow-hidden">
      
      {/* Header */}
      <header className="bg-white border-b-[3px] border-slate-900 shadow-sm z-50 flex-shrink-0">
        <div className="px-4 h-16 flex items-center justify-center">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-2 px-2 max-w-full justify-start md:justify-center">
            <button
              onClick={() => setConfig({ ...config, simulationMode: 'livre', height: 56, structureId: 'pisa', objectAId: 'bowling', objectBId: 'feather' })}
              className={`flex shrink-0 items-center gap-2 px-4 py-2 ${(!config.simulationMode || config.simulationMode === 'livre') ? 'bg-[#00C48C] text-white' : 'bg-white text-slate-900'} font-black uppercase rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_0px_#0f172a] transition-all`}
            >
              <Activity className="w-4 h-4" /> <span className="hidden sm:inline">Queda Livre</span>
            </button>
            <button 
              onClick={() => setConfig({ ...config, simulationMode: 'paraquedas', objectAId: 'skydiver', objectBId: 'skydiver', height: 4000, structureId: 'custom', enableAirResistance: true })}
              className={`flex shrink-0 items-center gap-2 px-4 py-2 ${config.simulationMode === 'paraquedas' ? 'bg-[#00C48C] text-white' : 'bg-white text-slate-900'} font-black uppercase rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_0px_#0f172a] transition-all`}
            >
              <Wind className="w-4 h-4" /> <span className="hidden sm:inline">Paraquedas</span>
            </button>
            <button 
              onClick={() => setConfig({ ...config, simulationMode: 'lancamento' })}
              className={`flex shrink-0 items-center gap-2 px-4 py-2 ${config.simulationMode === 'lancamento' ? 'bg-[#0055FF] text-white' : 'bg-white text-slate-900'} font-black uppercase rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_0px_#0f172a] transition-all`}
            >
              <Activity className="w-4 h-4" /> <span className="hidden sm:inline">Em Breve</span>
            </button>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="flex shrink-0 items-center gap-2 px-4 py-2 bg-[#FF3366] text-white font-black uppercase rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_0px_#0f172a] transition-all"
            >
              <ShieldAlert className="w-4 h-4" /> <span className="hidden sm:inline">Admin</span>
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="flex shrink-0 items-center gap-2 px-4 py-2 bg-[#FFB800] text-slate-900 font-black uppercase rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_0px_#0f172a] transition-all"
            >
              <Settings2 className="w-4 h-4" /> <span className="hidden sm:inline">Configurar</span>
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
                devMode={toggles.devMode}
                parachuteDeployedA={engine.currentState.parachuteDeployedA}
                parachuteDeployedB={engine.currentState.parachuteDeployedB}
                simulationMode={config.simulationMode}
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
        {(toggles.energies || toggles.graphs || toggles.table) && (
          <div className="w-full lg:w-[450px] p-4 flex flex-col gap-6 overflow-visible lg:overflow-y-auto shrink-0 border-t-[3px] lg:border-t-0 lg:border-l-[3px] border-slate-900 bg-[#F4F1EB] z-20">
            {toggles.energies && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <EnergyDisplay kA={engine.kA} uA={engine.uA} kB={engine.kB} uB={engine.uB} />
              </div>
            )}
            
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
    </div>
  );
}

