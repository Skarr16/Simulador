import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, RotateCcw, Activity, Settings2, LineChart as ChartIcon, Zap, ShieldAlert, Wind, QrCode, FastForward, Volume2, VolumeX } from 'lucide-react';
import { SimulationCanvas } from './components/SimulationCanvas';
import { ChartsArea } from './components/ChartsArea';
import { EnergyDisplay } from './components/EnergyDisplay';
import { DataTable } from './components/DataTable';
import { SettingsDrawer } from './components/SettingsDrawer';
import { AdminModal } from './components/AdminModal';
import { QrCodeModal } from './components/QrCodeModal';
import { TutorialModal } from './components/TutorialModal';
import { AboutModal } from './components/AboutModal';
import { FailModal } from './components/FailModal';
import { BookOpen, Info } from 'lucide-react';
import { useEngine } from './hooks/useEngine';
import { soundEngine } from './lib/audio';
import { SimulationConfig } from './types';
import { OBJECTS, ENVIRONMENTS } from './lib/constants';

export default function App() {
  const [simulationMode, setSimulationMode] = useState<'livre' | 'paraquedas'>('paraquedas');
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
    sound: false,
    crashAlert: true,
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  
  const [customObjects, setCustomObjects] = useState(OBJECTS);
  const [customEnvs, setCustomEnvs] = useState(ENVIRONMENTS);

  const engineLivre = useEngine(configLivre, customObjects, customEnvs, speedMultiplier);
  const engineParaquedas = useEngine(configParaquedas, customObjects, customEnvs, speedMultiplier);
  const engine = simulationMode === 'livre' ? engineLivre : engineParaquedas;

  const prevDeployedA = useRef(false);
  const prevDeployedB = useRef(false);
  const prevIsRunning = useRef(false);
  const prevYA = useRef(configLivre.height);
  const prevYB = useRef(configLivre.height);
  const prevVA = useRef(0);
  const prevVB = useRef(0);
  const [failMessage, setFailMessage] = useState<string | null>(null);
  const prevDeployedAForCrash = useRef(false);
  const prevDeployedBForCrash = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === '=' || e.key === '-' || e.key === '+' || e.key === '_' || e.key === '0')) {
        e.preventDefault();
      }
    };
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button')) {
        soundEngine.init().then(() => soundEngine.playClick());
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  useEffect(() => {
    if (!toggles.sound) return;

    // Wind Sound
    if (engine.isRunning) {
      if (!prevIsRunning.current) {
        soundEngine.startWind();
        if (config.simulationMode === 'paraquedas' && config.objectAId === 'et') {
          soundEngine.playOvni();
        }
        if (config.simulationMode === 'paraquedas' && config.objectAId === 'astronaut') {
          soundEngine.playAstronautShip();
        }
        if (config.simulationMode === 'paraquedas' && config.objectAId === 'skydiver') {
          soundEngine.playAirplane();
        }
      }
      const maxV = config.simulationMode === 'paraquedas' ? engine.currentState.vA : Math.max(engine.currentState.vA, engine.currentState.vB);
      soundEngine.updateWind(maxV);
    } else if (prevIsRunning.current) {
      soundEngine.stopWind();
    }
    prevIsRunning.current = engine.isRunning;

    // Parachute deploy
    if (engine.currentState.parachuteDeployedA && !prevDeployedA.current) {
      soundEngine.playParachute();
    }
    if (config.simulationMode !== 'paraquedas' && engine.currentState.parachuteDeployedB && !prevDeployedB.current) {
      soundEngine.playParachute();
    }
    prevDeployedA.current = engine.currentState.parachuteDeployedA || false;
    prevDeployedB.current = engine.currentState.parachuteDeployedB || false;

    // Impact
    if (engine.currentState.yA <= 0 && prevYA.current > 0) {
      if (engine.objectA.id === 'skydiver') {
        soundEngine.playMetallicImpact(Math.max(prevVA.current, 10));
      } else if (['customA', 'customB', 'book', 'soccer'].includes(engine.objectA.id)) {
        soundEngine.playImpact(Math.max(prevVA.current, 10));
      } else if (['paper_crumpled', 'paper_flat', 'feather'].includes(engine.objectA.id)) {
        soundEngine.playSoftImpact(Math.max(prevVA.current, 10));
      } else {
        soundEngine.playMetallicImpact(Math.max(prevVA.current, 10));
      }
    }
    if (engine.currentState.yB <= 0 && prevYB.current > 0 && config.simulationMode !== 'paraquedas') {
      if (engine.objectB.id === 'skydiver') {
        soundEngine.playMetallicImpact(Math.max(prevVB.current, 10));
      } else if (['customA', 'customB', 'book', 'soccer'].includes(engine.objectB.id)) {
        soundEngine.playImpact(Math.max(prevVB.current, 10));
      } else if (['paper_crumpled', 'paper_flat', 'feather'].includes(engine.objectB.id)) {
        soundEngine.playSoftImpact(Math.max(prevVB.current, 10));
      } else {
        soundEngine.playMetallicImpact(Math.max(prevVB.current, 10));
      }
    }

    if (engine.isFinished) {
      soundEngine.stopWind();
    }
    
    prevYA.current = engine.currentState.yA;
    prevYB.current = engine.currentState.yB;
    prevVA.current = engine.currentState.vA;
    prevVB.current = engine.currentState.vB;
  }, [engine.currentState, engine.isRunning, engine.isFinished, toggles.sound, config.simulationMode]);

  
  useEffect(() => {
    if (config.simulationMode === 'paraquedas' && engine.isRunning) {
      const currentState = engine.currentState;
      const isSkydiverA = config.objectAId === 'skydiver';
      let failed = false;
      
      // Check altitude < 600m without parachute
      if (isSkydiverA && currentState.yA > 0 && currentState.yA < 600 && !currentState.parachuteDeployedA) {
        failed = true;
      }
      
      if (failed && toggles.crashAlert) {
        if (!failMessage) soundEngine.playAlert();
        engine.pause();
        setFailMessage('Acho que o seu paraquedista quis virar um mergulhador, mas sem água!😅 Tente novamente e acione o paraquedas a tempo');
      }
    }
  }, [engine.currentState, engine.isRunning, config.simulationMode, config.environmentId, engine.objectA, engine.objectB, engine.env, toggles.crashAlert, failMessage]);

  useEffect(() => {
    // Reset refs when resetting simulation
    if (!engine.isRunning && !engine.isFinished && engine.time === 0) {
       prevDeployedA.current = false;
       prevDeployedB.current = false;
       prevDeployedAForCrash.current = false;
       prevDeployedBForCrash.current = false;
       prevYA.current = engine.currentState.yA;
       prevYB.current = engine.currentState.yB;
       prevVA.current = 0;
       prevVB.current = 0;
       if (config.simulationMode === 'paraquedas' && config.objectAId === 'et' && toggles.sound) {
         soundEngine.playOvni();
       }
       if (config.simulationMode === 'paraquedas' && config.objectAId === 'astronaut' && toggles.sound) {
         soundEngine.playAstronautShip();
       }
       if (config.simulationMode === 'paraquedas' && config.objectAId === 'skydiver' && toggles.sound) {
         soundEngine.playAirplane();
       }
    }
  }, [engine.resetCount, engine.isRunning, engine.isFinished, engine.time, engine.currentState.yA, engine.currentState.yB]);

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

    const maxVA = engine.dataPoints.length > 0 ? Math.max(0, ...engine.dataPoints.map(dp => Math.abs(dp.vA))) : 0;
  const maxVB = engine.dataPoints.length > 0 ? Math.max(0, ...engine.dataPoints.map(dp => Math.abs(dp.vB))) : 0;

  return (
    <div className="h-[100dvh] flex flex-col bg-[#F4F1EB] text-slate-900 font-sans selection:bg-blue-200 relative overflow-hidden">
      
      {/* Header */}
      <header className={`bg-white shadow-sm z-[100] shrink-0 overflow-hidden relative transition-all duration-300 ease-in-out ${isHeaderVisible ? "border-b-[3px] border-slate-900 max-h-[500px] opacity-100" : "max-h-0 opacity-0 border-b-0 lg:max-h-[500px] lg:opacity-100 lg:border-b-[3px]"}`}>
        <div className="px-4 py-2.5 flex items-center justify-center min-h-16 h-auto overflow-visible">
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-4 w-full">
            
            <button type="button" 
              onClick={() => {
                const nextState = !toggles.sound;
                setToggles(prev => ({ ...prev, sound: nextState }));
                soundEngine.toggle(nextState);
              }}
              className={`flex shrink-0 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 ${toggles.sound ? 'bg-[#FF3366] text-slate-900' : 'bg-white text-slate-900'} rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all`}
            >
              {toggles.sound ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider hidden sm:inline">Som</span>
            </button>

            {/* Button Tutorial */}
            <button type="button" 
              onClick={() => setIsTutorialOpen(true)}
              className="flex shrink-0 items-center justify-center gap-1.5 sm:gap-2 px-1 sm:px-4 py-1.5 sm:py-2 bg-[#3b82f6] text-slate-900 rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider">Guia</span>
            </button>

            {/* Button Sobre */}
            <button type="button" 
              onClick={() => setIsAboutOpen(true)}
              className="flex shrink-0 items-center justify-center gap-1.5 sm:gap-2 px-1 sm:px-4 py-1.5 sm:py-2 bg-[#7C3AED] text-slate-900 rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all"
            >
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-900" /> 
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider text-slate-900">Sobre</span>
            </button>

            {/* Button 6: QR Code */}
            <button type="button" 
              onClick={() => setIsQrCodeOpen(true)}
              className="flex shrink-0 items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4 py-1.5 sm:py-2 bg-[#A855F7] text-slate-900 rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all"
            >
              <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider">QR Code</span>
            </button>

            {/* Button 2: Paraquedas */}
            <button type="button" 
              onClick={() => {
                engineLivre.pause();
                setSimulationMode('paraquedas');
              }}
              className={`flex shrink-0 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 ${simulationMode === 'paraquedas' ? 'bg-[#00C48C] text-slate-900' : 'bg-white text-slate-900'} rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all`}
            >
              <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider">Queda Livre</span>
            </button>

            {/* Button 1: Queda Livre */}
            <button
              onClick={() => {
                engineParaquedas.pause();
                setSimulationMode('livre');
              }}
              className={`flex shrink-0 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 ${simulationMode === 'livre' ? 'bg-[#00C48C] text-slate-900' : 'bg-white text-slate-900'} rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all`}
            >
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider">Queda Simultânea</span>
            </button>

            {/* Button 5: Configurar */}
            <button type="button" 
              onClick={() => setIsSettingsOpen(true)}
              className="flex shrink-0 items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4 py-1.5 sm:py-2 bg-[#FFB800] text-slate-900 rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all"
            >
              <Settings2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider">Configurar</span>
            </button>

          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-y-auto overflow-x-hidden lg:overflow-hidden">
        
        {/* Canvas Area (Takes max space) */}
        <div className="w-full lg:w-auto flex-1 shrink-0 lg:shrink md:p-0 flex flex-col relative min-h-full lg:min-h-0 min-w-0">
          <div className="flex-1 flex flex-col pointer-events-none sm:p-4">
            {/* We make SimulationCanvas accept full width/height of this wrapper */}
            <div className="w-full flex-1 pointer-events-auto flex relative sm:rounded-2xl sm:shadow-[6px_6px_0px_0px_#0f172a] border-b-[4px] border-slate-900 sm:border-[3px] overflow-hidden bg-white" onClick={(e) => { if (window.innerWidth < 1024 && (e.target as HTMLElement).tagName !== "BUTTON") setIsHeaderVisible(!isHeaderVisible); }}>
              
              {/* Mode Indicator */}
              <div className="absolute left-3 top-3 md:left-4 md:top-4 z-20 flex flex-col items-start gap-2 pointer-events-none">
                <div className="bg-white/95 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full border-[2px] border-slate-900 font-black text-[11px] sm:text-xs md:text-sm text-slate-800 shadow-[2px_2px_0px_0px_#0f172a] whitespace-nowrap">
                  {simulationMode === 'paraquedas' ? 'MODO: QUEDA LIVRE' : 'MODO: QUEDA SIMULTÂNEA'}
                </div>
                {toggles.showGravity && (
                  <div className="bg-white border-[2px] md:border-[3px] border-slate-900 rounded-xl px-2 py-1 sm:px-3 sm:py-1.5 shadow-[2px_2px_0px_0px_#0f172a] md:shadow-[4px_4px_0px_0px_#0f172a] flex flex-col items-center justify-center leading-none self-start">
                    <span className="text-[10px] sm:text-xs font-black uppercase text-slate-500">Gravidade</span>
                    <span className="text-sm sm:text-lg font-black text-slate-900 tabular-nums leading-none">
                      {engine.env.g.toFixed(2)} <span className="text-xs sm:text-sm font-bold ml-0.5 text-slate-700">m/s²</span>
                    </span>
                  </div>
                )}
              </div>
              <SimulationCanvas 
                height={config.height} 
                structureId={config.structureId}
                maxVA={maxVA}
                maxVB={maxVB}
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

                  if (nextEnvId === 'moon') {
                    nextObjectA = 'astronaut';
                    if (config.simulationMode === 'paraquedas') nextObjectB = 'astronaut';
                  } else if (nextEnvId === 'custom') {
                    nextObjectA = 'et';
                    if (config.simulationMode === 'paraquedas') nextObjectB = 'et';
                  } else if (nextEnvId === 'earth') {
                    nextObjectA = config.simulationMode === 'paraquedas' ? 'skydiver' : 'bowling';
                    if (config.simulationMode === 'paraquedas') nextObjectB = 'skydiver';
                  }

                  let nextEnableAirResistance = config.enableAirResistance;
                  if (nextEnvId === 'moon') {
                    nextEnableAirResistance = false;
                  } else if (config.environmentId === 'moon') {
                    nextEnableAirResistance = true;
                  }

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
            <div className="mt-2 sm:mt-4 mb-4 sm:mb-0 mx-2 sm:mx-0 w-auto self-stretch sm:self-auto z-50 pointer-events-auto bg-white p-1.5 sm:p-3 rounded-2xl sm:rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] sm:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] sm:border-[3px] border-slate-900 flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 shrink-0">
              <button type="button" 
                onClick={() => {
                  if (engine.isRunning) {
                    engine.pause();
                  } else {
                    soundEngine.init(); 
                    engine.start();
                  }
                }}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-1.5 py-1.5 sm:px-2 md:px-4 sm:py-2 ${engine.isRunning ? 'bg-[#FFB800] hover:bg-[#e6a600]' : 'bg-[#00C48C] hover:bg-[#00a877]'} disabled:bg-slate-200 disabled:text-slate-400 text-slate-900 font-black rounded-xl border-[2px] sm:border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] sm:shadow-[4px_4px_0px_0px_#0f172a] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_#0f172a] disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_#0f172a] sm:disabled:hover:shadow-[4px_4px_0px_0px_#0f172a] disabled:cursor-not-allowed transition-all text-[10px] sm:text-sm md:text-base`}
              >
                {engine.isRunning ? (
                  <><Square className="w-3 h-3 sm:w-4 sm:h-4 fill-current" /> <span>PAUSAR</span></>
                ) : (
                  <><Play className="w-3 h-3 sm:w-4 sm:h-4 fill-current" /> <span>INICIAR</span></>
                )}
              </button>
              {config.simulationMode === 'paraquedas' && config.objectAId === 'skydiver' && (
                <button type="button" 
                  onClick={engine.deployParachute}
                  disabled={!engine.isRunning || engine.currentState.parachuteDeployedA || engine.isFinished}
                  className={`flex items-center justify-center gap-1 sm:gap-2 px-1.5 py-1.5 sm:px-2 md:px-4 sm:py-2 hover:bg-[#e62e5c] disabled:bg-slate-200 disabled:text-slate-400 text-slate-900 font-black rounded-xl border-[2px] sm:border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] sm:shadow-[4px_4px_0px_0px_#0f172a] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_#0f172a] disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_#0f172a] sm:disabled:hover:shadow-[4px_4px_0px_0px_#0f172a] disabled:cursor-not-allowed transition-all text-[10px] sm:text-sm md:text-base ${(engine.currentState.yA <= config.height * 0.5 && engine.currentState.yA > config.height * 0.15 && !engine.currentState.parachuteDeployedA && engine.isRunning) ? 'bg-red-600 animate-alert-blink' : 'bg-[#FF3366]'}`}
                >
                  <Wind className="w-3 h-3 sm:w-4 sm:h-4" /> <span>ABRIR</span>
                </button>
              )}
              <button type="button" 
                onClick={engine.reset}
                className="flex items-center justify-center gap-1 sm:gap-2 px-1.5 py-1.5 sm:px-2 md:px-4 sm:py-2 bg-white hover:bg-slate-50 disabled:bg-slate-200 disabled:text-slate-400 text-slate-900 font-black rounded-xl border-[2px] sm:border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] sm:shadow-[4px_4px_0px_0px_#0f172a] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_#0f172a] disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_#0f172a] sm:disabled:hover:shadow-[4px_4px_0px_0px_#0f172a] disabled:cursor-not-allowed transition-all text-[10px] sm:text-sm md:text-base"
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" /> <span>RESET</span>
              </button>
              
              <div className={`w-full sm:w-auto sm:ml-auto mt-0.5 sm:mt-0 flex items-center justify-center bg-[#F4F1EB] px-2 sm:px-4 py-1.5 sm:py-2 border-[2px] sm:border-[3px] border-slate-900 rounded-lg shadow-[2px_2px_0px_0px_#0f172a] text-slate-900 font-mono font-black text-xs sm:text-sm`}>
                Tempo: {engine.time.toFixed(2)}s
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Data Panels (Optional Sidebar) */}
        {(toggles.graphs || toggles.table) && (
          <div className="w-full lg:w-[350px] xl:w-[400px] shrink-0 lg:flex-none p-4 flex flex-col gap-6 overflow-visible lg:overflow-y-auto border-t-[3px] lg:border-t-0 lg:border-l-[3px] border-slate-900 bg-[#F4F1EB] z-20">
                        {toggles.graphs && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex-1 min-h-[300px]">
                <ChartsArea data={engine.dataPoints} simulationMode={simulationMode} />
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

      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} simulationMode={simulationMode} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <SettingsDrawer 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        config={config} 
        setConfig={setConfig} 
        toggles={toggles} 
        setToggles={setToggles} 
        disabled={engine.isRunning} 
        customObjects={customObjects}
        setCustomObjects={setCustomObjects}
        customEnvs={customEnvs}
        setCustomEnvs={setCustomEnvs}
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
      <FailModal 
        isOpen={!!failMessage} 
        message={failMessage} 
        onRestart={() => {
          setFailMessage(null);
          engine.reset();
        }} 
      />
    </div>
  );
}

