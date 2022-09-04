const User = require('../models/User')

class userController {
    async getUser (req, res) {
        const userId = req.query.userId;
        const userName = req.query.userName;
        try {
            const user = userId
                ? await User.findById(userId)
                : await User.findOne({ userName: userName });
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json(other);
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getUserData (req, res) {
        const userId = req.query.userId;
        try {
            // const user = await User.findById(userId);
            // const { password, updatedAt, ...other } = user._doc;
            const user = await User.findById(userId);
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    // попробовать взять юзера по обычному запросу с айдишником в бади
}


module.exports = new userController