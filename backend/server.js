const express = require('express');
const port = 3301;
const router = require('./app/routes');
const app = express();
const db = require('./app/config/dbInit');
const model = db().collection('user');
const cors = require('cors')

const GoogleApi = require('./app/utils/GoogleAPI');

require('dotenv').config({ path: process.env.ENV_PATH || '.env' });
// require('dotenv').config({ path: '/etc/secrets/.env' });

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(router);

router.get('/id', async (req, res) => {
  try {
    let google_api = new GoogleApi({
        range: "Sheet1!A:E",
        spread_sheet_id: "1BkMlPnZ79c9B3mdrLzn1kPTjVDkkuz8CUsmT9CoVQJk", 
    });
    
    await google_api.init();
    const response = await google_api.findById({
      id: '1756017302135NRdbFbx5C9H4hI4DIAMht'
    });
    
    console.log(response)
    res.json(response);
} catch (error) {
    return error
}
});


app.listen(port, () => {
  console.log(`Node.js bsackend running at http://localhost:${port}`);
});
