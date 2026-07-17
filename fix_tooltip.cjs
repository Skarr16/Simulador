const fs = require('fs');
let code = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const regex = /\{\(currentY <= 0 && currentV === 0\) && <div>Velocidade Máx: \{\(letter === 'A' \? maxVA : maxVB\)\.toFixed\(1\)\} m\/s<\/div>\}/;

const replacement = `{(currentY <= 0 && currentV === 0) && (
                   <>
                     <div>Velocidade Máx: {(letter === 'A' ? maxVA : maxVB).toFixed(1)} m/s</div>
                     <div>F. Arrasto Máx: {(0.5 * env.rho * Math.pow(letter === 'A' ? maxVA : maxVB, 2) * (parachuteDeployed && obj.id === 'skydiver' ? 1.75 : obj.cd) * (parachuteDeployed && obj.id === 'skydiver' ? obj.area + 5 : obj.area)).toFixed(3)} N</div>
                   </>
                 )}`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/components/SimulationCanvas.tsx', code);
  console.log("Updated tooltip successfully.");
} else {
  console.log("Regex did not match.");
}
