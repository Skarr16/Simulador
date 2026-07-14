const fs = require('fs');
let content = fs.readFileSync('src/hooks/useEngine.ts', 'utf8');

const oldLogic = `      if (config.simulationMode === 'paraquedas') {
        const shouldDeploy = manualParachuteTime !== null && t >= manualParachuteTime;
        
        if (shouldDeploy && objectA.id === 'skydiver') {
          const targetArea = objectA.parachuteArea !== undefined ? objectA.parachuteArea : objectA.area + 5;
          const targetCd = objectA.parachuteCd !== undefined ? objectA.parachuteCd : 1.75;
          const deployTimeElapsed = t - manualParachuteTime;
          const deployDuration = 2.0; // 2 seconds to fully open
          
          if (deployTimeElapsed < deployDuration) {
             const progress = deployTimeElapsed / deployDuration;
             // Use smoothstep or linear interpolation
             currentAreaA = objectA.area + (targetArea - objectA.area) * progress;
             currentCdA = objectA.cd + (targetCd - objectA.cd) * progress;
          } else {
             currentAreaA = targetArea;
             currentCdA = targetCd;
          }
          parachuteDeployedA = true;
        }
        
        if (shouldDeploy && objectB.id === 'skydiver') {
          const targetArea = objectB.parachuteArea !== undefined ? objectB.parachuteArea : objectB.area + 5;
          const targetCd = objectB.parachuteCd !== undefined ? objectB.parachuteCd : 1.75;
          const deployTimeElapsed = t - manualParachuteTime;
          const deployDuration = 2.0;
          
          if (deployTimeElapsed < deployDuration) {
             const progress = deployTimeElapsed / deployDuration;
             currentAreaB = objectB.area + (targetArea - objectB.area) * progress;
             currentCdB = objectB.cd + (targetCd - objectB.cd) * progress;
          } else {
             currentAreaB = targetArea;
             currentCdB = targetCd;
          }
          parachuteDeployedB = true;
        }
      }`;

const newLogic = `      if (config.simulationMode === 'paraquedas') {
        const shouldDeploy = manualParachuteTime !== null && t >= manualParachuteTime;
        
        if (shouldDeploy && objectA.id === 'skydiver') {
          const targetArea = objectA.parachuteArea !== undefined ? objectA.parachuteArea : objectA.area + 5;
          const targetCd = objectA.parachuteCd !== undefined ? objectA.parachuteCd : 1.75;
          const deployTimeElapsed = t - manualParachuteTime;
          const deployDuration = 5.0; // 5 seconds to fully open
          
          if (deployTimeElapsed < deployDuration) {
             const progress = deployTimeElapsed / deployDuration;
             const easedProgress = Math.pow(progress, 3); // Ease-in curve for smoother deceleration
             currentAreaA = objectA.area + (targetArea - objectA.area) * easedProgress;
             currentCdA = objectA.cd + (targetCd - objectA.cd) * easedProgress;
          } else {
             currentAreaA = targetArea;
             currentCdA = targetCd;
          }
          parachuteDeployedA = true;
        }
        
        if (shouldDeploy && objectB.id === 'skydiver') {
          const targetArea = objectB.parachuteArea !== undefined ? objectB.parachuteArea : objectB.area + 5;
          const targetCd = objectB.parachuteCd !== undefined ? objectB.parachuteCd : 1.75;
          const deployTimeElapsed = t - manualParachuteTime;
          const deployDuration = 5.0; // 5 seconds to fully open
          
          if (deployTimeElapsed < deployDuration) {
             const progress = deployTimeElapsed / deployDuration;
             const easedProgress = Math.pow(progress, 3); // Ease-in curve for smoother deceleration
             currentAreaB = objectB.area + (targetArea - objectB.area) * easedProgress;
             currentCdB = objectB.cd + (targetCd - objectB.cd) * easedProgress;
          } else {
             currentAreaB = targetArea;
             currentCdB = targetCd;
          }
          parachuteDeployedB = true;
        }
      }`;

content = content.replace(oldLogic, newLogic);
fs.writeFileSync('src/hooks/useEngine.ts', content);
console.log('useEngine patched for gradual parachute');
