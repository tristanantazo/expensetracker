
// const Base =  require('./Base.model');
const ObjectId = require('mongodb').ObjectId; 

const GoogleApi = require('../utils/GoogleAPI');

// class Expense extends Base {
class Expense {

    async all() {
        try {
            let google_api = new GoogleApi({
                range: "Sheet1!A:E",
                spread_sheet_id: "1BkMlPnZ79c9B3mdrLzn1kPTjVDkkuz8CUsmT9CoVQJk", 
            });
            await google_api.init();
            const response = await google_api.all();
            return response;
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

          const value_array = [data].map((element, index) => {
            return [
                element['date'],
                element['amount'],
                element['note'],
                element['category'],
            ]
        });
        
          let result = await google_api.create(value_array);

          if(result.response.status == 200) {
            data['id'] = result.id;
            return data;
          }
    }

    async editTransaction(data) {
        let google_api = new GoogleApi({
            range: "Sheet1!A:E",
            spread_sheet_id: "1BkMlPnZ79c9B3mdrLzn1kPTjVDkkuz8CUsmT9CoVQJk", 
        });

        await google_api.init();

        const value_array = [params].map((element, index) => {
            return [
                element['id'],
                element['date'],
                element['amount'],
                element['note'],
                element['category'],
            ]
        });

        return await google_api.edit(value_array);
    }

    async getTotal() {
        const all_data = await this.all();

        const total = all_data.reduce((sum, item) => {
            return sum + parseFloat(item.amount.replace(/,/g, ''))
        }, 0);

        return total;
    }

    async deleteTransaction(data) {
        let google_api = new GoogleApi({
            range: "Sheet1!A:E",
            spread_sheet_id: "1BkMlPnZ79c9B3mdrLzn1kPTjVDkkuz8CUsmT9CoVQJk", 
        });

        await google_api.init();

        return await google_api.delete(data);
    }

    async getById(){
        return "id"
    }

}

module.exports = Expense;