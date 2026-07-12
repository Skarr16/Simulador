import React, { useState, useEffect } from 'react';
import { Info, X } from 'lucide-react';
import { PhysicsObject, Environment } from '../types';

interface SimulationCanvasProps {
  height: number;
  structureId?: string;
  resetCount: number;
  yA: number;
  yB: number;
  vA: number;
  vB: number;
  FdA: number;
  FdB: number;
  objectA: PhysicsObject;
  objectB: PhysicsObject;
  env: Environment;
  showVectors: boolean;
  showHeights?: boolean;
  devMode?: boolean;
  parachuteDeployedA?: boolean;
  parachuteDeployedB?: boolean;
  simulationMode?: string;
  onToggleEnv?: () => void;
}

export function SimulationCanvas({ 
  height, structureId, resetCount, yA, yB, vA, vB, FdA, FdB, objectA, objectB, env, showVectors, showHeights, devMode, parachuteDeployedA, parachuteDeployedB, simulationMode, onToggleEnv 
}: SimulationCanvasProps) {

  const [scaleFactor, setScaleFactor] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const [devOffsets, setDevOffsets] = useState<Record<string, {left: number, bottom: number, width: number, height: number}>>({});
  
  const mobileOffsets: Record<string, {left: number, bottom: number, width: number, height: number}> = {
    pisa: { left: -19, bottom: -20, width: 97, height: 110 },
    eiffel: { left: -15, bottom: -22, width: 88, height: 108 },
    cristo: { left: -21, bottom: -20, width: 100, height: 98 },
    gize: { left: -50, bottom: -26, width: 144, height: 120 }
  };

  const desktopOffsets: Record<string, {left: number, bottom: number, width: number, height: number}> = {
    pisa: { left: -29, bottom: -21, width: 88, height: 107 },
    eiffel: { left: -6, bottom: -20, width: 40, height: 100 },
    cristo: { left: -2, bottom: -22, width: 40, height: 107 },
    gize: { left: -1, bottom: -28, width: 46, height: 108 }
  };

  const groundOffset = 10; 
  const canvasHeightPercent = 55; 
  
  const yAPercent = groundOffset + (yA / Math.max(height, 1)) * canvasHeightPercent;
  const yBPercent = groundOffset + (yB / Math.max(height, 1)) * canvasHeightPercent;
  const isFallingA = yA > 0 && yA < height;
  const isFallingB = yB > 0 && yB < height;
  const isFalling = isFallingA || isFallingB;

  const [planeArrived, setPlaneArrived] = useState(false);

  useEffect(() => {
    if (simulationMode === 'paraquedas') {
      if (yA >= height) {
        setPlaneArrived(false);
        const timer = setTimeout(() => setPlaneArrived(true), 1800);
        return () => clearTimeout(timer);
      }
    } else {
      setPlaneArrived(true);
    }
  }, [simulationMode, yA, height, resetCount]);

  const currentOffset = structureId && structureId !== 'custom'
    ? (devOffsets[structureId] || (isMobile ? mobileOffsets[structureId] : desktopOffsets[structureId]) || { left: 20, bottom: 10, width: 40, height: 85 })
    : { left: 20, bottom: 10, width: 40, height: 85 };

  const updateOffset = (key: 'left' | 'bottom' | 'width' | 'height', value: number) => {
    if (structureId && structureId !== 'custom') {
      const base = isMobile ? mobileOffsets[structureId] : desktopOffsets[structureId];
      setDevOffsets(prev => ({
        ...prev,
        [structureId]: {
          ...(prev[structureId] || base),
          [key]: value
        }
      }));
    }
  };

  useEffect(() => {
    const updateScale = () => {
       const width = window.innerWidth;
       const height = window.innerHeight;
       // Limit scale factor so objects don't overflow the top of the container
       const baseScale = Math.min(width / 800, height / 800);
       const newScale = Math.max(0.4, Math.min(1.0, baseScale));
       setScaleFactor(newScale);
    };
    window.addEventListener('resize', updateScale);
    updateScale();
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const getStructureName = (id: string) => {
    switch(id) {
      case 'pisa': return 'Torre de Pisa';
      case 'eiffel': return 'Torre Eiffel';
      case 'cristo': return 'Cristo Redentor';
      case 'gize': return 'Pirâmide de Gizé';
      default: return '';
    }
  }

  const maxVelAllowed = Math.sqrt(2 * 9.81 * 100); 
  const getVelScale = (v: number) => (v / maxVelAllowed) * 60; 
  
  const P_A = objectA.mass * env.g;
  const P_B = objectB.mass * env.g;

  return (
    <div className={`relative w-full flex-1 h-full min-h-0 overflow-hidden font-sans ${env.id === 'moon' ? 'bg-[#1a1a2e]' : 'bg-[#F4F1EB]'}`}>
      
      {/* Decorative Vector Elements */}
      {env.id === 'earth' && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <circle cx="10%" cy="15%" r="8" stroke="#0f172a" strokeWidth="3" fill="none" />
          <circle cx="85%" cy="30%" r="5" stroke="#0f172a" strokeWidth="3" fill="#FF3366" />
          <circle cx="20%" cy="80%" r="12" stroke="#0f172a" strokeWidth="3" fill="#FFB800" />
          <path d="M 80% 75% Q 85% 70% 90% 75% T 100% 75%" stroke="#0055FF" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 5% 55% L 10% 50% L 15% 58% Z" stroke="#0f172a" strokeWidth="3" fill="#00C48C" strokeLinejoin="round" />
        </svg>
      )}

      {env.id === 'earth' && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#87CEEB]">
           {/* Sun */}
           <div className="absolute top-12 right-16 w-24 h-24 bg-[#FFD700] rounded-full shadow-[0_0_40px_10px_rgba(255,215,0,0.4)]"></div>
           {/* Clouds */}
           <svg className="absolute top-20 left-[10%] w-32 h-16 opacity-90" viewBox="0 0 100 50">
              <path d="M 25 40 A 15 15 0 0 1 25 10 A 20 20 0 0 1 65 10 A 15 15 0 0 1 85 20 A 15 15 0 0 1 80 40 Z" fill="white"/>
           </svg>
           <svg className="absolute top-12 left-[50%] w-48 h-24 opacity-80" viewBox="0 0 100 50">
              <path d="M 25 40 A 15 15 0 0 1 25 10 A 20 20 0 0 1 65 10 A 15 15 0 0 1 85 20 A 15 15 0 0 1 80 40 Z" fill="white"/>
           </svg>
           <svg className="absolute top-32 left-[70%] w-24 h-12 opacity-70" viewBox="0 0 100 50">
              <path d="M 25 40 A 15 15 0 0 1 25 10 A 20 20 0 0 1 65 10 A 15 15 0 0 1 85 20 A 15 15 0 0 1 80 40 Z" fill="white"/>
           </svg>
        </div>
      )}

      {env.id === 'moon' && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
          <circle cx="10%" cy="15%" r="2" fill="white" />
          <circle cx="85%" cy="30%" r="3" fill="white" />
          <circle cx="20%" cy="50%" r="1" fill="white" />
          <circle cx="70%" cy="70%" r="2" fill="white" />
          <circle cx="30%" cy="20%" r="4" fill="#cbd5e1" opacity="0.5" />
          <circle cx="80%" cy="10%" r="2" fill="#cbd5e1" opacity="0.8" />
        </svg>
      )}

      {/* Height Indicator */}
      <div className={`absolute left-0 top-0 bottom-0 w-24 z-40 ${env.id === 'moon' ? 'text-white' : 'text-slate-900'}`}>
        <div className={`absolute left-4 sm:left-6 top-[10%] bottom-[10%] border-l-[3px] ${env.id === 'moon' ? 'border-white' : 'border-slate-900'}`}></div>
        {Array.from({ length: 11 }).map((_, i) => {
          const percent = i * 10;
          const val = (height * percent / 100).toFixed(1);
          const bottomPercent = 10 + percent * 0.55;
          const isMajor = i % 2 === 0;
          return (
            <div key={i} className="absolute flex items-center left-4 sm:left-6 translate-y-1/2" style={{ bottom: `${bottomPercent}%` }}>
              <div className={`h-[3px] ${env.id === 'moon' ? 'bg-white' : 'bg-slate-900'} ${isMajor ? 'w-4 sm:w-6' : 'w-2 sm:w-3'}`}></div>
              {isMajor && (
                <span className={`px-1.5 py-0.5 ml-1 sm:ml-2 border-[3px] rounded-md text-xs sm:text-sm font-black shadow-sm ${env.id === 'moon' ? 'bg-[#1a1a2e] border-white' : 'bg-[#F4F1EB] border-slate-900'}`}>
                  {val}m
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Ground */}
      <div className={`absolute bottom-0 left-0 right-0 h-[10%] border-t-[3px] border-slate-900 z-30 flex items-center justify-center ${env.id === 'moon' ? 'bg-[#64748b]' : 'bg-[#00C48C]'}`}>
        <button 
          onClick={onToggleEnv}
          className="text-slate-900 font-black text-sm uppercase tracking-widest bg-white/80 px-4 py-1 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:bg-white active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#0f172a] transition-all z-10"
        >
          {env.id === 'earth' ? 'Terra' : env.name}
        </button>
        {env.id === 'moon' && (
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[30%] left-[15%] w-16 h-6 rounded-[50%] bg-[#475569] shadow-[inset_0_4px_6px_rgba(0,0,0,0.6),0_1px_2px_rgba(255,255,255,0.2)]"></div>
            <div className="absolute top-[60%] left-[75%] w-20 h-8 rounded-[50%] bg-[#475569] shadow-[inset_0_4px_6px_rgba(0,0,0,0.6),0_1px_2px_rgba(255,255,255,0.2)]"></div>
            <div className="absolute top-[40%] left-[45%] w-12 h-5 rounded-[50%] bg-[#475569] shadow-[inset_0_3px_5px_rgba(0,0,0,0.6),0_1px_2px_rgba(255,255,255,0.2)]"></div>
            <div className="absolute top-[20%] left-[85%] w-10 h-4 rounded-[50%] bg-[#475569] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_1px_2px_rgba(255,255,255,0.2)]"></div>
            <div className="absolute top-[70%] left-[5%] w-14 h-5 rounded-[50%] bg-[#475569] shadow-[inset_0_3px_5px_rgba(0,0,0,0.6),0_1px_2px_rgba(255,255,255,0.2)]"></div>
          </div>
        )}
      </div>

      {/* Dev Structure Offset Tweak Panel */}
      {devMode && structureId && structureId !== 'custom' && (
        <div className="absolute top-4 right-4 bg-white/90 p-4 border-2 border-slate-900 rounded-lg shadow-lg z-[100] flex flex-col gap-2 w-64 pointer-events-auto text-xs font-mono font-black text-slate-900">
          <div className="mb-2 text-sm text-center">Ajuste de Imagem ({structureId})</div>
          <label className="flex flex-col gap-1">Left ({currentOffset.left}%)<input type="range" min="-50" max="100" value={currentOffset.left} onChange={(e) => updateOffset('left', Number(e.target.value))} /></label>
          <label className="flex flex-col gap-1">Bottom ({currentOffset.bottom}%)<input type="range" min="-50" max="100" value={currentOffset.bottom} onChange={(e) => updateOffset('bottom', Number(e.target.value))} /></label>
          <label className="flex flex-col gap-1">Max-Width ({currentOffset.width}%)<input type="range" min="10" max="200" value={currentOffset.width} onChange={(e) => updateOffset('width', Number(e.target.value))} /></label>
          <label className="flex flex-col gap-1">Height ({currentOffset.height}%)<input type="range" min="10" max="200" value={currentOffset.height} onChange={(e) => updateOffset('height', Number(e.target.value))} /></label>
        </div>
      )}

      {/* Structures */}
      {structureId !== 'custom' && (
        <div 
          className="absolute z-0 flex flex-col items-center justify-end pointer-events-none"
          style={{ bottom: `${currentOffset.bottom}%`, left: `${currentOffset.left}%`, width: `${currentOffset.width}%`, height: `${currentOffset.height}%` }}
        >
          
          {structureId === 'pisa' && (
             <img src="/queda livre/torre de pisa.png" alt="Torre de Pisa" className="w-full h-full object-contain mix-blend-multiply" />
          )}

          {structureId === 'eiffel' && (
             <img src="/queda livre/torre effel.png" alt="Torre Eiffel" className="w-full h-full object-contain mix-blend-multiply" />
          )}

          {structureId === 'cristo' && (
             <img src="/queda livre/cristo redentor.png" alt="Cristo Redentor" className="w-full h-full object-contain mix-blend-multiply" />
          )}

          {structureId === 'gize' && (
             <img src="/queda livre/piramide de gize.png" alt="Pirâmide de Gizé" className="w-full h-full object-contain mix-blend-multiply" />
          )}

          <div className="bg-white/90 px-3 py-1 rounded-full border-2 border-slate-900 mt-2 font-black text-xs text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] whitespace-nowrap">
            {getStructureName(structureId)}
          </div>
        </div>
      )}

      {/* Object Visual Renderer */}
      {(() => {
        const renderObject = (obj: PhysicsObject, letter: string, isFalling: boolean, parachuteDeployed?: boolean) => {
          let content = null;
          if (obj.id === 'bowling') {
             content = (
               <div className="w-full h-full rounded-full border-[3px] border-slate-900 bg-slate-800 relative overflow-hidden flex items-center justify-center shadow-inner">
                  <div className="absolute top-1/4 left-1/4 w-1/5 h-1/5 bg-white/20 rounded-full"></div>
                  <div className="absolute top-[20%] right-[30%] w-[15%] h-[15%] bg-slate-900 rounded-full"></div>
                  <div className="absolute top-[40%] right-[20%] w-[15%] h-[15%] bg-slate-900 rounded-full"></div>
                  <div className="absolute top-[40%] right-[45%] w-[15%] h-[15%] bg-slate-900 rounded-full"></div>
                  <span className="text-white font-black text-xs z-10 mt-6">{letter}</span>
               </div>
             );
          } else if (obj.id === 'soccer') {
             content = (
               <div className="w-full h-full rounded-full border-[3px] border-slate-900 bg-white relative overflow-hidden flex items-center justify-center">
                  {/* Simplistic soccer pattern */}
                  <div className="absolute w-[40%] h-[40%] bg-slate-900 rounded-sm rotate-45 top-[30%] left-[30%]"></div>
                  <div className="absolute w-[30%] h-[30%] bg-slate-900 rounded-sm -rotate-12 -top-[10%] left-[10%]"></div>
                  <div className="absolute w-[30%] h-[30%] bg-slate-900 rounded-sm 12 bottom-[0%] right-[10%]"></div>
                  <span className="text-slate-100 font-black text-xs z-10 mix-blend-difference">{letter}</span>
               </div>
             );
          } else if (obj.id === 'golf') {
             content = (
               <div className="w-full h-full rounded-full border-[3px] border-slate-900 bg-white relative overflow-hidden flex items-center justify-center shadow-inner">
                  <div className="w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
                  <span className="text-slate-900 font-black text-[10px] z-10 absolute">{letter}</span>
               </div>
             );
          } else if (obj.id === 'pingpong') {
             content = (
               <div className="w-full h-full rounded-full border-[3px] border-slate-900 bg-orange-500 relative flex items-center justify-center shadow-inner">
                  <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-white/40 rounded-full"></div>
                  <span className="text-white font-black text-[10px] z-10 absolute">{letter}</span>
               </div>
             );
          } else if (obj.id === 'paper_crumpled') {
             content = (
               <div className="w-full h-full rounded-full border-[3px] border-slate-900 bg-slate-200 relative flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 100 100">
                     <path d="M 20 20 L 40 10 L 60 30 L 80 20 L 90 50 L 70 80 L 40 90 L 10 70 Z" fill="none" stroke="#0f172a" strokeWidth="4" />
                     <path d="M 30 30 L 50 60 L 70 40" fill="none" stroke="#0f172a" strokeWidth="2" />
                  </svg>
                  <span className="text-slate-900 font-black text-[10px] z-10">{letter}</span>
               </div>
             );
          } else if (obj.id === 'paper_flat') {
             content = (
               <div className={`w-[200%] h-[25%] rounded-sm border-[3px] border-slate-900 bg-white relative flex items-center justify-center shadow-sm ${isFalling ? 'animate-[wiggle_0.5s_ease-in-out_infinite]' : ''}`}>
                  <div className="absolute top-1 left-1 right-1 h-1 bg-red-400 opacity-50"></div>
                  <div className="w-full h-full flex justify-evenly px-1 opacity-20">
                     <div className="h-full w-[1px] bg-blue-500"></div>
                     <div className="h-full w-[1px] bg-blue-500"></div>
                     <div className="h-full w-[1px] bg-blue-500"></div>
                  </div>
                  <span className="text-slate-900 font-black text-xs z-10 absolute">{letter}</span>
               </div>
             );
          } else if (obj.id === 'book') {
             content = (
               <div className={`w-[200%] h-[35%] rounded-sm border-[3px] border-slate-900 bg-red-700 relative flex items-center justify-center shadow-md ${isFalling ? '-rotate-12' : ''}`}>
                  <div className="absolute top-0 left-0 right-0 h-2 bg-red-900 border-b-[3px] border-slate-900"></div>
                  <div className="absolute bottom-1 left-1 right-1 h-1 bg-white border-t-[1px] border-slate-400"></div>
                  <span className="text-white font-black text-xs z-10 absolute mt-2">{letter}</span>
               </div>
             );
          } else if (obj.id === 'feather') {
             content = (
               <div className={`w-full h-full relative flex items-center justify-center ${isFalling ? 'animate-[float_2s_ease-in-out_infinite]' : ''}`}>
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                     <path d="M 50 90 Q 50 50 50 10" fill="none" stroke="#0f172a" strokeWidth="4" />
                     <path d="M 50 10 C 70 20 80 40 50 80 C 20 40 30 20 50 10" fill="#fcd34d" stroke="#0f172a" strokeWidth="3" />
                     <path d="M 50 20 L 65 15 M 50 30 L 70 25 M 50 40 L 65 35 M 50 50 L 60 47.5 M 50 25 L 35 20 M 50 35 L 30 30 M 50 45 L 35 42.5" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="text-slate-900 font-black text-[10px] z-10 absolute mt-4">{letter}</span>
               </div>
             );
          } else if (obj.id === 'skydiver') {
             const currentY = letter === 'A' ? yA : yB;
             let imgSrc = "/paraquedas/boneco caindo (1).png";
             let transformClass = "translate-y-0 scale-[1.3] md:scale-[1.15] lg:scale-[1.15] origin-bottom"; // Falling without parachute
             if (currentY <= 0) {
                imgSrc = "/paraquedas/boneco no chao.png";
                transformClass = "translate-y-0 scale-[1.3] md:scale-[1.15] lg:scale-[1.15] origin-bottom"; // Standing on ground
             } else if (parachuteDeployed) {
                imgSrc = "/paraquedas/boneco caindo com paraquedas (1).png";
                transformClass = "translate-y-0 scale-[1.3] md:scale-[1.15] lg:scale-[1.15] origin-bottom"; // Falling with parachute
             }
             content = (
               <div className={`w-full h-full relative flex items-center justify-center drop-shadow-md ${parachuteDeployed && isFalling ? 'animate-[float_2s_ease-in-out_infinite]' : ''} ${transformClass}`}>
                  <img src={imgSrc} className="w-full h-full object-contain object-bottom" />
               </div>
             );
          } else if (obj.id === 'astronaut') {
             const currentY = letter === 'A' ? yA : yB;
             let transformClass = "translate-y-0 scale-[1.3] md:scale-[1.15] lg:scale-[1.15] origin-bottom";
             content = (
               <div className={`w-full h-full relative flex items-center justify-center drop-shadow-md ${transformClass}`}>
                  <img src={(currentY <= 0) ? "/astronalta/astronalta no chão.png" : "/astronalta/astronalta caindo.png"} className="w-full h-full object-contain object-bottom" />
               </div>
             );
          } else {
             // Fallback
             content = (
               <div className="w-full h-full rounded-full border-[3px] border-slate-900 flex items-center justify-center text-white font-black text-sm" style={{ backgroundColor: obj.color }}>
                 {letter}
               </div>
             );
          }

          const isObjA = letter === 'A';
          return (
             <div className="group relative w-full h-full cursor-help flex flex-col items-center justify-end">
               {content}
               {/* Tooltip */}
               <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-36 bg-slate-900 text-white text-xs p-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg border border-slate-700`}>
                 <div className="font-black border-b border-slate-700 pb-1 mb-1">{obj.name}</div>
                 <div>Massa: {obj.mass} kg</div>
                 <div>Área: {parachuteDeployed && obj.id === 'skydiver' ? (obj.area + 5).toFixed(2) : obj.area} m²</div>
                 <div>Cd: {parachuteDeployed && obj.id === 'skydiver' ? '1.75' : obj.cd}</div>
                 <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900`}></div>
               </div>
             </div>
          );
        };

        return (
          <>
            {/* Airplane/Spaceship for Parachute Mode */}
            {simulationMode === 'paraquedas' && (
              <div 
                key={`${resetCount}-${yA >= height ? 'reset' : 'flying'}`}
                className={`absolute z-10 flex items-center justify-center transition-all ${
                  yA >= height ? 'animate-[flyIn_2s_ease-out_forwards]' : 
                  yA <= 0 ? 'hidden' : 
                  'animate-[flyAway_3s_ease-in_forwards]'
                } ${
                  objectA.id === 'astronaut' 
                    ? 'w-[160px] h-[65px] md:w-[220px] md:h-[90px]' 
                    : 'w-[200px] h-[80px] md:w-[280px] md:h-[110px] lg:w-[350px] lg:h-[140px]'
                }`}
                style={{ bottom: `${groundOffset + canvasHeightPercent + 15}%`, left: '50%' }}
              >
                {objectA.id === 'astronaut' ? (
                  <>
                    <img src="/astronalta/chama da nave.png" alt="Chama" className="absolute -left-12 md:-left-24 top-1/2 -translate-y-1/2 w-20 md:w-36 h-14 md:h-24 object-contain drop-shadow-xl z-0 animate-pulse" />
                    <img src="/astronalta/nave.png" alt="Nave" className="w-full h-full object-contain drop-shadow-xl z-10" />
                  </>
                ) : (
                  <>
                    {/* Wind trail */}
                    <div className="absolute -left-10 md:-left-20 top-1/2 flex space-x-2 opacity-80 scale-75 md:scale-100 origin-right">
                       <div className="h-1 w-12 bg-white/80 rounded-full animate-pulse"></div>
                       <div className="h-1 w-20 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '100ms' }}></div>
                       <div className="h-1 w-8 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <img src="/paraquedas/aviao(1).png" alt="Avião" className="w-full h-full object-contain drop-shadow-xl z-10" />
                  </>
                )}
              </div>
            )}

            {/* Falling Object A (Left) */}
            {(() => {
              const multiplierA = simulationMode === 'paraquedas' ? 1.0 : 1.0;
              return (
                <div 
                  className={`absolute flex flex-col items-center justify-end z-[50] ${devMode ? 'border-2 border-dashed border-red-500 bg-red-500/20' : ''} ${yA >= height && simulationMode === 'paraquedas' && !planeArrived ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
                  style={{ bottom: `${yAPercent}%`, left: simulationMode === 'paraquedas' ? '50%' : '45%', transform: 'translateX(-50%)', width: objectA.radius * scaleFactor * multiplierA, height: objectA.radius * scaleFactor * multiplierA }}
                >
                  {showHeights && (
                    <div className="absolute right-full mr-2 sm:mr-4 top-1/2 -translate-y-1/2 bg-white/90 px-2 py-1 rounded-md border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] whitespace-nowrap z-50">
                      <span className="text-xs sm:text-sm font-black text-slate-900">{yA.toFixed(1)} m</span>
                    </div>
                  )}
                  {renderObject(objectA, 'A', isFallingA, parachuteDeployedA)}
                  {/* Vectors */}
                  {showVectors && yA > 0 && (
                    <>
                      {/* Top Vectors (Drag) */}
                      {FdA > 0 && (
                        <div className="absolute bottom-[100%] left-1/2 -translate-x-1/2 mb-1 flex flex-col items-center pointer-events-none z-30">
                           <span className="text-[10px] font-black bg-white/80 px-1 rounded mb-1 shadow-sm border border-slate-200 text-center whitespace-nowrap">Fa: {FdA.toFixed(1)} N</span>
                           <div className="w-1 sm:w-1.5 bg-[#FF3366] relative" style={{ height: 15 + Math.min(FdA, 50) }}>
                             <div className="absolute -top-[7px] sm:-top-2 left-1/2 -translate-x-1/2 border-l-[5px] sm:border-l-[8px] border-r-[5px] sm:border-r-[8px] border-b-[7px] sm:border-b-[10px] border-x-transparent border-b-[#FF3366]"></div>
                           </div>
                        </div>
                      )}
                      {/* Bottom Vectors (Velocity & Weight) */}
                      <div className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-1 flex flex-row gap-3 pointer-events-none z-30">
                        {vA > 0 && (
                            <div className="flex flex-col items-center text-[#0055FF]">
                                <div className="w-1 sm:w-1.5 bg-[#0055FF] relative" style={{ height: 15 + getVelScale(vA) }}>
                                    <div className="absolute -bottom-[7px] sm:-bottom-2 left-1/2 -translate-x-1/2 border-l-[5px] sm:border-l-[8px] border-r-[5px] sm:border-r-[8px] border-t-[7px] sm:border-t-[10px] border-x-transparent border-t-[#0055FF]"></div>
                                </div>
                                <span className="text-[10px] font-black bg-white/80 px-1 rounded mt-3 shadow-sm border border-slate-200 text-center whitespace-nowrap">v: {vA.toFixed(1)} m/s</span>
                            </div>
                        )}
                        <div className="flex flex-col items-center text-slate-900">
                           <div className="w-1 sm:w-1.5 bg-slate-900 relative" style={{ height: 15 + Math.min(P_A, 50) }}>
                             <div className="absolute -bottom-[7px] sm:-bottom-2 left-1/2 -translate-x-1/2 border-l-[5px] sm:border-l-[8px] border-r-[5px] sm:border-r-[8px] border-t-[7px] sm:border-t-[10px] border-x-transparent border-t-slate-900"></div>
                           </div>
                           <span className="text-[10px] font-black bg-white/80 px-1 rounded mt-3 shadow-sm border border-slate-200 text-center whitespace-nowrap">P: {P_A.toFixed(1)} N</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })()}

            {/* Falling Object B (Right) */}
            {simulationMode !== 'paraquedas' && (
            <div 
              className={`absolute flex flex-col items-center justify-end z-[50] ${devMode ? 'border-2 border-dashed border-red-500 bg-red-500/20' : ''}`}
              style={{ bottom: `${yBPercent}%`, left: '65%', transform: 'translateX(-50%)', width: objectB.radius * scaleFactor, height: objectB.radius * scaleFactor }}
            >
              {showHeights && (
                <div className="absolute left-full ml-2 sm:ml-4 top-1/2 -translate-y-1/2 bg-white/90 px-2 py-1 rounded-md border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] whitespace-nowrap z-50">
                  <span className="text-xs sm:text-sm font-black text-slate-900">{yB.toFixed(1)} m</span>
                </div>
              )}
              {renderObject(objectB, 'B', isFallingB, parachuteDeployedB)}
              {/* Vectors */}
              {showVectors && yB > 0 && (
                <>
                  {/* Top Vectors (Drag) */}
                  {FdB > 0 && (
                    <div className="absolute bottom-[100%] left-1/2 -translate-x-1/2 mb-1 flex flex-col items-center pointer-events-none z-30">
                       <span className="text-[10px] font-black bg-white/80 px-1 rounded mb-1 shadow-sm border border-slate-200 text-center whitespace-nowrap">Fa: {FdB.toFixed(1)} N</span>
                       <div className="w-1 sm:w-1.5 bg-[#FF3366] relative" style={{ height: 15 + Math.min(FdB, 50) }}>
                         <div className="absolute -top-[7px] sm:-top-2 left-1/2 -translate-x-1/2 border-l-[5px] sm:border-l-[8px] border-r-[5px] sm:border-r-[8px] border-b-[7px] sm:border-b-[10px] border-x-transparent border-b-[#FF3366]"></div>
                       </div>
                    </div>
                  )}
                  {/* Bottom Vectors (Velocity & Weight) */}
                  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-1 flex flex-row gap-3 pointer-events-none z-30">
                    {vB > 0 && (
                        <div className="flex flex-col items-center text-[#0055FF]">
                            <div className="w-1 sm:w-1.5 bg-[#0055FF] relative" style={{ height: 15 + getVelScale(vB) }}>
                                <div className="absolute -bottom-[7px] sm:-bottom-2 left-1/2 -translate-x-1/2 border-l-[5px] sm:border-l-[8px] border-r-[5px] sm:border-r-[8px] border-t-[7px] sm:border-t-[10px] border-x-transparent border-t-[#0055FF]"></div>
                            </div>
                            <span className="text-[10px] font-black bg-white/80 px-1 rounded mt-3 shadow-sm border border-slate-200 text-center whitespace-nowrap">v: {vB.toFixed(1)} m/s</span>
                        </div>
                    )}
                    <div className="flex flex-col items-center text-slate-900">
                       <div className="w-1 sm:w-1.5 bg-slate-900 relative" style={{ height: 15 + Math.min(P_B, 50) }}>
                         <div className="absolute -bottom-[7px] sm:-bottom-2 left-1/2 -translate-x-1/2 border-l-[5px] sm:border-l-[8px] border-r-[5px] sm:border-r-[8px] border-t-[7px] sm:border-t-[10px] border-x-transparent border-t-slate-900"></div>
                       </div>
                       <span className="text-[10px] font-black bg-white/80 px-1 rounded mt-3 shadow-sm border border-slate-200 text-center whitespace-nowrap">P: {P_B.toFixed(1)} N</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            )}
          </>
        );
      })()}      {simulationMode === 'paraquedas' && (
        <>
          {/* Info Toggle */}
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="absolute top-4 right-4 z-[70] bg-white p-2 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]"
          >
            {showInfo ? <X className="w-5 h-5" /> : <Info className="w-5 h-5" />}
          </button>
          
          <div className={`absolute top-16 left-4 right-4 sm:top-16 sm:left-auto sm:right-4 bg-white/90 sm:bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-xl border-[2px] sm:border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] z-[60] sm:w-[380px] max-h-[calc(90%-4rem)] overflow-y-auto transition-opacity ${showInfo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <h3 className="font-black text-sm sm:text-lg uppercase mb-3 sm:mb-4 border-b-2 border-slate-900 pb-2 sm:pb-2 flex items-center justify-between">
            <span>Dados da Simulação</span>
            {isFallingA && <span className="flex h-2 w-2 sm:h-3 sm:w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-red-500"></span></span>}
          </h3>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-5">
             <div className="bg-slate-100 p-2 sm:p-3 rounded-lg border border-slate-200 shadow-inner flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
               <div className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 mb-0.5 sm:mb-1">Velocidade (v)</div>
               <div className="font-black text-sm sm:text-2xl text-[#0055FF] tabular-nums tracking-tighter">{vA.toFixed(1)} <span className="text-[10px] sm:text-base">m/s</span></div>
             </div>
             <div className="bg-slate-100 p-2 sm:p-3 rounded-lg border border-slate-200 shadow-inner flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
               <div className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 mb-0.5 sm:mb-1">Arrasto (Fa)</div>
               <div className="font-black text-sm sm:text-2xl text-[#FF3366] tabular-nums tracking-tighter">{FdA.toFixed(1)} <span className="text-[10px] sm:text-base">N</span></div>
             </div>
             <div className="bg-slate-100 p-2 sm:p-3 rounded-lg border border-slate-200 shadow-inner flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
               <div className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 mb-0.5 sm:mb-1">Peso (P)</div>
               <div className="font-black text-sm sm:text-2xl text-slate-900 tabular-nums tracking-tighter">{P_A.toFixed(1)} <span className="text-[10px] sm:text-base">N</span></div>
             </div>
             <div className="bg-slate-100 p-2 sm:p-3 rounded-lg border border-slate-200 shadow-inner flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
               <div className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 mb-0.5 sm:mb-1">Altura (y)</div>
               <div className="font-black text-sm sm:text-2xl text-green-600 tabular-nums tracking-tighter">{yA.toFixed(1)} <span className="text-[10px] sm:text-base">m</span></div>
             </div>
          </div>

          <div className="border-t-2 border-slate-100 pt-4">
             <h4 className="font-bold text-sm uppercase mb-3 text-slate-700">Parâmetros</h4>
             <div className="font-sans text-sm sm:text-2xl font-black tracking-wider mb-4 bg-slate-900 text-green-400 p-3 sm:p-4 rounded-xl whitespace-nowrap overflow-x-auto text-center shadow-inner border border-slate-700">
               F<sub>a</sub> = &frac12; &middot; &rho; &middot; v&sup2; &middot; C<sub>d</sub> &middot; A
             </div>
             <ul className="text-xs space-y-2 text-slate-700 font-medium">
               <li className="flex justify-between items-center border-b border-slate-100 pb-1"><span><strong className="text-slate-900 text-sm">&rho;</strong> (Densidade do ar)</span> <span>{env.rho} kg/m&sup3;</span></li>
               <li className="flex justify-between items-center border-b border-slate-100 pb-1"><span><strong className="text-slate-900 text-sm">C<sub>d</sub></strong> (Coef. de arrasto)</span> <span>{parachuteDeployedA ? '1.75' : objectA.cd}</span></li>
               <li className="flex justify-between items-center border-b border-slate-100 pb-1"><span><strong className="text-slate-900 text-sm">A</strong> (Área de seção)</span> <span>{parachuteDeployedA ? (objectA.area + 5).toFixed(2) : objectA.area} m&sup2;</span></li>
               <li className="flex justify-between items-center"><span><strong className="text-slate-900 text-sm">m</strong> (Massa)</span> <span>{objectA.mass} kg</span></li>
             </ul>
          </div>
        </div>
        </>
      )}

      <style>{`
        @keyframes flyIn {
          0% { transform: translateX(-150vw); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateX(-50%); opacity: 1; }
        }
        @keyframes flyAway {
          0% { transform: translateX(-50%); opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
        @keyframes hoverPlane {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-10deg) translateX(-5px); }
          50% { transform: rotate(10deg) translateX(5px); }
        }
        @keyframes float {
          0%, 100% { transform: rotate(-5deg) translateX(-10px) translateY(0); }
          50% { transform: rotate(15deg) translateX(10px) translateY(-5px); }
        }
      `}</style>
    </div>
  );
}