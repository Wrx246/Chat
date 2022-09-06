const Message = require('../models/Message')
const MessageImage = require('../models/MessageImage')


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
            }).populate('messageImage');
            res.status(200).json(messages)
        } catch (e) {
            console.log("Error:", e);
            res.status(500).json(e)
        }
    }
    async sendImage(req, res) {
        try {
            const file = new MessageImage({
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size
            })
            const savedFile = await file.save()
            res.status(200).json(savedFile)
        } catch (e) {
            console.log("Error:", e);
            res.status(500).json(e)
        }
    }
}


module.exports = new messageController