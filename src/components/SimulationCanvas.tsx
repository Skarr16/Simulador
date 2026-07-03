import React from 'react';
import { DataPoint } from '../types';
import { cn } from '../lib/utils';
import { ArrowDown } from 'lucide-react';

interface SimulationCanvasProps {
  y: number;
  height: number;
  massA: number;
  massB: number;
  v: number;
  showVectors: boolean;
}

export function SimulationCanvas({ y, height, massA, massB, v, showVectors }: SimulationCanvasProps) {
  // Map real world meters to percentages
  const groundOffset = 10; // Bottom 10% is ground
  const canvasHeightPercent = 80; // Area where objects can fall
  
  // Math mapping: y is from 0 to height.
  // When y = height, bottom = groundOffset + canvasHeightPercent
  // When y = 0, bottom = groundOffset
  const yPercent = groundOffset + (y / Math.max(height, 1)) * canvasHeightPercent;

  // Size mapping based on mass
  const sizeA = 20 + massA * 2;
  const sizeB = 20 + massB * 2;

  // Vector scaling
  const maxVelAllowed = Math.sqrt(2 * 9.81 * 100); // approx max velocity at 100m
  const velScale = (v / maxVelAllowed) * 60; // Max 60px length
  const forceScaleA = massA * 0.5; // purely visual
  const forceScaleB = massB * 0.5; // purely visual

  return (
    <div className="relative w-full h-[500px] bg-slate-50 border border-slate-200 rounded-lg overflow-hidden font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Height Indicator */}
      <div className="absolute left-2 top-4 bottom-[10%] flex flex-col justify-between items-start text-xs text-slate-400 border-l border-slate-300 pl-2 py-4">
        <span>{height}m</span>
        <span>{Math.round(height / 2)}m</span>
        <span>0m</span>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-emerald-700 border-t-4 border-emerald-900 z-10">
        <div className="text-emerald-100/50 text-xs text-center pt-2">Solo</div>
      </div>

      {/* Falling Object A (Left) */}
      <div 
        className="absolute left-1/3 -translate-x-1/2 flex flex-col items-center z-20"
        style={{ bottom: `${yPercent}%` }}
      >
        <div 
          className="rounded-full bg-blue-500 shadow-lg border-2 border-blue-700 flex items-center justify-center text-white font-bold text-xs"
          style={{ width: sizeA, height: sizeA }}
        >
          A
        </div>
        {/* Vectors */}
        {showVectors && (
          <div className="absolute top-1/2 left-full ml-2 flex flex-col gap-1 items-start whitespace-nowrap pointer-events-none">
            {/* Weight Vector */}
            <div className="flex items-center text-red-600">
               <span className="text-[10px] mr-1 font-bold">P</span>
               <div className="h-0.5 bg-red-600 relative" style={{ width: 10 + forceScaleA * 20 }}>
                 <div className="absolute -right-1 -top-1 border-t-4 border-b-4 border-l-[6px] border-y-transparent border-l-red-600"></div>
               </div>
            </div>
            {/* Velocity Vector */}
            {v > 0 && (
                <div className="flex items-center text-green-600">
                    <span className="text-[10px] mr-1 font-bold">V</span>
                    <div className="w-0.5 bg-green-600 relative" style={{ height: 10 + velScale }}>
                        <div className="absolute -bottom-1 -left-1 border-l-4 border-r-4 border-t-[6px] border-x-transparent border-t-green-600"></div>
                    </div>
                </div>
            )}
          </div>
        )}
      </div>

      {/* Falling Object B (Right) */}
      <div 
        className="absolute left-2/3 -translate-x-1/2 flex flex-col items-center z-20"
        style={{ bottom: `${yPercent}%` }}
      >
        <div 
          className="rounded-full bg-orange-500 shadow-lg border-2 border-orange-700 flex items-center justify-center text-white font-bold text-xs"
          style={{ width: sizeB, height: sizeB }}
        >
          B
        </div>
        {/* Vectors */}
        {showVectors && (
          <div className="absolute top-1/2 right-full mr-2 flex flex-col gap-1 items-end whitespace-nowrap pointer-events-none">
            {/* Weight Vector */}
             <div className="flex items-center flex-row-reverse text-red-600">
               <span className="text-[10px] ml-1 font-bold">P</span>
               <div className="h-0.5 bg-red-600 relative" style={{ width: 10 + forceScaleB * 20 }}>
                 <div className="absolute -left-1 -top-1 border-t-4 border-b-4 border-r-[6px] border-y-transparent border-r-red-600"></div>
               </div>
            </div>
            {/* Velocity Vector */}
             {v > 0 && (
                <div className="flex items-center flex-row-reverse text-green-600">
                    <span className="text-[10px] ml-1 font-bold">V</span>
                    <div className="w-0.5 bg-green-600 relative" style={{ height: 10 + velScale }}>
                        <div className="absolute -bottom-1 -left-1 border-l-4 border-r-4 border-t-[6px] border-x-transparent border-t-green-600"></div>
                    </div>
                </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
