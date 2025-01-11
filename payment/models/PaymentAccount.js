const mongoose = require('mongoose')

const PaymentAccountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        default: 1000 // Initial balance
    }
}) 
const PaymentAccount = mongoose.model('PaymentAccount', PaymentAccountSchema)
module.exports = PaymentAccount