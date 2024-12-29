const Order = require('../models/Order');
const APIError = require('../errors/API.js');
const statusCode = require('../constants/statusCode.js');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    getById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const order = await Order.findById(id).populate('items.product customer_id');
            if (!order) {
                throw new APIError(statusCode.NOT_FOUND, 'Order not found');
            }
            res.json({
                success: true,
                data: order,
            });
        } catch (err) {
            next(err);
        }
    },

    all: async (req, res, next) => {
        try {
            
            const { limit = 10, offset = 0, sort = 'order_date' } = req.query;

            
            const parsedLimit = parseInt(limit, 10);
            const parsedOffset = parseInt(offset, 10);

            if (isNaN(parsedLimit) || parsedLimit < 1) {
                return next(new APIError(statusCode.BAD_REQUEST, 'Invalid limit value'));
            }
            if (isNaN(parsedOffset) || parsedOffset < 0) {
                return next(new APIError(statusCode.BAD_REQUEST, 'Invalid offset value'));
            }


            const orders = await Order.find()
                .skip(parsedOffset)
                .limit(parsedLimit)
                .sort(sort) 
                .populate('customer_id', 'name') 
                .populate('items.product', 'name price'); 

           
            const totalOrders = await Order.countDocuments();

            res.json({
                success: true,
                data: orders,
                pagination: {
                    total: totalOrders,
                    limit: parsedLimit,
                    offset: parsedOffset,
                },
            });
        } catch (err) {
            next(err);
        }
    },


    getUserOrdersById: async (req, res, next) => {
        try {
            const userId = req.params.id;
            const { limit = 10, offset = 0 } = req.query;

            const orders = await Order.find({ customer_id: userId })
                .skip(Number(offset))
                .limit(Number(limit))
                .populate('items.product');

            const totalOrders = await Order.countDocuments({ customer_id: userId });

            res.json({
                success: true,
                data: orders,
                total: totalOrders,
            });
        } catch (err) {
            next(err);
        }
    },

    create: async (req, res, next) => {
        try {
            const { customer_id, items, total_price, payment_status } = req.body; 

            if (!items || items.length === 0) {
                throw new APIError(statusCode.BAD_REQUEST, 'Order must contain items');
            }

            const order = new Order({
                id: uuidv4(),
                customer_id:new mongoose.Types.ObjectId(customer_id),
                items,
                total_price,
                payment_status,
            });

            await order.save();

            res.status(statusCode.CREATED).json({
                success: true,
                message: 'Order created successfully',
                data: order,
            });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;

            const order = await Order.findById(id);
            if (!order) {
                throw new APIError(statusCode.NOT_FOUND, 'Order not found');
            }

            Object.assign(order, updates);
            await order.save();

            res.json({
                success: true,
                message: 'Order updated successfully',
                data: order,
            });
        } catch (err) {
            next(err);
        }
    },

    updatePaymentStatus: async (req, res, next) => {
        try {
            const id = req.params.id;
            const { payment_status } = req.body;

            const order = await Order.findById(id);
            if (!order) {
                throw new APIError(statusCode.NOT_FOUND, 'Order not found');
            }

            order.payment_status = payment_status;
            await order.save();

            res.json({
                success: true,
                message: 'Payment status updated successfully',
            });
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            const id = req.params.id;

            const order = await Order.findById(id);
            if (!order) {
                throw new APIError(statusCode.NOT_FOUND, 'Order not found');
            }

            await Order.findByIdAndDelete(id);

            res.json({
                success: true,
                message: 'Order deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    },
};
