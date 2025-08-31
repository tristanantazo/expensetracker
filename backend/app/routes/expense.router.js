const express = require('express');
const expense = express.Router();

const { 
    getAllExpense,
    getExpenseById,
    insertExpense,
    deleteExpense,
    updateExpense,
    getTotalExpense
 } = require('../controllers/Expense.controller')

 expense.get('/', getAllExpense);
 expense.get('/total', getTotalExpense);
 expense.get('/:id', getExpenseById);
 
 expense.post('/insert', insertExpense);
 expense.post('/delete', deleteExpense);
 expense.post('/update', updateExpense);

module.exports = expense;