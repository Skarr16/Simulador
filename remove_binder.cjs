const fs = require('fs');

let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

code = code.replace(
  /\{\/\* Binder accent \(visual only\) \*\/\}\s*<div className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 bg-slate-800\/5 border-r-2 border-slate-900\/10 z-0"><\/div>/,
  ""
);

code = code.replace(/const bookRef = useRef<any>\(null\);/, "");
code = code.replace(/const \[dimensions, setDimensions\] = useState\(\{ width: 0, height: 0 \}\);/, "");

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Removed binder and old state");
