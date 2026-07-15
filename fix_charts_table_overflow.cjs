const fs = require('fs');

// Fix ChartsArea
let codeCharts = fs.readFileSync('src/components/ChartsArea.tsx', 'utf8');
codeCharts = codeCharts.replace(
  '<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">',
  '<div className="flex flex-row flex-wrap items-center justify-between mb-4 gap-2">'
);
// In case the tab buttons overflow, make sure they don't shrink
// Actually flex-wrap on the parent is enough.
fs.writeFileSync('src/components/ChartsArea.tsx', codeCharts);

// Fix DataTable
let codeTable = fs.readFileSync('src/components/DataTable.tsx', 'utf8');
codeTable = codeTable.replace(
  '<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">',
  '<div className="flex flex-row flex-wrap items-center justify-between gap-2 mb-4">'
);
fs.writeFileSync('src/components/DataTable.tsx', codeTable);

