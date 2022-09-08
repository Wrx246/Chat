const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')
const fileMiddleware = require('../middleware/fileConfig')

router.get('/', controller.getUser)
router.get('/userdata/', controller.getUserData)
router.post('/setavatar', fileMiddleware.single('image'), controller.setAvatar)
router.post('/update', controller.updateUser)
router.get('/:accountId', controller.getAccount)
router.post('/update/password', controller.updatePassword)
router.post('/update/email', controller.updateEmail)
router.post('/update/name', controller.updateUsername)

module.exports = router