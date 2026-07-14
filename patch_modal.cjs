const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(
  /<\/div>\n  \);\n\}\n?$/,
  `      <FailModal 
        isOpen={!!failMessage} 
        message={failMessage} 
        onRestart={() => {
          setFailMessage(null);
          engine.reset();
        }} 
      />
    </div>
  );
}
`
);
fs.writeFileSync('src/App.tsx', content);
