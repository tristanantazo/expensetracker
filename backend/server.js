const express = require('express');
const port = 3301;
const router = require('./app/routes');
const app = express();
const db = require('./app/config/dbInit');
const model = db().collection('user');
const GoogleApi = require('./app/utils/GoogleAPI');
const cors = require('cors')

require('dotenv').config();
//require('dotenv').config({ path: '/etc/secrets/.env' });

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(router);

app.listen(port, () => {
  console.log(`Node.js bsackend running at http://localhost:${port}`);
});
