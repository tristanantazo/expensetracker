const { google } = require('googleapis');
const { options } = require('../routes');
const { map, mapKeys } = require('lodash');
const { nanoid } = require('nanoid');
const { response } = require('express');
class GoogleApi {
    constructor(params) {
        this.sheet = '';
        this.range = params.range;
        this.spread_sheet_id = params.spread_sheet_id;

        this.column_number = {
            id: 0,
            date: 1,
            amount: 2,
            note: 3,
            category: 4,
        }
    }

    async init() {
        try {
            const auth = new google.auth.GoogleAuth({
                keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
            const client = await auth.getClient();
            this.sheet = await google.sheets({ version: 'v4', auth: client });
    
            return this.sheet;
        } catch (error) {
            return error;
        }
    }

    async accessSpreadsheet() {
        const spreadsheetId = this.spread_sheet_id;
        const range = "Sheet1!A:E";

        const response = await this.sheet.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
    
        const rows = response.data.values;
        if (rows.length) {
            return rows;
        } else {
            console.log('No data found.');
        }
    }

    createID() {
        const date = Date.now();
        return date + nanoid();
        
    }

    async insertTransaction(data) {

        const value_array = [data].map((element, index) => {
            return [
                element['id'] = this.createID(),
                element['date'],
                element['amount'],
                element['note'],
                element['category'],
            ]
        });

        const option = {
            spreadsheetId: this.spread_sheet_id,
            range: this.range,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
                values: value_array
            }
        };


        return await this.sheet.spreadsheets.values.append(option);

    }

    async editTransaction(params) {
        const rows = await this.findRows(params)

        if(typeof rows !== 'object'){
            return "No record found";
        }

        const value_array = [params].map((element, index) => {
            return [
                element['id'],
                element['date'],
                element['amount'],
                element['note'],
                element['category'],
            ]
        });

        // Step 4: Update the specific cell
        const updateRes = await this.sheet.spreadsheets.values.update({
            spreadsheetId: this.spread_sheet_id,
            range: rows.range,
            valueInputOption: 'RAW',
            resource: {
            values: value_array,
            },
        });

        return params;
    }

    async deleteTransaction(params) {
        const rows = await this.findRows(params)

        if(typeof rows !== 'object'){
            return "No record found";
        }

        const request = {
            spreadsheetId: this.spread_sheet_id,
                resource: {
                    requests: [
                        {
                            deleteDimension: {
                                range: {
                                    sheetId: 0, // sheetID
                                    dimension: 'ROWS',
                                    startIndex: rows.index,
                                    endIndex: rows.index + 1,
                                },
                            },
                        },
                    ],
                },
            };

            await this.sheet.spreadsheets.batchUpdate(request);

            return "success";
        
    }

    async findRows(params, sheet_index = this.column_number.id) {

        const option = {
            spreadsheetId: this.spread_sheet_id,
            range: this.range,
        };

        const response = await this.sheet.spreadsheets.values.get(option);
        const rows = response.data.values;

        if(params.id == 1 || !rows || rows.length === 0) {
            return "No record found";
        }

        const rowIndex = rows.findIndex((element, index, array) => index !== 0 && element[sheet_index] == params.id);
        const cell = `Sheet1!A${rowIndex+1}:E${rowIndex+1}`; // +1 because index is 0-based

        return {
            index: rowIndex,
            range: cell
        }
    }

    async rowCount() {
        const data = await this.accessSpreadsheet();
        const [header, ...rows] = data;

        console.log(data);
        return rows.length;
    }
}

module.exports = GoogleApi;
