const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsDrawer.tsx', 'utf8');

code = code.replace(/if \(e\.target\.value === 'moon'\) \{\s*nextObjectA = 'astronaut';\s*if \(config\.simulationMode === 'paraquedas'\) nextObjectB = 'astronaut';\s*\} else if \(e\.target\.value === 'custom'\) \{\s*nextObjectA = 'et';\s*if \(config\.simulationMode === 'paraquedas'\) nextObjectB = 'et';\s*\} else if \(e\.target\.value === 'earth'\) \{\s*nextObjectA = config\.simulationMode === 'paraquedas' \? 'skydiver' : 'bowling';\s*if \(config\.simulationMode === 'paraquedas'\) nextObjectB = 'skydiver';\s*\}/g, `if (config.simulationMode === 'paraquedas') {
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
                    }`);

fs.writeFileSync('src/components/SettingsDrawer.tsx', code);
