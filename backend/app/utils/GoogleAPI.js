const { google } = require('googleapis');
//const keys = require('../../creds.json'); // path to your service account JSON file
require('dotenv').config({ path: '/etc/secrets/.env' });

async function accessSpreadsheet() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = '1BkMlPnZ79c9B3mdrLzn1kPTjVDkkuz8CUsmT9CoVQJk';
  const range = 'Sheet1!A1:D5';

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;
  if (rows.length) {
    console.log('Data:');
    rows.forEach((row) => {
      console.log(row.join(', '));
    });
    return rows;
  } else {
    console.log('No data found.');
  }
}

module.exports = {
    accessSpreadsheet
};

// accessSpreadsheet().catch(console.error);
