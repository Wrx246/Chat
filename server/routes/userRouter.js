const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')

router.get('/', controller.getUser)
router.get('/userdata/', controller.getUserData)

module.exports = router