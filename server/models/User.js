const {Schema, model} = require('mongoose')

const User = new Schema({
    userName: {type: String, unique: true, required: true},
    email: {type: String, require: true, index:true, unique:true,sparse:true},
    password: {type: String, required: true},
})

module.exports = model('User', User)