const fs = require('fs');

let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

// Replace imports
code = code.replace(
  /import HTMLFlipBook from 'react-pageflip';/,
  "import { motion, AnimatePresence } from 'motion/react';"
);

// Replace paginate function and resize observer
code = code.replace(
  /const containerRef = useRef<HTMLDivElement>\(null\);[\s\S]*?const paginate = \(dir: number\) => \{[\s\S]*?\};/,
  `const [direction, setDirection] = useState(0);
  
  const paginate = (dir: number) => {
    setDirection(dir);
    setPage(prev => prev + dir);
  };`
);

// Replace binder and padding
code = code.replace(
  /<\!-- Binder accent \(visual only\) -->[\s\S]*?z-0"><\/div>/,
  ""
);

code = code.replace(
  /<div className="absolute top-5 left-10 sm:left-14 z-20 font-mono text-xs font-bold text-slate-400">/g,
  '<div className="absolute top-5 left-6 sm:left-8 z-20 font-mono text-xs font-bold text-slate-400">'
);

// Replace HTMLFlipBook block
code = code.replace(
  /<div ref=\{containerRef\} className="flex-1 pl-12 pr-6 sm:pl-16 sm:pr-8 pt-16 sm:pt-20 pb-20 relative z-10 overflow-hidden w-full h-full">[\s\S]*?<\/div>[\s\n]*<\/div>/,
  `<div className="flex-1 px-6 sm:px-8 pt-16 sm:pt-20 pb-20 relative z-10 overflow-hidden w-full h-full">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute inset-0 px-6 sm:px-8 pt-16 sm:pt-20 pb-20 h-full w-full bg-[#F4F1EB]"
            >
              {pages[page]}
            </motion.div>
          </AnimatePresence>
        </div>`
);

// Fix navigation footer padding
code = code.replace(
  /<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex justify-between bg-\[#F4F1EB\] border-t-2 border-slate-900\/10 z-20 pl-12 sm:pl-16">/,
  '<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex justify-between bg-[#F4F1EB] border-t-2 border-slate-900/10 z-20 px-6 sm:px-8">'
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated TutorialModal");
