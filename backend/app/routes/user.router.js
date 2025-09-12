const express = require('express');
const user = express.Router();

const { 
    getUserSetting,
    saveUser
 } = require('../controllers/User.controller')

 user.get('/', getUserSetting);
 user.post('/', saveUser);

module.exports = user;