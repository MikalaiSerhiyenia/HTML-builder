const fs = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function outputInformation(fp) {
  try {
    const folderContent = await fs.readdir(fp, {
      withFileTypes: true,
    });
    for (const item of folderContent) {
      const filePath = path.join(fp, item.name);
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
    console.error(`Error: ${error}`);
  }
}

outputInformation(folderPath);
