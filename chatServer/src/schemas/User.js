const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirm_hash: String,
    lasr_seen: Date,
    avatar: String
},
{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User