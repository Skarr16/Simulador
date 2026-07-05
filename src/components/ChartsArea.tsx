import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SimulationState } from '../types';

interface ChartsAreaProps {
  data: SimulationState[];
}

export function ChartsArea({ data }: ChartsAreaProps) {
  const [activeTab, setActiveTab] = useState<'position' | 'velocity'>('position');

  if (data.length === 0) {
    return <div className="h-48 flex items-center justify-center font-bold text-slate-400 bg-white rounded-2xl border-[3px] border-slate-900 border-dashed">Aguardando simulação...</div>;
  }

  // Downsample data for Recharts to improve performance
  const chartData = data.filter((_, i) => i % 10 === 0 || i === data.length - 1);

  return (
    <div className="w-full h-80 bg-white border-[3px] border-slate-900 p-4 rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
          {activeTab === 'position' ? 'Posição (m) vs Tempo (s)' : 'Velocidade (m/s) vs Tempo (s)'}
        </h3>
        <div className="flex bg-[#F4F1EB] rounded-lg p-1 border-[3px] border-slate-900">
          <button 
            onClick={() => setActiveTab('position')}
            className={`px-3 py-1 text-xs font-black uppercase rounded ${activeTab === 'position' ? 'bg-[#00C48C] border-2 border-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Posição
          </button>
          <button 
            onClick={() => setActiveTab('velocity')}
            className={`px-3 py-1 text-xs font-black uppercase rounded ${activeTab === 'velocity' ? 'bg-[#FFB800] border-2 border-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Velocidade
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" />
            <XAxis 
              dataKey="t" 
              type="number" 
              tickFormatter={(t) => `${t.toFixed(1)}s`} 
              domain={['dataMin', 'dataMax']} 
              className="text-[10px] font-bold fill-slate-500"
            />
            <YAxis 
              className="text-[10px] font-bold fill-slate-500"
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)} ${activeTab === 'position' ? 'm' : 'm/s'}`, '']}
              labelFormatter={(label: number) => `Tempo: ${label.toFixed(2)}s`}
              contentStyle={{ borderRadius: '8px', border: '3px solid #0f172a', fontWeight: 'bold' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
            
            {activeTab === 'position' ? (
              <>
                <Line type="monotone" dataKey="yA" name="Objeto A" stroke="#FF3366" strokeWidth={4} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="yB" name="Objeto B" stroke="#0055FF" strokeWidth={4} dot={false} isAnimationActive={false} />
              </>
            ) : (
              <>
                <Line type="monotone" dataKey="vA" name="Objeto A" stroke="#FF3366" strokeWidth={4} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="vB" name="Objeto B" stroke="#0055FF" strokeWidth={4} dot={false} isAnimationActive={false} />
              </>
            )}
            
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
