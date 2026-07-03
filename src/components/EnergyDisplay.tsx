import React from 'react';

interface EnergyDisplayProps {
  kA: number;
  uA: number;
  kB: number;
  uB: number;
}

export function EnergyDisplay({ kA, uA, kB, uB }: EnergyDisplayProps) {
  const totalA = kA + uA;
  const totalB = kB + uB;

  return (
    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg shadow-inner font-mono text-xs">
      <h3 className="font-sans font-semibold text-slate-400 mb-3 uppercase tracking-wider text-[10px]">Monitor de Energia (Joules)</h3>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Objeto A */}
        <div className="space-y-2 border-r border-slate-700 pr-4">
          <div className="text-blue-400 font-bold font-sans text-sm border-b border-slate-700 pb-1 mb-2">Objeto A</div>
          <div className="flex justify-between">
            <span className="text-slate-500">Cinética (K):</span>
            <span>{kA.toFixed(2)} J</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Potencial (U):</span>
            <span>{uA.toFixed(2)} J</span>
          </div>
          <div className="flex justify-between border-t border-slate-800 pt-1 mt-1 font-bold text-slate-300">
            <span>Mecânica (E):</span>
            <span>{totalA.toFixed(2)} J</span>
          </div>
        </div>

        {/* Objeto B */}
        <div className="space-y-2">
          <div className="text-orange-400 font-bold font-sans text-sm border-b border-slate-700 pb-1 mb-2">Objeto B</div>
          <div className="flex justify-between">
            <span className="text-slate-500">Cinética (K):</span>
            <span>{kB.toFixed(2)} J</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Potencial (U):</span>
            <span>{uB.toFixed(2)} J</span>
          </div>
          <div className="flex justify-between border-t border-slate-800 pt-1 mt-1 font-bold text-slate-300">
            <span>Mecânica (E):</span>
            <span>{totalB.toFixed(2)} J</span>
          </div>
        </div>
      </div>
    </div>
  );
}
