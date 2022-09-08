const User = require('../models/User')
const bcrypt = require('bcryptjs')
const UserAvatar = require('../models/UserAvatar')

class userController {
    async getUser(req, res) {
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

    async getUserData(req, res) {
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

    async updateUser(req, res) {
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

    async updateUsername(req, res) {
        try {
            const { userId, newUserName } = req.body

            const user = await User.findById({ _id: userId })

            const candidate = await User.findOne({ userName: newUserName })
            if (candidate) {
                return res.status(400).json({
                    message: `${newUserName} already used`,
                    status: false
                })
            }
            await User.updateOne(user, {
                $set: { userName: newUserName }
            })
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async updateEmail(req, res) {
        try {
            const { userId, newEmail } = req.body
            
            const user = await User.findById({ _id: userId })
            
            const userEmail = await User.findOne({ email: newEmail })
            if (userEmail) {
                return res.status(400).json({
                    message: 'This mail already used',
                    status: false
                })
            }
            await User.updateOne(user, {
                $set: { email: newEmail }
            })
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async updatePassword(req, res) {
        try {
            const { userId, password, newPassword } = req.body

            const user = await User.findById({ _id: userId })

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({
                    message: `Incorrect password`,
                    status: false
                })
            }
            const hashPassword = bcrypt.hashSync(newPassword, 7);
            await User.updateOne(user, {
                $set: { password: hashPassword }
            })
            res.status(200).json(user)
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
        } catch (e) {
            console.log("Error:", e);
            res.status(500).json(e)
        }
    }

    async deleteAccount(req, res) {
        const { userId } = req.body
        try {
            await User.deleteOne({ _id: userId })
            res.status(200).json({ success: true })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async setAvatar(req, res) {
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