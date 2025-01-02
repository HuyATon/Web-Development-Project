const express = require('express')
const orderC = require('../controllers/orderC.js')
const Order = require('../models/Order.js')
const passport = require('passport')
const checkBlackList = require('../middlewares/jwtBlackList.js')


const router = express.Router()


router.get('/order-trends', orderC.getOrderTrends);
router.get('/income-trends', orderC.getIncomeTrends);

router.get('/overview', orderC.getOverview);



module.exports = router;