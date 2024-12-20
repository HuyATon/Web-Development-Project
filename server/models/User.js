const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    googleID: {
        type: String,
        default: null,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    address: {
        type: String,
        default: null,
    },
    phone: {
        type: String,
        default: null,
    }
})

module.exports = mongoose.model('User', schema)