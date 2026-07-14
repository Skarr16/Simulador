const fs = require('fs');
let content = fs.readFileSync('src/components/SettingsDrawer.tsx', 'utf8');

// The objects mapped for objectA select:
// We want to map through customObjects and exclude astronaut if not on earth
const oldSelectA = `                    {Object.values(customObjects)
                    .filter(obj => obj.id !== 'astronaut' || config.environmentId !== 'earth')
                    .map(obj => (
                      <option key={obj.id} value={obj.id}>{obj.name} ({obj.mass}kg{\`, \${obj.area}m²\`})</option>
                    ))}
                  </select>`;

content = content.replace(oldSelectA, `                    {Object.values(customObjects)
                    .filter(obj => (obj.id !== 'astronaut' || config.environmentId !== 'earth') && obj.id !== 'customB')
                    .map(obj => (
                      <option key={obj.id} value={obj.id}>{obj.name} ({obj.mass}kg{\`, \${obj.area}m²\`})</option>
                    ))}
                  </select>`);

const oldSelectB = `                    {Object.values(customObjects)
                    .filter(obj => obj.id !== 'astronaut' || config.environmentId !== 'earth')
                    .map(obj => (
                      <option key={obj.id} value={obj.id}>{obj.name} ({obj.mass}kg{\`, \${obj.area}m²\`})</option>
                    ))}
                  </select>`;
// Since it's identical text, the first replacement replaced the first one. Now we replace the next one.
content = content.replace(oldSelectB, `                    {Object.values(customObjects)
                    .filter(obj => (obj.id !== 'astronaut' || config.environmentId !== 'earth') && obj.id !== 'customA')
                    .map(obj => (
                      <option key={obj.id} value={obj.id}>{obj.name} ({obj.mass}kg{\`, \${obj.area}m²\`})</option>
                    ))}
                  </select>`);

content = content.replace(/customObjects\.custom\.mass/g, "customObjects.customA.mass");
content = content.replace(/customObjects\.custom\.area/g, "customObjects.customA.area");
content = content.replace(/customObjects\.custom\.cd/g, "customObjects.customA.cd");
// carefully replace customObjects, custom: { ...customObjects.custom, mass... } to customA.
content = content.replace(/customObjects, custom: { \.\.\.customObjects\.custom, mass/g, "customObjects, customA: { ...customObjects.customA, mass");
content = content.replace(/customObjects, custom: { \.\.\.customObjects\.custom, area/g, "customObjects, customA: { ...customObjects.customA, area");
content = content.replace(/customObjects, custom: { \.\.\.customObjects\.custom, cd/g, "customObjects, customA: { ...customObjects.customA, cd");
content = content.replace(/config\.objectAId === 'custom'/g, "config.objectAId === 'customA'");
content = content.replace(/customObjects\.custom/g, "customObjects.customA");


const customBBlock = `
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
                  )}`;

// Wait, I need to replace config.objectBId === 'custom' with config.objectBId === 'customB'
// Actually I already replaced `config.objectBId === 'custom'` earlier? No I only replaced objectAId.
content = content.replace(
  /{config.objectBId === 'custom' && customObjects\.customA && \([\s\S]*?\}\)}/,
  customBBlock
);

fs.writeFileSync('src/components/SettingsDrawer.tsx', content);
