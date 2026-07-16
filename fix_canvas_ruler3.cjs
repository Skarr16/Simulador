const fs = require('fs');
let codeCanvas = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const targetA = '{/* A Object Container */}';
const dashedLineA = `
              {/* Tracker Line A */}
              {simulationMode === 'paraquedas' && (
                <div className="absolute right-[50%] top-[50%] w-[1000px] border-t-2 border-dashed border-slate-900/40 pointer-events-none z-[-1]"></div>
              )}
`;
codeCanvas = codeCanvas.replace(targetA, dashedLineA + targetA);

fs.writeFileSync('src/components/SimulationCanvas.tsx', codeCanvas);
