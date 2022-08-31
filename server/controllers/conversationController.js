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
            console.log("Error:", e);
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
            console.log("Error:", e);
            res.status(500).json(e)
        }
    }
}


module.exports = new conversationController