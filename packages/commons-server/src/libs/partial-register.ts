import path from 'path';
import fs, { appendFileSync, readFileSync } from 'fs';

const PARTIAL = 'partial';

function logToFile(data: string): void {
  appendFileSync('d:\\mockoon_partial_register.log', data);
}

/**
 * Register partials with Handlebars
 *
 * @param filePath
 */
export const PartialRegister = function(
  filePath?: string
): { [name: string]: HandlebarsTemplateDelegate } {

  try {

    // logToFile('filePath:' + JSON.stringify(filePath) + '\r\n');

    if (!filePath) {
      return {};
    }
    let partials = {};
    const partialDir = path.join(path.dirname(filePath), PARTIAL, path.basename(filePath, path.extname(filePath)));

    // logToFile('partialDir:' + partialDir + '\r\n');

    if (fs.existsSync(partialDir) && fs.lstatSync(partialDir).isDirectory()) {
      fs.readdirSync(partialDir).forEach(file => {
        const partialFullPath = path.resolve(partialDir, file);
        const data = readFileSync(partialFullPath, { encoding: 'utf8', flag: 'r' }).toString();

        // logToFile('partialFile:' + file + '\r\n');

        partials = {
          ...partials,
          [file]: data
        };

        // logToFile('In cycle partials:' + JSON.stringify(partials) + '\r\n');

      });
    }

    // logToFile('partials:' + JSON.stringify(partials) + '\r\n');

    return partials;
  } catch (error) {
    throw error;
  }
};
