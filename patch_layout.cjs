const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldLayout = `        <div className="w-full h-[100dvh] sm:h-[620px] lg:h-auto lg:flex-1 flex flex-col relative shrink-0 lg:shrink">
          <div className="absolute inset-4 flex flex-col pointer-events-none">
            {/* We make SimulationCanvas accept full width/height of this wrapper */}
            <div className="flex-1 pointer-events-auto flex rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 overflow-hidden bg-white">`;

const newLayout = `        <div className="w-full lg:h-auto lg:flex-1 flex flex-col relative shrink-0 lg:shrink">
          <div className="lg:absolute lg:inset-4 flex flex-col pointer-events-none p-4 lg:p-0 gap-4 lg:gap-0">
            {/* We make SimulationCanvas accept full width/height of this wrapper */}
            <div className="w-full h-[85dvh] sm:h-[550px] lg:h-auto lg:flex-1 pointer-events-auto flex rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 overflow-hidden bg-white">`;

code = code.replace(oldLayout, newLayout);

// Also fix the margin on playback controls to use lg:mt-4 instead of mt-4 since we have gap-4 on mobile
const oldControls = `            {/* Playback Controls (Floating) */}
            <div className="mt-4 pointer-events-auto bg-white p-3 sm:p-4 rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0">`;

const newControls = `            {/* Playback Controls (Floating) */}
            <div className="lg:mt-4 pointer-events-auto bg-white p-3 sm:p-4 rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0">`;

code = code.replace(oldControls, newControls);

fs.writeFileSync('src/App.tsx', code);
