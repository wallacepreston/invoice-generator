import { readFile, pickColumns, renameColumns } from './util.js';
import fs from 'fs';
import _ from 'lodash';

const fileContents = await readFile();

// only pick the columns we want
const columnsToKeep = ['Project', 'Description', 'Start Date', 'Billable Rate (USD)', 'Duration (h)', 'Duration (decimal)'];
const filteredColumns = pickColumns(fileContents, columnsToKeep);

// rename columns to match our schema
const columnsToRename = {
  'Billable Rate (USD)': 'Rate',
  'Duration (h)': 'Hrs (h)',
  'Duration (decimal)': 'Decimal',
  'Start Date': 'Date'
};
const renamedColumns = renameColumns(filteredColumns, columnsToRename);

// sort by `Date` in ascending order
const sorted = _.sortBy(renamedColumns, ['Date']);

fs.writeFileSync('data.json', JSON.stringify(sorted));
