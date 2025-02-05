const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entries: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 0
            },
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
