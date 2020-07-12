require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const beaconMiddleware = require('../middleware/beaconMiddleware.js');
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};

app.use(express.static(DIST_DIR));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.send(mockResponse);
});

app.get('/api/beacon/chainhead',
  // Middleware chain
  async (req, res, next) => {
    console.log('Getting Beacon Chain Head');
    await beaconMiddleware.getChainHead(req, res, next);
  },
  async (req, res, next) => {
    // Handle error in async function
    try {
      const chainHead = res.locals.chainHead;
      res.send({
        chainHead,
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }
);

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.listen(port, (error) => {
  console.log(`Server listening on port ${port}`);
});
