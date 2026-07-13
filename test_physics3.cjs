const fs = require('fs');

function testPhysics() {
  const dt = 0.02;
  const env = { rho: 1.225, g: 9.81 };
  const objectA = { mass: 75, area: 0.7, cd: 1.0, parachuteArea: 5, parachuteCd: 1.75, id: 'skydiver' };
  
  let t = 0;
  let yA = 4000;
  let vA = 100; // falling fast
  
  for(let i=0; i<10; i++) {
    let currentAreaA = objectA.parachuteArea;
    let currentCdA = objectA.parachuteCd;
    
    // Proper drag
    let FdA = 0.5 * env.rho * vA * Math.abs(vA) * currentCdA * currentAreaA;
    let aA = env.g - (FdA / objectA.mass);
    
    console.log(`t: ${t.toFixed(2)}, vA: ${vA.toFixed(2)}, aA: ${aA.toFixed(2)}, yA: ${yA.toFixed(2)}`);
    
    // Prevent overshoot
    if (vA > 0 && vA + aA * dt < 0) {
       vA = 0;
    } else {
       vA += aA * dt;
    }
    
    yA -= vA * dt;
    t += dt;
  }
}
testPhysics();
