const fs = require('fs');

// 1. Remove Dev Mode toggle from SettingsDrawer
let settingsContent = fs.readFileSync('src/components/SettingsDrawer.tsx', 'utf8');

settingsContent = settingsContent.replace(
    /<\!-- \.\.\. -->\n*\s*<div className="h-px bg-slate-200 w-full my-2"><\/div>\n*\s*<button[\s\S]*?Modo Desenvolvedor[\s\S]*?<\/button>/,
    ""
);
// wait, the html comment is not there. Let's find exactly how it is written.
