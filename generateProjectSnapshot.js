const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDirectory = path.join(__dirname);
const outputFile = path.join(__dirname, 'project_snapshot.txt');

// Generate and include project structure directly in `project_snapshot.txt`
try {
  const projectStructure = execSync(`tree -I 'node_modules|*.log|project_snapshot.txt'`, { cwd: rootDirectory }).toString();
  fs.writeFileSync(outputFile, `Project Structure:\n\n${projectStructure}\n\n`);
  console.log(`Project structure included in ${outputFile}`);
} catch (error) {
  console.error(`Failed to generate project structure: ${error}`);
  process.exit(1);
}

// Exclusion lists
const folderExclusions = ['node_modules', 'build', '.next', '.git', 'cache', 'static', '.github', 'server', 'cypress', 'contracts', 'chunks'];
const fileExclusions = [
  'generateProjectSnapshot.js',
  'package-lock.json',
  'src/app/favicon.ico',
  '.eslintrc.json',
  '.gitignore',
  'project_snapshot.txt',
  'webpack.js',
  'jest.config.js',
  'yarn.lock' // Exclude the output file itself
];
const mediaExtensions = ['.jpg', '.jpeg', '.png', '.svg', '.gif', '.ico', '.mp4', '.mp3', '.webp', '.woff', '.woff2', '.ttf'];
const contentExcludedExtensions = ['.md', '.css'];
const excludedExtensions = [...mediaExtensions, ...contentExcludedExtensions];

// Helper function to write and immediately flush content to the output file
function writeToFile(content) {
  try {
    fs.appendFileSync(outputFile, content);
    fs.fsyncSync(fs.openSync(outputFile, 'r+')); // Immediate flush
  } catch (error) {
    console.error(`Error writing to file: ${error}`);
  }
}

// Recursive directory processing with exclusions and conditional content inclusion
function processDirectory(directory, currentDepth = 0) {
  try {
    const items = fs.readdirSync(directory);

    items.forEach(item => {
      const itemPath = path.join(directory, item);
      const relativePath = path.relative(rootDirectory, itemPath);
      const stats = fs.statSync(itemPath);
      const extension = path.extname(item).toLowerCase();

      // Skip excluded folders and files
      if (
        (stats.isDirectory() && folderExclusions.includes(item)) ||
        (stats.isFile() && (fileExclusions.includes(relativePath) || excludedExtensions.includes(extension)))
      ) {
        return;
      }

      // Write item path with indentation based on depth
      const indent = '  '.repeat(currentDepth);
      writeToFile(`${indent}├── ${item}\n`);

      // Conditional file content inclusion
      if (stats.isFile()) {
        if (relativePath === 'src/app/dictionaries/en.json') {
          // Include only `en.json` content
          try {
            const content = fs.readFileSync(itemPath, 'utf-8');
            const formattedContent = content.split('\n').map(line => `${indent}  ${line}`).join('\n');
            writeToFile(`\n${formattedContent}\n\n`);
          } catch (error) {
            console.error(`Error reading file ${relativePath}: ${error}`);
          }
        } else if (relativePath.startsWith('src/app/dictionaries') && extension === '.json') {
          // List other dictionary JSON files by name only
          writeToFile(`${indent}  [Dictionary file content excluded]\n\n`);
        } else if (extension === '.woff' || extension === '.woff2' || extension === '.ttf') {
          // Exclude font file contents
          writeToFile(`${indent}  [Font file content excluded]\n\n`);
        } else if (relativePath === '.eslintrc.json' || relativePath === '.gitignore') {
          // Exclude config files content
          writeToFile(`${indent}  [Config file content excluded]\n\n`);
        } else if (contentExcludedExtensions.includes(extension)) {
          // List only name for .md and .css files, exclude contents
          writeToFile(`${indent}  [File content excluded]\n\n`);
        } else {
          // Include content for other files
          try {
            const content = fs.readFileSync(itemPath, 'utf-8');
            const formattedContent = content.split('\n').map(line => `${indent}  ${line}`).join('\n');
            writeToFile(`\n${formattedContent}\n\n`);
          } catch (error) {
            console.error(`Error reading file ${relativePath}: ${error}`);
          }
        }
      }

      // Recursively process subdirectories
      if (stats.isDirectory()) {
        processDirectory(itemPath, currentDepth + 1);
      }
    });
  } catch (error) {
    console.error(`Error processing directory ${directory}: ${error}`);
  }
}

// Start processing from the root directory
try {
  processDirectory(rootDirectory);
  console.log(`Project snapshot successfully saved at ${outputFile}`);
} catch (error) {
  console.error(`Error processing root directory: ${error}`);
}
