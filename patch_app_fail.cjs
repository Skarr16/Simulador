const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
content = content.replace(
    /import \{ TutorialModal \} from '\.\/components\/TutorialModal';/,
    "import { TutorialModal } from './components/TutorialModal';\nimport { FailModal } from './components/FailModal';"
);

// Add state and ref
content = content.replace(
    /const prevVA = useRef\(0\);\n  const prevVB = useRef\(0\);/,
    "const prevVA = useRef(0);\n  const prevVB = useRef(0);\n  const [failMessage, setFailMessage] = useState<string | null>(null);\n  const prevDeployedAForCrash = useRef(false);\n  const prevDeployedBForCrash = useRef(false);"
);

// Add fail logic useEffect
const failLogic = `
  useEffect(() => {
    if (config.simulationMode === 'paraquedas' && engine.isRunning) {
      const currentState = engine.currentState;
      const isSkydiverA = config.objectAId === 'skydiver';
      const isSkydiverB = config.objectBId === 'skydiver';
      
      let failed = false;
      
      // Check altitude < 600m without parachute
      if (isSkydiverA && currentState.yA > 0 && currentState.yA < 600 && !currentState.parachuteDeployedA) {
        failed = true;
      }
      if (isSkydiverB && currentState.yB > 0 && currentState.yB < 600 && !currentState.parachuteDeployedB) {
        failed = true;
      }
      
      if (!failed && isSkydiverA && currentState.parachuteDeployedA && !prevDeployedAForCrash.current) {
        prevDeployedAForCrash.current = true;
        const speedKmH = currentState.vA * 3.6;
        if (speedKmH > 200) {
           failed = true;
        } else {
           const A = engine.objectA.parachuteArea !== undefined ? engine.objectA.parachuteArea : engine.objectA.area + 5;
           const Cd = engine.objectA.parachuteCd !== undefined ? engine.objectA.parachuteCd : 1.75;
           const vt = Math.sqrt((2 * engine.objectA.mass * engine.env.g) / (engine.env.rho * Cd * A));
           if (vt < 5 || vt > 7) {
              failed = true;
           }
        }
      }
      
      if (!failed && isSkydiverB && currentState.parachuteDeployedB && !prevDeployedBForCrash.current) {
        prevDeployedBForCrash.current = true;
        const speedKmH = currentState.vB * 3.6;
        if (speedKmH > 200) {
           failed = true;
        } else {
           const A = engine.objectB.parachuteArea !== undefined ? engine.objectB.parachuteArea : engine.objectB.area + 5;
           const Cd = engine.objectB.parachuteCd !== undefined ? engine.objectB.parachuteCd : 1.75;
           const vt = Math.sqrt((2 * engine.objectB.mass * engine.env.g) / (engine.env.rho * Cd * A));
           if (vt < 5 || vt > 7) {
              failed = true;
           }
        }
      }
      
      if (failed) {
        engine.pause();
        setFailMessage('Acho que o seu paraquedista quis virar um mergulhador—mas sem água! Tente novamente e acione o paraquedas a tempo!');
      }
    }
  }, [engine.currentState, engine.isRunning, config.simulationMode, engine.objectA, engine.objectB, engine.env]);
`;

content = content.replace(
    /useEffect\(\(\) => \{\n    \/\/ Reset refs when resetting simulation/,
    failLogic + "\n  useEffect(() => {\n    // Reset refs when resetting simulation"
);

// Reset the crash refs when resetting simulation
content = content.replace(
    /prevDeployedB\.current = false;/,
    "prevDeployedB.current = false;\n       prevDeployedAForCrash.current = false;\n       prevDeployedBForCrash.current = false;"
);

// Add the modal component
content = content.replace(
    /<\/div>\n    <\/div>\n  \);\n\}\n$/,
    "      <FailModal \n        isOpen={!!failMessage} \n        message={failMessage} \n        onRestart={() => {\n          setFailMessage(null);\n          engine.reset();\n        }} \n      />\n    </div>\n    </div>\n  );\n}\n"
);

fs.writeFileSync('src/App.tsx', content);
console.log('App patched');
