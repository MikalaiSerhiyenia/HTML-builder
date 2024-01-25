const fs = require('fs/promises');
const path = require('path');

const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

async function copyDir(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });

    const srcFiles = await fs.readdir(src);
    const destFiles = await fs.readdir(dest);

    for (const file of srcFiles) {
      const srcFile = path.join(src, file);
      const destFile = path.join(dest, file);
      await fs.copyFile(srcFile, destFile);
    }

    for (const file of destFiles) {
      if (!srcFiles.includes(file)) {
        const filePath = path.join(dest, file);
        await fs.unlink(filePath);
      }
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

copyDir(srcDir, destDir);
