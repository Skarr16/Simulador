import React from 'react';
import { X, Settings2, Wind, Globe2, Building2 } from 'lucide-react';
import { SimulationConfig, PhysicsObject, Environment } from '../types';
import { STRUCTURES } from '../lib/constants';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: SimulationConfig;
  setConfig: (config: SimulationConfig) => void;
  toggles: { vectors: boolean; graphs: boolean; table: boolean; devMode: boolean; showHeights: boolean; showGravity: boolean; crashAlert?: boolean; };
  setToggles: (toggles: { vectors: boolean; graphs: boolean; table: boolean; devMode: boolean; showHeights: boolean; showGravity: boolean; crashAlert?: boolean; }) => void;
  disabled: boolean;
  customObjects: Record<string, PhysicsObject>;
  setCustomObjects: (objects: Record<string, PhysicsObject>) => void;
  customEnvs: Record<string, Environment>;
  setCustomEnvs: (envs: Record<string, Environment>) => void;
}

export function SettingsDrawer({ isOpen, onClose, config, setConfig, toggles, setToggles, disabled, customObjects, setCustomObjects, customEnvs, setCustomEnvs }: SettingsDrawerProps) {
  const handleStructureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const structureId = e.target.value;
    const structure = STRUCTURES[structureId];
    setConfig({ ...config, structureId, height: structure.height });
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, height: Number(e.target.value), structureId: 'custom' });
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[200] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white border-l-[3px] border-slate-900 shadow-[-8px_0px_0px_0px_rgba(15,23,42,0.1)] z-[210] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex items-center justify-between p-6 border-b-[3px] border-slate-900 bg-[#FFB800]">
          <div className="flex items-center gap-3">
            <Settings2 className="w-6 h-6 text-slate-900" />
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Configurações</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-black/10 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-slate-900" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#F4F1EB]">
          
          {/* Environment & Physics */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase">
              <Globe2 className="w-4 h-4" /> Ambiente & Local
            </h3>
            
            <div className="bg-white p-4 rounded-xl border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-500 mb-2 uppercase">Locais</label>
                <select 
                  value={config.environmentId}
                  onChange={(e) => {
                    let nextObjectA = config.objectAId;
                    let nextObjectB = config.objectBId;
                    if (config.simulationMode === 'paraquedas') {
                      if (e.target.value === 'moon') {
                        nextObjectA = 'astronaut';
                        nextObjectB = 'astronaut';
                      } else if (e.target.value === 'custom') {
                        nextObjectA = 'et';
                        nextObjectB = 'et';
                      } else if (e.target.value === 'earth') {
                        nextObjectA = 'skydiver';
                        nextObjectB = 'skydiver';
                      }
                    } else {
                       if (e.target.value === 'earth' && config.objectAId === 'astronaut') {
                         nextObjectA = 'bowling';
                       }
                       if (e.target.value === 'earth' && config.objectBId === 'astronaut') {
                         nextObjectB = 'soccer';
                       }
                    }

                    let nextEnableAirResistance = config.enableAirResistance;
                    if (e.target.value === 'moon') {
                      nextEnableAirResistance = false;
                    } else if (config.environmentId === 'moon') {
                      // Se estava na lua e mudou para outro lugar, reativamos
                      nextEnableAirResistance = true;
                    }

                    setConfig({ ...config, environmentId: e.target.value, objectAId: nextObjectA, objectBId: nextObjectB, enableAirResistance: nextEnableAirResistance });
                  }}
                  disabled={disabled}
                  className="w-full bg-[#F4F1EB] border-2 border-slate-900 rounded-lg p-2 font-bold outline-none focus:ring-2 focus:ring-[#0055FF] disabled:opacity-50"
                >
                  {Object.values(customEnvs).map(env => (
                    <option key={env.id} value={env.id}>{env.name} (g={env.g} m/s²)</option>
                  ))}
                </select>
              </div>

              {config.environmentId === 'custom' && (
                <div className="space-y-3 bg-slate-50 p-3 rounded-lg border-2 border-slate-200">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-black text-slate-500 uppercase">Gravidade (m/s²)</label>
                    <input 
                      type="number"
                      step="0.01"
                      value={customEnvs.custom.g}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) {
                          setCustomEnvs({
                            ...customEnvs,
                            custom: { ...customEnvs.custom, g: val }
                          });
                        }
                      }}
                      disabled={disabled}
                      className="w-20 bg-white border-2 border-slate-900 rounded-lg px-2 py-1 text-right font-mono font-black text-xs outline-none focus:ring-2 focus:ring-[#0055FF] disabled:opacity-50"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="0.1"
                    value={customEnvs.custom.g}
                    onChange={(e) => {
                      setCustomEnvs({
                        ...customEnvs,
                        custom: { ...customEnvs.custom, g: Number(e.target.value) }
                      });
                    }}
                    disabled={disabled}
                    className="w-full accent-slate-900"
                  />
                  
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-black text-slate-500 uppercase">Dens. do Ar (kg/m³)</label>
                    <input 
                      type="number"
                      step="0.01"
                      value={customEnvs.custom.rho}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) {
                          setCustomEnvs({
                            ...customEnvs,
                            custom: { ...customEnvs.custom, rho: val }
                          });
                        }
                      }}
                      disabled={disabled}
                      className="w-20 bg-white border-2 border-slate-900 rounded-lg px-2 py-1 text-right font-mono font-black text-xs outline-none focus:ring-2 focus:ring-[#0055FF] disabled:opacity-50"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.05"
                    value={customEnvs.custom.rho}
                    onChange={(e) => {
                      setCustomEnvs({
                        ...customEnvs,
                        custom: { ...customEnvs.custom, rho: Number(e.target.value) }
                      });
                    }}
                    disabled={disabled}
                    className="w-full accent-slate-900"
                  />
                </div>
              )}

              <div>
                  <label className="block text-xs font-black text-slate-500 mb-2 uppercase">Alturas / Estruturas</label>
                  <select 
                    value={config.structureId}
                    onChange={handleStructureChange}
                    disabled={disabled}
                    className="w-full bg-[#F4F1EB] border-2 border-slate-900 rounded-lg p-2 font-bold outline-none focus:ring-2 focus:ring-[#0055FF] disabled:opacity-50"
                  >
                    {Object.values(STRUCTURES).map(struct => (
                      <option key={struct.id} value={struct.id}>{struct.id === 'custom' ? struct.name : `${struct.name} (${struct.height}m)`}</option>
                    ))}
                  </select>
                </div>

              {config.structureId === 'custom' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-black text-slate-900 uppercase">Altura Inicial Manual</label>
                    <div className="flex items-center gap-1">
                      <input 
                        type="number" 
                        min={config.simulationMode === 'paraquedas' ? "1000" : "10"} 
                        max={config.simulationMode === 'paraquedas' ? "10000" : "10000"} 
                        value={config.height || ''} 
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (!isNaN(val)) {
                            setConfig({ ...config, height: val, structureId: 'custom' });
                          } else {
                            setConfig({ ...config, height: 0, structureId: 'custom' });
                          }
                        }}
                        className="w-20 bg-[#F4F1EB] border-2 border-slate-900 rounded-lg px-2 py-1 text-right font-mono font-black text-xs outline-none focus:ring-2 focus:ring-[#0055FF] disabled:opacity-50"
                        disabled={disabled} 
                      />
                      <span className="text-xs font-black text-slate-900">m</span>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min={config.simulationMode === 'paraquedas' ? "1000" : "10"} 
                    max={config.simulationMode === 'paraquedas' ? "10000" : "200"} 
                    step={config.simulationMode === 'paraquedas' ? "500" : "1"} 
                    value={config.height || 0} 
                    onChange={handleHeightChange} 
                    className="w-full accent-slate-900" 
                    disabled={disabled} 
                  />
                  <div className="text-right text-xs font-mono font-bold text-slate-500 mt-1">Valor atual: {config.height} m</div>
                </div>
              )}

              <div>
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-slate-700" />
                    <span className={`text-sm font-black uppercase ${customEnvs[config.environmentId].rho === 0 ? 'text-slate-400 line-through' : 'text-slate-900'}`}>Resistência do Ar</span>
                  </div>
                  <div className={`w-12 h-6 flex items-center border-2 border-slate-900 rounded-full p-0.5 transition-colors ${config.enableAirResistance && customEnvs[config.environmentId].rho > 0 ? 'bg-[#00C48C]' : 'bg-slate-200'}`}>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={config.enableAirResistance && customEnvs[config.environmentId].rho > 0}
                      onChange={(e) => setConfig({ ...config, enableAirResistance: e.target.checked })}
                      disabled={disabled || customEnvs[config.environmentId].rho === 0} 
                    />
                    <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform ${(config.enableAirResistance && customEnvs[config.environmentId].rho > 0) ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'}`} />
                  </div>
                </label>
                {customEnvs[config.environmentId].rho === 0 && (
                  <p className="text-xs text-slate-500 mt-2 font-medium">Não há atmosfera neste local.</p>
                )}
              </div>
            </div>
          </section>

          {/* Objects */}
          <section className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase flex items-center justify-between">
              <span>Objetos em Queda</span>
              <span className="text-[10px] font-bold text-slate-500 normal-case bg-slate-100 px-2 py-1 rounded-md border border-slate-200">Formato: Nome (Massa, Área)</span>
            </h3>
            
            <div className="bg-white p-4 rounded-xl border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] space-y-4">
              <div>
                <label className="block text-xs font-black text-[#FF3366] mb-2 uppercase">
                  {config.simulationMode === 'paraquedas' ? 'Objeto em Queda' : 'Objeto A (Esquerda)'}
                </label>
                <select 
                  value={config.objectAId}
                  onChange={(e) => setConfig({ ...config, objectAId: e.target.value })}
                  disabled={disabled}
                  className="w-full bg-[#F4F1EB] border-2 border-slate-900 rounded-lg p-2 font-bold outline-none focus:ring-2 focus:ring-[#FF3366] disabled:opacity-50"
                >
                  {Object.values(customObjects)
                    .filter(obj => obj.id !== 'customB')
                    .map(obj => (
                    <option key={obj.id} value={obj.id}>{obj.name} ({obj.mass}kg{`, ${obj.area}m²`})</option>
                  ))}
                </select>
                {config.objectAId === 'skydiver' && (
                   <div className="mt-3 p-3 bg-slate-50 border-2 border-slate-200 rounded-lg space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Massa da Pessoa</label>
                          <div className="flex items-center gap-2">
                             <input 
                                type="number"
                                min="1"
                                value={customObjects.skydiver.personMass || ''}
                                onChange={(e) => {
                                  const pMass = parseFloat(e.target.value) || 0;
                                  const eMass = customObjects.skydiver.equipmentMass || 0;
                                  setCustomObjects({ ...customObjects, skydiver: { ...customObjects.skydiver, personMass: pMass, mass: pMass + eMass }})
                                }}
                                disabled={disabled}
                                className="w-full p-1.5 border-2 border-slate-300 rounded font-mono text-sm outline-none focus:border-[#FF3366] disabled:opacity-50"
                             />
                             <span className="text-xs font-black text-slate-500">kg</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Massa do Equip.</label>
                          <div className="flex items-center gap-2">
                             <input 
                                type="number"
                                min="0"
                                value={customObjects.skydiver.equipmentMass || ''}
                                onChange={(e) => {
                                  const eMass = parseFloat(e.target.value) || 0;
                                  const pMass = customObjects.skydiver.personMass || 0;
                                  setCustomObjects({ ...customObjects, skydiver: { ...customObjects.skydiver, equipmentMass: eMass, mass: pMass + eMass }})
                                }}
                                disabled={disabled}
                                className="w-full p-1.5 border-2 border-slate-300 rounded font-mono text-sm outline-none focus:border-[#FF3366] disabled:opacity-50"
                             />
                             <span className="text-xs font-black text-slate-500">kg</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Área do Corpo (Queda Livre)</label>
                        <div className="flex items-center gap-2">
                           <input 
                              type="number"
                              step="0.1"
                              min="0.1"
                              value={customObjects.skydiver.area || ''}
                              onChange={(e) => setCustomObjects({ ...customObjects, skydiver: { ...customObjects.skydiver, area: parseFloat(e.target.value) || 0 }})}
                              disabled={disabled}
                              className="w-full p-1.5 border-2 border-slate-300 rounded font-mono text-sm outline-none focus:border-[#FF3366] disabled:opacity-50"
                           />
                           <span className="text-xs font-black text-slate-500">m²</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Área do Paraquedas (Aberto)</label>
                        <div className="flex items-center gap-2">
                           <input 
                              type="number"
                              step="0.1"
                              min="0.1"
                              value={customObjects.skydiver.parachuteArea || ''}
                              onChange={(e) => setCustomObjects({ ...customObjects, skydiver: { ...customObjects.skydiver, parachuteArea: parseFloat(e.target.value) || 0 }})}
                              disabled={disabled}
                              className="w-full p-1.5 border-2 border-slate-300 rounded font-mono text-sm outline-none focus:border-[#FF3366] disabled:opacity-50"
                           />
                           <span className="text-xs font-black text-slate-500">m²</span>
                        </div>
                      </div>
                   </div>
                )}

                {config.objectAId === 'customA' && customObjects.customA && (
                   <div className="mt-3 p-3 bg-slate-50 border-2 border-slate-200 rounded-lg space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Massa</label>
                        <div className="flex items-center gap-2">
                          <input
                             type="number" step="0.1" min="0.1"
                             value={customObjects.customA.mass || ''}
                             onChange={(e) => setCustomObjects({ ...customObjects, customA: { ...customObjects.customA, mass: parseFloat(e.target.value) || 0 }})}
                             disabled={disabled}
                             className="w-full p-1.5 border-2 border-slate-300 rounded font-mono text-sm outline-none focus:border-[#FF3366] disabled:opacity-50"
                          />
                          <span className="text-xs font-black text-slate-500">kg</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Área</label>
                        <div className="flex items-center gap-2">
                          <input
                             type="number" step="0.01" min="0.01"
                             value={customObjects.customA.area || ''}
                             onChange={(e) => setCustomObjects({ ...customObjects, customA: { ...customObjects.customA, area: parseFloat(e.target.value) || 0 }})}
                             disabled={disabled}
                             className="w-full p-1.5 border-2 border-slate-300 rounded font-mono text-sm outline-none focus:border-[#FF3366] disabled:opacity-50"
                          />
                          <span className="text-xs font-black text-slate-500">m²</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Coef. Arrasto (Cd)</label>
                        <input
                           type="number" step="0.01" min="0.01"
                           value={customObjects.customA.cd || ''}
                           onChange={(e) => setCustomObjects({ ...customObjects, customA: { ...customObjects.customA, cd: parseFloat(e.target.value) || 0 }})}
                           disabled={disabled}
                           className="w-full p-1.5 border-2 border-slate-300 rounded font-mono text-sm outline-none focus:border-[#FF3366] disabled:opacity-50"
                        />
                      </div>
                   </div>
                )}
              </div>

              {config.simulationMode !== 'paraquedas' && (
                <div>
                  <label className="block text-xs font-black text-[#0055FF] mb-2 uppercase">Objeto B (Direita)</label>
                  <select 
                    value={config.objectBId}
                    onChange={(e) => setConfig({ ...config, objectBId: e.target.value })}
                    disabled={disabled}
                    className="w-full bg-[#F4F1EB] border-2 border-slate-900 rounded-lg p-2 font-bold outline-none focus:ring-2 focus:ring-[#0055FF] disabled:opacity-50"
                  >
                    {Object.values(customObjects)
                    .filter(obj => obj.id !== 'customA')
                    .map(obj => (
                      <option key={obj.id} value={obj.id}>{obj.name} ({obj.mass}kg{`, ${obj.area}m²`})</option>
                    ))}
                  </select>
                  {config.objectBId === 'skydiver' && (
                     <div className="mt-3 p-3 bg-slate-50 border-2 border-slate-200 rounded-lg space-y-3">
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Massa da Pessoa</label>
                            <div className="flex items-center gap-2">
                               <input 
                                  type="number"
                                  min="1"
                                  value={customObjects.skydiver.personMass || ''}
                                  onChange={(e) => {
                                    const pMass = parseFloat(e.target.value) || 0;
                                    const eMass = customObjects.skydiver.equipmentMass || 0;
                                    setCustomObjects({ ...customObjects, skydiver: { ...customObjects.skydiver, personMass: pMass, mass: pMass + eMass }})
                                  }}
                                  disabled={disabled}
                                  className="w-full p-1.5 border-2 border-slate-300 rounded font-mono text-sm outline-none focus:border-[#0055FF] disabled:opacity-50"
                               />
                               <span className="text-xs font-black text-slate-500">kg</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Massa do Equip.</label>
                            <div className="flex items-center gap-2">
                               <input 
                                  type="number"
                                  min="0"
                                  value={customObjects.skydiver.equipmentMass || ''}
                                  onChange={(e) => {
                                    const eMass = parseFloat(e.target.value) || 0;
                                    const pMass = customObjects.skydiver.personMass || 0;
                                    setCustomObjects({ ...customObjects, skydiver: { ...customObjects.skydiver, equipmentMass: eMass, mass: pMass + eMass }})
                                  }}
                                  disabled={disabled}
                                  className="w-full p-1.5 border-2 border-slate-300 rounded font-mono text-sm outline-none focus:border-[#0055FF] disabled:opacity-50"
                               />
                               <span className="text-xs font-black text-slate-500">kg</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Área do Corpo (Queda Livre)</label>
                          <div className="flex items-center gap-2">
                             <input 
                                type="number"
                                step="0.1"
                                min="0.1"
                                value={customObjects.skydiver.area || ''}
                                onChange={(e) => setCustomObjects({ ...customObjects, skydiver: { ...customObjects.skydiver, area: parseFloat(e.target.value) || 0 }})}
                                disabled={disabled}
                                className="w-full p-1.5 border-2 border-slate-300 rounded font-mono text-sm outline-none focus:border-[#0055FF] disabled:opacity-50"
                             />
                             <span className="text-xs font-black text-slate-500">m²</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Área do Paraquedas (Aberto)</label>
                          <div className="flex items-center gap-2">
                             <input 
                                type="number"
                                step="0.1"
                                min="0.1"
                                value={customObjects.skydiver.parachuteArea || ''}
                                onChange={(e) => setCustomObjects({ ...customObjects, skydiver: { ...customObjects.skydiver, parachuteArea: parseFloat(e.target.value) || 0 }})}
                                disabled={disabled}
                                className="w-full p-1.5 border-2 border-slate-300 rounded font-mono text-sm outline-none focus:border-[#0055FF] disabled:opacity-50"
                             />
                             <span className="text-xs font-black text-slate-500">m²</span>
                          </div>
                        </div>
                     </div>
                  )}

                  
                  {config.objectBId === 'customB' && customObjects.customB && (
                   <div className="mt-3 p-3 bg-slate-50 border-2 border-slate-200 rounded-lg space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Massa</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" step="0.1" min="0.1"
                            value={customObjects.customB.mass || ''}
                            onChange={(e) => setCustomObjects({ ...customObjects, customB: { ...customObjects.customB, mass: parseFloat(e.target.value) || 0 }})}
                            disabled={disabled}
                            className="w-full p-1.5 border-2 border-slate-300 rounded font-mono text-sm outline-none focus:border-[#0055FF] disabled:opacity-50"
                          />
                          <span className="text-xs font-black text-slate-500">kg</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Área</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" step="0.01" min="0.01"
                            value={customObjects.customB.area || ''}
                            onChange={(e) => setCustomObjects({ ...customObjects, customB: { ...customObjects.customB, area: parseFloat(e.target.value) || 0 }})}
                            disabled={disabled}
                            className="w-full p-1.5 border-2 border-slate-300 rounded font-mono text-sm outline-none focus:border-[#0055FF] disabled:opacity-50"
                          />
                          <span className="text-xs font-black text-slate-500">m²</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Coef. Arrasto (Cd)</label>
                        <input 
                          type="number" step="0.01" min="0.01"
                          value={customObjects.customB.cd || ''}
                          onChange={(e) => setCustomObjects({ ...customObjects, customB: { ...customObjects.customB, cd: parseFloat(e.target.value) || 0 }})}
                          disabled={disabled}
                          className="w-full p-1.5 border-2 border-slate-300 rounded font-mono text-sm outline-none focus:border-[#0055FF] disabled:opacity-50"
                        />
                      </div>
                   </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Interface options */}
          <section className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase">Interface & Exibição</h3>
            <div className="bg-white p-4 rounded-xl border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col gap-3">

              <button 
                type="button"
                onClick={() => setToggles({ ...toggles, crashAlert: toggles.crashAlert === false ? true : false })}
                className="flex items-center justify-between w-full hover:bg-slate-50 p-2 rounded-lg transition-colors text-left"
              >
                <span className="text-sm font-black uppercase text-slate-700">Alerta de Paraquedista</span>
                <div className={`w-12 h-6 flex items-center border-2 border-slate-900 rounded-full p-0.5 transition-colors ${toggles.crashAlert !== false ? 'bg-[#00C48C]' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform ${toggles.crashAlert !== false ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'}`} />
                </div>
              </button>

              <button 
                type="button"
                onClick={() => setToggles({ ...toggles, vectors: !toggles.vectors })}
                className="flex items-center justify-between w-full hover:bg-slate-50 p-2 rounded-lg transition-colors text-left"
              >
                <span className="text-sm font-black uppercase text-slate-700">Vetores de Força</span>
                <div className={`w-12 h-6 flex items-center border-2 border-slate-900 rounded-full p-0.5 transition-colors ${toggles.vectors ? 'bg-[#00C48C]' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform ${toggles.vectors ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'}`} />
                </div>
              </button>
              <button 
                type="button"
                onClick={() => setToggles({ ...toggles, graphs: !toggles.graphs })}
                className="flex items-center justify-between w-full hover:bg-slate-50 p-2 rounded-lg transition-colors text-left"
              >
                <span className="text-sm font-black uppercase text-slate-700">Gráficos de Queda</span>
                <div className={`w-12 h-6 flex items-center border-2 border-slate-900 rounded-full p-0.5 transition-colors ${toggles.graphs ? 'bg-[#00C48C]' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform ${toggles.graphs ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'}`} />
                </div>
              </button>
              <button 
                type="button"
                onClick={() => setToggles({ ...toggles, table: !toggles.table })}
                className="flex items-center justify-between w-full hover:bg-slate-50 p-2 rounded-lg transition-colors text-left"
              >
                <span className="text-sm font-black uppercase text-slate-700">Tabela de Dados</span>
                <div className={`w-12 h-6 flex items-center border-2 border-slate-900 rounded-full p-0.5 transition-colors ${toggles.table ? 'bg-[#00C48C]' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform ${toggles.table ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'}`} />
                </div>
              </button>
              <button 
                type="button"
                onClick={() => setToggles({ ...toggles, showHeights: !toggles.showHeights })}
                className="flex items-center justify-between w-full hover:bg-slate-50 p-2 rounded-lg transition-colors text-left"
              >
                <span className="text-sm font-black uppercase text-slate-700">Mostrar Alturas</span>
                <div className={`w-12 h-6 flex items-center border-2 border-slate-900 rounded-full p-0.5 transition-colors ${toggles.showHeights ? 'bg-[#00C48C]' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform ${toggles.showHeights ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'}`} />
                </div>
              </button>
              <button 
                type="button"
                onClick={() => setToggles({ ...toggles, showGravity: !toggles.showGravity })}
                className="flex items-center justify-between w-full hover:bg-slate-50 p-2 rounded-lg transition-colors text-left"
              >
                <span className="text-sm font-black uppercase text-slate-700">Mostrar Gravidade</span>
                <div className={`w-12 h-6 flex items-center border-2 border-slate-900 rounded-full p-0.5 transition-colors ${toggles.showGravity ? 'bg-[#00C48C]' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform ${toggles.showGravity ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'}`} />
                </div>
              </button>
              
              <button 
                type="button"
                onClick={() => setToggles({ ...toggles, devMode: !toggles.devMode })}
                className="flex items-center justify-between w-full hover:bg-slate-50 p-2 rounded-lg transition-colors text-left"
              >
                <span className="text-sm font-black uppercase text-slate-700">Modo Desenvolvedor (Estruturas)</span>
                <div className={`w-12 h-6 flex items-center border-2 border-slate-900 rounded-full p-0.5 transition-colors ${toggles.devMode ? 'bg-[#FF3366]' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform ${toggles.devMode ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'}`} />
                </div>
              </button>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
