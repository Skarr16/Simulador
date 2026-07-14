const fs = require('fs');
let content = fs.readFileSync('src/components/SettingsDrawer.tsx', 'utf8');

const oldSelectA = `{Object.values(customObjects)
                    .filter(obj => obj.id !== 'astronaut' || config.environmentId !== 'earth')
                    .map(obj => (
                    <option key={obj.id} value={obj.id}>{obj.name} ({obj.mass}kg{\`, \${obj.area}m²\`})</option>
                  ))}`;

const newSelectA = `{Object.values(customObjects)
                    .filter(obj => (obj.id !== 'astronaut' || config.environmentId !== 'earth') && obj.id !== 'customB')
                    .map(obj => (
                    <option key={obj.id} value={obj.id}>{obj.name} ({obj.mass}kg{\`, \${obj.area}m²\`})</option>
                  ))}`;

content = content.replace(oldSelectA, newSelectA);

const oldSelectB = `{Object.values(customObjects)
                    .filter(obj => (obj.id !== 'astronaut' || config.environmentId !== 'earth') && obj.id !== 'customB')
                    .map(obj => (
                      <option key={obj.id} value={obj.id}>{obj.name} ({obj.mass}kg{\`, \${obj.area}m²\`})</option>
                    ))}`;

const newSelectB = `{Object.values(customObjects)
                    .filter(obj => (obj.id !== 'astronaut' || config.environmentId !== 'earth') && obj.id !== 'customA')
                    .map(obj => (
                      <option key={obj.id} value={obj.id}>{obj.name} ({obj.mass}kg{\`, \${obj.area}m²\`})</option>
                    ))}`;

content = content.replace(oldSelectB, newSelectB);

fs.writeFileSync('src/components/SettingsDrawer.tsx', content);
