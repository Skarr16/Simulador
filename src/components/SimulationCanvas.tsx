import React from 'react';
import { DataPoint } from '../types';
import { cn } from '../lib/utils';

interface SimulationCanvasProps {
  y: number;
  height: number;
  massA: number;
  massB: number;
  v: number;
  showVectors: boolean;
}

export function SimulationCanvas({ y, height, massA, massB, v, showVectors }: SimulationCanvasProps) {
  const groundOffset = 10; 
  const canvasHeightPercent = 80; 
  
  const yPercent = groundOffset + (y / Math.max(height, 1)) * canvasHeightPercent;
  const isFalling = y < height;

  const sizeA = 24 + massA * 1.5;
  const sizeB = 24 + massB * 1.5;

  const maxVelAllowed = Math.sqrt(2 * 9.81 * 100); 
  const velScale = (v / maxVelAllowed) * 60; 
  const forceScaleA = massA * 0.5; 
  const forceScaleB = massB * 0.5; 

  return (
    <div className="relative w-full h-[500px] bg-[#0c0a13] border border-[#2d2844] rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.1)] overflow-hidden font-sans">
      
      {/* Decorative Stars / Particles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
        <circle cx="10%" cy="15%" r="1" fill="#c084fc" className="animate-pulse" />
        <circle cx="85%" cy="30%" r="1.5" fill="#a855f7" className="animate-pulse" />
        <circle cx="20%" cy="80%" r="1" fill="#e9d5ff" />
        <circle cx="75%" cy="60%" r="2" fill="#c084fc" className="animate-pulse" />
        <circle cx="90%" cy="85%" r="1" fill="#a855f7" />
      </svg>

      {/* Height Indicator */}
      <div className="absolute left-4 top-8 bottom-[10%] flex flex-col justify-between items-start text-sm font-medium text-purple-300/60 border-l border-purple-500/30 pl-3 py-4 z-10">
        <span className="bg-[#0c0a13] px-1 -ml-1">{height}m</span>
        <span className="bg-[#0c0a13] px-1 -ml-1">{Math.round(height / 2)}m</span>
        <span className="bg-[#0c0a13] px-1 -ml-1">0m</span>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-[#13111c] border-t border-purple-500/30 z-30 flex items-center justify-center shadow-[0_-10px_40px_rgba(168,85,247,0.1)]">
        <div className="text-purple-400 font-bold text-xs uppercase tracking-widest">Superfície</div>
      </div>

      {/* Leaning Tower of Pisa */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-32 sm:w-40 h-[80%] -rotate-[5deg] origin-bottom z-10 flex flex-col items-center drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        {/* Belfry (Top small section) */}
        <div className="w-3/4 h-[10%] bg-[#1a1829] border border-purple-500/20 rounded-t-lg flex items-center justify-evenly px-2 z-20">
            <div className="w-2 h-3/4 bg-[#0c0a13] rounded-t-full"></div>
            <div className="w-2 h-3/4 bg-[#0c0a13] rounded-t-full"></div>
            <div className="w-2 h-3/4 bg-[#0c0a13] rounded-t-full"></div>
        </div>
        {/* 6 Arcaded Floors */}
        {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full flex-1 bg-[#201d36] border-x border-b border-purple-500/20 flex items-end justify-evenly pb-1 px-1">
               {[...Array(7)].map((_, j) => (
                   <div key={j} className="w-2.5 h-[80%] border border-purple-500/10 rounded-t-full bg-[#0c0a13] shadow-inner"></div>
               ))}
            </div>
        ))}
        {/* Base Floor */}
        <div className="w-full h-[15%] bg-[#1a1829] border-x border-b border-purple-500/20 flex items-end justify-center pb-2">
             <div className="w-6 h-3/4 border border-purple-500/20 rounded-t-full bg-[#0c0a13]"></div>
        </div>
      </div>

      {/* Person Silhouette at the top */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center -mt-10 ml-4">
        {/* Glowing character silhouette */}
        <div className="w-6 h-6 bg-purple-400/20 border border-purple-400/50 rounded-full flex items-center justify-center relative z-20 shadow-[0_0_10px_rgba(192,132,252,0.5)]">
        </div>
        <div className="w-8 h-10 bg-purple-500/20 border-x border-t border-purple-400/50 rounded-t-xl -mt-1 relative z-10"></div>
      </div>

      {/* Falling Object A (Left) */}
      <div 
        className="absolute flex flex-col items-center z-20"
        style={{ bottom: `${yPercent}%`, left: '30%', transform: 'translateX(-50%)' }}
      >
        <div 
          className="rounded-full bg-cyan-400/10 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 font-black text-sm relative shadow-[0_0_15px_rgba(34,211,238,0.6)]"
          style={{ width: sizeA, height: sizeA }}
        >
          <div className="absolute inset-1 rounded-full border border-cyan-300/30"></div>
          A
        </div>
        {/* Vectors */}
        {showVectors && (
          <div className="absolute top-1/2 left-full ml-3 flex flex-col gap-1 items-start whitespace-nowrap pointer-events-none">
            {/* Weight Vector */}
            <div className="flex items-center text-cyan-400">
               <span className="text-xs mr-1 font-bold">P</span>
               <div className="h-0.5 bg-cyan-400 relative" style={{ width: 15 + forceScaleA * 20 }}>
                 <div className="absolute -right-1 -top-1 border-t-[3px] border-b-[3px] border-l-[4px] border-y-transparent border-l-cyan-400"></div>
               </div>
            </div>
            {/* Velocity Vector */}
            {v > 0 && (
                <div className="flex items-center text-cyan-300 mt-2">
                    <span className="text-xs mr-1 font-bold">V</span>
                    <div className="w-0.5 bg-cyan-300 relative" style={{ height: 15 + velScale }}>
                        <div className="absolute -bottom-1 -left-1 border-l-[3px] border-r-[3px] border-t-[4px] border-x-transparent border-t-cyan-300"></div>
                    </div>
                </div>
            )}
          </div>
        )}
      </div>

      {/* Falling Object B (Right) */}
      <div 
        className="absolute flex flex-col items-center z-20"
        style={{ bottom: `${yPercent}%`, left: '70%', transform: 'translateX(-50%)' }}
      >
        <div 
          className="rounded-full bg-fuchsia-500/10 border-2 border-fuchsia-500 flex items-center justify-center text-fuchsia-300 font-black text-sm relative shadow-[0_0_15px_rgba(217,70,239,0.6)]"
          style={{ width: sizeB, height: sizeB }}
        >
          <div className="absolute inset-1 rounded-full border border-fuchsia-400/30"></div>
          B
        </div>
        {/* Vectors */}
        {showVectors && (
          <div className="absolute top-1/2 right-full mr-3 flex flex-col gap-1 items-end whitespace-nowrap pointer-events-none">
            {/* Weight Vector */}
             <div className="flex items-center flex-row-reverse text-fuchsia-500">
               <span className="text-xs ml-1 font-bold">P</span>
               <div className="h-0.5 bg-fuchsia-500 relative" style={{ width: 15 + forceScaleB * 20 }}>
                 <div className="absolute -left-1 -top-1 border-t-[3px] border-b-[3px] border-r-[4px] border-y-transparent border-r-fuchsia-500"></div>
               </div>
            </div>
            {/* Velocity Vector */}
             {v > 0 && (
                <div className="flex items-center flex-row-reverse text-fuchsia-400 mt-2">
                    <span className="text-xs ml-1 font-bold">V</span>
                    <div className="w-0.5 bg-fuchsia-400 relative" style={{ height: 15 + velScale }}>
                        <div className="absolute -bottom-1 -left-1 border-l-[3px] border-r-[3px] border-t-[4px] border-x-transparent border-t-fuchsia-400"></div>
                    </div>
                </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

