const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldControls = 'className={`mt-2 mb-6 mx-4 z-50 md:m-0 md:static md:mt-4 pointer-events-auto bg-white p-2.5 sm:p-3 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] md:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0`}>';
const newControls = 'className={`mt-2 mb-4 mx-2 sm:mx-4 z-50 md:m-0 md:static md:mt-4 pointer-events-auto bg-white p-2 sm:p-3 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] md:shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0`}>';
code = code.replace(oldControls, newControls);

fs.writeFileSync('src/App.tsx', code);
