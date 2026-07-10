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
}

export function AdminModal({ isOpen, onClose, customObjects, setCustomObjects, customEnvs, setCustomEnvs }: AdminModalProps) {
  const [localObjects, setLocalObjects] = useState(customObjects);
  const [localEnvs, setLocalEnvs] = useState(customEnvs);
  const [activeTab, setActiveTab] = useState<'objects' | 'envs'>('objects');
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
        <div className="flex border-b-4 border-slate-900">
          <button 
            className={`flex-1 p-3 font-black uppercase text-sm ${activeTab === 'objects' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            onClick={() => setActiveTab('objects')}
          >
            Objetos
          </button>
          <button 
            className={`flex-1 p-3 font-black uppercase text-sm border-l-4 border-slate-900 ${activeTab === 'envs' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            onClick={() => setActiveTab('envs')}
          >
            Ambientes
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
                  {Object.values(localObjects).map(obj => (
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
                    <label className="text-xs font-black uppercase text-slate-700">Tamanho Relativo (px)</label>
                    <input type="number" value={localObjects[selectedObj].radius} onChange={e => updateObject(selectedObj, 'radius', Number(e.target.value))} className="border-2 border-slate-900 rounded p-1 font-bold" />
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
                  {Object.values(localEnvs).map(env => (
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
