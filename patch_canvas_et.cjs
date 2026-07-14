const fs = require('fs');
let content = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const oldAstronaut = `          } else if (obj.id === 'astronaut') {
             let transformClass = "translate-y-0 scale-[1.3] md:scale-[1.15] lg:scale-[1.15] origin-bottom";
             content = (
               <div className={\`w-full h-full relative flex items-center justify-center drop-shadow-md \${transformClass}\`}>
                  <img src={(currentY <= 0) ? "/astronalta/astronalta no chão.png" : "/astronalta/astronalta caindo.png"} className="w-full h-full object-contain object-bottom" />
               </div>
             );
          } else {`;

const newAstronautEt = `          } else if (obj.id === 'astronaut') {
             let transformClass = "translate-y-0 scale-[1.3] md:scale-[1.15] lg:scale-[1.15] origin-bottom";
             content = (
               <div className={\`w-full h-full relative flex items-center justify-center drop-shadow-md \${transformClass}\`}>
                  <img src={(currentY <= 0) ? "/astronalta/astronalta no chão.png" : "/astronalta/astronalta caindo.png"} className="w-full h-full object-contain object-bottom" />
               </div>
             );
          } else if (obj.id === 'et') {
             let transformClass = "translate-y-0 scale-[1.3] md:scale-[1.15] lg:scale-[1.15] origin-bottom";
             content = (
               <div className={\`w-full h-full relative flex items-center justify-center drop-shadow-md \${transformClass}\`}>
                  <img src={(currentY <= 0) ? "/objetos/et_no_chao.png" : "/objetos/et_caindo.png"} className="w-full h-full object-contain object-bottom" />
               </div>
             );
          } else {`;

content = content.replace(oldAstronaut, newAstronautEt);

const oldPlane = `              >
                {objectA.id === 'astronaut' ? (
                  <>
                    <img src="/astronalta/chama da nave.png" alt="Chama" className="absolute -left-12 md:-left-24 top-1/2 -translate-y-1/2 w-20 md:w-36 h-14 md:h-24 object-contain drop-shadow-xl z-0 animate-pulse" />
                    <img src="/astronalta/nave.png" alt="Nave" className="w-full h-full object-contain drop-shadow-xl z-10" />
                  </>
                ) : (
                  <>
                    {/* Wind trail */}
                    <div className="absolute -left-10 md:-left-20 top-1/2 flex space-x-2 opacity-80 scale-75 md:scale-100 origin-right">`;

const newPlane = `              >
                {objectA.id === 'astronaut' ? (
                  <>
                    <img src="/astronalta/chama da nave.png" alt="Chama" className="absolute -left-12 md:-left-24 top-1/2 -translate-y-1/2 w-20 md:w-36 h-14 md:h-24 object-contain drop-shadow-xl z-0 animate-pulse" />
                    <img src="/astronalta/nave.png" alt="Nave" className="w-full h-full object-contain drop-shadow-xl z-10" />
                  </>
                ) : objectA.id === 'et' ? (
                  <>
                    <img src="/objetos/ovni.png" alt="OVNI" className="w-full h-full object-contain drop-shadow-xl z-10" />
                  </>
                ) : (
                  <>
                    {/* Wind trail */}
                    <div className="absolute -left-10 md:-left-20 top-1/2 flex space-x-2 opacity-80 scale-75 md:scale-100 origin-right">`;

content = content.replace(oldPlane, newPlane);

const oldClassNamePlane = `                className={\`absolute z-10 flex items-center justify-center transition-all \${
                  yA >= height ? 'animate-[flyIn_2s_ease-out_forwards]' : 
                  yA <= 0 ? 'hidden' : 
                  'animate-[flyAway_3s_ease-in_forwards]'
                } \${
                  objectA.id === 'astronaut' 
                    ? 'w-[160px] h-[65px] md:w-[220px] md:h-[90px]' 
                    : 'w-[200px] h-[80px] md:w-[280px] md:h-[110px] lg:w-[350px] lg:h-[140px]'
                }\`}`;

const newClassNamePlane = `                className={\`absolute z-10 flex items-center justify-center transition-all \${
                  yA >= height ? 'animate-[flyIn_2s_ease-out_forwards]' : 
                  yA <= 0 ? 'hidden' : 
                  'animate-[flyAway_3s_ease-in_forwards]'
                } \${
                  objectA.id === 'astronaut' || objectA.id === 'et'
                    ? 'w-[160px] h-[65px] md:w-[220px] md:h-[90px]' 
                    : 'w-[200px] h-[80px] md:w-[280px] md:h-[110px] lg:w-[350px] lg:h-[140px]'
                }\`}`;

content = content.replace(oldClassNamePlane, newClassNamePlane);

fs.writeFileSync('src/components/SimulationCanvas.tsx', content);
