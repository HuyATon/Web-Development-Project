const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => require('uuid').v4(), 
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    order_date: {
        type: Date,
        default: Date.now,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1, 
            },
            unit_price: {
                type: Number,
                required: true,
            },

        },
    ],
    total_price: {
        type: Number,
        required: true,
    },
    payment_status: {
        type: String,
        enum: ['pending', 'completed'], 
        default: 'pending',
    },
});

module.exports = mongoose.model('Order', orderSchema);
