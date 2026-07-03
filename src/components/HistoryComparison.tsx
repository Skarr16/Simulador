import React from 'react';
import { SimulationResult } from '../types';

interface HistoryComparisonProps {
  history: SimulationResult[];
}

export function HistoryComparison({ history }: HistoryComparisonProps) {
  if (history.length === 0) {
    return (
      <div className="p-4 text-center text-slate-500 text-sm italic bg-slate-50 rounded-lg border border-slate-200">
        Nenhuma simulação concluída ainda.
      </div>
    );
  }

  return (
    <div className="bg-[#13111c] border border-[#2d2844] rounded-2xl shadow-lg overflow-hidden text-sm">
      <div className="px-5 py-4 bg-[#1a1829] border-b border-[#2d2844]">
        <h3 className="font-bold text-purple-200 uppercase tracking-widest text-center text-xs">Histórico & Comparação</h3>
      </div>
      <div className="overflow-x-auto bg-[#0c0a13]">
        <table className="w-full text-left text-xs font-bold text-purple-100">
          <thead className="bg-[#1a1829] text-purple-300/60 uppercase tracking-widest border-b border-[#2d2844]">
            <tr>
              <th className="px-4 py-3 border-r border-[#2d2844]">#</th>
              <th className="px-4 py-3 border-r border-[#2d2844]">Altura</th>
              <th className="px-4 py-3 border-r border-[#2d2844]">Massa (A | B)</th>
              <th className="px-4 py-3 border-r border-[#2d2844]">Queda</th>
              <th className="px-4 py-3 text-cyan-400 border-r border-[#2d2844]">K Max (A)</th>
              <th className="px-4 py-3 text-fuchsia-400">K Max (B)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2844]">
            {history.map((run, i) => (
              <tr key={run.id} className="hover:bg-[#13111c] transition-colors">
                <td className="px-4 py-3 font-mono text-purple-400/50 border-r border-[#2d2844]">#{i + 1}</td>
                <td className="px-4 py-3 border-r border-[#2d2844]">{run.config.height} m</td>
                <td className="px-4 py-3 font-mono border-r border-[#2d2844] text-purple-200">{run.config.massA}kg | {run.config.massB}kg</td>
                <td className="px-4 py-3 font-bold text-purple-50 border-r border-[#2d2844]">{run.timeToFall.toFixed(3)}s</td>
                <td className="px-4 py-3 font-mono text-cyan-300 border-r border-[#2d2844] drop-shadow-[0_0_2px_rgba(34,211,238,0.5)]">{run.maxK_A.toFixed(1)} J</td>
                <td className="px-4 py-3 font-mono text-fuchsia-300 drop-shadow-[0_0_2px_rgba(217,70,239,0.5)]">{run.maxK_B.toFixed(1)} J</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
