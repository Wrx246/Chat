const { Schema, model, default: mongoose } = require('mongoose')

const Message = new Schema({
    conversationId: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    messageImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MessageImage',
        required: false
    }
}, { timestamps: true })

module.exports = model('Message', Message)