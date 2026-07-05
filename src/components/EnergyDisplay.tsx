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
    <div className="bg-white p-5 rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 font-mono text-sm h-full">
      <h3 className="font-sans font-black text-slate-900 mb-4 uppercase tracking-widest text-center">Monitor de Energia (J)</h3>
      
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* Objeto A */}
        <div className="space-y-3 bg-[#fdf2f8] p-3 rounded-xl border-2 border-slate-900 flex flex-col justify-center">
          <div className="text-white bg-[#FF3366] px-2 py-1 rounded border-2 border-slate-900 font-black font-sans text-xs inline-block self-start shadow-[2px_2px_0px_0px_#0f172a] mb-1">Objeto A</div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-bold">K:</span>
            <span className="font-black text-slate-900">{kA.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-bold">U:</span>
            <span className="font-black text-slate-900">{uA.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center border-t-2 border-dashed border-slate-300 pt-2 mt-1 font-black text-slate-900">
            <span>Total:</span>
            <span>{totalA.toFixed(1)}</span>
          </div>
        </div>

        {/* Objeto B */}
        <div className="space-y-3 bg-[#eff6ff] p-3 rounded-xl border-2 border-slate-900 flex flex-col justify-center">
          <div className="text-white bg-[#0055FF] px-2 py-1 rounded border-2 border-slate-900 font-black font-sans text-xs inline-block self-start shadow-[2px_2px_0px_0px_#0f172a] mb-1">Objeto B</div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-bold">K:</span>
            <span className="font-black text-slate-900">{kB.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-bold">U:</span>
            <span className="font-black text-slate-900">{uB.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center border-t-2 border-dashed border-slate-300 pt-2 mt-1 font-black text-slate-900">
            <span>Total:</span>
            <span>{totalB.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
