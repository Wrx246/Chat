const Conversation = require('../models/Conversation')

class conversationController {
    async conversation(req, res) {
        try {
            const newConversation = new Conversation({
                members: [req.body.senderId, req.body.receiverId],
            });

            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async conversationItem(req, res) {
        try {
            const conversationId = await Conversation.find({
                members: { $in: [req.params.userId] },
            });
            res.status(200).json(conversationId)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async newConversation(req, res) {
        try {
            const conversation = await Conversation.findOne({
                members: { $all: [req.params.firstUserId, req.params.secondUserId] },
            })
            res.status(200).json(conversation)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async deleteConversation(req, res) {
        const { conversationId } = req.body
        try {
            await Conversation.deleteOne({ _id: conversationId })
            res.status(200).json({ success: true})
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


module.exports = new conversationController