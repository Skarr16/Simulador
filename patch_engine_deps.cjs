const fs = require('fs');
let content = fs.readFileSync('src/hooks/useEngine.ts', 'utf8');

content = content.replace(
    /useEffect\(\(\) => \{\n    reset\(\);\n  \}, \[simulationData\]\);/,
    "useEffect(() => {\n    reset();\n  }, [config, objectA, objectB, env]);"
);

fs.writeFileSync('src/hooks/useEngine.ts', content);
console.log('Dependencies patched');
