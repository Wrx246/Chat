const {Schema, model, default: mongoose} = require('mongoose')

const User = new Schema({
    userName: {
        type: String, 
        unique: true, 
        required: true
    },
    email: {
        type: String, 
        require: true, 
        index:true, 
        unique:true,
        sparse:true
    },
    password: {
        type: String, 
        required: true
    },
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAvatar',
        required: false
    }
}, { timestamps: true })

module.exports = model('User', User)