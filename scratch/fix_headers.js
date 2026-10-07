const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('scratch')) {
        results = results.concat(getFiles(fullPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getFiles('.');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Clean all duplicated charset / msvalidate tags
  content = content.replace(/(<meta charset="UTF-8" \/>\s*)+/gi, '');
  content = content.replace(/(<meta name="msvalidate\.01" content="E092AD33AB10AB233DCD3C4B8EF47A69" \/>\s*)+/gi, '');
  content = content.replace(/^[\s\S]*?<head>/i, '');

  const isEnglish = f.includes('colombia-tours');
  const langAttr = isEnglish ? 'en' : 'es';

  const cleanHead = `<!DOCTYPE html>
<html lang="${langAttr}">
<head>
  <meta charset="UTF-8" />
  <meta name="msvalidate.01" content="E092AD33AB10AB233DCD3C4B8EF47A69" />`;

  const finalContent = cleanHead + '\n  ' + content.trimStart();
  fs.writeFileSync(f, finalContent, 'utf8');
  console.log('Normalized head in:', f);
});
