const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace("const [customObjects, setCustomObjects] = useState(OBJECTS);", "const [customObjects, setCustomObjects] = useState(OBJECTS);");
content = content.replace("objectAId: 'bowling',", "objectAId: 'bowling',");
content = content.replace("objectBId: 'soccer',", "objectBId: 'soccer',");

// The alert should work in all environments, so we need to remove the condition 'config.environmentId === earth'
const oldAlertLogic = `if (config.simulationMode === 'paraquedas' && engine.isRunning && config.environmentId === 'earth') {`;
const newAlertLogic = `if (config.simulationMode === 'paraquedas' && engine.isRunning) {`;

content = content.replace(oldAlertLogic, newAlertLogic);

fs.writeFileSync('src/App.tsx', content);
