const Router = require('express')
const router = new Router()
const controller = require('../controllers/messageController')

router.post('/', controller.message)
router.get('/:conversationId', controller.getMessages)

module.exports = router