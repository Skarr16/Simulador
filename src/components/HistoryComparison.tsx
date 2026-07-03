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
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden text-sm">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <h3 className="font-semibold text-slate-700">Histórico & Comparação de Energias</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Altura</th>
              <th className="px-4 py-2">Massa (A | B)</th>
              <th className="px-4 py-2">Tempo de Queda</th>
              <th className="px-4 py-2 text-blue-600">Max Cinética (A)</th>
              <th className="px-4 py-2 text-orange-600">Max Cinética (B)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {history.map((run, i) => (
              <tr key={run.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-mono text-slate-400">#{i + 1}</td>
                <td className="px-4 py-3">{run.config.height} m</td>
                <td className="px-4 py-3 font-mono">{run.config.massA}kg | {run.config.massB}kg</td>
                <td className="px-4 py-3 font-bold">{run.timeToFall.toFixed(3)} s</td>
                <td className="px-4 py-3 font-mono text-blue-600">{run.maxK_A.toFixed(1)} J</td>
                <td className="px-4 py-3 font-mono text-orange-600">{run.maxK_B.toFixed(1)} J</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
