import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataPoint } from '../types';

interface ChartsAreaProps {
  data: DataPoint[];
}

export function ChartsArea({ data }: ChartsAreaProps) {
  if (data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-slate-400 bg-slate-50 rounded-lg border border-slate-200">Aguardando simulação...</div>;
  }

  return (
    <div className="w-full h-56 bg-white border border-slate-200 p-2 rounded-lg shadow-sm">
      <h3 className="text-xs font-semibold text-slate-500 mb-2 text-center uppercase tracking-wide">Posição vs Tempo (A e B)</h3>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="time" 
            type="number" 
            tickFormatter={(t) => `${t.toFixed(1)}s`} 
            domain={['dataMin', 'dataMax']} 
            className="text-[10px]"
          />
          <YAxis 
            className="text-[10px]"
            label={{ value: 'Altura (m)', angle: -90, position: 'insideLeft', style: { fontSize: '10px' } }}
          />
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(2)}m`, 'Posição']}
            labelFormatter={(label: number) => `Tempo: ${label.toFixed(2)}s`}
            contentStyle={{ fontSize: '12px' }}
          />
          {/* We plot just one line conceptually if they fall together, but we can plot both to show they overlap perfectly. Offset one slightly in thickness so both are visible. */}
          <Line type="monotone" dataKey="y" name="Objeto A" stroke="#3b82f6" strokeWidth={4} dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="y" name="Objeto B" stroke="#f97316" strokeWidth={2} strokeDasharray="4 4" dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
