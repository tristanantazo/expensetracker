
const Base =  require('./Base.model');
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId; 

class Expense extends Base {

    constructor() {
        super('expense');
    }

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

    async createDocument(data) {
        return await this.create(this.setExpenseDocument(data));
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

    async getAllExpense() {
        return await this.all();
    }
}

module.exports = Expense;