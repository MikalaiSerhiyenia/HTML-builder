const fs = require('fs').promises;
const path = require('path');

async function buildCSSBundle() {
  const folderPath = path.join(__dirname, 'styles');
  const outpurFolderPath = path.join(__dirname, 'project-dist');
  const bundleFilePath = path.join(outpurFolderPath, 'bundle.css');
  try {
    await fs.mkdir(outpurFolderPath, { recursive: true });
  } catch (error) {
    console.error(`Error: ${error}`);
    return;
  }
  try {
    const stylesFiles = await fs.readdir(folderPath);
    const cssFiles = stylesFiles.filter((file) => file.endsWith('.css'));
    const data = [];
    for (const file of cssFiles) {
      const filePath = path.join(folderPath, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      data.push(fileContent);
    }
    await fs.writeFile(bundleFilePath, data.join('\n', 'utf-8'));
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
buildCSSBundle();
