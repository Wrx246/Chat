const { Schema, model } = require('mongoose')

const Message = new Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    },
    messageImage: {
        type: String,
        default: '',
    }
}, { timestamps: true })

module.exports = model('Message', Message)