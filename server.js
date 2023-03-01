// create express server
import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

// get port from env var
const { PORT = 3000 } = process.env;

// serve static files from the dist directory
app.use(express.static('dist'));

// start the app
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
