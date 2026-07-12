import React from 'react';
import { X, Settings2, Wind, Globe2, Building2 } from 'lucide-react';
import { SimulationConfig, PhysicsObject, Environment } from '../types';
import { STRUCTURES } from '../lib/constants';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: SimulationConfig;
  setConfig: (config: SimulationConfig) => void;
  toggles: { vectors: boolean; graphs: boolean; table: boolean; devMode: boolean; showHeights: boolean; showGravity: boolean; };
  setToggles: (toggles: { vectors: boolean; graphs: boolean; table: boolean; devMode: boolean; showHeights: boolean; showGravity: boolean; }) => void;
  disabled: boolean;
  customObjects: Record<string, PhysicsObject>;
  customEnvs: Record<string, Environment>;
}

export function SettingsDrawer({ isOpen, onClose, config, setConfig, toggles, setToggles, disabled, customObjects, customEnvs }: SettingsDrawerProps) {
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
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white border-l-[3px] border-slate-900 shadow-[-8px_0px_0px_0px_rgba(15,23,42,0.1)] z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
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
                    if (e.target.value !== 'moon') {
                      if (nextObjectA === 'astronaut') nextObjectA = config.simulationMode === 'paraquedas' ? 'skydiver' : 'bowling';
                      if (nextObjectB === 'astronaut') nextObjectB = config.simulationMode === 'paraquedas' ? 'skydiver' : 'bowling';
                    }
                    
                    let nextEnableAirResistance = config.enableAirResistance;
                    if (e.target.value === 'moon') nextEnableAirResistance = false;

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

              {config.simulationMode !== 'paraquedas' && (
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
              )}

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
            <h3 className="text-sm font-black text-slate-900 uppercase">Objetos em Queda</h3>
            
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
                    .filter(obj => obj.id !== 'astronaut' || config.environmentId === 'moon')
                    .map(obj => (
                    <option key={obj.id} value={obj.id}>{obj.name} ({obj.mass}kg)</option>
                  ))}
                </select>
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
                      .filter(obj => obj.id !== 'astronaut' || config.environmentId === 'moon')
                      .map(obj => (
                      <option key={obj.id} value={obj.id}>{obj.name} ({obj.mass}kg)</option>
                    ))}
                  </select>
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
              <div className="h-px bg-slate-200 w-full my-2"></div>
              <button 
                type="button"
                onClick={() => setToggles({ ...toggles, devMode: !toggles.devMode })}
                className="flex items-center justify-between w-full hover:bg-slate-50 p-2 rounded-lg transition-colors text-left"
              >
                <span className="text-sm font-black uppercase text-[#FF3366]">Modo Desenvolvedor</span>
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
