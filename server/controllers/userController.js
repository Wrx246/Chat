const User = require('../models/User')
const UserAvatar = require('../models/UserAvatar')

class userController {
    async getUser (req, res) {
        const userId = req.query.userId;
        const userName = req.query.userName;
        try {
            const user = userId
                ? await User.findById(userId).populate('avatar')
                : await User.findOne({ userName: userName }).populate('avatar');
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
            const user = await User.findById(userId).populate('avatar');
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    // попробовать взять юзера по обычному запросу с айдишником в бади

    async updateUser (req, res) {
        const { _id, avatarData } = req.body
        try {
            const user = await User.findById({
                _id: _id,
            })
            await User.updateOne(user, {
                $set: { avatar: avatarData }
            })
            res.status(200).json({ user, success: true })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAccount(req, res) {
        try {
            const user = await User.findById({
                _id: req.params.accountId,
            }).populate('avatar');
            res.status(200).json(user)
            // console.log(_id)
        } catch (e) {
            console.log("Error:", e);
            res.status(500).json(e)
        }
    }

    async setAvatar (req, res) {
        try {
            const avatar = new UserAvatar({
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size
            })
            const savedFile = await avatar.save()
            res.status(200).json(savedFile)
        } catch (e) {
            console.log("Error:", e);
            res.status(500).json(e)
        }
    }
}


module.exports = new userController