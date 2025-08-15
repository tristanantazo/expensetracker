const { GoogleGenAI } = require("@google/genai");
const express = require('express');
const port = 3301;
const router = require('./app/routes');
const app = express();

const db = require('./app/config/dbInit');

const model = db().collection('user');

const { accessSpreadsheet } = require('./app/utils/GoogleAPI');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/sample', async (req, res) => {
  const result = await accessSpreadsheet().catch(console.error);
  res.json(result)
})

// const ai = new GoogleGenAI({ apiKey: "AIzaSyBr86ZZWdMncDQlpdSpMdz7PaJgB72v6Oo" });

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "What is Jakol?",
//   });
//   console.log(response.text);
// }

// main();

app.use(router);

app.listen(port, () => {
  console.log(`Node.js bsackend running at http://localhost:${port}`);
});
