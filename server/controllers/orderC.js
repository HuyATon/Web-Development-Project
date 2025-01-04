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
            const { customer_id, items, payment_status, order_date } = req.body;


            if (!items || items.length === 0) {
                throw new APIError(statusCode.BAD_REQUEST, 'Order must contain items');
            }


            let calculatedTotalPrice = 0;
            items.forEach(item => {
                if (item.quantity && item.unit_price) {
                    calculatedTotalPrice += item.quantity * item.unit_price;
                }
            });


            const order = new Order({
                id: uuidv4(),
                customer_id: new mongoose.Types.ObjectId(customer_id),
                items,
                total_price: calculatedTotalPrice,
                payment_status,
                order_date
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

    getOrderTrends: async (req, res, next) => {
        try {
            const { type = 'daily', month, year } = req.query;
    
           
            if (!year || isNaN(year)) {
                return next(new APIError(statusCode.BAD_REQUEST, 'Valid year is required'));
            }
    

            if (month && (isNaN(month) || month < 1 || month > 12)) {
                return next(new APIError(statusCode.BAD_REQUEST, 'Invalid month value'));
            }
    
            const startDate = new Date(Date.UTC(year, month - 1, 1));  
            const endDate = month
                ? new Date(Date.UTC(year, month, 1))  
                : new Date(Date.UTC(Number(year) + 1, 0, 1));  
    
            const matchStage = {
                $match: {
                    order_date: { $gte: startDate, $lt: endDate },
                },
            };
    
            const groupStage = type === 'daily'
                ? {
                    $group: {
                        _id: {
                            day: { $dayOfMonth: '$order_date' },
                            month: { $month: '$order_date' },
                            year: { $year: '$order_date' },
                        },
                        count: { $sum: 1 },
                    },
                }
                : {
                    $group: {
                        _id: {
                            month: { $month: '$order_date' },
                            year: { $year: '$order_date' },
                        },
                        count: { $sum: 1 },
                    },
                };
    
            const trends = await Order.aggregate([matchStage, groupStage, { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }]);
    
            const daysInMonth = month ? new Date(year, month, 0).getDate() : 31;  
            const resultData = Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, count: 0 }));
    
            trends.forEach(item => {
                const day = item._id.day - 1;
                resultData[day].count = item.count; 
            });
    
            res.json({
                success: true,
                data: resultData,
            });
        } catch (err) {
            next(err);
        }
    },
    

    getIncomeTrends: async (req, res, next) => {
        try {
            const { type = 'daily', month, year } = req.query;


            if (!year || isNaN(year)) {
                return next(new APIError(statusCode.BAD_REQUEST, 'Valid year is required'));
            }


            if (month && (isNaN(month) || month < 1 || month > 12)) {
                return next(new APIError(statusCode.BAD_REQUEST, 'Invalid month value'));
            }


            const startDate = new Date(Date.UTC(year, month - 1, 1));
            const endDate = month
                ? new Date(Date.UTC(year, month, 1))
                : new Date(Date.UTC(Number(year) + 1, 0, 1));


            console.log('Start Date:', startDate);
            console.log('End Date:', endDate);


            const matchStage = {
                $match: {
                    order_date: { $gte: startDate, $lt: endDate },
                },
            };


            const groupStage = type === 'daily'
                ? {
                    $group: {
                        _id: {
                            day: { $dayOfMonth: '$order_date' },
                            month: { $month: '$order_date' },
                            year: { $year: '$order_date' },
                        },
                        total_income: { $sum: '$total_price' },
                    },
                }
                : {
                    $group: {
                        _id: {
                            month: { $month: '$order_date' },
                            year: { $year: '$order_date' },
                        },
                        total_income: { $sum: '$total_price' },
                    },
                };

            const incomeTrends = await Order.aggregate([matchStage, groupStage, { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }]);


            console.log('Income Trends:', incomeTrends);


            const daysInMonth = month ? new Date(year, month, 0).getDate() : 31;
            const resultData = Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, total_income: 0 }));


            incomeTrends.forEach(item => {
                const day = item._id.day - 1;
                resultData[day].total_income = item.total_income;
            });

            res.json({
                success: true,
                data: resultData,
            });
        } catch (err) {
            next(err);
        }
    },

    
    getOverview: async (req, res, next) => {
        try {
            const { month, year } = req.query;

            const startDate = new Date(`${year}-${month}-01`);
            const endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 1);

            const totalOrders = await Order.countDocuments({
                order_date: { $gte: startDate, $lt: endDate },
            });


            const totalRevenue = await Order.aggregate([
                { $match: { order_date: { $gte: startDate, $lt: endDate } } },
                { $group: { _id: null, totalRevenue: { $sum: "$total_price" } } },
            ]);
            const totalRevenueAmount = totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;

            const avgOrderValue = totalOrders > 0 ? totalRevenueAmount / totalOrders : 0;

            const popularProductData = await Order.aggregate([
                { $match: { order_date: { $gte: startDate, $lt: endDate } } },
                { $unwind: "$items" },
                { $group: { _id: "$items.product", totalQuantity: { $sum: "$items.quantity" } } },
                { $sort: { totalQuantity: -1 } },
                { $limit: 1 },
                { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
                { $unwind: "$product" },
                { $project: { productName: "$product.name", totalQuantity: 1 } },
            ]);

            const topProductsData = await Order.aggregate([
                { $match: { order_date: { $gte: startDate, $lt: endDate } } },
                { $unwind: "$items" },
                { $group: { _id: "$items.product", totalQuantity: { $sum: "$items.quantity" } } },
                { $sort: { totalQuantity: -1 } },
                { $limit: 5 },
                { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
                { $unwind: "$product" },
                { $project: { productName: "$product.name", totalQuantity: 1 } },
            ]);

            const topProducts = topProductsData.map(item => ({
                name: item.productName,
                totalQuantity: item.totalQuantity,
            }));

            const popularProduct = popularProductData.length > 0 ? popularProductData[0].productName : 'N/A';

            res.json({
                success: true,
                totalOrders,
                totalRevenue: totalRevenueAmount,
                avgOrderValue,
                popularProduct,
                topProducts,
            });
        } catch (error) {
            console.error('Error fetching overview data:', error);
            res.status(500).json({
                success: false,
                message: 'An error occurred while fetching order statistics',
                error: error.message,
            });
        }
    },

    getAvailableYears: async (req, res) => {
        try {
            const firstOrder = await Order.findOne().sort({ order_date: 1 });
            const lastOrder = await Order.findOne().sort({ order_date: -1 });

            if (!firstOrder || !lastOrder) {
                return res.status(404).json({ message: 'No orders found' });
            }

            const startYear = new Date(firstOrder.order_date).getFullYear();
            const endYear = new Date(lastOrder.order_date).getFullYear();

            const years = [];
            for (let year = startYear; year <= endYear; year++) {
                years.push(year);
            }

            res.json({ years });
        } catch (error) {
            console.error('Error fetching available years:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },

};
