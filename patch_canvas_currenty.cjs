const fs = require('fs');
let content = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const oldStart = `        const renderObject = (obj: PhysicsObject, letter: string, isFalling: boolean, parachuteDeployed?: boolean) => {
          let content = null;`;
const newStart = `        const renderObject = (obj: PhysicsObject, letter: string, isFalling: boolean, parachuteDeployed?: boolean) => {
          let content = null;
          const currentY = letter === 'A' ? yA : yB;`;

content = content.replace(oldStart, newStart);
content = content.replace("             const currentY = letter === 'A' ? yA : yB;\n", "");
content = content.replace("             const currentY = letter === 'A' ? yA : yB;\n", "");

fs.writeFileSync('src/components/SimulationCanvas.tsx', content);
