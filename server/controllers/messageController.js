const Message = require('../models/Message')

class messageController {
    async message(req, res) {
        try {
            const newMessage = new Message(req.body)
            const savedMessage = await newMessage.save()
            res.status(200).json(savedMessage)
        } catch (e) {
            console.log("Error:", e);
            res.status(500).json(e)
        }

    }

    async getMessages(req, res) {
        try {
            const messages = await Message.find({
                conversationId: req.params.conversationId,
            });
            res.status(200).json(messages)
        } catch (e) {
            console.log("Error:", e);
            res.status(500).json(e)
        }
    }
}


module.exports = new messageController