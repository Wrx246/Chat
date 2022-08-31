const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')

router.get('/', controller.getUser)

module.exports = router