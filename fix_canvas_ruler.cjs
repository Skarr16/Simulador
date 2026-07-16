const fs = require('fs');
let codeCanvas = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

// Insert the vertical line inside the ruler container
// Find `<div className="absolute top-0 bottom-[10%] left-0 right-0 pointer-events-none z-10">`
const searchTarget = '<div className="absolute top-0 bottom-[10%] left-0 right-0 pointer-events-none z-10">';
const replaceTarget = searchTarget + `
        {/* Ruler Vertical Spine */}
        <div className={\`absolute top-[45%] bottom-[10%] left-[20px] sm:left-[28px] w-[3px] \${env.id === 'moon' ? 'bg-white' : env.id === 'custom' ? 'bg-[#451004]' : 'bg-slate-900'} z-0\`}></div>`;

codeCanvas = codeCanvas.replace(searchTarget, replaceTarget);
fs.writeFileSync('src/components/SimulationCanvas.tsx', codeCanvas);
