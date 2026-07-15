import React, { useState, useMemo } from 'react';
import { Table, Download } from 'lucide-react';
import { SimulationState, PhysicsObject } from '../types';

interface DataTableProps {
  dataPoints: SimulationState[];
  initialHeight: number;
  objectA: PhysicsObject;
  objectB: PhysicsObject;
  simulationMode?: string;
}

export function DataTable({ dataPoints, initialHeight, objectA, objectB, simulationMode }: DataTableProps) {
  const [selectedObject, setSelectedObject] = useState<'A' | 'B'>('A');
  const [intervalOption, setIntervalOption] = useState<number>(1.0); // in seconds

  // Dynamically sample current simulation data
  const sampledData = useMemo(() => {
    if (!dataPoints || dataPoints.length === 0) return [];

    const result: { t: number; d: number; v: number }[] = [];
    
    const maxT = dataPoints[dataPoints.length - 1].t;
    
    // Determine target times
    const targetTimes: number[] = [];
    if (intervalOption === 0.67) {
      // Use exact timestamps close to 0.285 + n * 0.667 s
      for (let t = 0.285; t <= maxT + 0.1; t += 0.6666) {
        targetTimes.push(t);
      }
    } else {
      for (let t = intervalOption; t <= maxT + 0.1; t += intervalOption) {
        targetTimes.push(t);
      }
    }

    if (targetTimes.length === 0 && dataPoints.length > 0) {
      const step = Math.max(1, Math.floor(dataPoints.length / 10));
      let hasLanded = false;
      for (let i = step; i < dataPoints.length; i += step) {
        if (hasLanded) break;
        const dp = dataPoints[i];
        const isA = selectedObject === 'A';
        const y = isA ? dp.yA : dp.yB;
        const v = isA ? dp.vA : dp.vB;
        const d = Math.max(0, initialHeight - y);
        result.push({ t: dp.t, d, v });
        
        if (dp.t > 0 && (y <= 0.001 || v <= 0.001)) {
          hasLanded = true;
        }
      }
      return result;
    }

    let hasLanded = false;
    targetTimes.forEach((targetT) => {
      if (hasLanded) return;

      // Find the data point closest to targetT
      let closestDp = dataPoints[0];
      let minDiff = Math.abs(dataPoints[0].t - targetT);

      for (let i = 1; i < dataPoints.length; i++) {
        const diff = Math.abs(dataPoints[i].t - targetT);
        if (diff < minDiff) {
          minDiff = diff;
          closestDp = dataPoints[i];
        }
      }

      // Only add if it's within a reasonable threshold (avoid repeating the last point too early)
      if (minDiff < 0.3) {
        const isA = selectedObject === 'A';
        const y = isA ? closestDp.yA : closestDp.yB;
        const v = isA ? closestDp.vA : closestDp.vB;
        const d = Math.max(0, initialHeight - y);
        
        // Avoid duplicate times in our sampled list
        if (!result.some((r) => Math.abs(r.t - closestDp.t) < 0.01)) {
          result.push({
            t: closestDp.t,
            d,
            v,
          });

          // Stop appending once it has landed (height <= 0 or velocity <= 0)
          if (closestDp.t > 0 && (y <= 0.001 || v <= 0.001)) {
            hasLanded = true;
          }
        }
      }
    });

    return result;
  }, [dataPoints, initialHeight, selectedObject, intervalOption]);

  const downloadExcel = () => {
    // Portuguese headers with the literal column labels requested by user's reference image
    const headers = ["Tempo (s)", "Distância (m)", "Velocidade (m/s)"];
    
    // Format numeric values with comma separators for Excel compatibility in Portuguese locale
    const rows = sampledData.map(row => [
      row.t.toFixed(3).replace('.', ','),
      row.d.toFixed(3).replace('.', ','),
      row.v.toFixed(3).replace('.', ',')
    ]);

    // Use semicolon for Portuguese Excel CSV integration
    const csvContent = [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');
    
    // Create blob with UTF-8 BOM so Excel opens with correct encoding
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `dados_queda_livre_${selectedObject === 'A' ? 'objeto_A' : 'objeto_B'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 font-mono text-xs flex flex-col h-full min-h-[350px]">
      <div className="flex flex-row flex-wrap items-center justify-between gap-2 mb-4">
        <h3 className="font-sans font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 text-sm">
          <Table className="w-4 h-4 text-[#0055FF]" /> Tabela de Dados
        </h3>
        
        {/* Export to Excel Button */}
        <button
          onClick={downloadExcel}
          disabled={sampledData.length === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-slate-900 bg-[#00C48C] text-white font-sans font-black text-xs uppercase shadow-[2px_2px_0px_0px_#0f172a] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#0f172a] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Baixar Tabela para Excel (CSV)"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Baixar Excel</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 bg-slate-50 p-2 rounded-xl border border-slate-200">
        {/* Object Selector */}
        {simulationMode !== 'paraquedas' && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase text-slate-500">Objeto:</span>
            <button
              onClick={() => setSelectedObject('A')}
              className={`px-2 py-0.5 rounded border ${selectedObject === 'A' ? 'bg-[#FF3366] text-white border-slate-900 font-black' : 'bg-white text-slate-700 border-slate-300 font-bold'}`}
            >
              {objectA.name} (A)
            </button>
            <button
              onClick={() => setSelectedObject('B')}
              className={`px-2 py-0.5 rounded border ${selectedObject === 'B' ? 'bg-[#0055FF] text-white border-slate-900 font-black' : 'bg-white text-slate-700 border-slate-300 font-bold'}`}
            >
              {objectB.name} (B)
            </button>
          </div>
        )}

        {/* Interval Selector */}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-[10px] font-bold uppercase text-slate-500">Intervalo:</span>
          <select
            value={intervalOption}
            onChange={(e) => setIntervalOption(Number(e.target.value))}
            className="bg-white border border-slate-300 rounded px-1.5 py-0.5 text-[10px] font-bold outline-none"
          >
            <option value={0.2}>0.2s</option>
            <option value={0.5}>0.5s</option>
            <option value={0.67}>0.67s</option>
            <option value={1.0}>1.0s (Padrão)</option>
            <option value={2.0}>2.0s</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-y-auto border-2 border-slate-900 rounded-xl bg-slate-50 shadow-inner">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white font-sans text-[10px] uppercase tracking-wider sticky top-0">
              <th className="py-2 px-3 border-b border-slate-800 text-center">Tempo (s)</th>
              <th className="py-2 px-3 border-b border-slate-800 text-center">Distância (m)</th>
              <th className="py-2 px-3 border-b border-slate-800 text-center">Velocidade (m/s)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-mono text-[11px] font-bold">
            {sampledData.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-slate-400 font-sans">
                  Inicie a simulação para gerar dados...
                </td>
              </tr>
            ) : (
              sampledData.map((row, idx) => (
                <tr 
                  key={idx} 
                  className={`hover:bg-blue-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                >
                  <td className="py-2 px-3 text-slate-600 text-center border-r border-slate-100">
                    {row.t.toFixed(3)}
                  </td>
                  <td className="py-2 px-3 text-slate-900 text-center border-r border-slate-100">
                    {row.d.toFixed(3)}
                  </td>
                  <td className="py-2 px-3 text-[#0055FF] text-center">
                    {row.v.toFixed(3)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
