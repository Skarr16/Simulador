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
    <div className="bg-[#13111c] p-5 rounded-2xl border border-[#2d2844] shadow-lg font-mono text-sm h-full relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-600/10 rounded-full blur-[50px]"></div>
      <h3 className="font-sans font-bold text-purple-200 mb-4 uppercase tracking-widest text-center drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">Monitor de Energia (J)</h3>
      
      <div className="grid grid-cols-2 gap-4 h-full relative z-10">
        {/* Objeto A */}
        <div className="space-y-3 bg-[#0c0a13]/80 p-4 rounded-xl border border-cyan-500/20 flex flex-col justify-center shadow-[inset_0_0_15px_rgba(34,211,238,0.05)]">
          <div className="text-cyan-300 bg-cyan-900/40 px-2 py-1 rounded border border-cyan-400/50 font-bold font-sans text-[10px] uppercase tracking-wider inline-block self-start shadow-[0_0_10px_rgba(34,211,238,0.2)] mb-1">Objeto A</div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-purple-300/60 font-bold">K:</span>
            <span className="font-bold text-cyan-100">{kA.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-purple-300/60 font-bold">U:</span>
            <span className="font-bold text-cyan-100">{uA.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center border-t border-[#2d2844] pt-3 mt-1 font-bold text-cyan-300">
            <span>Total:</span>
            <span className="drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">{totalA.toFixed(1)}</span>
          </div>
        </div>

        {/* Objeto B */}
        <div className="space-y-3 bg-[#0c0a13]/80 p-4 rounded-xl border border-fuchsia-500/20 flex flex-col justify-center shadow-[inset_0_0_15px_rgba(217,70,239,0.05)]">
          <div className="text-fuchsia-300 bg-fuchsia-900/40 px-2 py-1 rounded border border-fuchsia-400/50 font-bold font-sans text-[10px] uppercase tracking-wider inline-block self-start shadow-[0_0_10px_rgba(217,70,239,0.2)] mb-1">Objeto B</div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-purple-300/60 font-bold">K:</span>
            <span className="font-bold text-fuchsia-100">{kB.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-purple-300/60 font-bold">U:</span>
            <span className="font-bold text-fuchsia-100">{uB.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center border-t border-[#2d2844] pt-3 mt-1 font-bold text-fuchsia-300">
            <span>Total:</span>
            <span className="drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]">{totalB.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
