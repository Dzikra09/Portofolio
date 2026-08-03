import fs from 'fs';
import path from 'path';
import https from 'https';

const icons = [
  { name: 'html5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'css3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'javascript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'react', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'flutter', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
  { name: 'mysql', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'oracle', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg' },
  { name: 'supabase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
  { name: 'firebase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
  { name: 'vscode', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
  { name: 'git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
];

const fallbackUrls = {
  'firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg'
};

const aiIcons = [
  { name: 'chatgpt', url: 'https://cdn.simpleicons.org/openai/412991' },
  { name: 'gemini', url: 'https://cdn.simpleicons.org/googlegemini/8E75B2' },
  { name: 'claude', url: 'https://cdn.simpleicons.org/anthropic/D18F77' },
];

const antigravitySVG = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ag-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#8B5CF6" /><stop offset="100%" stop-color="#3B82F6" /></linearGradient></defs><path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="none" stroke="url(#ag-grad)" stroke-width="8" stroke-linejoin="round" /><circle cx="50" cy="50" r="15" fill="url(#ag-grad)" /><path d="M50 10 L50 35 M90 30 L65 50 M90 70 L65 50 M50 90 L50 65 M10 70 L35 50 M10 30 L35 50" stroke="url(#ag-grad)" stroke-width="6" stroke-linecap="round" /></svg>';

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        if (res.statusCode === 404 && fallbackUrls[path.basename(dest, '.svg')]) {
          console.log("Fallback for " + dest);
          download(fallbackUrls[path.basename(dest, '.svg')], dest).then(resolve).catch(reject);
          return;
        }
        reject(new Error("Failed to get " + url + " (" + res.statusCode + ")"));
        return;
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        fs.writeFileSync(dest, data);
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  const dir = path.join(process.cwd(), 'public', 'icons');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const icon of icons) {
    const dest = path.join(dir, icon.name + '.svg');
    try {
      await download(icon.url, dest);
      console.log("Downloaded " + icon.name + ".svg");
    } catch (e) {
      console.error("Error " + icon.name + ":", e.message);
      try {
        await download("https://cdn.simpleicons.org/" + icon.name, dest);
        console.log("Downloaded fallback for " + icon.name + ".svg");
      } catch (err) {
        console.error("Total failure for " + icon.name, err.message);
      }
    }
  }

  for (const icon of aiIcons) {
    const dest = path.join(dir, icon.name + '.svg');
    try {
      await download(icon.url, dest);
      console.log("Downloaded " + icon.name + ".svg");
    } catch (e) {
      console.error("Error " + icon.name + ":", e.message);
    }
  }

  fs.writeFileSync(path.join(dir, 'antigravity.svg'), antigravitySVG);
  console.log('Created antigravity.svg');
}

main();
