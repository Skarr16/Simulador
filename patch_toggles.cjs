const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldToggles = `  const [toggles, setToggles] = useState({
    vectors: true,
    graphs: false,
    table: false,
    devMode: false,
    showHeights: true,
    showGravity: false,
    sound: false,
  });`;
const newToggles = `  const [toggles, setToggles] = useState({
    vectors: true,
    graphs: false,
    table: false,
    devMode: false,
    showHeights: true,
    showGravity: false,
    sound: false,
    crashAlert: true,
  });`;

content = content.replace(oldToggles, newToggles);

// Also we need to check toggles.crashAlert in the failure logic
const oldCrashLogic = `      if (failed) {
        engine.pause();
        setFailMessage('Acho que o seu paraquedista quis virar um mergulhador, mas sem água!😅 Tente novamente e acione o paraquedas a tempo');
      }`;
const newCrashLogic = `      if (failed && toggles.crashAlert) {
        engine.pause();
        setFailMessage('Acho que o seu paraquedista quis virar um mergulhador, mas sem água!😅 Tente novamente e acione o paraquedas a tempo');
      }`;

content = content.replace(oldCrashLogic, newCrashLogic);

fs.writeFileSync('src/App.tsx', content);

let settingsContent = fs.readFileSync('src/components/SettingsDrawer.tsx', 'utf8');
const oldTogglesType = `toggles: { vectors: boolean; graphs: boolean; table: boolean; devMode: boolean; showHeights: boolean; showGravity: boolean; };
  setToggles: (toggles: { vectors: boolean; graphs: boolean; table: boolean; devMode: boolean; showHeights: boolean; showGravity: boolean; }) => void;`;
const newTogglesType = `toggles: { vectors: boolean; graphs: boolean; table: boolean; devMode: boolean; showHeights: boolean; showGravity: boolean; crashAlert?: boolean; };
  setToggles: (toggles: { vectors: boolean; graphs: boolean; table: boolean; devMode: boolean; showHeights: boolean; showGravity: boolean; crashAlert?: boolean; }) => void;`;

settingsContent = settingsContent.replace(oldTogglesType, newTogglesType);

const newToggleBtn = `
              <button 
                type="button"
                onClick={() => setToggles({ ...toggles, crashAlert: toggles.crashAlert === false ? true : false })}
                className="flex items-center justify-between w-full hover:bg-slate-50 p-2 rounded-lg transition-colors text-left"
              >
                <span className="text-sm font-black uppercase text-slate-700">Alerta de Paraquedista</span>
                <div className={\`w-12 h-6 flex items-center border-2 border-slate-900 rounded-full p-0.5 transition-colors \${toggles.crashAlert !== false ? 'bg-[#00C48C]' : 'bg-slate-200'}\`}>
                  <div className={\`w-4 h-4 rounded-full shadow-sm transform transition-transform \${toggles.crashAlert !== false ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'}\`} />
                </div>
              </button>
`;

settingsContent = settingsContent.replace("            <div className=\"bg-white p-4 rounded-xl border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col gap-3\">", "            <div className=\"bg-white p-4 rounded-xl border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col gap-3\">\n" + newToggleBtn);

fs.writeFileSync('src/components/SettingsDrawer.tsx', settingsContent);
