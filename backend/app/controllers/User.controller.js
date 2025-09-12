const User = require('../model/User.model');
const { responseSuccess } = require('../utils/ResponseFactory');

const getUserSetting = async (req, res) => {
    try {
        const user = new User;
        let data = await user.get();
        res.json(responseSuccess(data));
    } catch (error) {
        res.json({
            'error': error
        })
    }
}

const saveUser = async (req, res) => {
    try {
        const user = new User;
        let data = await user.save([JSON.stringify(req.body)]);
        res.json(responseSuccess(data));
    } catch (error) {
        res.json({
            'error': error
        })
    }
}


module.exports = {
    getUserSetting,
    saveUser
}