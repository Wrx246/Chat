const { Schema, model } = require('mongoose')

const MessageImage = new Schema({
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    fileSize: {
        type: String,
        required: true,
    },
}, {timestamps: true})

module.exports = model('MessageImage', MessageImage)