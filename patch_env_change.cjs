const fs = require('fs');

function patchFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  // We find the block of env change.
  // In SettingsDrawer: `if (e.target.value !== 'moon') { ... }`
  // In App: `if (nextEnvId !== 'moon') { ... }`

  const appOld = `                  if (nextEnvId !== 'moon') {
                    if (nextObjectA === 'astronaut') nextObjectA = config.simulationMode === 'paraquedas' ? 'skydiver' : 'bowling';
                    if (nextObjectB === 'astronaut') nextObjectB = config.simulationMode === 'paraquedas' ? 'skydiver' : 'bowling';
                  }`;
                  
  const appNew = `                  if (nextEnvId === 'moon') {
                    nextObjectA = 'astronaut';
                    if (config.simulationMode === 'paraquedas') nextObjectB = 'astronaut';
                  } else if (nextEnvId === 'custom') {
                    nextObjectA = 'et';
                    if (config.simulationMode === 'paraquedas') nextObjectB = 'et';
                  } else if (nextEnvId === 'earth') {
                    nextObjectA = config.simulationMode === 'paraquedas' ? 'skydiver' : 'bowling';
                    if (config.simulationMode === 'paraquedas') nextObjectB = 'skydiver';
                  }`;
                  
  if (content.includes(appOld)) {
      content = content.replace(appOld, appNew);
  }
  
  const sdOld = `                    if (e.target.value !== 'moon') {
                      if (nextObjectA === 'astronaut') nextObjectA = config.simulationMode === 'paraquedas' ? 'skydiver' : 'bowling';
                      if (nextObjectB === 'astronaut') nextObjectB = config.simulationMode === 'paraquedas' ? 'skydiver' : 'bowling';
                    }`;
  const sdNew = `                    if (e.target.value === 'moon') {
                      nextObjectA = 'astronaut';
                      if (config.simulationMode === 'paraquedas') nextObjectB = 'astronaut';
                    } else if (e.target.value === 'custom') {
                      nextObjectA = 'et';
                      if (config.simulationMode === 'paraquedas') nextObjectB = 'et';
                    } else if (e.target.value === 'earth') {
                      nextObjectA = config.simulationMode === 'paraquedas' ? 'skydiver' : 'bowling';
                      if (config.simulationMode === 'paraquedas') nextObjectB = 'skydiver';
                    }`;

  if (content.includes(sdOld)) {
      content = content.replace(sdOld, sdNew);
  }

  fs.writeFileSync(file, content);
}

patchFile('src/App.tsx');
patchFile('src/components/SettingsDrawer.tsx');
