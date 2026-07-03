import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataPoint } from '../types';

interface ChartsAreaProps {
  data: DataPoint[];
}

export function ChartsArea({ data }: ChartsAreaProps) {
  if (data.length === 0) {
    return <div className="h-48 flex items-center justify-center font-bold text-purple-300/40 bg-[#13111c] rounded-2xl border border-[#2d2844] border-dashed">Aguardando simulação...</div>;
  }

  return (
    <div className="w-full h-64 bg-[#13111c] border border-[#2d2844] p-4 rounded-2xl shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-[50px]"></div>
      <h3 className="text-xs font-bold text-purple-200 mb-2 text-center uppercase tracking-widest drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">Posição vs Tempo</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d2844" />
          <XAxis 
            dataKey="time" 
            type="number" 
            tickFormatter={(t) => `${t.toFixed(1)}s`} 
            domain={['dataMin', 'dataMax']} 
            className="text-[10px] font-bold fill-purple-300/50"
            stroke="#2d2844"
          />
          <YAxis 
            className="text-[10px] font-bold fill-purple-300/50"
            label={{ value: 'Altura (m)', angle: -90, position: 'insideLeft', style: { fontSize: '10px', fontWeight: 'bold', fill: 'rgba(216, 180, 254, 0.5)' } }}
            stroke="#2d2844"
          />
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(2)}m`, 'Posição']}
            labelFormatter={(label: number) => `Tempo: ${label.toFixed(2)}s`}
            contentStyle={{ borderRadius: '12px', border: '1px solid #a855f7', backgroundColor: '#0c0a13', color: '#e9d5ff', fontWeight: 'bold', boxShadow: '0 0 15px rgba(168,85,247,0.3)' }}
            itemStyle={{ color: '#e9d5ff' }}
          />
          <Line type="monotone" dataKey="y" name="Objeto A (Cyan)" stroke="#22d3ee" strokeWidth={4} dot={false} isAnimationActive={false} style={{ filter: 'drop-shadow(0 0 5px rgba(34,211,238,0.5))' }} />
          <Line type="monotone" dataKey="y" name="Objeto B (Fuchsia)" stroke="#d946ef" strokeWidth={2} strokeDasharray="4 4" dot={false} isAnimationActive={false} style={{ filter: 'drop-shadow(0 0 5px rgba(217,70,239,0.5))' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
