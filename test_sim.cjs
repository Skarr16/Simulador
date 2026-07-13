const fs = require('fs');

function testSim() {
  const dt = 0.02;
  const env = { rho: 1.225, g: 9.81 };
  const objectA = { mass: 75, area: 0.7, cd: 1.0, parachuteArea: 5, parachuteCd: 1.75, id: 'skydiver' };
  
  function runSim(manualParachuteTime) {
    let t = 0;
    let yA = 4000;
    let vA = 0;
    const data = [];
    while (yA > 0 && t < 1200) {
      let currentAreaA = objectA.area;
      let currentCdA = objectA.cd;
      if (manualParachuteTime !== null && t >= manualParachuteTime) {
          currentAreaA = objectA.parachuteArea !== undefined ? objectA.parachuteArea : objectA.area + 5;
          currentCdA = objectA.parachuteCd !== undefined ? objectA.parachuteCd : 1.75;
      }
      let FdA = 0.5 * env.rho * vA * vA * currentCdA * currentAreaA;
      let aA = env.g - (FdA / objectA.mass);
      if (yA <= 0) { aA = 0; vA = 0; yA = 0; FdA = 0; }
      data.push({t, yA, vA});
      if (yA > 0) {
        vA += aA * dt;
        yA -= vA * dt;
      }
      t += dt;
    }
    return data;
  }
  
  const d1 = runSim(null);
  const d2 = runSim(2.05);
  console.log("d1[100]", d1[100]);
  console.log("d2[100]", d2[100]);
  console.log("d1[105]", d1[105]);
  console.log("d2[105]", d2[105]);
}
testSim();
