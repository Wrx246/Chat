const { Schema, model } = require('mongoose')

const Conversation = new Schema({
    members: {
        type: Array,
    },
}, { timestamps: true })

module.exports = model('Conversation', Conversation)