const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    wood_type: {
        type: String,
        default: null,
    },
    finish: {
        type: String,
        default: null,
    },
    dimensions: {
        depth: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
    },
    price: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        //required: true,
    },
    image_path: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    sku: {
        type: String,
        //required: true,
        //unique: true,
    },
    status: {
        type: String,
        //required: true,
        enum: ['active', 'inactive'], 
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    featured: {
        type: Boolean,
        //default: false,
    },
    discount_price: {
        type: Number,
        default: null,
    },
    tags: {
        type: [String],
        default: null,
    },
});

module.exports = mongoose.model('Product', schema);
