const fs = require('fs');
let content = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const oldSkydiver = `          } else if (obj.id === 'skydiver') {
             let imgSrc = "/paraquedas/boneco caindo (1).png";
             let transformClass = "translate-y-0 scale-[1.0] md:scale-[0.9] lg:scale-[0.9] origin-bottom"; // Falling without parachute
             if (currentY <= 0) {
                imgSrc = "/paraquedas/boneco no chao.png";
                transformClass = "translate-y-0 scale-[1.0] md:scale-[0.9] lg:scale-[0.9] origin-bottom"; // Standing on ground
             } else if (parachuteDeployed) {
                imgSrc = "/paraquedas/boneco caindo com paraquedas (1).png";
                transformClass = "translate-y-0 scale-[1.0] md:scale-[0.9] lg:scale-[0.9] origin-bottom"; // Falling with parachute
             }
             content = (
               <div className={\`w-full h-full relative flex items-center justify-center drop-shadow-md \${parachuteDeployed && isFalling ? 'animate-[float_2s_ease-in-out_infinite]' : ''} \${transformClass}\`}>
                  <img src={imgSrc} className="w-full h-full object-contain object-bottom" />
               </div>
             );`;

const newSkydiver = `          } else if (obj.id === 'skydiver') {
             let transformClass = "translate-y-0 scale-[1.0] md:scale-[0.9] lg:scale-[0.9] origin-bottom";
             const isGround = currentY <= 0;
             const isPara = parachuteDeployed && !isGround;
             const isFallingState = !isGround && !isPara;
             content = (
               <div className={\`w-full h-full relative flex items-center justify-center drop-shadow-md \${parachuteDeployed && isFalling ? 'animate-[float_2s_ease-in-out_infinite]' : ''} \${transformClass}\`}>
                  <img src="/paraquedas/boneco no chao.png" className={\`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-150 \${isGround ? 'opacity-100' : 'opacity-0'}\`} />
                  <img src="/paraquedas/boneco caindo com paraquedas (1).png" className={\`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-150 \${isPara ? 'opacity-100' : 'opacity-0'}\`} />
                  <img src="/paraquedas/boneco caindo (1).png" className={\`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-150 \${isFallingState ? 'opacity-100' : 'opacity-0'}\`} />
               </div>
             );`;

if (content.includes(oldSkydiver)) {
    content = content.replace(oldSkydiver, newSkydiver);
} else {
    console.log("Could not find old skydiver");
}

const oldAstronaut = `          } else if (obj.id === 'astronaut') {
             let transformClass = "translate-y-0 scale-[1.3] md:scale-[1.15] lg:scale-[1.15] origin-bottom";
             content = (
               <div className={\`w-full h-full relative flex items-center justify-center drop-shadow-md \${transformClass}\`}>
                  <img src={(currentY <= 0) ? "/astronalta/astronalta no chão.png" : "/astronalta/astronalta caindo.png"} className="w-full h-full object-contain object-bottom" />
               </div>
             );`;

const newAstronaut = `          } else if (obj.id === 'astronaut') {
             let transformClass = "translate-y-0 scale-[1.3] md:scale-[1.15] lg:scale-[1.15] origin-bottom";
             content = (
               <div className={\`w-full h-full relative flex items-center justify-center drop-shadow-md \${transformClass}\`}>
                  <img src="/astronalta/astronalta no chão.png" className={\`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-150 \${currentY <= 0 ? 'opacity-100' : 'opacity-0'}\`} />
                  <img src="/astronalta/astronalta caindo.png" className={\`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-150 \${currentY <= 0 ? 'opacity-0' : 'opacity-100'}\`} />
               </div>
             );`;

if (content.includes(oldAstronaut)) {
    content = content.replace(oldAstronaut, newAstronaut);
} else {
    console.log("Could not find old astronaut");
}

const oldEt = `          } else if (obj.id === 'et') {
             let transformClass = "translate-y-0 scale-[1.3] md:scale-[1.15] lg:scale-[1.15] origin-bottom";
             content = (
               <div className={\`w-full h-full relative flex items-center justify-center drop-shadow-md \${transformClass}\`}>
                  <img src={(currentY <= 0) ? "/objetos/et_no_chao.png" : "/objetos/et_caindo.png"} className="w-full h-full object-contain object-bottom" />
               </div>
             );`;

const newEt = `          } else if (obj.id === 'et') {
             let transformClass = "translate-y-4 md:translate-y-5 lg:translate-y-6 scale-[1.3] md:scale-[1.15] lg:scale-[1.15] origin-bottom";
             content = (
               <div className={\`w-full h-full relative flex items-center justify-center drop-shadow-md \${transformClass}\`}>
                  <img src="/objetos/et_no_chao.png" className={\`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-150 \${currentY <= 0 ? 'opacity-100' : 'opacity-0'}\`} />
                  <img src="/objetos/et_caindo.png" className={\`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-150 \${currentY <= 0 ? 'opacity-0' : 'opacity-100'}\`} />
               </div>
             );`;

if (content.includes(oldEt)) {
    content = content.replace(oldEt, newEt);
} else {
    console.log("Could not find old et");
}

fs.writeFileSync('src/components/SimulationCanvas.tsx', content);
