import React, { useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceDot } from 'recharts';
import { Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import { SimulationState } from '../types';

interface ChartsAreaProps {
  data: SimulationState[];
  simulationMode: 'livre' | 'paraquedas';
}

export function ChartsArea({ data, simulationMode }: ChartsAreaProps) {
  const [activeTab, setActiveTab] = useState<'position' | 'velocity'>('position');
  const chartRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current, { backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = `grafico_${activeTab}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download chart:', err);
    }
  };

  if (data.length === 0) {
    return <div className="h-48 flex items-center justify-center font-bold text-slate-400 bg-white rounded-2xl border-[3px] border-slate-900 border-dashed">Aguardando simulação...</div>;
  }


  // Downsample data for Recharts to improve performance
  const chartData = data.filter((_, i) => i % 10 === 0 || i === data.length - 1);
  const deployPoint = data.find(d => d.parachuteDeployedA);

  const legendPayload = simulationMode === 'paraquedas' 
    ? [
        { value: activeTab === 'position' ? 'Posição' : 'Velocidade', type: 'line', id: 'data', color: '#FF3366' },
        ...(deployPoint ? [{ value: 'Paraquedas Aberto', type: 'circle', id: 'deploy', color: '#8b5cf6' }] : [])
      ]
    : undefined;


  return (
    <div className="w-full h-80 bg-white border-[3px] border-slate-900 p-4 rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
          {activeTab === 'position' ? 'Posição (m) vs Tempo (s)' : 'Velocidade (m/s) vs Tempo (s)'}
        </h3>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button 
            onClick={handleDownload}
            className="flex shrink-0 items-center justify-center w-8 h-8 bg-[#F4F1EB] rounded-lg border-[3px] border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1px_1px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all text-slate-900"
            title="Baixar Gráfico"
          >
            <Download className="w-4 h-4" />
          </button>
          <div className="flex bg-[#F4F1EB] rounded-lg p-1 border-[3px] border-slate-900">
            <button 
              onClick={() => setActiveTab('position')}
              className={`px-3 py-1 text-xs font-black uppercase rounded ${activeTab === 'position' ? 'bg-[#00C48C] border-2 border-slate-900 text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Posição
            </button>
            <button 
              onClick={() => setActiveTab('velocity')}
              className={`px-3 py-1 text-xs font-black uppercase rounded ${activeTab === 'velocity' ? 'bg-[#FFB800] border-2 border-slate-900 text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Velocidade
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-h-0" ref={chartRef}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 15, right: 20, left: 0, bottom: 15 }}>
            <XAxis 
              dataKey="t" 
              type="number" 
              tickFormatter={(t) => `${t.toFixed(1)}s`} 
              domain={['dataMin', 'dataMax']} 
              className="text-[10px] font-bold fill-slate-500"
              label={{ value: 'Tempo (s)', position: 'insideBottom', offset: -10, fontSize: 10, fontWeight: 'bold', fill: '#64748b' }}
            />
            <YAxis 
              className="text-[10px] font-bold fill-slate-500"
              label={{ value: activeTab === 'position' ? 'Posição (m)' : 'Velocidade (m/s)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 10, fontWeight: 'bold', fill: '#64748b' }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [`${value.toFixed(2)} ${activeTab === 'position' ? 'm' : 'm/s'}`, name === "Posição" || name === "Velocidade" ? "" : name]}
              labelFormatter={(label: number) => `Tempo: ${label.toFixed(2)}s`}
              contentStyle={{ borderRadius: '8px', border: '3px solid #0f172a', fontWeight: 'bold', color: '#0f172a' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }} 
              {...(legendPayload ? { payload: legendPayload as any } : {})}
            />
            
            {activeTab === 'position' ? (
              <>
                <Line type="monotone" dataKey="yA" name={simulationMode === 'paraquedas' ? "Posição" : "Objeto A"} stroke="#FF3366" strokeWidth={4} dot={false} isAnimationActive={false} />
                {simulationMode === 'livre' && <Line type="monotone" dataKey="yB" name="Objeto B" stroke="#0055FF" strokeWidth={4} dot={false} isAnimationActive={false} />}
                {simulationMode === 'paraquedas' && deployPoint && (
                   <ReferenceDot x={deployPoint.t} y={deployPoint.yA} r={6} fill="#8b5cf6" stroke="white" strokeWidth={2} />
                )}
              </>
            ) : (
              <>
                <Line type="monotone" dataKey="vA" name={simulationMode === 'paraquedas' ? "Velocidade" : "Objeto A"} stroke="#FF3366" strokeWidth={4} dot={false} isAnimationActive={false} />
                {simulationMode === 'livre' && <Line type="monotone" dataKey="vB" name="Objeto B" stroke="#0055FF" strokeWidth={4} dot={false} isAnimationActive={false} />}
                {simulationMode === 'paraquedas' && deployPoint && (
                   <ReferenceDot x={deployPoint.t} y={deployPoint.vA} r={6} fill="#8b5cf6" stroke="white" strokeWidth={2} />
                )}
              </>
            )}
            
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
