import { readFile } from './util.js';
import fs from 'fs';

const fileContents = await readFile();
fs.writeFileSync('data.json', JSON.stringify(fileContents));
