import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { PhysicsObject, Environment } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  customObjects: Record<string, PhysicsObject>;
  setCustomObjects: (objs: Record<string, PhysicsObject>) => void;
  customEnvs: Record<string, Environment>;
  setCustomEnvs: (envs: Record<string, Environment>) => void;
  devMode: boolean;
  setDevMode: (val: boolean) => void;
}

export function AdminModal({ isOpen, onClose, customObjects, setCustomObjects, customEnvs, setCustomEnvs, devMode, setDevMode }: AdminModalProps) {
  const [localObjects, setLocalObjects] = useState(customObjects);
  const [localEnvs, setLocalEnvs] = useState(customEnvs);
  const [activeTab, setActiveTab] = useState<'objects' | 'envs' | 'formulas' | 'general'>('objects');
  const [selectedObj, setSelectedObj] = useState<string>(Object.keys(localObjects)[0]);
  const [selectedEnv, setSelectedEnv] = useState<string>(Object.keys(localEnvs)[0]);

  if (!isOpen) return null;

  const handleSave = () => {
    setCustomObjects(localObjects);
    setCustomEnvs(localEnvs);
    onClose();
  };

  const updateObject = (id: string, key: keyof PhysicsObject, value: any) => {
    setLocalObjects(prev => ({
      ...prev,
      [id]: { ...prev[id], [key]: value }
    }));
  };

  const updateEnv = (id: string, key: keyof Environment, value: any) => {
    setLocalEnvs(prev => ({
      ...prev,
      [id]: { ...prev[id], [key]: value }
    }));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-slate-900 bg-[#FF3366]">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Painel Admin (Modelagem)</h2>
            <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-md">v1.1.0</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b-4 border-slate-900 bg-slate-100">
          <button 
            className={`flex-1 min-w-[80px] p-2.5 sm:p-3 font-black uppercase text-xs sm:text-sm ${activeTab === 'objects' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            onClick={() => setActiveTab('objects')}
          >
            Objetos
          </button>
          <button 
            className={`flex-1 min-w-[80px] p-2.5 sm:p-3 font-black uppercase text-xs sm:text-sm border-l-2 sm:border-l-4 border-slate-900 ${activeTab === 'envs' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            onClick={() => setActiveTab('envs')}
          >
            Ambientes
          </button>
          <button 
            className={`flex-1 min-w-[80px] p-2.5 sm:p-3 font-black uppercase text-xs sm:text-sm border-l-2 sm:border-l-4 border-slate-900 ${activeTab === 'formulas' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            onClick={() => setActiveTab('formulas')}
          >
            Fórmulas
          </button>
          <button 
            className={`flex-1 min-w-[80px] p-2.5 sm:p-3 font-black uppercase text-xs sm:text-sm border-l-2 sm:border-l-4 border-slate-900 ${activeTab === 'general' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            onClick={() => setActiveTab('general')}
          >
            Ajustes
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F4F1EB]">
          {activeTab === 'objects' && (
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-black uppercase text-slate-900 mb-2">Selecione o Objeto</label>
                <select 
                  value={selectedObj}
                  onChange={(e) => setSelectedObj(e.target.value)}
                  className="w-full bg-white border-2 border-slate-900 rounded-lg p-2 font-bold"
                >
                  {Object.values(localObjects).map((obj: any) => (
                    <option key={obj.id} value={obj.id}>{obj.name}</option>
                  ))}
                </select>
              </div>
              
              {localObjects[selectedObj] && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Nome</label>
                    <input type="text" value={localObjects[selectedObj].name} onChange={e => updateObject(selectedObj, 'name', e.target.value)} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Massa (kg)</label>
                    <input type="number" step="0.001" value={localObjects[selectedObj].mass} onChange={e => updateObject(selectedObj, 'mass', Number(e.target.value))} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Área (m²)</label>
                    <input type="number" step="0.0001" value={localObjects[selectedObj].area} onChange={e => updateObject(selectedObj, 'area', Number(e.target.value))} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Cd (Arrasto)</label>
                    <input type="number" step="0.01" value={localObjects[selectedObj].cd} onChange={e => updateObject(selectedObj, 'cd', Number(e.target.value))} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Tamanho da Imagem (px)</label>
                    <input type="number" step="10" value={localObjects[selectedObj].radius} onChange={e => updateObject(selectedObj, 'radius', Number(e.target.value))} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Cor</label>
                    <input type="color" value={localObjects[selectedObj].color} onChange={e => updateObject(selectedObj, 'color', e.target.value)} className="w-full h-8 border-2 border-slate-900 rounded cursor-pointer" />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'envs' && (
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-black uppercase text-slate-900 mb-2">Selecione o Ambiente</label>
                <select 
                  value={selectedEnv}
                  onChange={(e) => setSelectedEnv(e.target.value)}
                  className="w-full bg-white border-2 border-slate-900 rounded-lg p-2 font-bold"
                >
                  {Object.values(localEnvs).map((env: any) => (
                    <option key={env.id} value={env.id}>{env.name}</option>
                  ))}
                </select>
              </div>
              
              {localEnvs[selectedEnv] && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Nome</label>
                    <input type="text" value={localEnvs[selectedEnv].name} onChange={e => updateEnv(selectedEnv, 'name', e.target.value)} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Gravidade (m/s²)</label>
                    <input type="number" step="0.01" value={localEnvs[selectedEnv].g} onChange={e => updateEnv(selectedEnv, 'g', Number(e.target.value))} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Densidade do Ar (kg/m³)</label>
                    <input type="number" step="0.001" value={localEnvs[selectedEnv].rho} onChange={e => updateEnv(selectedEnv, 'rho', Number(e.target.value))} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'formulas' && (
            <div className="flex flex-col gap-5 text-slate-800">
              
              {/* Introduction Card */}
              <div className="bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                <h3 className="text-sm font-black uppercase text-slate-900 mb-2 border-b border-slate-200 pb-1 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00C48C]"></span>
                  Modelagem Matemática e Física
                </h3>
                <p className="text-xs text-slate-700 font-bold leading-relaxed">
                  O simulador utiliza as leis da mecânica clássica de Newton combinadas com equações de dinâmica de fluidos para computar a trajetória dos corpos. O cálculo de tempo de queda e velocidades é resolvido numericamente passo a passo (Integração Numérica).
                </p>
              </div>

              {/* Formula 1: Vacuum */}
              <div className="bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                <h4 className="text-xs font-black uppercase text-[#0055FF] mb-2 flex items-center gap-1.5">
                  <span>1. Queda Livre no Vácuo (Sem Resistência do Ar)</span>
                </h4>
                <div className="text-xs font-mono text-slate-600 bg-slate-100 p-2.5 rounded-lg mb-3 leading-relaxed border border-slate-200">
                  <div className="font-bold text-slate-900">Equação da Altura:</div>
                  y(t) = h₀ - (1/2) · g · t²
                  <div className="font-bold text-slate-900 mt-2">Tempo Total de Queda (t_queda):</div>
                  t_queda = √(2 · h₀ / g)
                  <div className="font-bold text-slate-900 mt-2">Velocidade Instantânea:</div>
                  v(t) = g · t
                </div>
                <div className="text-[11px] text-slate-600 font-bold leading-relaxed">
                  No vácuo, <span className="text-[#FF3366]">a massa do objeto não tem impacto no tempo de queda</span>. Todos os corpos aceleram de forma idêntica à taxa de gravidade local (g).
                </div>
              </div>

              {/* Formula 2: With Drag */}
              <div className="bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                <h4 className="text-xs font-black uppercase text-[#FF3366] mb-2">
                  2. Queda Livre com Resistência do Ar
                </h4>
                <div className="text-xs font-mono text-slate-600 bg-slate-100 p-2.5 rounded-lg mb-3 leading-relaxed border border-slate-200">
                  <div className="font-bold text-slate-900">Força de Arrasto (Fa):</div>
                  Fa = (1/2) · ρ · v² · Cd · A
                  <div className="font-bold text-slate-900 mt-2">Aceleração Resultante (a):</div>
                  a = g - (Fa / m)
                  <div className="font-bold text-slate-900 mt-2">Velocidade Terminal (v_term):</div>
                  v_term = √(2 · m · g / (ρ · Cd · A))
                </div>
                
                <div className="text-[11px] text-slate-700 font-bold mb-1.5">Significado das Variáveis:</div>
                <ul className="text-[11px] text-slate-600 font-bold list-disc pl-4 space-y-1">
                  <li><strong className="text-slate-900">m:</strong> Massa do objeto (kg)</li>
                  <li><strong className="text-slate-900">g:</strong> Gravidade local do ambiente (m/s²)</li>
                  <li><strong className="text-slate-900">ρ (rho):</strong> Densidade do ar (kg/m³)</li>
                  <li><strong className="text-slate-900">Cd:</strong> Coeficiente de arrasto (aerodinâmica do objeto)</li>
                  <li><strong className="text-slate-900">A:</strong> Área de seção transversal (m²)</li>
                  <li><strong className="text-slate-900">v:</strong> Velocidade instantânea (m/s)</li>
                </ul>
              </div>

              {/* Formula 3: Euler Integration */}
              <div className="bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                <h4 className="text-xs font-black uppercase text-[#00C48C] mb-2">
                  3. Integração Numérica de Euler (Resolução em Tempo Real)
                </h4>
                <p className="text-[11px] text-slate-700 font-bold leading-relaxed mb-2">
                  A força de arrasto varia de forma não-linear com o quadrado da velocidade (v²). Por isso, o simulador resolve a equação diferencial integrando a aceleração em pequenos passos discretos de tempo <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-900 border border-slate-200">dt = 0.02s</code> (20ms):
                </p>
                <div className="text-xs font-mono text-slate-600 bg-slate-100 p-2.5 rounded-lg leading-relaxed border border-slate-200">
                  Fa_t = 0.5 · ρ · v_t² · Cd · A<br />
                  a_t = g - (Fa_t / m)<br />
                  v_(t+dt) = v_t + a_t · dt<br />
                  y_(t+dt) = y_t - v_(t+dt) · dt
                </div>
                <p className="text-[11px] text-slate-600 font-bold mt-2">
                  O tempo total de queda corresponde à soma acumulada de todos os passos <code className="font-mono text-slate-900">dt</code> executados até que a altura <code className="font-mono text-slate-900">y</code> atinja o solo (y ≤ 0).
                </p>
              </div>

              {/* Formula 4: Parachute Mode */}
              <div className="bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                <h4 className="text-xs font-black uppercase text-[#FFB800] mb-2">
                  4. Dinâmica no Modo Paraquedas
                </h4>
                <p className="text-[11px] text-slate-700 font-bold leading-relaxed mb-2">
                  Inicia a queda livre a 4.000m. Ao cruzar 60% da altura inicial (2.400m), o paraquedas é acionado, elevando instantaneamente a resistência aerodinâmica:
                </p>
                <div className="text-xs font-mono text-slate-600 bg-slate-100 p-2.5 rounded-lg leading-relaxed border border-slate-200">
                  Se y &lt; 2400m:<br />
                  &nbsp;&nbsp;Área de Arrastre (A) = A_corpo + 5.0 m² (Área do Paraquedas)<br />
                  &nbsp;&nbsp;Coeficiente de Arrasto (Cd) = 1.75
                </div>
                <p className="text-[11px] text-slate-600 font-bold mt-2">
                  Isso cria uma força de arrasto superior ao peso, gerando uma forte desaceleração vertical até o estabelecimento de uma velocidade terminal lenta e confortável para o pouso.
                </p>
              </div>

            </div>
          )}

          {activeTab === 'general' && (
            <div className="flex flex-col gap-6">
              <div className="bg-white p-5 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-between">
                <div>
                  <span className="block text-sm font-black uppercase text-slate-900">DEVMODE (AJUSTE IMG)</span>
                  <span className="text-[11px] text-slate-500 font-bold leading-relaxed block mt-1">
                    Ativa as ferramentas de posicionamento e calibragem manual de coordenadas das imagens dos cenários e objetos.
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={() => setDevMode(!devMode)}
                  className={`w-12 h-6 flex items-center border-2 border-slate-900 rounded-full p-0.5 transition-colors shrink-0 ${devMode ? 'bg-[#00C48C]' : 'bg-slate-200'}`}
                >
                  <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform ${devMode ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'}`} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-4 border-slate-900 bg-white flex justify-end">
          <button 
            onClick={handleSave}
            className="bg-[#00C48C] hover:bg-[#00A375] text-slate-900 px-6 py-2 rounded-xl font-black uppercase border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] active:shadow-[0px_0px_0px_0px_#0f172a] active:translate-y-[4px] active:translate-x-[4px] transition-all flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
