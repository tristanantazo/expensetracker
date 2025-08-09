const express = require('express');
const port = 3301;
const router = require('./app/routes');
const app = express();

const db = require('./app/config/dbInit');

const model = db().collection('user');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/sample', async (req, res) => {
  const result = await model.find().toArray();
  res.json(result)

})

app.use(router);

app.listen(port, () => {
  console.log(`Node.js bsackend running at http://localhost:${port}`);
});


// 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