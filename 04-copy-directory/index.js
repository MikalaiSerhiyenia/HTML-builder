const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  const filesFolder = path.join(__dirname, 'files');
  const filesCopyFolder = path.join(__dirname, 'files-copy');
  try {
    await fs.mkdir(filesCopyFolder, { recursive: true });
    await copyFiles(filesFolder, filesCopyFolder);
    fs.watch(filesFolder, { recursive: true }, async (eventType, filename) => {
      if (eventType === 'change' || eventType === 'rename') {
        await copyFiles();
      } else if (eventType === 'unlink') {
        const fileToDelete = path.join(filesCopyFolder, filename);
        try {
          await fs.unlink(fileToDelete);
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      }
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function copyFiles(from, to) {
  const files = await fs.readdir(from);
  for (const file of files) {
    const fileFrom = path.join(from, file);
    const fileTo = path.join(to, file);
    await fs.copyFile(fileFrom, fileTo);
  }
}

copyDir();
