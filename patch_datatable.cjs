const fs = require('fs');
let content = fs.readFileSync('src/components/DataTable.tsx', 'utf8');

content = content.replace("useState<number>(0.67);", "useState<number>(1.0);");
content = content.replace("<option value={0.67}>0.67s (Padrão)</option>", "<option value={0.67}>0.67s</option>");
content = content.replace("<option value={1.0}>1.0s</option>", "<option value={1.0}>1.0s (Padrão)</option>");

fs.writeFileSync('src/components/DataTable.tsx', content);
