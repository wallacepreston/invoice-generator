// import native node modules
import path from 'path';
import os from'os';
import fs from 'fs';
import csv from 'csvtojson';

// import third party modules
import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify/sync';
import _ from 'lodash';

// polyfill dirname and filename vars
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const getMostRecentFile = (dir) => {
  // get all files in source directory
  let files = fs.readdirSync(dir);
  
  files = files.map(function (fileName) {
    return {
      name: fileName,
      time: fs.statSync(dir + '/' + fileName)?.mtime?.getTime()
    };
  })
  // sort by recent
  .sort(function (a, b) {
    return b.time - a.time; })
  // return array of filenames
  .map(function (v) {
    return v.name; });
  
  // return most recent file
  return files[0];
};

export const readFile = async () => {
  // get downloads directory
  const downloadsDir = path.join(os.homedir(), 'Downloads');

  // get most recent filename
  const mostRecentFilename = getMostRecentFile(downloadsDir);

  // set source to most recent file's path
  const source = path.join(downloadsDir, mostRecentFilename);

  // read csv file
  const fileContents = await await csv().fromFile(source);

  return fileContents;
};
