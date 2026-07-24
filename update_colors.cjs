const fs = require('fs');

// ChartsArea
let charts = fs.readFileSync('src/components/ChartsArea.tsx', 'utf8');

// Change vA stroke from #FF3366 to #00C48C
charts = charts.replace(/<Line type="monotone" dataKey="vA"([^>]+)stroke="#FF3366"/, '<Line type="monotone" dataKey="vA"$1stroke="#00C48C"');

// Change legendPayload if activeTab === 'velocity'
charts = charts.replace(/color: activeTab === 'position' \? '#FF3366' : '#FF3366'/g, "color: activeTab === 'position' ? '#FF3366' : '#00C48C'");
// Wait, currently legendPayload says:
// { value: activeTab === 'position' ? 'Posição' : 'Velocidade', type: 'line', id: 'data', color: '#FF3366' }
charts = charts.replace(/color: '#FF3366'/g, "color: activeTab === 'position' ? '#FF3366' : '#00C48C'");

// Change vB stroke from #0055FF to #8B5CF6
charts = charts.replace(/<Line type="monotone" dataKey="vB"([^>]+)stroke="#0055FF"/g, function(match, p1) {
  if (match.includes('dataKey="vB"')) {
    return `<Line type="monotone" dataKey="vB"${p1}stroke="#8B5CF6"`;
  }
  return match;
});

fs.writeFileSync('src/components/ChartsArea.tsx', charts);

// SimulationCanvas
let canvas = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

// Replace Vector A color
// The first block for vA is currently text-[#0055FF], bg-[#0055FF], border-t-[#0055FF]
// We need to replace it carefully.

const vAStart = canvas.indexOf('{vA > 0 && (');
if (vAStart !== -1) {
    const vAEnd = canvas.indexOf(')}', vAStart);
    let vABlock = canvas.slice(vAStart, vAEnd + 2);
    // It's the first one, for Object A
    // Replace #0055FF with #00C48C
    vABlock = vABlock.replace(/#0055FF/g, '#00C48C');
    canvas = canvas.slice(0, vAStart) + vABlock + canvas.slice(vAEnd + 2);
}

// Replace Vector B color
// The second block for vB
const vBStart = canvas.indexOf('{vB > 0 && (');
if (vBStart !== -1) {
    const vBEnd = canvas.indexOf(')}', vBStart);
    let vBBlock = canvas.slice(vBStart, vBEnd + 2);
    // Replace #0055FF with #8B5CF6
    vBBlock = vBBlock.replace(/#0055FF/g, '#8B5CF6');
    canvas = canvas.slice(0, vBStart) + vBBlock + canvas.slice(vBEnd + 2);
}

// In the top right text for vA
canvas = canvas.replace(/text-\[\#0055FF\] tabular-nums tracking-tighter\}\}>\{vA\.toFixed\(1\)\}/, "text-[#00C48C] tabular-nums tracking-tighter}>{vA.toFixed(1)}");

fs.writeFileSync('src/components/SimulationCanvas.tsx', canvas);
