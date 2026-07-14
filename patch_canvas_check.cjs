const fs = require('fs');
let content = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const oldCode = `  const maxVelAllowed = Math.sqrt(2 * 9.81 * 100); 
  const getVelScale = (v: number) => (v / maxVelAllowed) * 60; 
   
  const P_A = objectA.mass * env.g;
  const P_B = objectB.mass * env.g;`;

const newCode = `  const maxVelAllowed = Math.sqrt(2 * 9.81 * 100); 
  const getVelScale = (v: number) => (v / maxVelAllowed) * 60; 
   
  if (!objectA || !objectB) return null;

  const P_A = objectA.mass * env.g;
  const P_B = objectB.mass * env.g;`;

content = content.replace(oldCode, newCode);
fs.writeFileSync('src/components/SimulationCanvas.tsx', content);
