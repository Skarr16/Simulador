const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

if (!code.includes("ChevronDown")) {
  code = code.replace(/import \{([^}]+)\} from 'lucide-react';/, "import { $1, ChevronDown } from 'lucide-react';");
  fs.writeFileSync('src/components/TutorialModal.tsx', code);
  console.log("Added ChevronDown import");
}
