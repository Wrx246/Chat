const User = require('../models/User')

class userController {
    async getUser (req, res) {
        const userId = req.query.userId;
        const username = req.query.userName;
        try {
            const user = userId
                ? await User.findById(userId)
                : await User.findOne({ username: username });
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json(other);
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


module.exports = new userController