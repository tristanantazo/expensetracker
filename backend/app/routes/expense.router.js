const express = require('express');
const expense = express.Router();

const { 
    getAllExpense,
    getExpenseById,
    insertExpense,
    deleteExpense,
    updateExpense
 } = require('../controllers/Expense.controller')

expense.get('/:id', getExpenseById);
expense.post('/insert', insertExpense);
expense.post('/delete', deleteExpense);
expense.post('/update', updateExpense);
expense.get('/', getAllExpense);

module.exports = expense;