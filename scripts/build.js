const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

function copyFile(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function copyDir(source, target) {
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else copyFile(from, to);
  }
}

fs.rmSync(dist, { recursive: true, force: true });
copyFile(path.join(root, 'index.html'), path.join(dist, 'index.html'));
copyDir(path.join(root, 'src'), path.join(dist, 'src'));

const manifest = {
  name: 'top-design-website',
  generatedAt: new Date().toISOString(),
  entry: 'index.html',
  assets: ['src/app.js', 'src/styles.css']
};
fs.writeFileSync(path.join(dist, 'build-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log('Deployment build generated in dist/');
