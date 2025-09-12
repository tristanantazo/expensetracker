const express = require("express");
const router = express.Router();
const ExpenseRouter = require('./expense.router');
const UserRouter = require('./user.router');

router.get('/', (req, res) => {
    res.send('Hello from Node.js backend !');
  });

router.use('/expense', ExpenseRouter);
router.use('/user', UserRouter);

module.exports = router;