const db = require('../config/dbInit');
const ObjectId = require('mongodb').ObjectId; 
const _ = require('lodash');

class Base {
    
    data;

    constructor (collection_name) {
        this.collection_name = collection_name;
        this.model = db().collection(this.collection_name);
        this.data = {}
    }

    async getById(id) {
        try {
            var o_id = new ObjectId(id);
            this.data = await this.model.findOne({ _id : o_id });
            return this.data;
        } catch (error) {
            return error;
        }
    }

    async create(data) {
        try {
            data['created_at'] = Date.now();
            let response = await this.model.insertOne(data);
            this.data = data;
            return _.merge(data, response);
        } catch (error) {
            return error;
        }
    }
     
    async delete(filter) {
        return await this.model.deleteOne(filter);
    }

    async update(filter, data) {
        return await this.model.updateOne(filter, data);
    }

    async all() {
        return await this.model
    }
}

module.exports = Base;