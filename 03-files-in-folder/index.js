const fs = require('fs/promises');
const path = require('path');

async function outputInformation() {
  try {
    const folderPath = path.join(__dirname, 'secret-folder');
    const folderContent = await fs.readdir(folderPath, {
      withFileTypes: true,
    });
    for (const item of folderContent) {
      const filePath = path.join(folderPath, item.name);
      if (item.isFile()) {
        const fileStats = await fs.stat(filePath);
        const fileName = path.parse(item.name).name;
        const fileExtension = path.extname(item.name).slice(1);
        const fileSize = fileStats.size / 1024;
        console.log(
          `${fileName} - ${fileExtension} - ${fileSize.toFixed(3)}kb`,
        );
      }
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

outputInformation();
