import fs from 'fs';
import path from 'path';

function walk(dir: string) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const p = path.join(dir, file);
      if (p.includes('5.jpg')) console.log(p);
      try {
        if (fs.statSync(p).isDirectory() && !p.includes('node_modules') && !p.includes('proc') && !p.includes('sys')) walk(p);
      } catch (e) {}
    }
  } catch (e) {}
}
walk('/');
