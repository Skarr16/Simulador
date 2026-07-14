const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Change lg: to md: for the main layout to apply PC layout to tablets
code = code.replace(/lg:flex-row/g, 'md:flex-row');
code = code.replace(/lg:overflow-hidden/g, 'md:overflow-hidden');
code = code.replace(/lg:overflow-y-auto/g, 'md:overflow-y-auto');

code = code.replace(/lg:absolute/g, 'md:absolute');
code = code.replace(/lg:inset-4/g, 'md:inset-4');
code = code.replace(/lg:w-auto/g, 'md:w-auto');
code = code.replace(/lg:h-auto/g, 'md:h-auto');
code = code.replace(/lg:p-0/g, 'md:p-0');
code = code.replace(/lg:left-4/g, 'md:left-4');
code = code.replace(/lg:translate-x-0/g, 'md:translate-x-0');

code = code.replace(/lg:w-\[450px\]/g, 'md:w-[350px] lg:w-[450px]'); // Slightly smaller sidebar on tablet
code = code.replace(/lg:border-t-0/g, 'md:border-t-0');
code = code.replace(/lg:border-l-\[3px\]/g, 'md:border-l-[3px]');

fs.writeFileSync('src/App.tsx', code);
