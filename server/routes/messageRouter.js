const Router = require('express')
const router = new Router()
const controller = require('../controllers/messageController')
const fileMiddleware = require('../middleware/fileConfig')

router.post('/', controller.message)
router.post('/image', fileMiddleware.single('image'), controller.sendImage)
router.get('/:conversationId', controller.getMessages)

module.exports = router