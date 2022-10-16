import path from 'path';
import fs, { appendFileSync, readFileSync } from 'fs';

const PARTIAL = 'partial';

function logToFile(data: string): void {
  appendFileSync('d:\\mockoon_partial_register.log', data);
  appendFileSync('d:\\mockoon_partial_register.log', '\r\n');
}

function loadPartials(partialDir: string, partials: object) {
 // logToFile('partialDir:' + partialDir);

  if (fs.existsSync(partialDir) && fs.lstatSync(partialDir).isDirectory()) {
    fs.readdirSync(partialDir).forEach(file => {
      const partialFullPath = path.resolve(partialDir, file);
      if (!fs.lstatSync(partialFullPath).isDirectory()) {
       // logToFile('partialFile:' + partialFullPath);

        const data = readFileSync(partialFullPath, { encoding: 'utf8', flag: 'r' }).toString();

        partials = {
          ...partials,
          [file]: data
        };

       // logToFile('In cycle partials:' + JSON.stringify(partials));
      } else {
       // logToFile('partialFile:' + partialFullPath + ' is directory. Skipping');
      }
    });
  }

  return partials;
}
/**
 * Register partials with Handlebars
 *
 * @param filePath
 */
export const PartialRegister = function(
  filePath?: string
): { [name: string]: HandlebarsTemplateDelegate } | undefined {

  try {

   // logToFile('filePath:' + JSON.stringify(filePath));

    if (!filePath || !fs.existsSync(filePath)) {
      return;
    }

    let partials = {};
    const isDirectory = fs.lstatSync(filePath).isDirectory();
    const partialsRoot = path.join(isDirectory ? filePath : path.dirname(filePath), PARTIAL);

    // Common partials
    partials = loadPartials(partialsRoot, partials);

    // Only for files
    if(!isDirectory) {
      // Template partials
      partials = loadPartials(path.join(partialsRoot, path.basename(filePath, path.extname(filePath))), partials);
    }

   // logToFile('partials:' + JSON.stringify(partials));

    return partials;
  } catch (error) {
    throw error;
  }
};
