const Router = require('express')
const router = new Router()
const controller = require('../controllers/messageController')
const fileMiddleware = require('../middleware/fileConfig')

router.post('/', controller.message)
router.post('/image', fileMiddleware.single('image'), controller.sendImage)
router.get('/:conversationId', controller.getMessages)
router.post('/delete', controller.deleteMessage)

module.exports = router