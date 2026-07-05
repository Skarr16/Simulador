import React from 'react';
import { PhysicsObject, Environment } from '../types';

interface SimulationCanvasProps {
  height: number;
  structureId?: string;
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
}

export function SimulationCanvas({ 
  height, structureId, yA, yB, vA, vB, FdA, FdB, objectA, objectB, env, showVectors 
}: SimulationCanvasProps) {
  const groundOffset = 10; 
  const canvasHeightPercent = 80; 
  
  const yAPercent = groundOffset + (yA / Math.max(height, 1)) * canvasHeightPercent;
  const yBPercent = groundOffset + (yB / Math.max(height, 1)) * canvasHeightPercent;
  const isFallingA = yA < height;
  const isFallingB = yB < height;
  const isFalling = isFallingA || isFallingB;

  const maxVelAllowed = Math.sqrt(2 * 9.81 * 100); 
  const getVelScale = (v: number) => (v / maxVelAllowed) * 60; 
  
  const P_A = objectA.mass * env.g;
  const P_B = objectB.mass * env.g;

  return (
    <div className={`relative w-full flex-1 h-full min-h-[500px] overflow-hidden font-sans ${env.id === 'moon' ? 'bg-[#1a1a2e]' : 'bg-[#F4F1EB]'}`}>
      
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
      <div className={`absolute left-4 top-8 bottom-[10%] flex flex-col justify-between items-start text-sm font-black border-l-[3px] pl-3 py-4 z-10 ${env.id === 'moon' ? 'text-white border-white' : 'text-slate-900 border-slate-900'}`}>
        {Array.from({ length: 11 }).map((_, i) => {
          const val = Math.round(height * (10 - i) / 10);
          return (
            <span key={i} className={`px-1 -ml-1 border-[3px] rounded-md text-[10px] ${env.id === 'moon' ? 'bg-[#1a1a2e] border-white' : 'bg-[#F4F1EB] border-slate-900'}`}>
              {val}m
            </span>
          );
        })}
      </div>

      {/* Ground */}
      <div className={`absolute bottom-0 left-0 right-0 h-[10%] border-t-[3px] border-slate-900 z-30 flex items-center justify-center ${env.id === 'moon' ? 'bg-[#475569]' : 'bg-[#00C48C]'}`}>
        <div className="text-slate-900 font-black text-sm uppercase tracking-widest bg-white/80 px-4 py-1 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
          {env.id === 'moon' ? 'Superfície Lunar' : 'Solo'}
        </div>
        {env.id === 'moon' && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <ellipse cx="20%" cy="50%" rx="30" ry="10" stroke="#0f172a" strokeWidth="2" fill="none" />
            <ellipse cx="80%" cy="60%" rx="40" ry="12" stroke="#0f172a" strokeWidth="2" fill="none" />
            <ellipse cx="50%" cy="40%" rx="20" ry="8" stroke="#0f172a" strokeWidth="2" fill="none" />
          </svg>
        )}
      </div>

      {/* Structures */}
      {structureId !== 'custom' && (
        <div className="absolute bottom-[10%] left-10 w-32 sm:w-48 h-[85%] z-10 flex flex-col items-center justify-end pointer-events-none opacity-40 md:opacity-80">
          
          {structureId === 'pisa' && (
            <div className="w-[80%] h-full -rotate-6 origin-bottom flex flex-col items-center justify-end">
              {/* Bell Tower Top */}
              <div className="w-16 h-12 border-[3px] border-slate-900 bg-[#e2e8f0] rounded-t-full flex justify-center items-end border-b-0 relative z-20">
                 <div className="w-2 h-4 border-[2px] border-slate-900 rounded-t-full bg-slate-900 mx-1"></div>
                 <div className="w-2 h-4 border-[2px] border-slate-900 rounded-t-full bg-slate-900 mx-1"></div>
                 <div className="absolute top-0 w-1 h-6 bg-slate-900 -mt-6"></div> {/* Flagpole */}
              </div>
              <div className="w-24 h-4 border-[3px] border-slate-900 bg-white rounded-t-md z-20 relative -mb-1"></div>
              {/* Floors */}
              {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-full flex-1 border-[3px] border-slate-900 bg-[#f8fafc] flex items-end justify-evenly pb-2 border-b-0 last:border-b-[3px] relative">
                     <div className="absolute bottom-0 w-[105%] h-2 border-[3px] border-slate-900 bg-white -ml-[2.5%] z-10"></div>
                     <div className="w-3 h-4/5 border-[2px] border-slate-900 rounded-t-full bg-[#cbd5e1] z-0"></div>
                     <div className="w-3 h-4/5 border-[2px] border-slate-900 rounded-t-full bg-[#cbd5e1] z-0"></div>
                     <div className="w-3 h-4/5 border-[2px] border-slate-900 rounded-t-full bg-[#cbd5e1] z-0"></div>
                     <div className="w-3 h-4/5 border-[2px] border-slate-900 rounded-t-full bg-[#cbd5e1] z-0"></div>
                     <div className="w-3 h-4/5 border-[2px] border-slate-900 rounded-t-full bg-[#cbd5e1] z-0"></div>
                  </div>
              ))}
              {/* Base */}
              <div className="w-[110%] h-8 border-[3px] border-slate-900 bg-[#f1f5f9] flex items-center justify-center gap-4">
                 <div className="w-4 h-6 border-[2px] border-slate-900 rounded-t-full bg-slate-900"></div>
              </div>
            </div>
          )}

          {structureId === 'eiffel' && (
             <div className="w-full h-full flex flex-col items-center justify-end relative">
                <div className="w-2 h-1/6 bg-slate-900"></div>
                <div className="w-16 h-2 border-[3px] border-slate-900 bg-slate-400"></div>
                <div className="w-24 h-1/4 border-[3px] border-slate-900 flex justify-center items-end border-b-0" style={{ clipPath: 'polygon(30% 0, 70% 0, 100% 100%, 0 100%)' }}>
                   <div className="w-full h-full bg-slate-900 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #0f172a 5px, #0f172a 10px)' }}></div>
                </div>
                <div className="w-32 h-3 border-[3px] border-slate-900 bg-slate-400 z-10"></div>
                <div className="w-40 h-1/4 border-[3px] border-slate-900 flex justify-center items-end border-b-0" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)' }}>
                   <div className="w-full h-full bg-slate-900 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, #0f172a 5px, #0f172a 10px)' }}></div>
                </div>
                <div className="w-full h-1/3 border-[3px] border-slate-900 flex justify-between items-end border-b-0 relative" style={{ clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0 100%)' }}>
                   <div className="absolute inset-0 bg-slate-900 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #0f172a 5px, #0f172a 10px)' }}></div>
                   <div className="w-1/2 h-1/2 bg-[#F4F1EB] self-end mx-auto rounded-t-full border-t-[3px] border-x-[3px] border-slate-900 absolute bottom-0 left-1/4"></div>
                </div>
             </div>
          )}

          {structureId === 'cristo' && (
             <div className="w-full h-[60%] flex flex-col items-center justify-end relative">
                <div className="w-8 h-12 bg-slate-300 border-[3px] border-slate-900 rounded-full z-20"></div> {/* Head */}
                <div className="w-40 h-10 bg-slate-300 border-[3px] border-slate-900 rounded-full absolute top-10 z-10 flex justify-between items-center px-1">
                   <div className="w-4 h-6 bg-slate-300 border-2 border-slate-900 rounded-full"></div>
                   <div className="w-4 h-6 bg-slate-300 border-2 border-slate-900 rounded-full"></div>
                </div> {/* Arms */}
                <div className="w-16 h-48 bg-slate-300 border-[3px] border-slate-900 -mt-4 z-10" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }}></div> {/* Body */}
                <div className="w-24 h-16 bg-slate-700 border-[3px] border-slate-900 flex items-center justify-center -mt-2 z-0">
                    <div className="w-16 h-4 bg-slate-900 opacity-20 mt-4"></div>
                </div> {/* Pedestal */}
             </div>
          )}

          {structureId === 'gize' && (
             <div className="w-[150%] h-[50%] flex flex-col items-center justify-end relative -ml-[25%]">
                <div className="w-full h-full bg-[#FFD166] border-[3px] border-slate-900 relative flex overflow-hidden" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}>
                   <div className="w-1/2 h-full bg-slate-900 opacity-10"></div>
                   <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(15,23,42,0.1) 10px, rgba(15,23,42,0.1) 12px)' }}></div>
                </div>
             </div>
          )}
        </div>
      )}

      {/* Object Visual Renderer */}
      {(() => {
        const renderObject = (obj: PhysicsObject, letter: string, isFalling: boolean) => {
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
               <div className={`w-[150%] h-[30%] rounded-sm border-[3px] border-slate-900 bg-white relative flex items-center justify-center shadow-sm ${isFalling ? 'animate-[wiggle_0.5s_ease-in-out_infinite]' : ''}`}>
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
               <div className={`w-[150%] h-[40%] rounded-sm border-[3px] border-slate-900 bg-red-700 relative flex items-center justify-center shadow-md ${isFalling ? '-rotate-12' : ''}`}>
                  <div className="absolute top-0 left-0 right-0 h-2 bg-red-900 border-b-[3px] border-slate-900"></div>
                  <div className="absolute bottom-1 left-1 right-1 h-1 bg-white border-t-[1px] border-slate-400"></div>
                  <span className="text-white font-black text-xs z-10 absolute mt-2">{letter}</span>
               </div>
             );
          } else if (obj.id === 'feather') {
             content = (
               <div className={`w-[150%] h-[50%] relative flex items-center justify-center ${isFalling ? 'animate-[float_2s_ease-in-out_infinite]' : ''}`}>
                  <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-md -rotate-90">
                     <path d="M 50 180 Q 50 100 50 20" fill="none" stroke="#0f172a" strokeWidth="4" />
                     <path d="M 50 20 C 70 40 80 80 50 160 C 20 80 30 40 50 20" fill="#fcd34d" stroke="#0f172a" strokeWidth="3" />
                     <path d="M 50 40 L 65 30 M 50 60 L 70 50 M 50 80 L 65 70 M 50 100 L 60 95 M 50 50 L 35 40 M 50 70 L 30 60 M 50 90 L 35 85" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="text-slate-900 font-black text-[10px] z-10 absolute -mt-4">{letter}</span>
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

          return (
             <div className="group relative w-full h-full cursor-help">
               {content}
               {/* Tooltip */}
               <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-32 bg-slate-900 text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                 <div className="font-black border-b border-slate-700 pb-1 mb-1">{obj.name}</div>
                 <div>Massa: {obj.mass} kg</div>
                 <div>Área: {obj.area} m²</div>
                 <div>Cd: {obj.cd}</div>
                 <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
               </div>
             </div>
          );
        };

        return (
          <>
            {/* Falling Object A (Left) */}
            <div 
              className="absolute flex flex-col items-center z-20"
              style={{ bottom: `${yAPercent}%`, left: '45%', transform: 'translateX(-50%)', width: objectA.radius, height: objectA.radius }}
            >
              {renderObject(objectA, 'A', isFallingA)}
              {/* Vectors */}
              {showVectors && (
                <>
                  {/* Top Vectors (Drag) */}
                  {FdA > 0 && (
                    <div className="absolute bottom-[100%] left-1/2 -translate-x-1/2 mb-1 flex flex-col items-center pointer-events-none z-30">
                       <span className="text-[10px] font-black bg-white/80 px-1 rounded mb-1 shadow-sm border border-slate-200">Fa</span>
                       <div className="w-1.5 bg-[#FF3366] relative" style={{ height: 15 + Math.min(FdA, 50) }}>
                         <div className="absolute -top-2 -left-[5px] border-l-[8px] border-r-[8px] border-b-[10px] border-x-transparent border-b-[#FF3366]"></div>
                       </div>
                    </div>
                  )}
                  {/* Bottom Vectors (Velocity & Weight) */}
                  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-1 flex flex-row gap-3 pointer-events-none z-30">
                    {vA > 0 && (
                        <div className="flex flex-col items-center text-[#0055FF]">
                            <div className="w-1.5 bg-[#0055FF] relative" style={{ height: 15 + getVelScale(vA) }}>
                                <div className="absolute -bottom-2 -left-[5px] border-l-[8px] border-r-[8px] border-t-[10px] border-x-transparent border-t-[#0055FF]"></div>
                            </div>
                            <span className="text-[10px] font-black bg-white/80 px-1 rounded mt-3 shadow-sm border border-slate-200">V</span>
                        </div>
                    )}
                    <div className="flex flex-col items-center text-slate-900">
                       <div className="w-1.5 bg-slate-900 relative" style={{ height: 15 + Math.min(P_A, 50) }}>
                         <div className="absolute -bottom-2 -left-[5px] border-l-[8px] border-r-[8px] border-t-[10px] border-x-transparent border-t-slate-900"></div>
                       </div>
                       <span className="text-[10px] font-black bg-white/80 px-1 rounded mt-3 shadow-sm border border-slate-200">P</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Falling Object B (Right) */}
            <div 
              className="absolute flex flex-col items-center z-20"
              style={{ bottom: `${yBPercent}%`, left: '55%', transform: 'translateX(-50%)', width: objectB.radius, height: objectB.radius }}
            >
              {renderObject(objectB, 'B', isFallingB)}
              {/* Vectors */}
              {showVectors && (
                <>
                  {/* Top Vectors (Drag) */}
                  {FdB > 0 && (
                    <div className="absolute bottom-[100%] left-1/2 -translate-x-1/2 mb-1 flex flex-col items-center pointer-events-none z-30">
                       <span className="text-[10px] font-black bg-white/80 px-1 rounded mb-1 shadow-sm border border-slate-200">Fa</span>
                       <div className="w-1.5 bg-[#FF3366] relative" style={{ height: 15 + Math.min(FdB, 50) }}>
                         <div className="absolute -top-2 -left-[5px] border-l-[8px] border-r-[8px] border-b-[10px] border-x-transparent border-b-[#FF3366]"></div>
                       </div>
                    </div>
                  )}
                  {/* Bottom Vectors (Velocity & Weight) */}
                  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-1 flex flex-row gap-3 pointer-events-none z-30">
                    {vB > 0 && (
                        <div className="flex flex-col items-center text-[#0055FF]">
                            <div className="w-1.5 bg-[#0055FF] relative" style={{ height: 15 + getVelScale(vB) }}>
                                <div className="absolute -bottom-2 -left-[5px] border-l-[8px] border-r-[8px] border-t-[10px] border-x-transparent border-t-[#0055FF]"></div>
                            </div>
                            <span className="text-[10px] font-black bg-white/80 px-1 rounded mt-3 shadow-sm border border-slate-200">V</span>
                        </div>
                    )}
                    <div className="flex flex-col items-center text-slate-900">
                       <div className="w-1.5 bg-slate-900 relative" style={{ height: 15 + Math.min(P_B, 50) }}>
                         <div className="absolute -bottom-2 -left-[5px] border-l-[8px] border-r-[8px] border-t-[10px] border-x-transparent border-t-slate-900"></div>
                       </div>
                       <span className="text-[10px] font-black bg-white/80 px-1 rounded mt-3 shadow-sm border border-slate-200">P</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        );
      })()}
      
      <style>{`
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