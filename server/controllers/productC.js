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
                name,        // case insensitive
                category      //case sénsitive
            } = req.query;


            const parsedLimit = parseInt(limit);
            if (isNaN(parsedLimit) || parsedLimit <= 0) {
                const err = new APIError(statusCode.BAD_REQUEST, "Invalid limit value");
                return next(err);
            }


            const parsedOffset = parseInt(offset);
            if (isNaN(parsedOffset) || parsedOffset < 0) {
                const err = new APIError(statusCode.BAD_REQUEST, "Invalid offset value");
                return next(err);
            }


            let sortOptions = {};
            if (sort) {
                const [field, direction] = sort.split('_');
                sortOptions[field] = direction === 'desc' ? -1 : 1;
            }


            const query = {};
            if (name) {
                query.$or = [
                    { name: { $regex: name, $options: 'i' } },
                    { category: { $regex: name, $options: 'i' } },
                ];
            }
            if (category) {
                query.category = category;
            }


            const products = await Product.find(query)
                .sort(sortOptions)
                .skip(parsedOffset)
                .limit(parsedLimit);


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
            const id = req.params.id;


            const product = await Product.findOne({ id: id });

            if (!product) {
                const err = new APIError(statusCode.NOT_FOUND, 'Product not found');
                return next(err);
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
                created_at,
                updated_at,
                featured,
                discount_price,
                tags,
            } = req.body;

            const existingCategory = await Category.findOne({ name: category });
            if (!existingCategory) {
                const err = new APIError(statusCode.NOT_FOUND, `Category '${category}' does not exist`);
                return next(err);
            }
            const existingProduct = await Product.findOne({ name });
            if (existingProduct) {
                const err = new APIError(statusCode.CONFLICT, `Product with this '${name}' already exists`);
                return next(err);
            }

            const id = uuidv4();


            const now = new Date().toISOString();
            const newCreatedAt = created_at || now;
            const newUpdatedAt = updated_at || now;


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
                created_at: newCreatedAt,
                updated_at: newUpdatedAt,
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
                updated_at,
                featured,
                discount_price,
                tags,
            } = req.body;


            const product = await Product.findOne({ id });
            if (!product) {
                const err = new APIError(statusCode.NOT_FOUND, 'Product not found');
                return next(err);
            }


            const existingCategory = await Category.findOne({ name: category });
            if (!existingCategory) {
                const err = new APIError(statusCode.NOT_FOUND, `Category '${category}' does not exist`);
                return next(err);
            }

            const existingProduct = await Product.findOne({ name });
            if (existingProduct && existingProduct.id !== id) {
                const err = new APIError(statusCode.CONFLICT, `Product with this ${name} already exists`);
                return next(err);
            }


            const now = new Date().toISOString();
            const newUpdatedAt = updated_at || now;

            product.name = name || product.name;
            product.category = category || product.category;
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
            product.updated_at = newUpdatedAt;
            product.featured = featured || product.featured;
            product.discount_price = discount_price || product.discount_price;
            product.tags = tags || product.tags;


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

            // Find the product by id
            const product = await Product.findOne({ id });
            if (!product) {
                const err = new APIError(statusCode.NOT_FOUND, 'Product not found');
                return next(err);
            }

            // Delete the product
            await Product.deleteOne({ id });

            res.json({
                success: true,
                message: `Product with id "${id}" has been deleted.`,
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
                const err = new APIError(statusCode.BAD_REQUEST, 'Invalid stock value');
                return next(err);  
            }

 
            const product = await Product.findOne({ id });
            if (!product) {
                const err = new APIError(statusCode.NOT_FOUND, 'Product not found');
                return next(err); 
            }

            
            product.stock = stock;

            
            await product.save();

            res.json({
                success: true,
                message: `Product stock updated successfully.`,
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
                const err = new APIError(statusCode.BAD_REQUEST, 'Invalid discount price');
                return next(err);  
            }

           
            const product = await Product.findOne({ id });
            if (!product) {
                const err = new APIError(statusCode.NOT_FOUND, 'Product not found');
                return next(err);  
            }

           
            product.discount_price = discount_price;


            await product.save();

            res.json({
                success: true,
                message: `Product discount updated successfully.`,
                data: product,
            });
        } catch (err) {
            next(err);
        }
    },

};
