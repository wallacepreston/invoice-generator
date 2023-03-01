// import native node modules
import path from 'path';
import os from'os';
import fs from 'fs';

// import third party modules
import csv from 'csvtojson';
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
  // remove hidden files
  .filter(function (v) {
    return !(/(^|\/)\.[^\/\.]/g).test(v.name); })
  // sort by recent
  .sort(function (a, b) {
    return b.time - a.time; })
  // return array of filenames
  .map(function (v) {
    return v.name; });
  
  // return most recent file
  return files[0];
};

export const getDownloadsDir = () => {
  return path.join(os.homedir(), 'Downloads');
};

export const readFile = async () => {
  // get downloads directory
  const downloadsDir = getDownloadsDir();

  // get most recent filename
  const mostRecentFilename = getMostRecentFile(downloadsDir);

  // set source to most recent file's path
  const source = path.join(downloadsDir, mostRecentFilename);

  // read csv file
  const fileContents = await await csv().fromFile(source);

  return fileContents;
};

export const pickColumns = (data, columns) => {
  return _.map(data, (row) => _.pick(row, columns));
}

// rename only the columns passed in. Keep the rest as is
export const renameColumns = (data, columns) => {
  return _.map(data, (row) => {
    return _.mapKeys(row, (value, key) => {
      return columns[key] || key;
    });
  });
}
