const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

code = code.replace(
  /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<ul className="list-disc/g,
  '</div></div></div><ul className="list-disc'
);

// wait, let's just make it exact
code = code.replace(
`                </div>
                
             </div>
             
             </div>
          </div>

          <ul className="list-disc ml-4 mb-6 space-y-2 text-[12px]">`,
`                </div>
                
             </div>
          </div>

          <ul className="list-disc ml-4 mb-6 space-y-2 text-[12px]">`
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Fixed extra div");
