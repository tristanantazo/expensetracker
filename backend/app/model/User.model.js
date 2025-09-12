
const { google } = require('googleapis');
const { nanoid } = require('nanoid');

// class User extends Base {
class User {
    constructor() {
        this.range = "Sheet1!H2";
        this.spread_sheet_id = "1BkMlPnZ79c9B3mdrLzn1kPTjVDkkuz8CUsmT9CoVQJk";
    }

    async get() {
        try {
            const sheet = await this.googleApiInit();
            const response = await sheet.spreadsheets.values.get({
                spreadsheetId: this.spread_sheet_id,
                range: this.range,
            });
            
            return JSON.parse(response.data.values[0][0])
        } catch (error) {
            return error
        }
    }

    async save(params) {
        try {
            const sheet = await this.googleApiInit();

            const updateRes = await sheet.spreadsheets.values.update({
                spreadsheetId: this.spread_sheet_id,
                range: this.range,
                valueInputOption: 'RAW',
                resource: {
                    values: [params],
                },
            });

            return JSON.parse(params)
        } catch (error) {
            return error
        }
    }

    async googleApiInit() {
        try {
            const auth = new google.auth.GoogleAuth({
                keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
            const client = await auth.getClient();
            
            return await google.sheets({ version: 'v4', auth: client });
        } catch (error) {
            return error;
        }
    }
}

module.exports = User;