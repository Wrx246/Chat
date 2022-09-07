const Message = require('../models/Message')
const MessageImage = require('../models/MessageImage')
const fs = require('fs')
const path = require('path')


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

    async deleteMessage(req, res) {
        const { _id, messageImage } = req.body
        try {
            const message = await Message.findById({
                _id: _id,
            })
            await Message.deleteOne(message)
            if (messageImage !== null) {
                fs.rm(messageImage.filePath, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
            res.status(200).json({ success: true })
        } catch (e) {
            console.log("Error:", e);
            res.status(500).json(e)
        }
    }

    async updateMessage(req, res) {
        const { _id, text } = req.body
        try {
            const message = await Message.findById({
                _id: _id,
            })
            await Message.updateOne(message, {
                $set: { text: text }
            })
            res.status(200).json({ message, success: true })
        } catch (e) {
            console.log("Error:", e);
            res.status(500).json(e)
        }
    }
}


module.exports = new messageController