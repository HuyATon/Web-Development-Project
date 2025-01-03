const express = require('express')
const authR = require('./authR.js')
const categoriesR = require('./categoriesR.js')
const productsR = require('./productsR.js')
const ordersR = require('./ordersR.js')
const uploadR = require('./uploadR.js')
const userR = require('./userR.js')
const cartR = require('./cartR.js')

const router = express.Router()
const passport = require('passport')
const checkBlackList = require('../middlewares/jwtBlackList.js')

router.use('/auth', authR)
router.use('/categories', categoriesR)
router.use('/products', productsR)
router.use('/orders', ordersR)
router.use('/upload-image',uploadR )
router.use('/users', userR)
router.use('/cart',  passport.authenticate('jwt', { session: false }), checkBlackList, cartR)


module.exports = router