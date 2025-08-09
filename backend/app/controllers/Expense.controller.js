const Expense = require('../model/Expense.model');
const { responseSuccess } = require('../utils/ResponseFactory');

const getExpenseById = async (req, res) => {
    try {
        const exp = new Expense;
        let data = await exp.getById(req.params.id);
        res.json(responseSuccess(data));
    } catch (error) {
        res.json({
            'error': error
        })
    }
}

const insertExpense = async (req, res) => {
    try {
        let expense = await (new Expense).createDocument(req.body);
        res.json(responseSuccess(expense));
    } catch (error) {
        res.json({
            'error': error
        })
    }
};

const deleteExpense = async (req, res) => {
    try {
        await (new Expense).deleteDocument(req.body.id);
        res.json(responseSuccess('success'));
    } catch (error) {
        console.log(error)
        res.json({
            'error': error
        })  
    }
}

const updateExpense = async (req, res) => {
    try {
        let expense = await (new Expense).editDocument(req.body);
        res.json(responseSuccess(expense));
    } catch (error) {
        console.log(error)
        res.json({
            'error': error
        })  
    }
}

const getAllExpense = async (req, res) => {
    try {
        let expense = await (new Expense).getAllExpense();
        res.json(responseSuccess(expense));
    } catch (error) {
        console.log(error)
        res.json({
            'error': error
        })  
    }
}

module.exports = {
    getExpenseById,
    insertExpense,
    deleteExpense,
    updateExpense,
    getAllExpense
}