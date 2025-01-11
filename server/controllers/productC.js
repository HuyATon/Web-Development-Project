const Product = require('../models/Product.js');
const APIError = require('../errors/API.js');
const statusCode = require('../constants/statusCode.js');
const Category = require('../models/Category');
const { v4: uuidv4 } = require('uuid');


module.exports = {
    all: async (req, res, next) => {
        try {
            const {
                limit = 10,
                offset = 0,
                sort,
                name,
                category
            } = req.query;

            const parsedLimit = parseInt(limit, 10);
            const parsedOffset = parseInt(offset, 10);

            if (isNaN(parsedLimit) || parsedLimit <= 0) {
                return next(new APIError(statusCode.BAD_REQUEST, "Invalid limit value"));
            }

            if (isNaN(parsedOffset) || parsedOffset < 0) {
                return next(new APIError(statusCode.BAD_REQUEST, "Invalid offset value"));
            }

            let sortOptions = {};
            if (sort) {
                const [field, direction] = sort.split('_');
                sortOptions[field] = direction === 'desc' ? -1 : 1;
            }

            const query = {};
            if (name) {
                query.$or = [
                    { name: { $regex: name, $options: 'i' } }
                ];
            }
            if (category) {
                query.category = category;
            }

            const products = await Product.find(query)
                .sort(sortOptions)
                .skip(parsedOffset)
                .limit(parsedLimit)
                .populate('category', 'name'); 

            const total = await Product.countDocuments(query);

            res.json({
                success: true,
                data: {
                    products,
                    total,
                    limit: parsedLimit,
                    offset: parsedOffset,
                },
            });
        } catch (err) {
            next(err);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const product = await Product.findById(id).populate('category', 'name');

            if (!product) {
                return next(new APIError(statusCode.NOT_FOUND, 'Product not found'));
            }

            res.json({
                success: true,
                data: product,
            });
        } catch (err) {
            next(err);
        }
    },

    create: async (req, res, next) => {
        try {
            const {
                name,
                category,
                description,
                wood_type,
                finish,
                dimensions,
                price,
                weight,
                image_path,
                stock,
                sku,
                status,
                featured,
                discount_price,
                tags,
            } = req.body;

            // const existingCategory = await Category.findById(category);
            // if (!existingCategory) {
            //     return next(new APIError(statusCode.NOT_FOUND, `Category with ID '${category}' does not exist`));
            // }

            const existingProduct = await Product.findOne({ name });
            if (existingProduct) {
                return next(new APIError(statusCode.CONFLICT, `Product with name '${name}' already exists`));
            }

            const id = uuidv4()

            const newProduct = new Product({
                id,
                name,
                category,
                description,
                wood_type,
                finish,
                dimensions,
                price,
                weight,
                image_path,
                stock,
                sku,
                status,
                featured,
                discount_price,
                tags,
            });

            await newProduct.save();

            res.json({
                success: true,
                message: 'Product created successfully',
                data: newProduct,
            });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const {
                name,
                category,
                description,
                wood_type,
                finish,
                dimensions,
                price,
                weight,
                image_path,
                stock,
                sku,
                status,
                featured,
                discount_price,
                tags,
            } = req.body;

            const product = await Product.findById(id);
            if (!product) {
                return next(new APIError(statusCode.NOT_FOUND, 'Product not found'));
            }

            // if (category) {
            //     const existingCategory = await Category.findById(category);
            //     if (!existingCategory) {
            //         return next(new APIError(statusCode.NOT_FOUND, `Category with ID '${category}' does not exist`));
            //     }
            //     product.category = category;
            // }

            if (name && (await Product.findOne({ name, _id: { $ne: id } }))) {
                return next(new APIError(statusCode.CONFLICT, `Product with name '${name}' already exists`));
            }

            product.name = name || product.name;
            product.description = description || product.description;
            product.wood_type = wood_type || product.wood_type;
            product.finish = finish || product.finish;
            product.dimensions = dimensions || product.dimensions;
            product.price = price || product.price;
            product.weight = weight || product.weight;
            product.image_path = image_path || product.image_path;
            product.stock = stock || product.stock;
            product.sku = sku || product.sku;
            product.status = status || product.status;
            product.featured = featured || product.featured;
            product.discount_price = discount_price || product.discount_price;
            product.tags = tags || product.tags;

            product.category = category || product.category

            await product.save();

            res.json({
                success: true,
                message: 'Product updated successfully',
                data: product,
            });
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            
            const deletedProduct = await Product.findByIdAndDelete(id);
            
            if (!deletedProduct) {
                throw new APIError(404, 'Product not found');
            }
    
            res.json({
                success: true,
                message: 'Product deleted successfully'
            });
        } catch (err) {
            next(err);
        }
    },

    updateStock: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { stock } = req.body;

            if (stock === undefined || stock < 0) {
                return next(new APIError(statusCode.BAD_REQUEST, 'Invalid stock value'));
            }

            const product = await Product.findById(id);
            if (!product) {
                return next(new APIError(statusCode.NOT_FOUND, 'Product not found'));
            }

            product.stock = stock;
            await product.save();

            res.json({
                success: true,
                message: 'Product stock updated successfully.',
                data: product,
            });
        } catch (err) {
            next(err);
        }
    },

    updateDiscount: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { discount_price } = req.body;

            if (discount_price === undefined || discount_price < 0) {
                return next(new APIError(statusCode.BAD_REQUEST, 'Invalid discount price'));
            }

            const product = await Product.findById(id);
            if (!product) {
                return next(new APIError(statusCode.NOT_FOUND, 'Product not found'));
            }

            product.discount_price = discount_price;
            await product.save();

            res.json({
                success: true,
                message: 'Product discount updated successfully.',
                data: product,
            });
        } catch (err) {
            next(err);
        }
    },
};
