const { google } = require('googleapis');
// const keys = require('../../creds.json'); // path to your service account JSON file
require('dotenv').config();

const keys = {
    "type": process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
    "project_id":process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
    "private_key_id":process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    "private_key":process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    "client_email":process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    "client_id":process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
    "auth_uri":process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_URI,
    "token_uri":process.env.GOOGLE_SERVICE_ACCOUNT_TOKEN_URI,
    "auth_provider_x509_cert_url":process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_PROVIDER,
    "client_x509_cert_url":process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_CERT,
    "universe_domain":process.env.GOOGLE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
  }
  

async function accessSpreadsheet() {
  const auth = new google.auth.GoogleAuth({
    credentials: keys,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = process.env.SPREADSHEET_ID;
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
