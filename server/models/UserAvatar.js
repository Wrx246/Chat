const { Schema, model } = require('mongoose')

const UserAvatar = new Schema({
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

module.exports = model('UserAvatar', UserAvatar)