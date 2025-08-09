const express = require("express");
const router = express.Router();
const ExpenseRouter = require('./expense.router');

router.get('/', (req, res) => {
    res.send('Hello from Node.js backend !');
  });

router.use('/expense', ExpenseRouter);

module.exports = router;