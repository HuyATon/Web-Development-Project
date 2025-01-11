const Cart = require('../models/Cart.js')
const APIError = require('../errors/API.js')
const statusCode = require('../constants/statusCode.js')

module.exports = {

    create: async(req, res, next) => {
        try {
            const user = req.user 
            const entries = req.body.entries || []
            console.log(entries)
            const oldCart = await Cart.findOne({ customerID: user._id })
            if (oldCart) {
                res.json({
                    success: false,
                    message: 'Cart already exists'
                })
            }
            const cart = Cart({
                customer: user._id,
                entries: entries // [{ productID + quantity } ...]
            })
            await cart.save()
            res.json({
                success: true,
                data: {
                    cart: cart
                }
            })
        }
        catch (err) {
            next(err)
        }
    },
    getUserCart: async(req, res, next) => {
        try {
            const user = req.user
            const cart = await Cart.findOne({ customer: user._id }).populate('entries.product').exec()
            if (!cart) {
                return res.json({
                    success: false,
                    message: 'Cart not found'
                })
            }
            res.json({
                success: true,
                data: {
                    cart: cart
                }
            })
        } catch (err) {
            next(err)
        }
    },
    update: async(req, res, next) => {
        try {
            const { product, quantity } = req.body 
            const productID = product._id
            const cart = await Cart.findOne( { customer: req.user._id })
            // update cart
            const entry = cart.entries.find(entry => {
                return entry.product == productID
            })
            if (entry) {
                if (quantity === 0 ) { 
                    cart.entries = cart.entries.filter(entry => entry.product != productID)
                } else {
                    entry.quantity = quantity
                }
            }
            else {
                cart.entries.push({ product: productID, quantity: quantity })
            }
            await cart.save()
            res.json({
                success: true,
                message: 'Cart updated',
            })
        }
        catch (err) { 
            console.log(err)
            next(err) }
    }
}