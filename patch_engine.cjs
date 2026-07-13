const fs = require('fs');
let content = fs.readFileSync('src/hooks/useEngine.ts', 'utf8');

// Update useMemo dependency
content = content.replace(
    /return data;\n  \}, \[config, objectA, objectB, env\]\);/,
    "return data;\n  }, [config, objectA, objectB, env, manualParachuteTime]);"
);

// Update reset function
content = content.replace(
    /const reset = \(\) => \{\n    setIsRunning\(false\);\n    setIsFinished\(false\);\n    setTime\(0\);\n    setResetCount\(c => c \+ 1\);\n    startTimeRef\.current = null;\n    setCurrentState\(simulationData\[0\]\);\n  \};/,
    "const reset = () => {\n    setIsRunning(false);\n    setIsFinished(false);\n    setTime(0);\n    setResetCount(c => c + 1);\n    startTimeRef.current = null;\n    setManualParachuteTime(null);\n    setCurrentState(simulationData[0]);\n  };"
);

// Add deployParachute function
content = content.replace(
    /const pause = \(\) => setIsRunning\(false\);/,
    "const pause = () => setIsRunning(false);\n  const deployParachute = () => {\n    if (manualParachuteTime === null) {\n      setManualParachuteTime(time);\n    }\n  };"
);

// Add to return statement
content = content.replace(
    /return \{\n    start,\n    pause,/,
    "return {\n    start,\n    pause,\n    deployParachute,"
);

fs.writeFileSync('src/hooks/useEngine.ts', content);
console.log('Engine patched');
