const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

code = code.replace(
  /const \[direction, setDirection\] = useState\(0\);/,
  `const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setPage(0);
      setDirection(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;`
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Added isOpen check");
