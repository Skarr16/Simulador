const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

// Fix Playback Controls width
const oldControls = 'border-[3px] border-slate-900 flex flex-wrap items-center justify-center gap-2 sm:gap-4 w-full shrink-0';
const newControls = 'border-[3px] border-slate-900 flex flex-wrap items-center justify-center gap-2 sm:gap-4 shrink-0 sm:self-center';
codeApp = codeApp.replace(oldControls, newControls);

// Add zoom prevention
const oldEffect = `  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {`;

const newEffect = `  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {`;

codeApp = codeApp.replace(oldEffect, newEffect);
fs.writeFileSync('src/App.tsx', codeApp);
