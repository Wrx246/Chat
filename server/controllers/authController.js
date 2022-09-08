const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../config')

const generateAccessToken = (id) => {
    const payload = { id }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class authController {
    async registration(req, res) {
        try {
            const { userName, password, email } = req.body

            const candidate = await User.findOne({ userName })
            if (candidate) {
                return res.status(400).json({
                    message: `User ${userName} already exist`,
                    status: false
                })
            }

            const userEmail = await User.findOne({ email })
            if (userEmail) {
                return res.status(400).json({
                    message: 'This mail already used',
                    status: false
                })
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({ userName, password: hashPassword, email })

            await user.save()
            return res.json({ message: 'User registered', user, status: true })
        } catch (e) {
            console.log("Error:", e);
            res.status(400).json(e)
        }
    }
    async login(req, res) {
        try {
            const { userName, password } = req.body
            const user = await User.findOne({ userName })
            if (!user) {
                return res.status(400).json({
                    message: `User ${userName} not found`,
                    status: false
                })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({
                    message: 'Wrong password',
                    status: false
                })
            }
            const token = generateAccessToken(user._id)
            return res.json({ user, status: true })
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' })
        }
    }
    async users(req, res) {
        try {
            res.json('server work')
        } catch (e) {

        }
    }
}

module.exports = new authController