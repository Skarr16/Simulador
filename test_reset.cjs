const fs = require('fs');

let content = fs.readFileSync('src/hooks/useEngine.ts', 'utf8');

// Add a console.log to reset() to see who calls it
content = content.replace(
    /const reset = \(\) => \{/,
    "const reset = () => { console.log('RESET CALLED!', new Error().stack);"
);

fs.writeFileSync('src/hooks/useEngine.ts', content);
console.log('patched');
