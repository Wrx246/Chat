const Router = require('express')
const router = new Router()
const controller = require('../controllers/conversationController')

router.post('/', controller.conversation)
router.get('/:userId', controller.conversationItem)
router.get('/find/:firstUserId/:secondUserId', controller.newConversation)

module.exports = router