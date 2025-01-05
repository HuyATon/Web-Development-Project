const express = require('express')
const orderC = require('../controllers/orderC.js')
const Order = require('../models/Order.js')
const passport = require('passport')
const checkBlackList = require('../middlewares/jwtBlackList.js')


const router = express.Router()


router.get('/orders-trends', orderC.getOrderTrends);
router.get('/income-trends', orderC.getIncomeTrends);

router.get('/overview', orderC.getOverview);
router.get('/available-years', orderC.getAvailableYears);




module.exports = router;