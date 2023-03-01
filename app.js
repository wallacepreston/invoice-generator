// create express server
import express from 'express';
const app = express();

import { readFile } from './util.js';

const { PORT = 3000 } = process.env;

// route for parsing csv file and returning the data
app.get('/api/csv', async (req, res) => {
  // read csv file
  const fileContents = await readFile();
  res.send(fileContents);

});

// start express server
app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});