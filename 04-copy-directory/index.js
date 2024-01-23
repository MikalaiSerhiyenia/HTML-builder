const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  const sourceDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files-copy');

  try {
    await fs.mkdir(destDir, { recursive: true });

    const sourceFiles = await fs.readdir(sourceDir);
    const destFiles = await fs.readdir(destDir);

    for (const file of destFiles) {
      if (!sourceFiles.includes(file)) {
        const filePath = path.join(destDir, file);
        await fs.unlink(filePath);
      }
    }

    for (const file of sourceFiles) {
      const sourceFile = path.join(sourceDir, file);
      const destFile = path.join(destDir, file);

      await fs.copyFile(sourceFile, destFile);
    }
  } catch (error) {
    console.error(`${error}`);
  }
}

copyDir();
