import React, { useState } from 'react';
import { X, Save, ArrowDown, Cpu, Layers, Play, Settings2, Database, Eye } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'objects' | 'envs' | 'formulas' | 'architecture' | 'general'>('objects');
  const [selectedObj, setSelectedObj] = useState<string>(Object.keys(localObjects)[0]);
  const [selectedEnv, setSelectedEnv] = useState<string>(Object.keys(localEnvs)[0]);

  const [newObj, setNewObj] = useState<PhysicsObject | null>(null);
  const [newEnv, setNewEnv] = useState<Environment | null>(null);

  const handleExportJSON = (data: any, filename: string) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSONObjects = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target?.result as string);
        setLocalObjects(prev => ({ ...prev, ...imported }));
      } catch (err) {
        alert('JSON inválido.');
      }
    };
    reader.readAsText(file);
  };

  const handleImportJSONEnvs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target?.result as string);
        setLocalEnvs(prev => ({ ...prev, ...imported }));
      } catch (err) {
        alert('JSON inválido.');
      }
    };
    reader.readAsText(file);
  };


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
            className={`flex-1 min-w-[80px] p-2.5 sm:p-3 font-black uppercase text-xs sm:text-sm border-l-2 sm:border-l-4 border-slate-900 ${activeTab === 'architecture' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            onClick={() => setActiveTab('architecture')}
          >
            Fluxograma
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
                  onChange={(e) => {
                    setSelectedObj(e.target.value);
                    if (e.target.value === 'new') {
                      setNewObj({
                        id: 'obj_' + Date.now(),
                        name: 'Novo Objeto',
                        mass: 1,
                        area: 0.1,
                        cd: 0.5,
                        color: '#000000',
                        radius: 30
                      });
                    } else {
                      setNewObj(null);
                    }
                  }}
                  className="w-full bg-white border-2 border-slate-900 rounded-lg p-2 font-bold"
                >
                  <option value="new">+ Criar Novo Objeto</option>
                  {Object.values(localObjects).map((obj: any) => (
                    <option key={obj.id} value={obj.id}>{obj.name}</option>
                  ))}
                </select>
              </div>
              
              {selectedObj === 'new' && newObj ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Nome</label>
                    <input type="text" value={newObj.name} onChange={e => setNewObj({...newObj, name: e.target.value})} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Massa (kg)</label>
                    <input type="number" step="0.001" value={newObj.mass} onChange={e => setNewObj({...newObj, mass: Number(e.target.value)})} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Área (m²)</label>
                    <input type="number" step="0.0001" value={newObj.area} onChange={e => setNewObj({...newObj, area: Number(e.target.value)})} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Cd (Arrasto)</label>
                    <input type="number" step="0.01" value={newObj.cd} onChange={e => setNewObj({...newObj, cd: Number(e.target.value)})} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Tamanho da Imagem (px)</label>
                    <input type="number" step="10" value={newObj.radius} onChange={e => setNewObj({...newObj, radius: Number(e.target.value)})} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Cor</label>
                    <input type="color" value={newObj.color} onChange={e => setNewObj({...newObj, color: e.target.value})} className="w-full h-8 border-2 border-slate-900 rounded cursor-pointer" />
                  </div>
                  <div className="col-span-2 mt-2">
                    <button 
                      onClick={() => {
                        setLocalObjects(prev => ({...prev, [newObj.id]: newObj}));
                        setSelectedObj(newObj.id);
                        setNewObj(null);
                      }}
                      className="w-full bg-[#00C48C] text-slate-900 font-black px-4 py-2 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]"
                    >
                      Salvar Objeto
                    </button>
                  </div>
                </div>
              ) : localObjects[selectedObj] ? (
                <div className="grid grid-cols-2 gap-4 opacity-70">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Nome</label>
                    <input type="text" disabled value={localObjects[selectedObj].name} className="border-2 border-slate-900 rounded p-1 font-bold bg-slate-200" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Massa (kg)</label>
                    <input type="number" disabled value={localObjects[selectedObj].mass} className="border-2 border-slate-900 rounded p-1 font-bold bg-slate-200" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Área (m²)</label>
                    <input type="number" disabled value={localObjects[selectedObj].area} className="border-2 border-slate-900 rounded p-1 font-bold bg-slate-200" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Cd (Arrasto)</label>
                    <input type="number" disabled value={localObjects[selectedObj].cd} className="border-2 border-slate-900 rounded p-1 font-bold bg-slate-200" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Tamanho da Imagem (px)</label>
                    <input type="number" disabled value={localObjects[selectedObj].radius} className="border-2 border-slate-900 rounded p-1 font-bold bg-slate-200" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Cor</label>
                    <input type="color" disabled value={localObjects[selectedObj].color} className="w-full h-8 border-2 border-slate-900 rounded bg-slate-200" />
                  </div>
                  <div className="col-span-2 text-xs text-center text-slate-500 font-bold mt-2">
                    (Objetos existentes não podem ser editados)
                  </div>
                </div>
              ) : null}

              <div className="border-t-2 border-slate-900 pt-4 mt-4">
                <h4 className="font-black uppercase text-slate-900 mb-3 text-sm">Importar / Exportar</h4>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleExportJSON(localObjects, 'objetos.json')}
                    className="flex-1 bg-white text-slate-900 font-black px-3 py-2 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-xs uppercase"
                  >
                    Exportar JSON
                  </button>
                  <label className="flex-1 bg-white text-slate-900 font-black px-3 py-2 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-xs uppercase text-center cursor-pointer">
                    Importar JSON
                    <input type="file" accept=".json" onChange={handleImportJSONObjects} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'envs' && (
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-black uppercase text-slate-900 mb-2">Selecione o Ambiente</label>
                <select 
                  value={selectedEnv}
                  onChange={(e) => {
                    setSelectedEnv(e.target.value);
                    if (e.target.value === 'new') {
                      setNewEnv({
                        id: 'env_' + Date.now(),
                        name: 'Novo Ambiente',
                        gravity: 9.81,
                        airDensity: 1.225,
                        color: '#ffffff'
                      });
                    } else {
                      setNewEnv(null);
                    }
                  }}
                  className="w-full bg-white border-2 border-slate-900 rounded-lg p-2 font-bold"
                >
                  <option value="new">+ Criar Novo Ambiente</option>
                  {Object.values(localEnvs).map((env: any) => (
                    <option key={env.id} value={env.id}>{env.name}</option>
                  ))}
                </select>
              </div>
              
              {selectedEnv === 'new' && newEnv ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Nome</label>
                    <input type="text" value={newEnv.name} onChange={e => setNewEnv({...newEnv, name: e.target.value})} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Gravidade (m/s²)</label>
                    <input type="number" step="0.01" value={newEnv.gravity} onChange={e => setNewEnv({...newEnv, gravity: Number(e.target.value)})} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Densidade do Ar (kg/m³)</label>
                    <input type="number" step="0.001" value={newEnv.airDensity} onChange={e => setNewEnv({...newEnv, airDensity: Number(e.target.value)})} className="border-2 border-slate-900 rounded p-1 font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Cor de Fundo</label>
                    <input type="color" value={newEnv.color} onChange={e => setNewEnv({...newEnv, color: e.target.value})} className="w-full h-8 border-2 border-slate-900 rounded cursor-pointer" />
                  </div>
                  <div className="col-span-2 mt-2">
                    <button 
                      onClick={() => {
                        setLocalEnvs(prev => ({...prev, [newEnv.id]: newEnv}));
                        setSelectedEnv(newEnv.id);
                        setNewEnv(null);
                      }}
                      className="w-full bg-[#00C48C] text-slate-900 font-black px-4 py-2 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]"
                    >
                      Salvar Ambiente
                    </button>
                  </div>
                </div>
              ) : localEnvs[selectedEnv] ? (
                <div className="grid grid-cols-2 gap-4 opacity-70">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Nome</label>
                    <input type="text" disabled value={localEnvs[selectedEnv].name} className="border-2 border-slate-900 rounded p-1 font-bold bg-slate-200" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Gravidade (m/s²)</label>
                    <input type="number" disabled value={localEnvs[selectedEnv].gravity} className="border-2 border-slate-900 rounded p-1 font-bold bg-slate-200" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Densidade do Ar (kg/m³)</label>
                    <input type="number" disabled value={localEnvs[selectedEnv].airDensity} className="border-2 border-slate-900 rounded p-1 font-bold bg-slate-200" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase text-slate-700">Cor de Fundo</label>
                    <input type="color" disabled value={localEnvs[selectedEnv].color} className="w-full h-8 border-2 border-slate-900 rounded bg-slate-200" />
                  </div>
                  <div className="col-span-2 text-xs text-center text-slate-500 font-bold mt-2">
                    (Ambientes existentes não podem ser editados)
                  </div>
                </div>
              ) : null}

              <div className="border-t-2 border-slate-900 pt-4 mt-4">
                <h4 className="font-black uppercase text-slate-900 mb-3 text-sm">Importar / Exportar</h4>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleExportJSON(localEnvs, 'ambientes.json')}
                    className="flex-1 bg-white text-slate-900 font-black px-3 py-2 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-xs uppercase"
                  >
                    Exportar JSON
                  </button>
                  <label className="flex-1 bg-white text-slate-900 font-black px-3 py-2 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-xs uppercase text-center cursor-pointer">
                    Importar JSON
                    <input type="file" accept=".json" onChange={handleImportJSONEnvs} className="hidden" />
                  </label>
                </div>
              </div>
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

          {activeTab === 'architecture' && (
            <div className="flex flex-col items-center text-slate-800">
              
              <div className="w-full text-center bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] mb-6">
                <h3 className="text-sm font-black uppercase text-slate-900 mb-1">
                  Arquitetura de Fluxo do Simulador
                </h3>
                <p className="text-[11px] text-slate-600 font-bold max-w-md mx-auto leading-relaxed">
                  Veja como os dados, estados do React e cálculos da física clássica se interconectam em tempo real durante a simulação.
                </p>
              </div>

              {/* Step 1 */}
              <div className="w-full bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] relative">
                <div className="absolute -top-3 left-4 bg-[#FFB800] text-slate-900 border-2 border-slate-900 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                  1. Entrada de Dados
                </div>
                <div className="flex gap-3 items-start mt-1.5">
                  <div className="p-2 bg-amber-50 rounded-lg border-2 border-slate-900 shrink-0">
                    <Settings2 className="w-5 h-5 text-[#FFB800]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase text-slate-900">Configuração Inicial</span>
                      <span className="bg-slate-100 text-slate-500 font-mono text-[9px] px-1.5 py-0.5 rounded border border-slate-200">SettingsDrawer.tsx</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-bold leading-relaxed mt-1">
                      O usuário define os parâmetros iniciais na interface: altura (<code className="font-mono text-slate-900">h₀</code>), gravidade (<code className="font-mono text-slate-900">g</code>), massa (<code className="font-mono text-slate-900">m</code>), coeficiente de arrasto (<code className="font-mono text-slate-900">Cd</code>) e área transversal (<code className="font-mono text-slate-900">A</code>).
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector 1 */}
              <div className="flex flex-col items-center my-3">
                <div className="w-1 h-6 bg-slate-900"></div>
                <ArrowDown className="w-4 h-4 text-slate-900 -mt-1.5" />
              </div>

              {/* Step 2 */}
              <div className="w-full bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] relative">
                <div className="absolute -top-3 left-4 bg-[#0055FF] text-white border-2 border-slate-900 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                  2. Hub de Estado Reativo
                </div>
                <div className="flex gap-3 items-start mt-1.5">
                  <div className="p-2 bg-blue-50 rounded-lg border-2 border-slate-900 shrink-0">
                    <Database className="w-5 h-5 text-[#0055FF]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase text-slate-900">Propagação e Controle</span>
                      <span className="bg-slate-100 text-slate-500 font-mono text-[9px] px-1.5 py-0.5 rounded border border-slate-200">App.tsx</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-bold leading-relaxed mt-1">
                      Concentra os estados reativos da aplicação (<code className="font-mono text-slate-900">config</code>, <code className="font-mono text-slate-900">customObjects</code>) e repassa os parâmetros atualizados para os demais hooks e subcomponentes visuais.
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector 2 */}
              <div className="flex flex-col items-center my-3">
                <div className="w-1 h-6 bg-slate-900"></div>
                <ArrowDown className="w-4 h-4 text-slate-900 -mt-1.5" />
              </div>

              {/* Step 3 */}
              <div className="w-full bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] relative">
                <div className="absolute -top-3 left-4 bg-[#00C48C] text-white border-2 border-slate-900 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                  3. Motor de Cálculo Numérico
                </div>
                <div className="flex gap-3 items-start mt-1.5">
                  <div className="p-2 bg-emerald-50 rounded-lg border-2 border-slate-900 shrink-0">
                    <Cpu className="w-5 h-5 text-[#00C48C]" />
                  </div>
                  <div className="w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase text-slate-900">Loop de Física (Euler)</span>
                      <span className="bg-slate-100 text-slate-500 font-mono text-[9px] px-1.5 py-0.5 rounded border border-slate-200">useEngine.ts</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-bold leading-relaxed mt-1 mb-2">
                      Ao iniciar a queda, executa um ciclo contínuo em passos de <code className="font-mono text-slate-900">dt = 0.02s</code> recalculando instantaneamente:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <div>
                        <span className="text-[#0055FF]">Peso:</span> P = m · g
                      </div>
                      <div>
                        <span className="text-[#FF3366]">Arrasto:</span> Fa = 0.5 · ρ · v² · Cd · A
                      </div>
                      <div>
                        <span className="text-purple-600">Aceleração:</span> a = g - (Fa / m)
                      </div>
                      <div>
                        <span className="text-[#00C48C]">Altura/Velocidade:</span> v += a·dt, y -= v·dt
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector 3 */}
              <div className="flex flex-col items-center my-3">
                <div className="w-1 h-6 bg-slate-900"></div>
                <ArrowDown className="w-4 h-4 text-slate-900 -mt-1.5" />
              </div>

              {/* Step 4 */}
              <div className="w-full bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] relative">
                <div className="absolute -top-3 left-4 bg-[#FF3366] text-white border-2 border-slate-900 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                  4. Renderização Visual
                </div>
                <div className="flex gap-3 items-start mt-1.5">
                  <div className="p-2 bg-rose-50 rounded-lg border-2 border-slate-900 shrink-0">
                    <Eye className="w-5 h-5 text-[#FF3366]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase text-slate-900">Canvas Vetorial Dinâmico</span>
                      <span className="bg-slate-100 text-slate-500 font-mono text-[9px] px-1.5 py-0.5 rounded border border-slate-200">SimulationCanvas.tsx</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-bold leading-relaxed mt-1">
                      Lê os estados de altura e velocidade calculados no motor de física e atualiza o posicionamento gráfico dos objetos na tela, desenhando vetores de força proporcionais.
                    </p>
                  </div>
                </div>
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
