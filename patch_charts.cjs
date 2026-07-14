const fs = require('fs');
let content = fs.readFileSync('src/components/ChartsArea.tsx', 'utf8');

const importReplacement = "import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceDot } from 'recharts';";
content = content.replace(/import \{ LineChart.*?\} from 'recharts';/, importReplacement);

const newLogic = `
  // Downsample data for Recharts to improve performance
  const chartData = data.filter((_, i) => i % 10 === 0 || i === data.length - 1);
  const deployPoint = data.find(d => d.parachuteDeployedA);

  const legendPayload = simulationMode === 'paraquedas' 
    ? [
        { value: activeTab === 'position' ? 'Posição' : 'Velocidade', type: 'line', id: 'data', color: '#FF3366' },
        ...(deployPoint ? [{ value: 'Paraquedas Aberto', type: 'circle', id: 'deploy', color: '#8b5cf6' }] : [])
      ]
    : undefined;
`;

content = content.replace("  // Downsample data for Recharts to improve performance\n  const chartData = data.filter((_, i) => i % 10 === 0 || i === data.length - 1);", newLogic);

const oldLegend = `{simulationMode === 'livre' && <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }} />}`;
const newLegend = `<Legend 
              wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }} 
              {...(legendPayload ? { payload: legendPayload as any } : {})}
            />`;
            
content = content.replace(oldLegend, newLegend);

const oldLines = `            {activeTab === 'position' ? (
              <>
                <Line type="monotone" dataKey="yA" name={simulationMode === 'paraquedas' ? "Posição" : "Objeto A"} stroke="#FF3366" strokeWidth={4} dot={false} isAnimationActive={false} />
                {simulationMode === 'livre' && <Line type="monotone" dataKey="yB" name="Objeto B" stroke="#0055FF" strokeWidth={4} dot={false} isAnimationActive={false} />}
              </>
            ) : (
              <>
                <Line type="monotone" dataKey="vA" name={simulationMode === 'paraquedas' ? "Velocidade" : "Objeto A"} stroke="#FF3366" strokeWidth={4} dot={false} isAnimationActive={false} />
                {simulationMode === 'livre' && <Line type="monotone" dataKey="vB" name="Objeto B" stroke="#0055FF" strokeWidth={4} dot={false} isAnimationActive={false} />}
              </>
            )}`;
            
const newLines = `            {activeTab === 'position' ? (
              <>
                <Line type="monotone" dataKey="yA" name={simulationMode === 'paraquedas' ? "Posição" : "Objeto A"} stroke="#FF3366" strokeWidth={4} dot={false} isAnimationActive={false} />
                {simulationMode === 'livre' && <Line type="monotone" dataKey="yB" name="Objeto B" stroke="#0055FF" strokeWidth={4} dot={false} isAnimationActive={false} />}
                {simulationMode === 'paraquedas' && deployPoint && (
                   <ReferenceDot x={deployPoint.t} y={deployPoint.yA} r={6} fill="#8b5cf6" stroke="white" strokeWidth={2} />
                )}
              </>
            ) : (
              <>
                <Line type="monotone" dataKey="vA" name={simulationMode === 'paraquedas' ? "Velocidade" : "Objeto A"} stroke="#FF3366" strokeWidth={4} dot={false} isAnimationActive={false} />
                {simulationMode === 'livre' && <Line type="monotone" dataKey="vB" name="Objeto B" stroke="#0055FF" strokeWidth={4} dot={false} isAnimationActive={false} />}
                {simulationMode === 'paraquedas' && deployPoint && (
                   <ReferenceDot x={deployPoint.t} y={deployPoint.vA} r={6} fill="#8b5cf6" stroke="white" strokeWidth={2} />
                )}
              </>
            )}`;
content = content.replace(oldLines, newLines);

fs.writeFileSync('src/components/ChartsArea.tsx', content);
