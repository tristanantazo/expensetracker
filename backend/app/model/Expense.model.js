
// const Base =  require('./Base.model');
const ObjectId = require('mongodb').ObjectId; 

const GoogleApi = require('../utils/GoogleAPI');

// class Expense extends Base {
class Expense {

     static sampleReturn() {
        return {
            'id': 1,
            'description': 'sample description',
            'amount': 100
        }
    }
    
    setExpenseDocument(data) {
        return {
            'amount': data['amount'],
            'label': data['label'],
            'category_id': data['category_id'],
            'created_at': data['created_at'],
            'updated_at': data['updated_at'],
        }
    }

    async deleteDocument(id) {
        const o_id = new ObjectId(id) 
        let filter = { _id : o_id }
        await this.delete(filter);
    }

    async editDocument(data) {
        const o_id = new ObjectId(data.id)
        let expense = this.setExpenseDocument(data)
        let filter = {
            _id : o_id
        }
        
        expense.updated_at = Date.now();

        return await this.update(filter, { $set : expense });
    }

    async all() {
        try {
            let google_api = new GoogleApi({
                range: "Sheet1!A:E",
                spread_sheet_id: "1BkMlPnZ79c9B3mdrLzn1kPTjVDkkuz8CUsmT9CoVQJk", 
            });
            
            await google_api.init();
            const response = await google_api.accessSpreadsheet();

            return this.formatData(response);
        } catch (error) {
            return error
        }
    }

    async create(data) {
        let google_api = new GoogleApi({
            range: "Sheet1!B1",
            spread_sheet_id: "1BkMlPnZ79c9B3mdrLzn1kPTjVDkkuz8CUsmT9CoVQJk", 
          });
        
          await google_api.init();
        
          let result = await google_api.insertTransaction(data);

          return result;
    }

    async editTransaction(data) {
        let google_api = new GoogleApi({
            range: "Sheet1!A:E",
            spread_sheet_id: "1BkMlPnZ79c9B3mdrLzn1kPTjVDkkuz8CUsmT9CoVQJk", 
        });

        await google_api.init();

        return await google_api.editTransaction(data);
    }

    async deleteTransaction(data) {
        let google_api = new GoogleApi({
            range: "Sheet1!A:E",
            spread_sheet_id: "1BkMlPnZ79c9B3mdrLzn1kPTjVDkkuz8CUsmT9CoVQJk", 
        });

        await google_api.init();

        return await google_api.deleteTransaction(data);
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

module.exports = Expense;