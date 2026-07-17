const fs = require('fs');

let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

code = code.replace(
  /const containerRef = useRef<HTMLDivElement>\(null\);[\s\S]*?useEffect\(\(\) => \{[\s\S]*?\}, \[isOpen\]\);/,
  ""
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Removed resize observer");
