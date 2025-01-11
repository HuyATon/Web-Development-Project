const Category = require('../models/Category.js')
const APIError = require('../errors/API.js')
const statusCode = require('../constants/statusCode.js')
const { v4: uuidv4 } = require('uuid');

module.exports = {

    all: async(req, res, next) => {
        try {
            const categories = await Category.find()
            res.json({
                success: true,
                categories: categories
            })
        }
        catch (err) { next(err) }
    },
    create: async(req, res, next) => {
        try {
            const { name } = req.body 
            const oldCategory = await Category.find({ name: name })
            if (oldCategory.length > 0 ) {
                const err = new APIError(statusCode.CONFLICT, 'Category already exists')
                return next(err)
            }
            const category = new Category({
                name: name
            })
            await category.save()
            res.json({
                success: true,
                message: `Category "${name}" has been created.`
            })
        }
        catch (err) { next(err)}
    },
    update: async(req, res, next) => {
        try {
            const id = req.params.id
            const { name } = req.body
            const oldCategories = await Category.find( { name: name })
            if (oldCategories.length > 0 ) {
                const err = new APIError(statusCode.CONFLICT, 'Category already exists')
                return next(err)
            }
            const category = await Category.findById(id)
            category.name = name
            await category.save()
            return res.json({
                success: true,
                message: `Category "${name}" has been updated.`
            })
        }
        catch(err) { next(err) }
    },
    delete: async(req, res, next) => {
        try {
            const id = req.params.id
            const category = await Category.findById(id)
            await Category.findOneAndDelete( { _id: id })
            return res.json({
                success: true,
                message: `Category "${category.name}" has been deleted.`
            })
        }
        catch(err) { next(err) }
    }
}