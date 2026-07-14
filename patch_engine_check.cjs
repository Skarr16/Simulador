const fs = require('fs');
let content = fs.readFileSync('src/hooks/useEngine.ts', 'utf8');

const oldMemo = `  // Pre-compute the simulation trajectory
  const simulationData = useMemo(() => {
    let t = 0;
    const dt = 0.02; // 20ms step for physics integration`;

const newMemo = `  // Pre-compute the simulation trajectory
  const simulationData = useMemo(() => {
    if (!objectA || !objectB || !env) return [];
    
    let t = 0;
    const dt = 0.02; // 20ms step for physics integration`;

content = content.replace(oldMemo, newMemo);

// Also guard the second useMemo
const oldInitial = `  const initialState: SimulationState = {
    yA: config.height,
    vA: 0,
    yB: config.height,
    vB: 0,
    FdA: 0,
    FdB: 0
  };`;

const newInitial = `  const initialState: SimulationState = {
    yA: config.height,
    vA: 0,
    yB: config.height,
    vB: 0,
    FdA: 0,
    FdB: 0
  };
  
  if (!objectA || !objectB || !env) {
    return {
      start: () => {}, pause: () => {}, deployParachute: () => {}, reset: () => {},
      isRunning: false, isFinished: false, resetCount: 0, time: 0,
      currentState: initialState, dataPoints: [], objectA: {} as any, objectB: {} as any, env: {} as any
    };
  }`;
content = content.replace(oldInitial, newInitial);

fs.writeFileSync('src/hooks/useEngine.ts', content);
