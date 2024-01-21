const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  const filesFolder = path.join(__dirname, 'files');
  const filesCopyFolder = path.join(__dirname, 'files-copy');
  try {
    await fs.mkdir(filesCopyFolder, { recursive: true });
    const files = await fs.readdir(filesFolder);
    for (const file of files) {
      const fileFrom = path.join(filesFolder, file);
      const fileTo = path.join(filesCopyFolder, file);
      await fs.copyFile(fileFrom, fileTo);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

copyDir();
