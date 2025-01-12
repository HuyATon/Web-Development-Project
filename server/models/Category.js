const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

schema.methods.getProducts = async function () {
    return await Product.find({ category: this.name });
};

module.exports = mongoose.model('Category', schema)