const { google } = require('googleapis');
const { nanoid } = require('nanoid');
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

    async all() {
        try {
            const spreadsheetId = this.spread_sheet_id;
            const range = this.range;
    
            const response = await this.sheet.spreadsheets.values.get({
                spreadsheetId,
                range,
            });
        
            const rows = response.data.values;
            if (rows.length <= 0) {
                console.log('No data found.');
                return ;
            } 
    
            return this.formatData(rows);
        } catch (error) {
            return error;
        }
    }

    async findById(params) {
        try {
            const data = await this.all();
            const response =  data.find((row, index, arr) => {
                return row.id = params.id
            })
            return response;            
        } catch (error) {
            return error;
        }
    }

    async edit(params) {
        try {
            const rows = await this.findRows(params)

            if(typeof rows !== 'object'){
                return "No record found";
            }
    
            // Step 4: Update the specific cell
            const updateRes = await this.sheet.spreadsheets.values.update({
                spreadsheetId: this.spread_sheet_id,
                range: rows.range,
                valueInputOption: 'RAW',
                resource: {
                values: params,
                },
            });
    
            return params;   
        } catch (error) {
            return error;
        }
    }

    async create(data) {
        try {
            var value_array = data.map(e => [this.createID(), ...e]);
            
            console.log(value_array)
            
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
        } catch (error) {
            return error;
        }

    }

    createID() {
        const date = Date.now();
        return date + nanoid();
        
    }

    async delete(params) {
        try {
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
        } catch (error) {
            return error;
        }
    }

    formatData(data) {
        const [header, ...row] = data;
        const objects = row.map(row => {
            return header.reduce((obj, key, index) => {
                obj[key] = row[index];
                return obj;
            }, {});
        });

        return objects;
    }
}

module.exports = GoogleApi;
